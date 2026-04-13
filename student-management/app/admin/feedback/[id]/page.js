'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import styles from './feedback.module.css';

export default function ViewStudentFeedback({ params }) {
  const { id } = use(params);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const questionMaster = {
    q1: "How would you rate the instructor's knowledge of the subject matter?",
    q2: "How effective was the instructor in explaining new concepts?",
    q3: "How would you rate the instructor's communication skills?",
    q4: "Was the instructor approachable and helpful when you had questions?",
    q5: "How satisfied are you with the quality of the course material?",
    q6: "How relevant was the course content to your learning objectives?",
    q7: "How would you rate the organization and flow of the lessons?",
    q8: "How would you rate the campus/classroom facilities (seating, lighting)?",
    q9: "How satisfied are you with the technology or software used?",
    q10: "How would you rate the administrative support provided?"
  };

  useEffect(() => {
    // UPDATED URL: Changed from /api/student to /api/feedback
    fetch(`http://localhost:8087/api/feedback/admin/feedback/${id}`)
      .then((res) => {
        if (res.status === 204) return []; // Handle No Content
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setFeedbacks(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading student feedback details...</div>;

  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Feedback Details for Student <span className={styles.idHighlight}>#{id}</span>
          </h1>
          <Link href="/admin/all-students" className={styles.backBtn}>
            ← Back to Student List
          </Link>
        </header>

        {feedbacks.length > 0 ? (
          feedbacks.map((f, fIndex) => (
            <div key={fIndex} className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.studentName}>{f.studentName || "Student"}</h2>
                <p className={styles.submitDate}>
                  Submitted on: {f.submittedAt ? new Date(f.submittedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <div className={styles.responsesList}>
                {f.responses && Object.entries(f.responses).map(([qKey, answer]) => (
                  <div key={qKey} className={styles.responseItem}>
                    <span className={styles.qLabel}>Question {qKey.replace('q', '')}</span>
                    <p className={styles.fullQuestion}>
                      {questionMaster[qKey] || "Question text not available."}
                    </p>
                    <div className={styles.answerArea}>
                      {/* logic to handle spaces in class names like 'very good' -> 'verygood' */}
                      <span className={`${styles.badge} ${styles[answer.toLowerCase().replace(/\s/g, '')] || ''}`}>
                        {answer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>No feedback records found.</div>
        )}
      </div>
    </main>
  );
}
