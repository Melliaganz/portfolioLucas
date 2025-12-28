import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { experiences } from "../data/parcours";
import styles from "../styles/Parcours.module.css";
import { IconParchemin } from "../utils/icons.module";

export const Parcours = () => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});
  const [hasOverflow, setHasOverflow] = useState<Record<string, boolean>>({});
  const descriptionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleExpand = (id: string) => {
    setIsExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const verifyElementOverflow = useCallback((id: string) => {
    const element = descriptionRefs.current[id];
    if (element) {
      const overflow = element.scrollHeight > element.clientHeight + 2;
      setHasOverflow((prev) =>
        prev[id] !== overflow ? { ...prev, [id]: overflow } : prev
      );
    }
  }, []);

  useLayoutEffect(() => {
    const observers: ResizeObserver[] = [];

    experiences.forEach((exp) => {
      const element = descriptionRefs.current[exp.id];
      if (element) {
        const observer = new ResizeObserver(() => {
          if (!isExpanded[exp.id]) {
            verifyElementOverflow(exp.id);
          }
        });
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [verifyElementOverflow, isExpanded]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerIconBox}>
          <span className={`material-symbols-outlined ${styles.headerIcon}`}>
            <IconParchemin />
          </span>
        </div>
        <h2 className={styles.titleMain}>Mon Parcours</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.timelineGrid}>
          {experiences.map((exp, index) => {
            const isLast = index === experiences.length - 1;
            const expanded = isExpanded[exp.id];
            const canExpand = hasOverflow[exp.id];

            return (
              <div key={exp.id} className={styles.experienceWrapper}>
                <div className={styles.dateColumn}>
                  <span
                    className={`${styles.date} ${
                      exp.isActive ? styles.dateActive : ""
                    }`}
                  >
                    {exp.date}
                  </span>
                </div>

                <div className={styles.timelineLeft}>
                  {index !== 0 && <div className={styles.lineTop} />}
                  <div
                    className={`${styles.stepIcon} ${
                      exp.isActive ? styles.activeIcon : ""
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${styles.iconSmall}`}
                    >
                      {exp.icon}
                    </span>
                  </div>
                  {!isLast && <div className={styles.line} />}
                </div>

                <div
                  className={`${styles.stepContent} ${
                    isLast ? styles.lastStep : ""
                  }`}
                >
                  <h3 className={styles.jobTitle}>{exp.title}</h3>
                  <p className={styles.company}>
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                    {" • "}
                    {exp.location}
                  </p>

                  <div
                    ref={(el) => {
                      descriptionRefs.current[exp.id] = el;
                    }}
                    className={
                      expanded
                        ? styles.descriptionFull
                        : styles.descriptionCollapsed
                    }
                  >
                    <div className={styles.description}>
                      {exp.intro && (
                        <p className={styles.introText}>{exp.intro}</p>
                      )}
                      {exp.isList && Array.isArray(exp.description) ? (
                        <ul className={styles.list}>
                          {exp.description.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.textBlock}>{exp.description}</p>
                      )}
                    </div>
                  </div>

                  {canExpand && (
                    <button
                      className={styles.readMoreBtn}
                      onClick={() => toggleExpand(exp.id)}
                    >
                      {expanded ? "Voir moins" : "Voir plus"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
