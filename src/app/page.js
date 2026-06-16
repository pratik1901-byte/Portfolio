'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPortfolioData, staticUrl } from '../lib/api';
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioData()
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main className={styles.loadingContainer}><div className={styles.spinner}></div></main>;
  }

  if (!data) return <main>Failed to load data</main>;

  const getProjectIcon = (title) => {
    if (title.includes('Data Science')) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>;
    if (title.includes('Productivity')) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>;
    if (title.includes('Analytics')) return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8" /><path d="M12 17v4" /><path d="M18 8l-4 4-2-2-4 4" /></svg>;
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>;
  };

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span className={styles.tagDot}></span> {data.availability}
            </div>
            <h1 className={styles.heroName}>{data.name}</h1>
            <div className={styles.heroRole}>
              <span>I build with </span>
              <span className={styles.roleHighlight}>Python & Data</span>
            </div>
            <p className={styles.heroTagline}>{data.tagline}</p>
            
            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <span className={styles.statNum}>{data.aiesec_years}</span>
                <span className={styles.statLabel}>Years in<br/>AIESEC</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>{data.skills.technical.length}</span>
                <span className={styles.statLabel}>Tech<br/>Skills</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statCard}>
                <span className={styles.statNum}>40+</span>
                <span className={styles.statLabel}>Countries<br/>Network</span>
              </div>
            </div>

            <div className={styles.heroActions}>
              <Link href="/projects" className="btn btn-primary">
                <span>View My Work</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact" className="btn btn-ghost">Let's Connect</Link>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroPhotoWrap}>
              <div className={styles.heroPhotoGlow}></div>
              <img src={staticUrl(data.profile_photo)} alt={data.name} className={styles.heroPhoto} />
            </div>
            
            <div className={styles.codeWindow}>
              <div className={styles.codeHeader}>
                <span className={`${styles.dot} ${styles.red}`}></span>
                <span className={`${styles.dot} ${styles.yellow}`}></span>
                <span className={`${styles.dot} ${styles.green}`}></span>
                <span className={styles.codeTitle}>pratik_g.py</span>
              </div>
              <div className={styles.codeBody}>
                <div><span className={styles['c-kw']}>class</span> <span className={styles['c-cl']}>DataScientist</span>:</div>
                <div className={styles.indent}><span className={styles['c-fn']}>def</span> <span className={styles['c-fn']}>__init__</span>(self):</div>
                <div className={styles.indent2}>self.name = <span className={styles['c-st']}>"Pratik G"</span></div>
                <div className={styles.indent2}>self.role = <span className={styles['c-st']}>"Data Scientist"</span></div>
                <div className={styles.indent2}>self.location = <span className={styles['c-st']}>"Bengaluru 🇮🇳"</span></div>
                <div className={styles.indent2}>self.skills = [</div>
                <div className={styles.indent3}><span className={styles['c-st']}>"Python"</span>, <span className={styles['c-st']}>"ML"</span>,</div>
                <div className={styles.indent3}><span className={styles['c-st']}>"SQL"</span>, <span className={styles['c-st']}>"Analysis"</span></div>
                <div className={styles.indent2}>]</div>
                <div>&nbsp;</div>
                <div className={styles.indent}><span className={styles['c-fn']}>def</span> <span className={styles['c-fn']}>passion</span>(self):</div>
                <div className={styles.indent2}><span className={styles['c-kw']}>return</span> <span className={styles['c-st']}>"impact through data"</span></div>
                <div>&nbsp;</div>
                <div><span className={styles['c-cm']}># Ready for new challenges 🚀</span></div>
                <div><span className={styles['c-cm']}>| <span className={styles.cursorBlink}>_</span></span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Intro */}
      <section className={styles.quickIntro}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <span className="eyebrow">Who I Am</span>
              <h2>Engineer. Analyst.<br/>Leader.</h2>
              <p className={styles.lead}>I combine a strong foundation in Information Science with hands-on experience in Data Science and {data.aiesec_years} year{data.aiesec_years !== 1 ? 's' : ''} of global leadership through AIESEC — building things that matter at the intersection of technology and people.</p>
              <Link href="/about" className="link-arrow">Read full story &rarr;</Link>
            </div>
            
            <div className={styles.introCards}>
              <div className={styles.miniCard}>
                <div className={styles.miniCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div><strong>B.E. in ISE</strong><p>Information Science & Engineering</p></div>
              </div>
              <div className={styles.miniCard}>
                <div className={styles.miniCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <div><strong>AIESEC Leader</strong><p>Managerial Board Member</p></div>
              </div>
              <div className={styles.miniCard}>
                <div className={styles.miniCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                </div>
                <div><strong>Data Enthusiast</strong><p>Python · ML · SQL</p></div>
              </div>
              <div className={styles.miniCard}>
                <div className={styles.miniCardIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div><strong>Bengaluru, India</strong><p>Open to remote work</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work (Top 3) */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Selected Work</span>
            <h2>What I've Built</h2>
          </div>
          <div className={styles.projectsGrid}>
            {data.projects.slice(0, 3).map((project, idx) => (
              <div key={idx} className={styles.projectCard}>
                <div className={styles.pfcTop}>
                  <span className={styles.projectIcon}>{getProjectIcon(project.title)}</span>
                  <span className={`${styles.projectStatus} ${styles['status' + project.status.replace(/\s+/g, '')]}`}>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, tIdx) => <span key={tIdx} className="tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link href="/projects" className="btn btn-ghost">All Projects &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Skills Strip */}
      <section className={styles.skillsStrip}>
        <div className={styles.stripTrack}>
          {data.skills.technical.map((s, i) => <span key={`t1-${i}`} className={styles.stripItem}>{s.name}</span>)}
          {data.skills.soft.slice(0, 4).map((s, i) => <span key={`s1-${i}`} className={styles.stripItem}>{s}</span>)}
          {data.skills.technical.map((s, i) => <span key={`t2-${i}`} className={styles.stripItem}>{s.name}</span>)}
          {data.skills.soft.slice(0, 4).map((s, i) => <span key={`s2-${i}`} className={styles.stripItem}>{s}</span>)}
        </div>
      </section>

    </main>
  );
}
