'use client';
import Link from 'next/link';
import styles from './studentTable.module.css';

export default function StudentTable({ students }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th className={styles.center}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td className={styles.studentName}>{student.name}</td>
              <td>{student.email}</td>
              <td className={styles.center}>
                <Link 
                  href={`/admin/view-feedback?id=${student.id}`} 
                  className={styles.feedbackBtn}
                >
                  View Feedback 💬
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
