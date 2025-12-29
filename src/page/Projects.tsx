import { useState, useMemo } from "react";
import styles from "../styles/Projects.module.css";
import { projectsData } from "../data/projectsData";

const IOS_STORE = "https://apps.apple.com/fr/app/impots-gouv/id505488770";
const ANDROID_STORE =
  "https://play.google.com/store/apps/details?id=fr.gouv.finances.smartphone.android";
const DESKTOP_SITE = "https://www.impots.gouv.fr";

export const Projects = () => {
  const [filter, setFilter] = useState("Tout");
  const categories = useMemo(() => {
    const allCategories = projectsData.map((p) => p.category);
    const allTags = projectsData.flatMap((p) => p.tags);

    const uniqueFilters = Array.from(
      new Set([...allCategories, ...allTags])
    ).sort();

    return ["Tout", ...uniqueFilters];
  }, []);

  const filteredProjects = useMemo(() => {
    if (filter === "Tout") return projectsData;

    return projectsData.filter(
      (p) => p.category === filter || p.tags.includes(filter)
    );
  }, [filter]);

  const shouldScroll = filteredProjects.length > 3;

  const displayProjects = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    return shouldScroll
      ? [...filteredProjects, ...filteredProjects]
      : filteredProjects;
  }, [filteredProjects, shouldScroll]);

  const handleSmartLink = (url: string) => {
    if (url !== "dgfip_smart_link") return url;

    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return IOS_STORE;
    if (/android/i.test(ua)) return ANDROID_STORE;
    return DESKTOP_SITE;
  };

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Mes Projets</h2>
          <p className={styles.subtitle}>
            {shouldScroll
              ? "Découvrez mes réalisations (survoler pour mettre en pause)."
              : "Mes réalisations pour cette catégorie."}
          </p>
        </div>

        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                filter === cat ? styles.active : ""
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          className={shouldScroll ? styles.marqueeContainer : styles.staticGrid}
        >
          <div
            className={shouldScroll ? styles.marqueeTrack : styles.staticTrack}
          >
            {displayProjects.map((project, index) => (
              <article key={`${project.id}-${index}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.image}
                    loading="lazy"
                    decoding="async"
                    width="auto"
                    height="auto"
                  />
                  <span className={styles.yearBadge}>{project.year}</span>
                </div>

                <div className={styles.content}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.links}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconLink}
                        >
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={handleSmartLink(project.liveUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconLink}
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
