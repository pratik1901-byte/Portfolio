'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData, staticUrl } from '../../lib/api';
import styles from './page.module.css';

export default function About() {
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
          <span className="eyebrow">About Me</span>
          <h1 className="page-title">The Story Behind<br/>the Code</h1>
        </div>
      </section>

      <section className={`section ${styles.aboutMain}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutAvatarCol}>
            <div className={styles.avatarCard}>
              <div className={styles.avatarCircle}>
                <img src={staticUrl(data.profile_photo)} alt={data.name} className={styles.avatarPhoto} />
              </div>
              <div className={styles.avatarInfo}>
                <h3>{data.name}</h3>
                <p>{data.title}</p>
                <span className={styles.statusBadge}><span className={styles.statusDot}></span> {data.availability}</span>
              </div>
              <div className={styles.avatarLinks}>
                <a href={`mailto:${data.email}`} className={styles.iconLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email Me
                </a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" className={styles.iconLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
                <a href={data.github} target="_blank" rel="noreferrer" className={styles.iconLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className={styles.aboutTextCol}>
            <h2>Engineer at heart,<br/>data analyst by passion.</h2>
            <p className={styles.lead}>{data.about}</p>
            <p>My journey started with curiosity — wondering what patterns live inside messy datasets. That led me to Python, to SQL, to machine learning, and eventually to building systems that transform raw data into decisions that matter.</p>
            <p>Alongside that technical path, I spent {data.aiesec_years} formative year{data.aiesec_years !== 1 ? 's' : ''} in AIESEC — managing international stakeholders, leading recruitment drives, and sitting on the Managerial Board of Bengaluru's chapter. That experience shaped how I think about communication, strategy, and working with people from across the world.</p>
            <p>I believe the best data scientists aren't just coders — they're translators between the language of data and the language of business. That's the kind of professional I'm building myself to be.</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.educationSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Education</span>
            <h2>Academic Foundation</h2>
          </div>
          <div className={styles.eduCard}>
            <div className={styles.eduIcon}>🎓</div>
            <div className={styles.eduContent}>
              <h3>{data.education?.degree}</h3>
              <h4>{data.education?.field}</h4>
              <p>{data.education?.focus}</p>
            </div>
            <div className={styles.eduBadge}>B.E.</div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">My Approach</span>
            <h2>What Drives Me</h2>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>01</div>
              <h3>Data-First Thinking</h3>
              <p>Every problem deserves an evidence-based approach. I let data guide decisions, not assumptions.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>02</div>
              <h3>Cross-Domain Fluency</h3>
              <p>Technical skills meet leadership experience — I operate at the intersection of data and people.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>03</div>
              <h3>Continuous Growth</h3>
              <p>Whether it's a new Python library or a new management skill, I treat every day as a learning opportunity.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueNum}>04</div>
              <h3>Meaningful Impact</h3>
              <p>I care about building things that genuinely help — data dashboards, teams, partnerships, systems.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
