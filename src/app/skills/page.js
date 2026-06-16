'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData } from '../../lib/api';
import styles from './page.module.css';

export default function Skills() {
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

  return (
    <main>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Expertise</span>
          <h1 className="page-title">Skills & Abilities</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.skillsLayout}`}>
          <div className={styles.skillsTech}>
            <h2>Technical Skills</h2>
            <div className={styles.skillBars}>
              {data.skills.technical.map((skill, idx) => (
                <div key={idx} className={styles.skillBarItem}>
                  <div className={styles.skillBarLabel}>
                    <span>{skill.name}</span>
                    <span className={styles.skillPct}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBarTrack}>
                    <div className={styles.skillBarFill} style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.skillsSoft}>
            <h2>Soft Skills</h2>
            <div className={styles.softGrid}>
              {data.skills.soft.map((skill, idx) => (
                <div key={idx} className={styles.softCard}>
                  <div className={styles.softCardInner}>{skill}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
