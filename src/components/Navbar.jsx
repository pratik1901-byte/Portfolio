'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.navLogo} onClick={closeMenu}>
          <span className={styles.logoBracket}>&lt;</span>PG<span className={styles.logoBracket}>/&gt;</span>
        </Link>
        
        <button 
          className={`${styles.navToggle} ${menuOpen ? styles.openToggle : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          <li><Link href="/" onClick={closeMenu} className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Home</Link></li>
          <li><Link href="/about" onClick={closeMenu} className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}>About</Link></li>
          <li><Link href="/experience" onClick={closeMenu} className={`${styles.navLink} ${pathname === '/experience' ? styles.active : ''}`}>Experience</Link></li>
          <li><Link href="/projects" onClick={closeMenu} className={`${styles.navLink} ${pathname === '/projects' ? styles.active : ''}`}>Projects</Link></li>
          <li><Link href="/skills" onClick={closeMenu} className={`${styles.navLink} ${pathname === '/skills' ? styles.active : ''}`}>Skills</Link></li>
          <li><Link href="/contact" onClick={closeMenu} className={`${styles.navLink} ${styles.navCta} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
