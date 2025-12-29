import type { Technology } from "../types/navigation";
import styles from "../styles/TechStack.module.css";
import { techNames } from "../utils/techData";
import { IconAndroidStudio, IconAppStore, IconCss, IconGradle, IconJavaScript, IconKotlin, IconMongoDb, IconMySQL, IconNodeJs, IconReact, IconReactNative, IconTypeScript } from "../utils/icons.module";

const technologies: Technology[] = [
  { name: techNames[0], icon: <IconReact /> },
  { name: techNames[1], icon: <IconTypeScript /> },
  { name: techNames[2], icon: <IconReactNative/> },
  { name: techNames[3], icon: <IconCss /> },
  { name: techNames[4], icon: <IconAndroidStudio /> },
  { name: techNames[5], icon: <IconAppStore /> },
  { name: techNames[6], icon: <IconGradle /> },
  { name: techNames[7], icon: <IconJavaScript/>},
  { name: techNames[8], icon: <IconMongoDb /> },
  { name: techNames[9], icon: <IconKotlin/> },
  { name: techNames[10], icon: <IconMySQL /> },
  { name: techNames[11], icon: <IconNodeJs /> },
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
