import { useState, useEffect } from "react";
import type { NavItem } from "../types/navigation";
import styles from "../styles/Header.module.css";
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoBox}>{"<>"}</div>
          <span className={styles.navTitre}>Lengrand Lucas</span>
        </div>
        <div className={styles.rightNavContainer}>
          <nav className={styles.nav}>
            <a href="#about" className={styles.navLink}>
              À propos
            </a>
            <a href="#projects" className={styles.navLink}>
              Projets
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </nav>

          <a href="#cv" className={styles.cvButton}>
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            CV
          </a>
        </div>
      </div>
    </header>
  );
};
