import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";
import styles from "../styles/Header.module.css";
import { IconCode, IconTelecharger } from "../utils/icons.module";
import { CvModal } from "./CvModal";
import { useLang } from "../i18n/LanguageContext";

export const Header = () => {
  const { t, lang, setLang } = useLang();
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

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
    if (!isMenuOpen) return;
    const handleResize = () => {
      if (window.innerWidth > 768) closeMenu();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, closeMenu]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>

        <a href="#" className={styles.logo} onClick={closeMenu} aria-label={t.header.backToTop}>
          <div className={styles.logoBox}>
            <IconCode />
          </div>
          <span className={styles.navTitre}>Lengrand Lucas</span>
        </a>

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

        <div className={`${styles.rightNavContainer} ${isMenuOpen ? styles.navActive : ""}`}>
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
            {lang === "fr" ? "EN" : "FR"}
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
