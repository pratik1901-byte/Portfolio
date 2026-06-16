'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.willChange = 'transform';
    ring.style.willChange = 'transform';

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let hovered = false;
    const LERP = 0.18;
    let animationFrameId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onMouseLeave = () => {
      mx = -200; my = -200;
      rx = -200; ry = -200;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const tick = () => {
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;

      if (hovered) {
        ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px) scale(1.7)`;
      } else {
        ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px) scale(1)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .project-card, .mini-card, .cert-card, .value-card')) {
        hovered = true;
        ring.style.opacity = '0.3';
        dot.style.opacity = '0';
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .project-card, .mini-card, .cert-card, .value-card')) {
        hovered = false;
        ring.style.opacity = '0.55';
        dot.style.opacity = '1';
      }
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className={styles.cursorDot} ref={dotRef}></div>
      <div className={styles.cursorRing} ref={ringRef}></div>
    </>
  );
}
