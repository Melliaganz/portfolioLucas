import { useRef, useState } from "react";
import styles from "../styles/TechStack.module.css";
import { technologies } from "../utils/techData";

export const TechStack = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragInfo = useRef({
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
    rafId: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    dragInfo.current = {
      isDragging: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
      rafId: 0,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo.current.isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    cancelAnimationFrame(dragInfo.current.rafId);
    dragInfo.current.rafId = requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const walk = (x - dragInfo.current.startX) * 1.5;
      scrollRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    dragInfo.current = {
      isDragging: true,
      startX: e.touches[0].pageX - scrollRef.current.offsetLeft,
      scrollLeft: scrollRef.current.scrollLeft,
      rafId: 0,
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragInfo.current.isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    cancelAnimationFrame(dragInfo.current.rafId);
    dragInfo.current.rafId = requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const walk = (x - dragInfo.current.startX) * 1.5;
      scrollRef.current.scrollLeft = dragInfo.current.scrollLeft - walk;
    });
  };

  const stopDragging = () => {
    cancelAnimationFrame(dragInfo.current.rafId);
    dragInfo.current.isDragging = false;
    setIsDragging(false);
  };

  return (
    <section className={styles.stackContainer}>
      <h2 className={styles.title}>Stack technique principale</h2>

      <div
        className={`${styles.marqueeContainer} ${isDragging ? styles.isDragging : ""}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDragging}
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
