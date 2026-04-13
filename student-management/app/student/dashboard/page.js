'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// FIXED: Import the local dashboard CSS file
import styles from './dashboard.module.css'; 

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('loggedStudent');
    if (savedData) {
      setStudent(JSON.parse(savedData));
    } else {
      router.push('/student/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedStudent');
    router.push('/');
  };

  if (!student) return <div className={styles.loading}>Loading Dashboard...</div>;

  return (
    <main className={styles.container}>
      {/* 1. TOP HEADER SECTION */}
      <header className={styles.topHeader}>
        <div className={styles.headerSpacer}></div> 
        
        <h1 className={styles.welcomeMessage}>
          Welcome, To Your Profile <span className={styles.studentName}>{student.name}</span>!
        </h1>

        <button onClick={handleLogout} className={styles.topLogoutBtn}>
          Logout 🚪
        </button>
      </header>

      {/* 2. ACTION BUTTONS GRID (TABLE FORMAT) */}
      <div className={styles.dashboardContent}>
        <div className={styles.buttonTable}>
          <Link href="/student/details" className={styles.tableBtn}>
            <span className={styles.btnIcon}>👤</span>
            <strong>Show My Details</strong>
          </Link>

          <Link href="/student/update" className={styles.tableBtn}>
            <span className={styles.btnIcon}>✏️</span>
            <strong>Update Profile</strong>
          </Link>

          <Link href="/student/feedback" className={styles.tableBtn}>
            <span className={styles.icon}>💬</span>
            <strong>Give Feedback</strong>
          </Link>

          <Link href="/student/delete" className={`${styles.tableBtn} ${styles.deleteBtn}`}>
            <span className={styles.btnIcon}>🗑️</span>
            <strong>Delete My Details</strong>
          </Link>
        </div>
      </div>
    </main>
  );
}
