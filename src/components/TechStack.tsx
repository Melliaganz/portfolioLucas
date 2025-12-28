import type { Technology } from "../types/navigation";
import styles from "../styles/TechStack.module.css";
import { IconAndroidStudio, IconAppStore, IconCss, IconGradle, IconJavaScript, IconKotlin, IconMongoDb, IconMySQL, IconNodeJs, IconReact, IconReactNative, IconTypeScript } from "../utils/icons.module";

const technologies: Technology[] = [
  { name: "React.js", icon: <IconReact /> },
  { name: "TypeScript", icon: <IconTypeScript /> },
  { name: "React Native", icon: <IconReactNative/> },
  { name: "CSS3", icon: <IconCss /> },
  { name: "Android Studio", icon: <IconAndroidStudio /> },
  { name: "XCode", icon: <IconAppStore /> },
  { name: "Gradle", icon: <IconGradle /> },
  { name: "Javascript", icon: <IconJavaScript/>},
  { name: "MongoDB", icon: <IconMongoDb /> },
  { name: "Kotlin", icon: <IconKotlin/> },
  { name: "MySQL", icon: <IconMySQL /> },
  { name: "NodeJs", icon: <IconNodeJs /> },
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
