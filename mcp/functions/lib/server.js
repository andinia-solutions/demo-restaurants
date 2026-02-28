import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerReservationTools } from "./tools/reservations.js";
import { registerMenuTools } from "./tools/menu.js";
import { registerOrderTools } from "./tools/orders.js";
export function createServer() {
    const server = new McpServer({
        name: "restaurant-mcp",
        version: "1.0.0",
    });
    registerReservationTools(server);
    registerMenuTools(server);
    registerOrderTools(server);
    return server;
}
//# sourceMappingURL=server.js.map