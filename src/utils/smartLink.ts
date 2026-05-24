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
  if (/iPad|iPhone|iPod/.test(ua)) return STORES.IOS;
  if (/android/i.test(ua)) return STORES.ANDROID;
  return STORES.DESKTOP;
};
