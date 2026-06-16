'use client';

import { useEffect, useRef } from 'react';
import styles from './BackgroundCanvas.module.css';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const palettes = [
      { r: 0, g: 212, b: 180 },   // Hero — Cyberpunk Cyan
      { r: 138, g: 43, b: 226 },  // About — Deep Purple
      { r: 255, g: 95, b: 87 },   // Experience — Coral Red
      { r: 254, g: 188, b: 46 },  // Projects — Vibrant Gold
    ];

    const DS_SYMBOLS = [
      '0','1','σ','μ','Σ','∂','∫','π','θ','λ','α','β','Δ',
      'x²','n!','∞','≈','≠','∈','∉','⊂','∪','∩','⊗','⊕',
      'f(x)','∇','η','ε','ρ','ω','φ','ψ','ξ','γ',
      'AI','ML','DL','NLP','CNN','RNN','GAN','LLM',
      'SQL','API','ETL','GPU','TPU','K8s',
      '{…}','[ ]','( )','< >','/>','#','$','→','⇒','≤','≥',
      '0x','++','**','//','!=','==','<<','>>','&&','||',
    ];

    let W, H;
    let mouseX = -9999, mouseY = -9999;
    let targetScrollY = 0, currentScrollY = 0, scrollVelocity = 0;
    let columns, streams = [], nodes = [];
    let animationFrameId;

    class Stream {
      constructor(x) {
        this.x = x;
        this.chars = [];
        this.speed = Math.random() * 1.8 + 0.6;
        this.length = Math.floor(Math.random() * 18) + 8;
        this.fontSize = Math.random() > 0.7 ? 14 : 11;
        this.baseX = x;

        let startY = -Math.random() * H;
        for (let i = 0; i < this.length; i++) {
          this.chars.push({
            symbol: DS_SYMBOLS[Math.floor(Math.random() * DS_SYMBOLS.length)],
            y: startY + i * this.fontSize * 1.3,
            swapTimer: Math.random() * 120,
          });
        }
      }

      update(scrollV) {
        const dx = this.baseX - mouseX;
        const dist = Math.abs(dx);
        if (dist < 200) {
          const push = ((200 - dist) / 200) * 50 * Math.sign(dx);
          this.x += (this.baseX + push - this.x) * 0.1;
        } else {
          this.x += (this.baseX - this.x) * 0.08;
        }

        for (const c of this.chars) {
          c.y += this.speed + Math.abs(scrollV) * 0.3;
          c.swapTimer--;
          if (c.swapTimer <= 0) {
            c.symbol = DS_SYMBOLS[Math.floor(Math.random() * DS_SYMBOLS.length)];
            c.swapTimer = Math.random() * 100 + 30;
          }
        }

        if (this.chars[this.chars.length - 1].y > H + 60) {
          const topY = -this.length * this.fontSize * 1.3;
          for (let i = 0; i < this.chars.length; i++) {
            this.chars[i].y = topY + i * this.fontSize * 1.3;
          }
        }
      }

      draw(ctx, accentColor) {
        ctx.font = `${this.fontSize}px 'Space Mono', monospace`;
        ctx.textAlign = 'center';

        for (let i = 0; i < this.chars.length; i++) {
          const c = this.chars[i];
          const progress = i / (this.chars.length - 1);
          const isHead = i === this.chars.length - 1;

          if (isHead) {
            ctx.fillStyle = `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.95)`;
            ctx.shadowColor = `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.8)`;
            ctx.shadowBlur = 12;
          } else {
            const alpha = 0.06 + progress * 0.28;
            ctx.fillStyle = `rgba(${accentColor.r},${accentColor.g},${accentColor.b},${alpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(c.symbol, this.x, c.y);
        }
        ctx.shadowBlur = 0;
      }
    }

    const NODE_COUNT = 45;
    const CONNECT_DIST = 150;
    const MOUSE_RADIUS = 250;

    class Node {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.baseR = Math.random() * 2.2 + 1.4;
        this.r = this.baseR;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(scrollV) {
        this.pulsePhase += 0.03;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const f = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.vx -= (dx / dist) * f * 0.15;
          this.vy -= (dy / dist) * f * 0.15;
          this.vx += (dy / dist) * f * 0.25;
          this.vy -= (dx / dist) * f * 0.25;
          this.r = this.baseR + f * 3;
        } else {
          this.r = this.baseR + Math.sin(this.pulsePhase) * 0.5;
        }

        this.y -= scrollV * 0.35;
        this.vx *= 0.97;
        this.vy *= 0.97;

        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd < 0.3) {
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -40) this.x = W + 40;
        if (this.x > W + 40) this.x = -40;
        if (this.y < -40) this.y = H + 40;
        if (this.y > H + 40) this.y = -40;
      }

      draw(ctx, accentColor) {
        const a = 0.5 + Math.sin(this.pulsePhase) * 0.15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColor.r},${accentColor.g},${accentColor.b},${a})`;
        ctx.fill();
      }
    }

    function drawMouseGlow(ctx, accentColor) {
      if (mouseX < -1000) return;
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 220);
      grad.addColorStop(0, `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.08)`);
      grad.addColorStop(0.5, `rgba(${accentColor.r},${accentColor.g},${accentColor.b},0.03)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(mouseX - 220, mouseY - 220, 440, 440);
    }

    function interpolateColor(c1, c2, t) {
      return {
        r: Math.round(c1.r + t * (c2.r - c1.r)),
        g: Math.round(c1.g + t * (c2.g - c1.g)),
        b: Math.round(c1.b + t * (c2.b - c1.b)),
      };
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      const colSpacing = 38;
      columns = Math.ceil(W / colSpacing);
      streams = [];
      for (let i = 0; i < columns; i++) {
        streams.push(new Stream(i * colSpacing + colSpacing / 2));
      }
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node());
      }
    }

    function draw() {
      const prevScroll = currentScrollY;
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      scrollVelocity = currentScrollY - prevScroll;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = currentScrollY / maxScroll;
      const sf = Math.max(0, Math.min(ratio * (palettes.length - 1), palettes.length - 1.001));
      const si = Math.floor(sf);
      const accent = interpolateColor(palettes[si], palettes[si + 1], sf - si);

      ctx.clearRect(0, 0, W, H);

      drawMouseGlow(ctx, accent);

      for (const s of streams) {
        s.update(scrollVelocity);
        s.draw(ctx, accent);
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.update(scrollVelocity);

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
            ctx.stroke();
          }
        }
        a.draw(ctx, accent);
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };
    const onScroll = () => { targetScrollY = window.scrollY; };
    const onTouchMove = (e) => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.bgCanvas}></canvas>;
}
