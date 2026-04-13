'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// FIXED: This line must be present to define 'styles'
import styles from './dashboard.module.css'; 

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('adminName');
    if (!savedName) {
      router.push('/admin/login');
    } else {
      setAdminName(savedName);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login'); 
  };

  return (
    <main className={styles.container}>
      <div className={styles.dashboardCard}>
        
        {/* LOGOUT BUTTON - Positioned top right via CSS */}
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <span className={styles.logoutIcon}>🚪</span>
          Logout
        </button>

        <div className={styles.header}>
          <h1 className={styles.welcomeText}>Welcome, {adminName || 'Admin'}</h1>
          <p className={styles.subtitle}>System Control Panel | Management Hub</p>
        </div>

        <div className={styles.actionGrid}>
          <Link href="/admin/all-students" className={styles.actionBtn}>
            <span className={styles.icon}>📋</span>
            <p>Show All Students</p>
          </Link>
          
          {/* You can add more buttons here later */}
        </div>
      </div>
    </main>
  );
}
