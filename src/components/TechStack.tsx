import type { Technology } from "../types/navigation";
import styles from "../styles/TechStack.module.css";

const technologies: Technology[] = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'React Native', icon: '📱' },
  { name: 'Tailwind', icon: 'CSS' },
];

export const TechStack = () => {
  return (
    <div className={styles.stackContainer}>
      <p className={styles.title}>
        Stack technique principale
      </p>
      <div className={styles.grid}>
        {technologies.map((tech) => (
          <div key={tech.name} className={styles.badge}>
             <span className={styles.icon}>
              {tech.icon}
            </span>
            <span className={styles.techName}>
              {tech.name}
            </span>
        
          </div>
        ))}
      </div>
    </div>
  );
};
