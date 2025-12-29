import { useState, useEffect } from "react";
import type { NavItem } from "../types/navigation";
import styles from "../styles/Header.module.css";
import { IconCode, IconTelecharger } from "../utils/icons.module";

const navLinks: NavItem[] = [
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <div className={styles.logoBox}>
            <IconCode />
          </div>
          <span className={styles.navTitre}>Lengrand Lucas</span>
        </div>

        {/* Navigation & Action Section */}
        <div className={styles.rightNavContainer}>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
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
            aria-label="Télécharger mon CV au format PDF (ouvre une nouvelle fenêtre)"
          >
            <IconTelecharger aria-hidden="true" />
            <span>
              CV <span className={styles.fileFormat}>(PDF)</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
