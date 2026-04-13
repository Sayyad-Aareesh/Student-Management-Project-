'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studentApi } from '../../../lib/api'; 
import StatusModal from '../../components/StatusModal';
import styles from './feedback.module.css';

export default function StudentFeedbackPage() {
  const [student, setStudent] = useState(null);
  const [responses, setResponses] = useState({});
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', title: '', type: 'error', shouldRedirect: false });

  const questions = [
    { id: "q1", step: 1, text: "Instructor's knowledge of the subject matter?" },
    { id: "q2", step: 1, text: "Effectiveness in explaining new concepts?" },
    { id: "q3", step: 1, text: "Instructor's communication skills?" },
    { id: "q4", step: 1, text: "Instructor's approachability and helpfulness?" },
    { id: "q5", step: 2, text: "Quality and clarity of the course material?" },
    { id: "q6", step: 2, text: "Relevance to your learning objectives?" },
    { id: "q7", step: 2, text: "Organization and flow of the lessons?" },
    { id: "q8", step: 3, text: "Campus and classroom facilities?" },
    { id: "q9", step: 3, text: "Technology and software used for learning?" },
    { id: "q10", step: 3, text: "Administrative support provided?" }
  ];

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('loggedStudent'));
    if (savedUser) setStudent(savedUser);
    else window.location.href = '/student/login';
  }, []);

  // RESTRICTION LOGIC: Check if current step questions are answered
  const isCurrentStepValid = () => {
    const stepQuestions = questions.filter(q => q.step === step);
    return stepQuestions.every(q => responses[q.id]);
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setModal({ isOpen: true, type: 'error', title: 'Selection Missing', message: 'Please select an option for every question to proceed.' });
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCurrentStepValid()) {
      setModal({ isOpen: true, type: 'error', title: 'Incomplete Form', message: 'Please answer all questions before finishing.' });
      return;
    }

    setIsLoading(true);
    try {
      await studentApi.submitFeedback({
        studentId: student?.id,
        responses: responses,
        submittedAt: new Date().toISOString()
      });
      setModal({ isOpen: true, type: 'success', title: 'Done!', message: 'Feedback submitted. Redirecting...', shouldRedirect: true });
      setTimeout(() => window.location.href = '/student/dashboard', 5000);
    } catch (error) {
      const isDup = error.message.toLowerCase().includes("already submitted");
      setModal({ isOpen: true, type: 'error', title: isDup ? 'Action Locked' : 'Error', message: error.message, shouldRedirect: isDup });
      if (isDup) setTimeout(() => window.location.href = '/student/dashboard', 5000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.feedbackBox}>
        <div className={styles.formHeader}>
          <h2>Course Feedback</h2>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${(step/3)*100}%` }}></div>
          </div>
          <span className={styles.stepIndicator}>Step {step} of 3</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.questionList}
          >
            {questions.filter(q => q.step === step).map((q) => (
              <div key={q.id} className={styles.questionCard}>
                <p className={styles.questionText}>{q.text}</p>
                <div className={styles.optionGrid}>
                  {["Excellent", "Good", "Average", "Poor"].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => setResponses({...responses, [q.id]: opt})}
                      className={`${styles.optBtn} ${responses[q.id] === opt ? styles.selectedOpt : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className={styles.navButtons}>
          {step > 1 && <button onClick={() => setStep(step - 1)} className={styles.secondaryBtn}>Back</button>}
          {step < 3 ? (
            <button onClick={handleNext} className={styles.primaryBtn}>Continue</button>
          ) : (
            <button onClick={handleSubmit} disabled={isLoading} className={styles.primaryBtn}>
              {isLoading ? 'Sending...' : 'Submit Feedback'}
            </button>
          )}
        </div>
      </div>

      <StatusModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        title={modal.title} 
        message={modal.message} 
        onClose={() => {
          setModal({...modal, isOpen: false});
          if(modal.shouldRedirect) window.location.href = '/student/dashboard';
        }} 
      />
    </div>
  );
}
