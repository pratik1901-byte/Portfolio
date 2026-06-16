'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './AudioPlayer.module.css';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const tryPlayAudio = () => {
      if (!audioRef.current) return;
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          sessionStorage.setItem('musicPlaying', 'true');
        })
        .catch(() => {
          setIsPlaying(false);
          // Browser blocked autoplay, wait for ANY interaction
          const resumeAudio = () => {
            if (audioRef.current && sessionStorage.getItem('musicPlaying') !== 'false') {
              audioRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                  sessionStorage.setItem('musicPlaying', 'true');
                })
                .catch(() => {});
            }
            document.removeEventListener('click', resumeAudio);
            document.removeEventListener('touchstart', resumeAudio);
            document.removeEventListener('keydown', resumeAudio);
          };
          document.addEventListener('click', resumeAudio);
          document.addEventListener('touchstart', resumeAudio, { passive: true });
          document.addEventListener('keydown', resumeAudio);
        });
    };

    const wantsToPlay = sessionStorage.getItem('musicPlaying') !== 'false';
    const preloaderShown = sessionStorage.getItem('preloaderShown');
    
    // If returning visitor, try playing immediately (will likely bind interaction listeners)
    if (preloaderShown && wantsToPlay) {
      tryPlayAudio();
    }

    const handleStartMusic = () => {
       tryPlayAudio();
    };
    
    window.addEventListener('startMusic', handleStartMusic);
    return () => window.removeEventListener('startMusic', handleStartMusic);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      sessionStorage.setItem('musicPlaying', 'false');
    } else {
      audioRef.current.play();
      sessionStorage.setItem('musicPlaying', 'true');
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioPlayerContainer}>
      <audio ref={audioRef} loop src="/music.mp3" />
      <button 
        className={`${styles.musicToggle} ${isPlaying ? styles.playing : ''}`} 
        onClick={togglePlay}
        aria-label="Toggle background music"
      >
        <span className={styles.icon}>
          <i className={isPlaying ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"}></i>
        </span>
        <div className={styles.ripple}></div>
      </button>
    </div>
  );
}
