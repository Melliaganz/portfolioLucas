import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";
import styles from "../styles/Header.module.css";
import { IconCode, IconTelecharger } from "../utils/icons.module";
import { FlagFR, FlagGB } from "../utils/flags";
import { CvModal } from "./CvModal";
import { useLang } from "../i18n/LanguageContext";

const MOBILE_QUERY = "(max-width: 768px)";

export const Header = () => {
  const { t, lang, setLang } = useLang();
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  // Sous 768 px, le menu fermé est seulement poussé hors écran : on le rend
  // `inert` pour le retirer de la tabulation et de l'arbre d'accessibilité.
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia?.(MOBILE_QUERY).matches ?? false
  );

  const navLinks = [
    { label: t.header.about, href: "#about" },
    { label: t.header.projects, href: "#projects" },
    { label: t.header.contact, href: "#contact" },
  ];

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Sécurité : restaure le scroll du body si le Header démonte menu ouvert.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      if (typeof document !== "undefined") {
        document.body.style.overflow = newState ? "hidden" : "unset";
      }
      return newState;
    });
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia?.(MOBILE_QUERY);
    if (!mql) return;
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) closeMenu();
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [closeMenu]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>

        <button
          type="button"
          className={styles.logo}
          onClick={() => {
            closeMenu();
            window.scrollTo({ top: 0 });
          }}
          aria-label={t.header.backToTop}
        >
          <div className={styles.logoBox}>
            <IconCode />
          </div>
          <span className={styles.navTitre}>Lengrand Lucas</span>
        </button>

        <button
          type="button"
          className={styles.burger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        <div
          className={`${styles.rightNavContainer} ${isMenuOpen ? styles.navActive : ""}`}
          inert={isMobile && !isMenuOpen}
        >
          <nav className={styles.nav} aria-label={t.header.nav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={styles.langButton}
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            aria-label={t.header.langLabel}
          >
            <span key={lang} className={styles.langText}>
              {lang === "fr" ? (
                <FlagGB className={styles.flag} />
              ) : (
                <FlagFR className={styles.flag} />
              )}
            </span>
          </button>

          <button
            type="button"
            className={styles.cvButton}
            aria-haspopup="dialog"
            onClick={() => {
              track("cv_open");
              closeMenu();
              setIsCvOpen(true);
            }}
          >
            <IconTelecharger aria-hidden="true" />
            <span>
              {t.header.cv}
              <span className={styles.fileFormat}>{t.header.cvFormat}</span>
            </span>
          </button>
        </div>
      </div>

      {isCvOpen && <CvModal onClose={() => setIsCvOpen(false)} />}
    </header>
  );
};
