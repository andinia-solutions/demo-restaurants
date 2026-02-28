import { z } from "zod";
import { db } from "../utils/firestore.js";
export function registerMenuTools(server) {
    server.tool("get_menu", "Get available menu items for a restaurant, optionally filtered by category", {
        restaurantId: z.string(),
        category: z.string().optional().describe("Optional category filter (e.g. 'entradas', 'principales', 'postres')"),
    }, async ({ restaurantId, category }) => {
        try {
            let query = db
                .collection("menuItems")
                .where("restaurantId", "==", restaurantId)
                .where("available", "==", true);
            if (category) {
                query = query.where("category", "==", category);
            }
            const snapshot = await query.get();
            const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return { content: [{ type: "text", text: JSON.stringify(items) }] };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=menu.js.map