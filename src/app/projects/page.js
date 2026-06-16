'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData } from '../../lib/api';
import styles from './page.module.css';

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <main className={styles.loadingContainer}><div className="spinner"></div></main>;
  if (!data) return <main>Failed to load data</main>;

  const getProjectIcon = (title) => {
    if (title.includes('Data Science')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      );
    }
    if (title.includes('Productivity')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    }
    if (title.includes('Analytics')) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M18 8l-4 4-2-2-4 4" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  };

  return (
    <main>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Work</span>
          <h1 className="page-title">Featured Projects</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.projectsGrid}`}>
          {data.projects.map((project, idx) => (
            <div key={idx} className={styles.projectCard}>
              <div className={styles.pfcTop}>
                <span className={styles.projectIcon}>
                  {getProjectIcon(project.title)}
                </span>
                <span className={`${styles.projectStatus} ${styles['status' + project.status.replace(/\s+/g, '')]}`}>
                  {project.status}
                </span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className={styles.projectTags}>
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
