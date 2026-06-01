import { defineConfig, mergeConfig, type UserConfig, type Plugin, type HtmlTagDescriptor } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

function preloadLazyChunks(): Plugin {
  return {
    name: "preload-lazy-chunks",
    transformIndexHtml: {
      order: "post",
      handler(_, ctx) {
        if (!ctx.bundle) return [];
        const tags: HtmlTagDescriptor[] = [];
        for (const chunk of Object.values(ctx.bundle)) {
          if (chunk.type !== "chunk" || chunk.isEntry || !chunk.fileName.endsWith(".js")) continue;
          tags.push({
            tag: "link",
            attrs: { rel: "modulepreload", crossorigin: "", href: `/${chunk.fileName}` },
            injectTo: "head" as const,
          });
          const importedCss = (chunk as unknown as { viteMetadata?: { importedCss?: Set<string> } }).viteMetadata?.importedCss;
          importedCss?.forEach((css) => {
            tags.push({
              tag: "link",
              attrs: { rel: "preload", as: "style", crossorigin: "", href: `/${css}` },
              injectTo: "head" as const,
            });
          });
        }
        return tags;
      },
    },
  };
}

const isVitest = process.env.VITEST === "true";

const viteConfig = defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: "https://www.lengrandlucas.com",
      readable: true,
      generateRobotsTxt: true,
      dynamicRoutes: ["/"],
    }),
    preloadLazyChunks(),
  ],
  define: {
    __APP_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: !isVitest
      ? {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
          "react/jsx-runtime": "preact/jsx-runtime",
        }
      : {},
  },
  build: {
    cssMinify: "lightningcss",
    target: "esnext",
  },
  preview: {
    headers: {
      "Content-Security-Policy": "default-src 'self'; base-uri 'self'; script-src 'self' https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com https://api.web3forms.com; upgrade-insecure-requests; frame-ancestors 'none';",
      "Cross-Origin-Opener-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    fileParallelism: false,
  },
});

export default mergeConfig(
  viteConfig as UserConfig,
  vitestConfig as UserConfig,
);
