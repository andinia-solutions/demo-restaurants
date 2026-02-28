import { z } from "zod";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../utils/firestore.js";
export function registerReservationTools(server) {
    server.tool("create_reservation", "Create a new reservation at a restaurant", {
        restaurantId: z.string(),
        userId: z.string(),
        customerName: z.string(),
        date: z.string().describe("Date in YYYY-MM-DD format"),
        time: z.string().describe("Time in HH:MM format"),
        partySize: z.number().int().positive(),
    }, async ({ restaurantId, userId, customerName, date, time, partySize }) => {
        try {
            const ref = await db.collection("reservations").add({
                restaurantId,
                userId,
                customerName,
                date,
                time,
                partySize,
                status: "confirmed",
                createdAt: Timestamp.now(),
            });
            return {
                content: [{ type: "text", text: JSON.stringify({ id: ref.id, status: "confirmed" }) }],
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
    server.tool("cancel_reservation", "Cancel an existing reservation", {
        restaurantId: z.string(),
        userId: z.string(),
        reservationId: z.string(),
    }, async ({ restaurantId, userId, reservationId }) => {
        try {
            const ref = db.collection("reservations").doc(reservationId);
            const doc = await ref.get();
            if (!doc.exists) {
                return { content: [{ type: "text", text: "Reservation not found" }], isError: true };
            }
            const data = doc.data();
            if (data.userId !== userId || data.restaurantId !== restaurantId) {
                return {
                    content: [{ type: "text", text: "Unauthorized: reservation does not belong to this user" }],
                    isError: true,
                };
            }
            await ref.update({ status: "cancelled" });
            return { content: [{ type: "text", text: "Reservation cancelled successfully" }] };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
    server.tool("get_reservations", "Get all confirmed reservations for a user at a restaurant", {
        restaurantId: z.string(),
        userId: z.string(),
    }, async ({ restaurantId, userId }) => {
        try {
            const snapshot = await db
                .collection("reservations")
                .where("restaurantId", "==", restaurantId)
                .where("userId", "==", userId)
                .where("status", "==", "confirmed")
                .get();
            const reservations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            return { content: [{ type: "text", text: JSON.stringify(reservations) }] };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Error: ${error.message}` }],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=reservations.js.map