import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const DATABASE_ID = "restaurant-mcp";

const app = getApps().length === 0 ? initializeApp() : getApps()[0];

export const db = getFirestore(app, DATABASE_ID);
