// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Lovable serves from the domain root; GitHub Pages serves from /sync-your-run/.
    // Keep both deployments resolving CSS and assets correctly.
    base: process.env.GITHUB_ACTIONS ? "/sync-your-run/" : "/",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // RUN is also packaged inside Capacitor. SPA mode provides a static shell for
    // client-side navigation so every sidebar item works without a preview server.
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
        crawlLinks: true,
        retryCount: 1,
      },
    },
  },
});
