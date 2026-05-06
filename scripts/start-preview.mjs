/**
 * Production entry for PaaS (e.g. Railway). Uses the built SSR handler + srvx.
 * Does not run `vite preview`, so it still works when devDependencies (vite) are pruned.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { serve } from "srvx/node";
import { serveStatic } from "srvx/static";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const relativeCandidates = ["dist/server/server.js", "dist/server/index.js"];
const entry = relativeCandidates.find((rel) => existsSync(path.join(root, rel)));
if (!entry) {
  console.error(
    "[start] No dist/server bundle found. Run a production build (e.g. `npm run build`) on the deploy host or in CI first.",
  );
  process.exit(1);
}

const { default: app } = await import(pathToFileURL(path.join(root, entry)).href);
if (!app || typeof app.fetch !== "function") {
  console.error("[start] Server bundle must export a default with a `fetch` method.");
  process.exit(1);
}

const port = process.env.PORT != null && process.env.PORT !== "" ? Number(process.env.PORT) : 3000;

const clientDir = path.join(root, "dist/client");
const staticMiddleware = existsSync(clientDir)
  ? serveStatic({ dir: clientDir })
  : null;

serve({
  // Vite client output (CSS/JS/fonts/images). Without this, only SSR runs — browsers get no styles.
  middleware: staticMiddleware ? [staticMiddleware] : [],
  fetch: (req) => app.fetch(req),
  port,
  hostname: "0.0.0.0",
});
