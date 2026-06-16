'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchPortfolioData } from '../../lib/api';
import styles from './page.module.css';

export default function Experience() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef(null);
  const fillRef = useRef(null);
  const trackerRef = useRef(null);

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

  useEffect(() => {
    if (loading || !data) return;

    let ticking = false;
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    const tracker = trackerRef.current;

    if (!timeline || !fill || !tracker) return;

    const updateTimeline = () => {
      const timelineItems = timeline.querySelectorAll(`.${styles.timelineItem}`);
      if (!timelineItems.length) return;

      const firstDot = timelineItems[0].querySelector(`.${styles.timelineDot}`);
      const lastDot = timelineItems[timelineItems.length - 1].querySelector(`.${styles.timelineDot}`);
      if (!firstDot || !lastDot) return;

      function getOffsetTop(el) {
        let top = 0;
        let curr = el;
        while (curr && curr !== timeline) {
          top += curr.offsetTop || 0;
          curr = curr.offsetParent;
        }
        return top;
      }

      const firstDotOffset = getOffsetTop(firstDot) + firstDot.offsetHeight / 2;
      const lastDotOffset = getOffsetTop(lastDot) + lastDot.offsetHeight / 2;
      const totalRange = lastDotOffset - firstDotOffset;

      const scrollTop = window.scrollY;
      const firstDotRect = firstDot.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();
      const firstDotDocY = firstDotRect.top + scrollTop;
      const lastDotDocY = lastDotRect.top + scrollTop;

      const startScroll = Math.max(0, firstDotDocY - window.innerHeight * 0.75);
      const endScroll = lastDotDocY - window.innerHeight * 0.45;

      const progress = (endScroll - startScroll) > 0 
        ? Math.max(0, Math.min(1, (scrollTop - startScroll) / (endScroll - startScroll))) 
        : 0;

      const fillTop = firstDotOffset;
      const fillHeight = progress * totalRange;

      fill.style.top = fillTop + 'px';
      fill.style.height = fillHeight + 'px';
      tracker.style.top = (fillTop + fillHeight - 9) + 'px';

      const inView = firstDotRect.top < window.innerHeight && lastDotRect.bottom > 0;
      tracker.style.opacity = inView ? '1' : '0';

      const trackerPos = firstDotOffset + fillHeight;

      timelineItems.forEach(item => {
        const dot = item.querySelector(`.${styles.timelineDot}`);
        const card = item.querySelector(`.${styles.timelineCard}`);
        const points = item.querySelectorAll('li');
        if (!dot) return;

        const dotOffset = getOffsetTop(dot) + dot.offsetHeight / 2;
        const passed = trackerPos >= dotOffset - 4;

        if (passed) {
          dot.classList.add(styles.glowDot);
          if (card) card.classList.add(styles.glowCard);
          points.forEach((li, i) => {
            if (!li.classList.contains(styles.slideIn)) {
              setTimeout(() => li.classList.add(styles.slideIn), i * 120);
            }
          });
        } else {
          dot.classList.remove(styles.glowDot);
          if (card) card.classList.remove(styles.glowCard);
          points.forEach(li => li.classList.remove(styles.slideIn));
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTimeline);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    setTimeout(updateTimeline, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [loading, data]);

  if (loading) return <main className={styles.loadingContainer}><div className="spinner"></div></main>;
  if (!data) return <main>Failed to load data</main>;

  return (
    <main>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Journey</span>
          <h1 className="page-title">Experience</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.timelineContainer}`}>
          <div className={styles.timeline} ref={timelineRef}>
            <div className={styles.timelineProgressTrack}></div>
            <div className={styles.timelineProgressFill} ref={fillRef}></div>
            <div className={styles.timelineTracker} ref={trackerRef}></div>
            
            {data.experience.map((exp, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineDot}></div>
                  {idx !== data.experience.length - 1 && <div className={styles.timelineLine}></div>}
                </div>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineHeader}>
                    <div>
                      <span className={styles.expType}>{exp.type}</span>
                      <h3>{exp.role}</h3>
                      <h4>{exp.org}</h4>
                    </div>
                    <div className={styles.expPeriod}>{exp.period}</div>
                  </div>
                  <ul className={styles.expPoints}>
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
