import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";
import type { NavItem } from "../types/navigation";
import styles from "../styles/Header.module.css";
import { IconCode, IconTelecharger } from "../utils/icons.module";
import { CvModal } from "./CvModal";

const NAV_LINKS: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 20);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.container}>
        
        <a href="#" className={styles.logo} onClick={closeMenu} aria-label="Retour en haut">
          <div className={styles.logoBox}>
            <IconCode />
          </div>
          <span className={styles.navTitre}>Lengrand Lucas</span>
        </a>

        <button 
          className={styles.burger} 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        <div className={`${styles.rightNavContainer} ${isMenuOpen ? styles.navActive : ""}`}>
          <nav className={styles.nav} aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
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
              CV
              <span className={styles.fileFormat}> (PDF)</span>
            </span>
          </button>
        </div>
      </div>

      {isCvOpen && <CvModal onClose={() => setIsCvOpen(false)} />}
    </header>
  );
};
