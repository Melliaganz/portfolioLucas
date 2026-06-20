export const detectOs = (): "android" | "ios" | "other" => {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/i.test(ua)) return "ios";
  return "other";
};

const STORES = {
  IOS: "https://apps.apple.com/fr/app/impots-gouv/id505488770",
  ANDROID: "https://play.google.com/store/apps/details?id=fr.gouv.finances.smartphone.android",
  DESKTOP: "https://www.impots.gouv.fr",
};

export const getSmartLink = (url?: string): string => {
  const fallback = url ?? STORES.DESKTOP;
  if (fallback !== "dgfip_smart_link") return fallback;
  if (typeof navigator === "undefined") return STORES.DESKTOP;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return STORES.IOS;
  if (/android/i.test(ua)) return STORES.ANDROID;
  return STORES.DESKTOP;
};

// Toujours un store applicatif (jamais le web), choisi selon l'OS, y compris
// sur ordinateur : Apple (iOS/macOS) → App Store, le reste → Play Store.
export const getAppStoreLink = (): string => {
  if (typeof navigator === "undefined") return STORES.ANDROID;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return STORES.IOS;
  if (/android/i.test(ua)) return STORES.ANDROID;
  if (/Macintosh|Mac OS X/i.test(ua)) return STORES.IOS;
  return STORES.ANDROID;
};
