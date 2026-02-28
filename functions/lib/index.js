import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "./server.js";
const app = express();
app.use(express.json());
app.post("/", async (req, res) => {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});
export const mcp = onRequest({ region: "us-central1" }, app);
//# sourceMappingURL=index.js.map