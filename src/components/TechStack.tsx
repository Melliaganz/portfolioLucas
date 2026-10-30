import styles from "../styles/TechStack.module.css";
import { technologies } from "../utils/techData";
import { useLang } from "../i18n/LanguageContext";

// Grille statique de logos. Le nom de chaque techno reste dans le DOM (lu par
// les lecteurs d'écran) : affiché en info-bulle au survol sur les appareils à
// pointeur, et en permanence à côté du logo sur les écrans tactiles.
export const TechStack = () => {
  const { t } = useLang();

  return (
    <section className={styles.stackContainer}>
      <h2 className={styles.title}>{t.tech.title}</h2>

      <ul className={styles.grid}>
        {technologies.map((tech) => (
          <li key={tech.name} className={styles.badge}>
            <span className={styles.icon} aria-hidden="true">{tech.icon}</span>
            <span className={styles.techName}>{tech.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
