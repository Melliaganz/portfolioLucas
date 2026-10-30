import { defineConfig, mergeConfig, type UserConfig, type Plugin, type HtmlTagDescriptor } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

// Placeholder remplacé par un nonce unique par requête dans middleware.ts.
// Présent uniquement dans le build (pas en dev/preview).
const NONCE_PLACEHOLDER = "__CSP_NONCE__";

function preloadLazyChunks(): Plugin {
  return {
    name: "preload-lazy-chunks",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const tags: HtmlTagDescriptor[] = [];
        for (const chunk of Object.values(ctx.bundle)) {
          if (chunk.type !== "chunk" || chunk.isEntry || !chunk.fileName.endsWith(".js")) continue;
          tags.push({
            tag: "link",
            attrs: { rel: "modulepreload", crossorigin: "", nonce: NONCE_PLACEHOLDER, href: `/${chunk.fileName}` },
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
        // Intègre le CSS d'entrée (~5 Ko) dans le HTML pour le sortir du chemin
        // critique. style-src autorise déjà 'unsafe-inline'.
        for (const [fileName, asset] of Object.entries(ctx.bundle)) {
          if (asset.type !== "asset" || !fileName.endsWith(".css")) continue;
          const linkRe = new RegExp(`<link[^>]*href="/${fileName}"[^>]*>`);
          if (!linkRe.test(html)) continue;
          html = html.replace(linkRe, () => `<style>${String(asset.source)}</style>`);
          delete ctx.bundle[fileName];
        }
        // Ajoute le nonce sur chaque <script> (entrée Vite + JSON-LD) pour la
        // CSP strict-dynamic posée par le Routing Middleware (middleware.ts).
        const htmlWithNonce = html.replace(
          /<script(?=[\s>])/g,
          `<script nonce="${NONCE_PLACEHOLDER}"`
        );
        return { html: htmlWithNonce, tags };
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
      readable: false,
      generateRobotsTxt: true,
      changefreq: "monthly",
      priority: 1.0,
      lastmod: new Date(),
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
    // Vite applique ces en-têtes à tous les fichiers servis, PDF compris :
    // frame-ancestors 'self' (et non 'none' comme en prod) pour que l'aperçu
    // du CV en iframe fonctionne en local. En prod, middleware.ts et
    // vercel.json gardent 'none' pour le HTML et SAMEORIGIN pour le PDF.
    headers: {
      "Content-Security-Policy": "default-src 'self'; base-uri 'self'; script-src 'self' https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://api.web3forms.com; object-src 'none'; form-action 'self'; require-trusted-types-for 'script'; upgrade-insecure-requests; frame-ancestors 'self';",
      "Cross-Origin-Opener-Policy": "same-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "0",
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
