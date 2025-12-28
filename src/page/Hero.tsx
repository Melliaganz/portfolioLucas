import { TechStack } from "../components/TechStack";
import styles from "../styles/Hero.module.css";

export const Hero = () => {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.haloPrimary} />

      <div className={styles.container}>
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeText}>Disponible pour freelance</span>
          </div>

          <h1 className={styles.title}>
            Développeur <br />
            <span className={styles.gradientText}>React</span> &{" "}
            <span className={styles.gradientText}>Mobile</span>
          </h1>

          <p className={styles.description}>
            Je conçois des expériences web et mobiles performantes, accessibles 
            et modernes. Expert en écosystème JavaScript, je transforme vos 
            idées en produits digitaux robustes.
          </p>

          <TechStack />

          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary}>Voir mes projets</button>
            <button className={styles.btnSecondary}>Me contacter</button>
          </div>
        </div>

        <div className={styles.visualWrapper}>
          <div className={styles.cardGradient} />
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
                name: <span className={styles.green}>'John Doe'</span>,
              </div>
              <div className={`${styles.codeLine} ${styles.indent}`}>
                skills: [<span className={styles.green}>'React'</span>,{" "}
                <span className={styles.green}>'TS'</span>],
              </div>
              <div className={`${styles.codeLine} ${styles.indent}`}>
                status: <span className={styles.green}>'Open to work'</span>
              </div>
              <div className={styles.codeLine}>{"};"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
