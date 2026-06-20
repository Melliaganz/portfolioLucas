import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./i18n/LanguageContext";

// Trusted Types : la CSP impose `require-trusted-types-for 'script'`. Des libs
// tierces (ex. @vercel/analytics) injectent leur script via `script.src = "…"`,
// ce qui est bloqué sans politique. On enregistre une politique « default »
// n'autorisant que les URLs de script same-origin (script/beacons Vercel) et
// rejetant tout le reste : la protection Trusted Types reste active.
const tt = (window as Window & {
  trustedTypes?: {
    createPolicy: (
      name: string,
      rules: { createScriptURL: (input: string) => string }
    ) => unknown;
  };
}).trustedTypes;

try {
  tt?.createPolicy("default", {
    createScriptURL: (input: string) => {
      if (new URL(input, window.location.origin).origin === window.location.origin) {
        return input;
      }
      throw new TypeError(`Trusted Types: URL de script refusée (${input})`);
    },
  });
} catch (e) {
  console.warn("Trusted Types: politique default non enregistrée", e);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
