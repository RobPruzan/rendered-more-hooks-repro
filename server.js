import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.get("/", async (req, res) => {
    let template = fs.readFileSync(
      path.resolve(__dirname, "index.html"),
      "utf-8"
    );
    template = await vite.transformIndexHtml(req.url, template);
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const appHtml = render();
    const html = template.replace(`<!--ssr-outlet-->`, appHtml.html);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });

  app.listen(5173, () => {
    console.log("http://localhost:5173");
  });
}

createServer();
