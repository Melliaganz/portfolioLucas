import type { Technology } from "../types/navigation";
import styles from "../styles/TechStack.module.css";
import { icons } from "../utils/icons.module";

const technologies: Technology[] = [
  { name: "React.js", icon: icons.react },
  { name: "TypeScript", icon: icons.typeScript },
  { name: "React Native", icon: icons.reactNative },
  { name: "CSS3", icon: icons.css },
  { name: "Android Studio", icon: icons.androidStudio },
  { name: "XCode", icon: icons.appStore },
  { name: "Gradle", icon: icons.gradle },
  { name: "Javascript", icon: icons.javaScript },
  { name: "MongoDB", icon: icons.mongoDb },
  { name: "Kotlin", icon: icons.kotlin },
  { name: "MySQL", icon: icons.mySQL },
  { name: "NodeJs", icon: icons.nodeJs },
];

export const TechStack = () => {
  return (
    <div className={styles.stackContainer}>
      <p className={styles.title}>Stack technique principale</p>
      
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {technologies.map((tech, index) => (
            <div key={`first-${index}`} className={styles.badge}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
          {technologies.map((tech, index) => (
            <div key={`second-${index}`} className={styles.badge}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const techNames = [
  "React.js", "TypeScript", "React Native", "CSS3", 
  "Android Studio", "XCode", "Gradle", "Javascript", 
  "MongoDB", "Kotlin", "MySQL", "NodeJs"
];
