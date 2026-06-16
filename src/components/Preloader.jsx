'use client';

import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';
import { staticUrl, fetchPortfolioData } from '../lib/api';

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
    if (hasSeenPreloader) {
      setShow(false);
    } else {
      fetchPortfolioData().then(setData).catch(() => {});
    }
  }, []);

  const handleEnter = () => {
    setFading(true);
    sessionStorage.setItem('preloaderShown', 'true');
    // Dispatch an event so AudioPlayer knows it can play now!
    window.dispatchEvent(new Event('startMusic'));
    
    // Remove from DOM after fade out
    setTimeout(() => {
      setShow(false);
    }, 800);
  };

  if (!show) return null;

  return (
    <div className={`${styles.preloaderOverlay} ${fading ? styles.fadeOut : ''}`} onClick={handleEnter}>
      <div className={styles.preloaderContent}>
         {data?.signature_media ? (
           data.signature_media.endsWith('.mp4') || data.signature_media.endsWith('.webm') ? (
             <video src={staticUrl(data.signature_media)} muted playsInline autoPlay className={styles.signature} />
           ) : (
             <img src={staticUrl(data.signature_media)} alt="Signature" className={styles.signature} />
           )
         ) : (
           <div className={styles.defaultSignature}>
             &lt;PG/&gt;
           </div>
         )}
         <p className={styles.preloaderEnter}>[ Click anywhere to enter ]</p>
      </div>
    </div>
  );
}
