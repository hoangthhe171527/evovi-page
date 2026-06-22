// Hai chế độ build/dev:
//
//  • Trong Lovable cloud sandbox (LOVABLE_SANDBOX=1 hoặc DEV_SERVER__PROJECT_PATH):
//    dùng nguyên @lovable.dev/vite-tanstack-config (componentTagger + error logger
//    cho trình chỉnh sửa trực quan).
//
//  • Local: cấu hình Vite "gọn" — vẫn tanstackStart (SSR build/deploy giữ nguyên)
//    nhưng BỎ các plugin chỉ-cho-sandbox khiến `vite dev` chậm: componentTagger
//    (Babel-transform mọi file JSX), dev error logger, HMR debounce 1s. Local dev
//    chạy SPA mode (app không dùng server function) cho nhanh; `vite build` vẫn SSR.
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { defineConfig, loadEnv } from "vite";
import type { PluginOption } from "vite";

// Railway (và Node host khác) cần Node SSR bundle, không phải Cloudflare Workers build.
// Railway tiêm RAILWAY_PROJECT_ID / RAILWAY_ENVIRONMENT lúc build & runtime.
// Đặt TANSTACK_START_NODE_DEPLOY=1 nếu build artifact deploy ngoài Railway (vd. CI).
const deployToNode =
  Boolean(process.env.RAILWAY_PROJECT_ID) ||
  Boolean(process.env.RAILWAY_ENVIRONMENT) ||
  process.env.TANSTACK_START_NODE_DEPLOY === "1";

const isSandbox =
  process.env.LOVABLE_SANDBOX === "1" || !!process.env.DEV_SERVER__PROJECT_PATH;

// Nhánh sandbox: giữ nguyên hành vi Lovable (kèm toggle Cloudflare/Node như trước).
const lovableConfig = defineLovableConfig({
  cloudflare: deployToNode ? false : undefined,
});

// Nhánh local: cấu hình gọn, không componentTagger / error logger / HMR debounce.
const leanConfig = defineConfig(async ({ command, mode }) => {
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const tsConfigPaths = (await import("vite-tsconfig-paths")).default;
  const viteReact = (await import("@vitejs/plugin-react")).default;
  const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");

  const plugins: PluginOption[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
  ];
  // Cloudflare chỉ khi build và không deploy Node; tanstackStart tự build Node bundle khi bỏ.
  if (command === "build" && !deployToNode) {
    try {
      const { cloudflare } = await import("@cloudflare/vite-plugin");
      plugins.push(cloudflare({ viteEnvironment: { name: "ssr" } }));
    } catch {
      /* @cloudflare/vite-plugin không bắt buộc cho dev */
    }
  }
  // Local dev: SPA (không SSR mỗi request) cho nhanh; build vẫn giữ SSR.
  plugins.push(
    tanstackStart(command === "serve" ? { spa: { enabled: true } } : undefined),
    viteReact(),
  );

  // Tiêm `import.meta.env.VITE_*` giống @lovable.dev/vite-tanstack-config.
  const define: Record<string, string> = {};
  const loadedEnv = loadEnv(mode, process.cwd(), "VITE_");
  for (const [key, value] of Object.entries(loadedEnv)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define,
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins,
    server: { host: "::", port: 8080 },
  };
});

export default isSandbox ? lovableConfig : leanConfig;
