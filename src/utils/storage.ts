// Accès localStorage tolérants aux pannes : l'API peut lever (navigation
// privée, stockage désactivé, quota) et un throw ici ferait planter tout le
// rendu. On dégrade silencieusement vers "pas de persistance".
export const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* stockage indisponible : on ignore */
  }
};
