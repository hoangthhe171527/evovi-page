// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Railway (and other Node hosts) need a Node SSR bundle, not the Cloudflare Workers build.
// Railway injects RAILWAY_PROJECT_ID / RAILWAY_ENVIRONMENT during build and runtime.
// Set TANSTACK_START_NODE_DEPLOY=1 if you build the deploy artifact outside Railway (e.g. CI).
const deployToNode =
  Boolean(process.env.RAILWAY_PROJECT_ID) ||
  Boolean(process.env.RAILWAY_ENVIRONMENT) ||
  process.env.TANSTACK_START_NODE_DEPLOY === "1";

export default defineConfig({
  cloudflare: deployToNode ? false : undefined,
});
