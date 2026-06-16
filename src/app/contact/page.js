'use client';

import { useEffect, useState } from 'react';
import { fetchPortfolioData, submitContact } from '../../lib/api';
import styles from './page.module.css';

export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      const res = await submitContact(formData);
      if (res.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  if (loading) return <main className={styles.loadingContainer}><div className="spinner"></div></main>;
  if (!data) return <main>Failed to load data</main>;

  return (
    <main>
      <section className={styles.pageHero}>
        <div className="container">
          <span className="eyebrow">Connect</span>
          <h1 className="page-title">Get In Touch</h1>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.contactLayout}`}>
          <div className={styles.contactInfo}>
            <h2>Let's build something together.</h2>
            <p>Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!</p>
            
            <div className={styles.contactItems}>
              <a href={`mailto:${data.email}`} className={styles.contactItem}>
                <div className={styles.ciIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <span className={styles.ciLabel}>Email</span>
                  <span className={styles.ciValue}>{data.email}</span>
                </div>
              </a>
              
              <div className={`${styles.contactItem} ${styles.noLink}`}>
                <div className={styles.ciIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <span className={styles.ciLabel}>Location</span>
                  <span className={styles.ciValue}>{data.location}</span>
                </div>
              </div>
              
              <a href={data.linkedin} target="_blank" rel="noreferrer" className={styles.contactItem}>
                <div className={styles.ciIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div>
                  <span className={styles.ciLabel}>LinkedIn</span>
                  <span className={styles.ciValue}>Connect with me</span>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.contactFormCard}>
            <h3>Send a Message</h3>
            
            {submitStatus === 'success' && (
              <div className={`${styles.formAlert} ${styles.success}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Message sent successfully! I'll be in touch soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className={`${styles.formAlert} ${styles.error}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea 
                  rows="4" 
                  required 
                  placeholder="Hello, I'd like to talk about..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
