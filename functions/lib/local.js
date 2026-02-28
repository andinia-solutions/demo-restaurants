import express from "express";
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
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log(`MCP server listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=local.js.map