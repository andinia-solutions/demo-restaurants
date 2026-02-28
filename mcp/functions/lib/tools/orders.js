import { z } from "zod";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../utils/firestore.js";
export function registerOrderTools(server) {
    server.tool("create_order", "Create a new order for a user at a restaurant", {
        restaurantId: z.string(),
        userId: z.string(),
        items: z.array(z.object({
            menuItemId: z.string(),
            quantity: z.number().int().positive(),
        })),
    }, async ({ restaurantId, userId, items }) => {
        try {
            // Check for existing active order
            const activeSnapshot = await db
                .collection("orders")
                .where("restaurantId", "==", restaurantId)
                .where("userId", "==", userId)
                .where("status", "not-in", ["delivered", "cancelled"])
                .get();
            if (!activeSnapshot.empty) {
                return {
                    content: [{ type: "text", text: "User already has an active order" }],
                    isError: true,
                };
            }
            // Fetch menu items and calculate total
            const orderItems = [];
            let totalAmount = 0;
            for (const item of items) {
                const menuDoc = await db.collection("menuItems").doc(item.menuItemId).get();
                if (!menuDoc.exists) {
                    return {
                        content: [{ type: "text", text: `Menu item not found: ${item.menuItemId}` }],
                        isError: true,
                    };
                }
                const menuData = menuDoc.data();
                if (menuData.restaurantId !== restaurantId) {
                    return {
                        content: [{ type: "text", text: `Menu item does not belong to this restaurant: ${item.menuItemId}` }],
                        isError: true,
                    };
                }
                const unitPrice = menuData.price;
                totalAmount += unitPrice * item.quantity;
                orderItems.push({
                    menuItemId: item.menuItemId,
                    name: menuData.name,
                    quantity: item.quantity,
                    unitPrice,
                });
            }
            const ref = db.collection("orders").doc();
            const paymentLink = `https://pay.example.com/order/${ref.id}`;
            await ref.set({
                restaurantId,
                userId,
                items: orderItems,
                totalAmount,
                status: "pending_payment",
                paymentLink,
                paymentReceipt: null,
                createdAt: Timestamp.now(),
                paidAt: null,
            });
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({ id: ref.id, totalAmount, paymentLink, status: "pending_payment" }),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
    server.tool("get_active_order", "Get the active order for a user at a restaurant", {
        restaurantId: z.string(),
        userId: z.string(),
    }, async ({ restaurantId, userId }) => {
        try {
            const snapshot = await db
                .collection("orders")
                .where("restaurantId", "==", restaurantId)
                .where("userId", "==", userId)
                .where("status", "not-in", ["delivered", "cancelled"])
                .get();
            if (snapshot.empty) {
                return { content: [{ type: "text", text: "No active order found" }] };
            }
            const doc = snapshot.docs[0];
            return { content: [{ type: "text", text: JSON.stringify({ id: doc.id, ...doc.data() }) }] };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
    server.tool("confirm_payment", "Confirm payment for the active order by submitting a payment receipt", {
        restaurantId: z.string(),
        userId: z.string(),
        paymentReceipt: z.string().describe("Payment receipt or proof of payment"),
    }, async ({ restaurantId, userId, paymentReceipt }) => {
        try {
            const snapshot = await db
                .collection("orders")
                .where("restaurantId", "==", restaurantId)
                .where("userId", "==", userId)
                .where("status", "not-in", ["delivered", "cancelled"])
                .get();
            if (snapshot.empty) {
                return { content: [{ type: "text", text: "No active order found" }], isError: true };
            }
            const doc = snapshot.docs[0];
            await doc.ref.update({
                paymentReceipt,
                status: "paid",
                paidAt: Timestamp.now(),
            });
            return { content: [{ type: "text", text: "Payment confirmed successfully" }] };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=orders.js.map