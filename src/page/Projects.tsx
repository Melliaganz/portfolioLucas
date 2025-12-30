import React, { useState, useMemo, useRef, useCallback } from "react";
import styles from "../styles/Projects.module.css";
import { projectsData } from "../data/projectsData";

// --- Constantes et Utilitaires ---
const STORES = {
  IOS: "https://apps.apple.com/fr/app/impots-gouv/id505488770",
  ANDROID: "https://play.google.com/store/apps/details?id=fr.gouv.finances.smartphone.android",
  DESKTOP: "https://www.impots.gouv.fr",
};

const getSmartLink = (url: string) => {
  if (url !== "dgfip_smart_link") return url;
  if (typeof navigator === "undefined") return url;
  
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return STORES.IOS;
  if (/android/i.test(ua)) return STORES.ANDROID;
  return STORES.DESKTOP;
};

// --- Sous-composant ProjectCard ---
const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <article className={styles.card}>
    <div className={styles.imageWrapper}>
      <img 
        src={project.image} 
        alt={project.title} 
        className={styles.image} 
        loading="lazy" 
      />
      <span className={styles.yearBadge}>{project.year}</span>
    </div>
    <div className={styles.content}>
      <div className={styles.cardHeader}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <div className={styles.links}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              Code
            </a>
          )}
          {project.liveUrl && (
            <a href={getSmartLink(project.liveUrl)} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              Live
            </a>
          )}
        </div>
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.tags}>
        {project.tags.map((tag: string) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  </article>
);

// --- Composant Principal ---
export const Projects = () => {
  const [filter, setFilter] = useState("Tout");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // État de drag
  const [isDragging, setIsDragging] = useState(false);
  
  // Utilisation d'un ref pour stocker les positions sans déclencher de render
  const dragContext = useRef({
    startX: 0,
    scrollLeft: 0,
    rafId: 0
  });

  const categories = useMemo(() => {
    const allTags = projectsData.flatMap((p) => [p.category, ...p.tags]);
    return ["Tout", ...Array.from(new Set(allTags)).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "Tout") return projectsData;
    return projectsData.filter((p) => p.category === filter || p.tags.includes(filter));
  }, [filter]);

  const shouldScroll = filteredProjects.length > 3;

  const displayProjects = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    return shouldScroll ? [...filteredProjects, ...filteredProjects, ...filteredProjects] : filteredProjects;
  }, [filteredProjects, shouldScroll]);

  // --- Handlers de Drag ---
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!shouldScroll || !scrollRef.current) return;
    
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    
    dragContext.current.startX = clientX - scrollRef.current.offsetLeft;
    dragContext.current.scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    
    // Annule le frame précédent s'il n'a pas encore été exécuté
    cancelAnimationFrame(dragContext.current.rafId);

    dragContext.current.rafId = requestAnimationFrame(() => {
      if (!scrollRef.current) return;
      const x = clientX - scrollRef.current.offsetLeft;
      const walk = (x - dragContext.current.startX) * 1.5;
      scrollRef.current.scrollLeft = dragContext.current.scrollLeft - walk;
    });
  }, [isDragging]);

  const handleStop = () => {
    setIsDragging(false);
    cancelAnimationFrame(dragContext.current.rafId);
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mes Projets</h2>
          <p className={styles.subtitle}>
            {shouldScroll
              ? "Découvrez mes projets (cliquez et glissez pour explorer)."
              : "Mes projets pour cette catégorie."}
          </p>
        </div>

        <nav className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div
          ref={scrollRef}
          className={`
            ${shouldScroll ? styles.marqueeContainer : styles.staticGrid} 
            ${isDragging ? styles.isDragging : ""}
            ${shouldScroll ? styles.canScroll : ""}
          `}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleStop}
          onMouseLeave={handleStop}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleStop}
        >
          <div className={shouldScroll ? styles.marqueeTrack : styles.staticTrack}>
            {displayProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
