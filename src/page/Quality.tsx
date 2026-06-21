import styles from "../styles/Quality.module.css";
import {
  IconPerf,
  IconSecurity,
  IconA11y,
  IconReliability,
  IconGithub,
} from "../utils/icons.module";
import { useLang } from "../i18n/LanguageContext";
import { useInView } from "../utils/useInView";

const REPO_URL = "https://github.com/Melliaganz/portfolioLucas";

export const Quality = () => {
  const { t } = useLang();
  const { ref: gridRef, inView } = useInView();

  const pillars = [
    { icon: <IconPerf />, title: t.quality.perfTitle, text: t.quality.perfText },
    {
      icon: <IconSecurity />,
      title: t.quality.securityTitle,
      text: t.quality.securityText,
    },
    { icon: <IconA11y />, title: t.quality.a11yTitle, text: t.quality.a11yText },
    {
      icon: <IconReliability />,
      title: t.quality.reliabilityTitle,
      text: t.quality.reliabilityText,
    },
  ];

  return (
    <section id="approche" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.accentBar} />
          <h2 className={styles.title}>{t.quality.title}</h2>
          <p className={styles.subtitle}>{t.quality.subtitle}</p>
        </header>

        <div
          ref={gridRef}
          className={`${styles.grid} ${inView ? styles.revealed : ""}`}
        >
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
          <span>{t.quality.repoLink}</span>
        </a>
      </div>
    </section>
  );
};
