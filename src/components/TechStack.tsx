import styles from "../styles/TechStack.module.css";
import { technologies } from "../utils/techData";
import { useDragScroll } from "../utils/useDragScroll";
import { useLang } from "../i18n/LanguageContext";

export const TechStack = () => {
  const { scrollRef, isDragging, handlers } = useDragScroll();
  const { t } = useLang();

  return (
    <section className={styles.stackContainer}>
      <h2 className={styles.title}>{t.tech.title}</h2>

      <div
        className={`${styles.marqueeContainer} ${isDragging ? styles.isDragging : ""}`}
        ref={scrollRef}
        {...handlers}
      >
        <div className={styles.marqueeTrack}>
          {technologies.map((tech) => (
            <div key={tech.name} className={styles.badge}>
              <span className={styles.icon} aria-hidden="true">{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
          <div inert className={styles.duplicateWrapper}>
            {technologies.map((tech) => (
              <div key={`dup-${tech.name}`} className={styles.badge}>
                <span className={styles.icon}>{tech.icon}</span>
                <span className={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
