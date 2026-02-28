# MCP Server - Atención al cliente para restaurantes

---

## Parte 1: Especificaciones

### Especificaciones funcionales

**Alcance**: MCP server para un agente de atención al cliente de restaurantes. Multi-restaurante (cada tool recibe `restaurantId`). Identificación de usuario por parámetro `userId` (sin auth real, es una demo).

#### Gestión de reservas
- **Crear reserva**: Datos: nombre del cliente, fecha, hora, cantidad de personas. Se crea con status "confirmed". Sin validación de capacidad.
- **Cancelar reserva**: El usuario indica qué reserva cancelar (por ID). Se verifica que pertenezca al usuario antes de cancelar.
- **Consultar reservas**: Lista todas las reservas confirmadas de un usuario en un restaurante.

#### Consulta de menú
- **Consultar menú**: Lista ítems disponibles del restaurante, con filtro opcional por categoría. Solo lectura (datos cargados manualmente).

#### Gestión de pedidos
- **Crear orden**: Recibe lista de ítems con cantidad. Se buscan precios en el menú, se calcula el total, se genera un link de pago ficticio (`https://pay.example.com/order/{orderId}`), y se crea con status "pending_payment". Un usuario solo puede tener un pedido activo a la vez.
- **Consultar pedido activo**: Solo recibe `userId`. Retorna info del único pedido activo del usuario (status != "delivered" y != "c,ancelled").
- **Confirmar pago**: Solo recibe `userId` y el comprobante de pago. Se asocia al pedido activo del usuario. No se valida el comprobante, se marca como "paid".

#### Flujo de pago (mockeado)
1. Al crear orden → se genera link ficticio de pago
2. Se le pide al usuario que envíe comprobante
3. Al recibir comprobante → se guarda y se marca como pagado, sin validación

### Especificaciones no funcionales

- **Stack**: TypeScript, MCP SDK oficial (`@modelcontextprotocol/sdk`), Firebase Functions v2, Firestore
- **Base de datos**: Firestore en una base de datos propia del proyecto (no la default). Colecciones separadas (no subcolecciones).
- **Transporte MCP**: Streamable HTTP, stateless (un server nuevo por request). Compatible con Firebase Functions que son stateless.
- **Calidad**: MVP/demo. Simple pero prolijo.
- **Runtime**: Node.js 18+

---

## Parte 2: Plan de implementación

### Estructura del proyecto

```
workflow/
├── firebase.json
├── firestore.rules
├── .firebaserc
└── functions/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── index.ts              # Entry point: Firebase Function + Express + transport
        ├── server.ts             # Factory: crea McpServer y registra tools
        ├── tools/
        │   ├── reservations.ts   # create, cancel, get reservations
        │   ├── menu.ts           # get menu
        │   └── orders.ts         # create order, get active order, confirm payment
        └── utils/
            └── firestore.ts      # Inicialización firebase-admin + Firestore (named database)
```

### Modelo de datos (Firestore - colecciones separadas)

Base de datos propia del proyecto (no default).

**`menuItems/{itemId}`** (cargado manualmente)
```
{ restaurantId: string, name: string, description: string, category: string,
  price: number, available: boolean }
```

**`reservations/{reservationId}`**
```
{ restaurantId: string, userId: string, customerName: string,
  date: string, time: string, partySize: number,
  status: "confirmed" | "cancelled", createdAt: Timestamp }
```

**`orders/{orderId}`**
```
{ restaurantId: string, userId: string,
  items: [{ menuItemId: string, name: string, quantity: number, unitPrice: number }],
  totalAmount: number,
  status: "pending_payment" | "paid" | "preparing" | "ready" | "delivered",
  paymentLink: string, paymentReceipt: string | null,
  createdAt: Timestamp, paidAt: Timestamp | null }
```

Nota: Todas las queries filtran por `restaurantId` para mantener aislamiento multi-restaurante.

### Tools del MCP (7 tools)

| Tool | Parámetros | Comportamiento |
|------|-----------|----------------|
| `create_reservation` | restaurantId, userId, customerName, date, time, partySize | Crea doc en `reservations` con status "confirmed" |
| `cancel_reservation` | restaurantId, userId, reservationId | Verifica ownership, cambia a "cancelled" |
| `get_reservations` | restaurantId, userId | Query: restaurantId + userId + status=="confirmed" |
| `get_menu` | restaurantId, category? | Query: restaurantId + available==true, filtro opcional por categoría |
| `create_order` | restaurantId, userId, items: [{menuItemId, quantity}] | Verifica que no haya pedido activo. Busca precios, calcula total, genera link, crea con "pending_payment" |
| `get_active_order` | restaurantId, userId | Query: restaurantId + userId + status not in ["delivered","cancelled"]. Retorna el pedido activo o mensaje de que no hay. |
| `confirm_payment` | restaurantId, userId, paymentReceipt | Busca pedido activo del usuario, guarda comprobante, marca "paid" |

### Implementación clave

#### `index.ts` - Entry point
- Express app con ruta POST `/`
- Cada request: nuevo `McpServer` + `StreamableHTTPServerTransport` (stateless, `sessionIdGenerator: undefined`)
- Export `mcp = onRequest(app)` → endpoint: `https://<region>-<project>.cloudfunctions.net/mcp`

#### `server.ts` - Factory
- `createServer()` instancia McpServer, llama `registerXxxTools(server)` de cada módulo

#### `utils/firestore.ts`
- `initializeApp()` + `getFirestore(app, databaseId)` con el ID de la named database
- Inicializado a nivel de módulo (reutilizado en invocaciones warm)

#### Tools modules
- Cada módulo exporta `registerXxxTools(server: McpServer)`
- Schemas definidos con Zod
- Errores capturados y retornados como `{ content: [{ type: "text", text }], isError: true }`

### Pasos de ejecución

1. `firebase init` (functions TypeScript + firestore rules) en el workspace
2. Instalar deps: `@modelcontextprotocol/sdk`, `zod`, `express`, `@types/express`
3. Ajustar `tsconfig.json`: `module: "Node16"`, `moduleResolution: "Node16"`
4. Crear archivos fuente
5. Build: `cd functions && npm run build`
6. Deploy: `firebase deploy --only functions,firestore:rules`

### Verificación

1. **Build**: `cd functions && npm run build` compila sin errores
2. **Deploy**: `firebase deploy --only functions,firestore:rules`
3. **Test con curl**:
   - POST initialize al endpoint MCP
   - `get_menu` con un restaurante que tenga datos cargados
   - `create_reservation` → `get_reservations` → `cancel_reservation`
   - `create_order` → `get_active_order` → `confirm_payment` → `get_active_order` (verificar status "paid")
