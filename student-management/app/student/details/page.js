'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './details.module.css';

// MUST be 'export default' and function name must be Capitalized
export default function StudentDetailsPage() {
  const [student, setStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('loggedStudent');
    if (savedData) {
      setStudent(JSON.parse(savedData));
    } else {
      router.push('/student/login');
    }
  }, [router]);

  if (!student) return <div className={styles.container}>Loading Details...</div>;

  return (
    <main className={styles.container}>
      <div className={styles.detailsCard}>
        <h1 className={styles.title}>My Personal Details</h1>
        <p className={styles.subtitle}>Information retrieved from Database</p>

        <table className={styles.verticalTable}>
          <tbody>
            <tr>
              <th>Database ID</th>
              <td>{student.id}</td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>{student.name}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td>{student.email}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>{student.password}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.actions}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
