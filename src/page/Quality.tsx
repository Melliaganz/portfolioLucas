import styles from "../styles/Quality.module.css";
import {
  IconPerf,
  IconSecurity,
  IconA11y,
  IconReliability,
  IconGithub,
} from "../utils/icons.module";

const REPO_URL = "https://github.com/Melliaganz/portfolioLucas";

const pillars = [
  {
    icon: <IconPerf />,
    title: "Performance",
    text: "Code-splitting, préchargement des chunks, images WebP en lazy et CSS minifié. Bundle d'entrée ~30 ko gzip pour un premier rendu quasi instantané.",
  },
  {
    icon: <IconSecurity />,
    title: "Sécurité",
    text: "CSP stricte (nonce par requête + strict-dynamic), Trusted Types et en-têtes durcis (HSTS, anti-clickjacking) servis via Edge Middleware.",
  },
  {
    icon: <IconA11y />,
    title: "Accessibilité",
    text: "Navigation clavier complète, focus trap sur les modales, respect de prefers-reduced-motion, attributs ARIA et contrastes soignés.",
  },
  {
    icon: <IconReliability />,
    title: "Fiabilité",
    text: "TypeScript strict, suite de tests automatisés (Vitest) et intégration continue (lint + tests + build) déclenchée à chaque push.",
  },
];

export const Quality = () => (
  <section id="approche" className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.accentBar} />
        <h2 className={styles.title}>Exigence technique</h2>
        <p className={styles.subtitle}>
          La qualité ne se voit pas toujours, mais elle se mesure. Ce site en est
          la démonstration : voici comment je travaille.
        </p>
      </header>

      <div className={styles.grid}>
        {pillars.map((p) => (
          <article key={p.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              {p.icon}
            </span>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardText}>{p.text}</p>
          </article>
        ))}
      </div>

      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.repoLink}
      >
        <IconGithub aria-hidden="true" />
        <span>Voir le code source de ce site</span>
      </a>
    </div>
  </section>
);
