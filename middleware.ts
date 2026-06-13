// Edge Middleware Vercel : génère un nonce CSP unique par requête, l'injecte
// dans le HTML statique (placeholders posés au build par vite.config.ts) et
// pose une Content-Security-Policy stricte (nonce + strict-dynamic + Trusted
// Types). Le reste du site demeure statique ; seul le document HTML transite
// par cette fonction.

export const config = {
  // Intercepte les documents (pas les assets ni /index.html, qui contiennent
  // un point et servent de source au fetch interne ci-dessous).
  matcher: ["/((?!_vercel|assets|.*\\.).*)"],
};

const NONCE_PLACEHOLDER = "__CSP_NONCE__";

const SECURITY_HEADERS: Record<string, string> = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    // strict-dynamic : les navigateurs modernes ignorent les allowlists
    // d'hôtes et ne font confiance qu'au script noncé + à ce qu'il importe.
    // `https:` sert de repli pour les navigateurs sans strict-dynamic.
    `script-src 'nonce-${nonce}' 'strict-dynamic' https:`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://vitals.vercel-insights.com https://api.web3forms.com",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "require-trusted-types-for 'script'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default async function middleware(request: Request): Promise<Response> {
  const origin = new URL(request.url).origin;

  // Récupère le HTML statique. /index.html contient un point : il n'est pas
  // intercepté par ce middleware, donc pas de boucle.
  const assetResponse = await fetch(new URL("/index.html", origin), {
    headers: { accept: "text/html" },
  });

  // En cas d'échec, on laisse Vercel servir la réponse statique telle quelle.
  if (!assetResponse.ok) return assetResponse;

  const nonce = generateNonce();
  const html = (await assetResponse.text()).replaceAll(NONCE_PLACEHOLDER, nonce);

  return new Response(html, {
    status: 200,
    headers: {
      ...SECURITY_HEADERS,
      "content-type": "text/html; charset=utf-8",
      "Content-Security-Policy": buildCsp(nonce),
      // Le HTML est personnalisé par requête (nonce) : ne pas le mettre en cache.
      "cache-control": "no-store",
    },
  });
}
