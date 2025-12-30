import { useState, useEffect, useCallback } from "react";
import type { NavItem } from "../types/navigation";
import styles from "../styles/Header.module.css";
import { IconCode, IconTelecharger } from "../utils/icons.module";

const NAV_LINKS: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Variable intermédiaire pour satisfaire les outils de diagnostic ARIA
  const isExpanded = isMenuOpen ? "true" : "false";

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
          aria-expanded={isExpanded}
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

          <a
            href="/CVLengrandLucas.pdf"
            download="CV_Lengrand_Lucas.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cvButton}
            onClick={closeMenu}
          >
            <IconTelecharger aria-hidden="true" />
            <span>
              CV
              <span className={styles.fileFormat}> (PDF)</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
