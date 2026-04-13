"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './allstudents.module.css'; // Correct CSS import

export default function AdminStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Matches your Java Controller @GetMapping("/all-students")
    fetch('http://localhost:8087/api/student/all-students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin: Student Management</h1>
          <p className={styles.subtitle}>View and manage all registered students</p>
        </div>
        <Link href="/admin/dashboard" className={styles.dashboardBtn}>
          ← Dashboard
        </Link>
      </div>
      
      {/* Table Container */}
      <div className={styles.tableCard}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th className={styles.textCenter}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className={styles.emptyState}>Loading database...</td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className={styles.studentId}>#{student.id}</td>
                  <td className={styles.studentName}>{student.name}</td>
                  <td className={styles.studentEmail}>{student.email}</td>
                  <td className={styles.textCenter}>
                    <Link 
                      href={`/admin/feedback/${student.id}`} 
                      className={styles.viewBtn}
                    >
                      View Feedback →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.emptyState}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
