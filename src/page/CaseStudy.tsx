import styles from "../styles/CaseStudy.module.css";
import { getAppStoreLink } from "../utils/smartLink";
import appIcon from "../assets/images/impotsAppIcon.webp";
import { useLang } from "../i18n/LanguageContext";

const STACK = [
  "React Native",
  "Kotlin",
  "Gradle",
  "Android Studio",
  "Xcode",
  "Firebase",
];

export const CaseStudy = () => {
  const { t } = useLang();

  const blocks: { title: string; text?: string; items?: string[] }[] = [
    { title: t.caseStudy.contexteTitle, text: t.caseStudy.contexteText },
    { title: t.caseStudy.defisTitle, text: t.caseStudy.defisText },
    { title: t.caseStudy.roleTitle, items: t.caseStudy.roleItems },
    { title: t.caseStudy.impactTitle, text: t.caseStudy.impactText },
  ];

  return (
    <section id="etude-de-cas" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.accentBar} />
          <h2 className={styles.title}>{t.caseStudy.title}</h2>
          <p className={styles.subtitle}>{t.caseStudy.subtitle}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.blocks}>
            {blocks.map((b) => (
              <article key={b.title} className={styles.block}>
                <h3 className={styles.blockTitle}>{b.title}</h3>
                {b.text && <p className={styles.blockText}>{b.text}</p>}
                {b.items && (
                  <ul className={styles.list}>
                    {b.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div className={styles.visual}>
            <img
              src={appIcon}
              alt={t.caseStudy.imageAlt}
              className={styles.appImage}
              width="240"
              height="240"
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.stack}>
            {STACK.map((tech) => (
              <span key={tech} className={styles.chip}>
                {tech}
              </span>
            ))}
          </div>
          <a
            href={getAppStoreLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t.caseStudy.viewApp}
          </a>
        </div>
      </div>
    </section>
  );
};
