'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData } from '../lib/api';
import styles from './Footer.module.css';

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPortfolioData()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <span className={styles.footerLogo}>&lt;PG/&gt;</span>
          <p>Data Scientist · Bengaluru, India</p>
        </div>
        <div className={styles.footerLinks}>
          <a href={`mailto:${data.email}`}>Email</a>
          <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={data.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className={styles.footerRight}>
          <p>Built with Next.js & Flask</p>
          <p className={styles.footerYear}>© {new Date().getFullYear()} Pratik G</p>
        </div>
      </div>
    </footer>
  );
}
