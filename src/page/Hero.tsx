import { TechStack } from "../components/TechStack";
import styles from "../styles/Hero.module.css";

export const Hero = () => {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Disponible pour freelance
          </div>

          <h1 className={styles.title}>
            Développeur <br />
            <span className={styles.gradientText}>React & Mobile</span>
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '1.125rem', maxWidth: '500px', lineHeight: '1.6' }}>
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

        {/* Côté Droit : Snippet de code */}
        <div className={styles.codeWrapper}>
          <div className={styles.halo} />
          <div className={styles.codeCard}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            </div>
            <pre style={{ margin: 0, fontFamily: 'monospace', color: '#60a5fa' }}>
              <code>
                <span style={{ color: '#c084fc' }}>const</span> Developer = {'{'}{'\n'}
                &nbsp;&nbsp;name: <span style={{ color: '#4ade80' }}>'John Doe'</span>,{'\n'}
                &nbsp;&nbsp;skills: [<span style={{ color: '#4ade80' }}>'React'</span>, <span style={{ color: '#4ade80' }}>'TS'</span>],{'\n'}
                &nbsp;&nbsp;status: <span style={{ color: '#4ade80' }}>'Ready'</span>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
