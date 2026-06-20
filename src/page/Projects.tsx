import { useState, useMemo } from "react";
import styles from "../styles/Projects.module.css";
import { projectsData, type Project } from "../data/projectsData";
import { getSmartLink } from "../utils/smartLink";
import { useDragScroll } from "../utils/useDragScroll";

const TOP_TAGS = ["React", "React Native", "TypeScript", "Node.js", "JavaScript"];

const ProjectCard = ({ project }: { project: Project }) => (
  <article className={styles.card}>
    <img 
      src={project.image} 
      alt={project.title} 
      className={styles.image} 
      loading="lazy" 
    />
    <span className={styles.yearBadge}>{project.year}</span>
    
    <div className={styles.content}>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      
      <nav className={styles.links}>
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.iconLink}
            aria-label={`Voir le code source de ${project.title} sur GitHub`}
          >
            Code
          </a>
        )}
        {project.liveUrl && (
          <a 
            href={getSmartLink(project.liveUrl)}
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.iconLink}
            aria-label={`Voir la démo en direct de ${project.title}`}
          >
            Live
          </a>
        )}
      </nav>

      <p className={styles.description}>{project.description}</p>
      
      <div className={styles.tags}>
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  </article>
);

export const Projects = () => {
  const [filter, setFilter] = useState("Tout");

  const categories = useMemo(() => {
    const relevantTags = projectsData.flatMap(p => p.tags).filter(tag => TOP_TAGS.includes(tag));
    const allCategories = projectsData.map(p => p.category);
    const combined = Array.from(new Set([...allCategories, ...relevantTags]));
    return ["Tout", ...combined.sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "Tout") return projectsData;
    return projectsData.filter((p) => p.category === filter || p.tags.includes(filter));
  }, [filter]);

  const shouldScroll = filteredProjects.length > 3;

  const { scrollRef, isDragging, handlers } = useDragScroll({ enabled: shouldScroll });

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.innerContainer}>
      <header className={styles.header}>
        <h2 className={styles.title}>Mes Projets</h2>
        <p className={styles.subtitle}>
          {shouldScroll
            ? "Découvrez mes projets (glissez pour explorer)."
            : "Mes projets."}
        </p>
      </header>

      <nav className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div
        ref={scrollRef}
        className={[
          shouldScroll ? styles.marqueeContainer : styles.staticGrid,
          isDragging ? styles.isDragging : "",
          shouldScroll ? styles.canScroll : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onFocusCapture={(e) => e.stopPropagation()}
        {...handlers}
      >
        <div className={shouldScroll ? styles.marqueeTrack : styles.staticTrack}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {shouldScroll && (
            <div inert className={styles.duplicateWrapper}>
              {filteredProjects.map((project) => (
                <ProjectCard key={`dup-${project.id}`} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};
