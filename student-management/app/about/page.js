about commit
"use client"; // Required for click animations
import { useState } from 'react';
import styles from './about.module.css';
import Link from 'next/link';

export default function AboutPage() {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <main className={styles.mainContainer}>
      <section className={styles.contentSection}>
        
        <header className={styles.heroSection}>
          <div className={styles.sticker}>✨</div>
          <h1 className={styles.mainTitle}>Designed for Education, Built for You</h1>
          <p className={styles.subtext}>
            We believe that managing school life should be as simple as a single click. 
            Our platform is here to clear the path for what truly matters: learning. 🎓
          </p>
        </header>

        <div className={styles.purposeGrid}>
          {/* Card 1 */}
          <div 
            className={`${styles.purposeCard} ${activeCard === 1 ? styles.animated : ''}`}
            onClick={() => handleCardClick(1)}
          >
            <div className={styles.iconSticker}>📖</div>
            <h3>For Students</h3>
            <p>
              Take the stress out of tracking your progress. View your grades, 
              attendance, and schedules in one clean dashboard. 📈
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className={`${styles.purposeCard} ${activeCard === 2 ? styles.animated : ''}`}
            onClick={() => handleCardClick(2)}
          >
            <div className={styles.iconSticker}>🏠</div>
            <h3>For Parents</h3>
            <p>
              Stay in the loop with your child's education. Get a transparent 
              look at their achievements anytime, anywhere. 🤝
            </p>
          </div>

          {/* Card 3 */}
          <div 
            className={`${styles.purposeCard} ${activeCard === 3 ? styles.animated : ''}`}
            onClick={() => handleCardClick(3)}
          >
            <div className={styles.iconSticker}>💼</div>
            <h3>For Administrators</h3>
            <p>
              Say goodbye to messy paperwork. 💡 We help you organize 
              records instantly so you can focus on leading. 🏆
            </p>
          </div>
        </div>

        <section className={styles.missionSection}>
          <h2>The Goal 🎯</h2>
          <p>
            Our mission is to create a seamless, paperless environment where 
            information is always at your fingertips. 🌿
          </p>
        </section>

        <div className={styles.footerActions}>
          <Link href="/student/register" className={styles.primaryBtn}>Join Us Today 🚀</Link>
          <Link href="/" className={styles.secondaryBtn}>Back to Home</Link>
        </div>

      </section>
    </main>
  );
}
