import { useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Gestion du début du clic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    // On enregistre la position de départ de la souris et du scroll actuel
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  // Gestion du mouvement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicateur pour la vitesse de scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div className={styles.stackContainer}>
      <p className={styles.title}>Stack technique principale</p>
      
      <div 
        className={`${styles.marqueeContainer} ${isDragging ? styles.isDragging : ""}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div className={styles.marqueeTrack}>
          {/* On boucle 3 fois au lieu de 2 pour s'assurer que l'espace est toujours rempli lors du drag manuel */}
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <div key={index} className={styles.badge}>
              <span className={styles.icon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
