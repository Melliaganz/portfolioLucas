import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Lang } from "./translations";
import { safeGetItem, safeSetItem } from "../utils/storage";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dictionary;
}

const detectInitialLang = (): Lang => {
  const stored = safeGetItem("lang");
  if (stored === "fr" || stored === "en") return stored;
  if (
    typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("en")
  ) {
    return "en";
  }
  return "fr";
};

// Valeur par défaut en français : permet aux composants rendus hors provider
// (tests unitaires isolés) de fonctionner sans wrapper.
const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  setLang: () => {},
  t: dictionaries.fr,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);
  const firstRender = useRef(true);

  useEffect(() => {
    document.documentElement.lang = lang;

    // Pas d'animation au tout premier rendu, seulement lors d'un changement.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const el = document.documentElement;
    el.classList.add("is-lang-switching");
    const id = window.setTimeout(
      () => el.classList.remove("is-lang-switching"),
      450
    );
    return () => {
      window.clearTimeout(id);
      el.classList.remove("is-lang-switching");
    };
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    safeSetItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext);
