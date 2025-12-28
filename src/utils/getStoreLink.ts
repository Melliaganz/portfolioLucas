export const getDgfipStoreLink = (): string => {
  if (typeof window === "undefined") return "#"; // Sécurité pour le rendu côté serveur

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Détection iOS (iPhone, iPad, iPod)
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "https://apps.apple.com/fr/app/impots-gouv/id505488770";
  }

  // Détection Android
  if (/android/i.test(userAgent)) {
    return "https://play.google.com/store/apps/details?id=fr.gouv.finances.smartphone.android&hl=fr";
  }

  // Lien par défaut pour ordinateur (Desktop)
  return "https://www.impots.gouv.fr"; 
};
