import { TechStack } from "../components/TechStack";
import { techNames } from "../utils/techData";
import styles from "../styles/Hero.module.css";
import { useLang } from "../i18n/LanguageContext";

const displayedSkills = techNames
  .slice(0, 6)
  .map((skill) => `'${skill}'`)
  .join(", ");

export const Hero = () => {
  const { t } = useLang();

  return (
    <section id="about" className={styles.hero}>
      <div className={styles.haloPrimary} />

      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>{t.hero.available}</span>
          </div>

          <h1 className={styles.title}>
            {t.hero.titleLead} <br />
            <span className={styles.gradientText}>{t.hero.react}</span>
            <span className={styles.noWrap}>
              {" "}& <span className={styles.gradientText}>{t.hero.mobile}</span>
            </span>
          </h1>

          <p className={styles.description}>{t.hero.description}</p>

          <TechStack />

          <div className={styles.buttonGroup}>
            <a href="#projects" className={styles.btnPrimary}>
              {t.hero.viewProjects}
            </a>

            <a href="#contact" className={styles.btnSecondary}>
              {t.hero.contactMe}
            </a>
          </div>
        </div>

        <div className={styles.visualWrapper}>
          <div className={styles.cardContent}>
            <div className={styles.skeletonGroup}>
              <div className={styles.skeletonTitle} />
              <div className={`${styles.skeletonLine} ${styles.w60}`} />
              <div className={`${styles.skeletonLine} ${styles.w50}`} />
              <div className={`${styles.skeletonLine} ${styles.w80}`} />
            </div>

            <div className={styles.editor}>
              <div className={styles.dots}>
                <div className={`${styles.dot} ${styles.dotRed}`} />
                <div className={`${styles.dot} ${styles.dotYellow}`} />
                <div className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.codeLine}>
                <span className={styles.purple}>const</span>{" "}
                <span className={styles.blue}>Developer</span> = {"{"}
              </div>
              <div className={`${styles.codeLine} ${styles.indent}`}>
                <span className={styles.white}>name:</span> <span className={styles.green}>'Lengrand Lucas'</span>,
              </div>
              <div className={`${styles.codeLine} ${styles.indent}`}>
                <span className={styles.white}>skills:</span> [<span className={styles.green}>{displayedSkills}</span>],
              </div>
              <div className={`${styles.codeLine} ${styles.indent}`}>
                <span className={styles.white}>status:</span> <span className={styles.green}>'Open to work'</span>
              </div>
              <div className={styles.codeLine}>{"};"}</div>
            </div>
            
            <div className={styles.profileImageWrapper}>
              <img
                src="/lucasTravail.webp"
                alt="Lucas Lengrand"
                className={styles.profileImage}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width="800"
                height="450"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
