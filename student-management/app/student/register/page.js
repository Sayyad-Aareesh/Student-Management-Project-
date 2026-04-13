'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { motion, AnimatePresence } from 'framer-motion';
import styles from './register.module.css';
// 1. IMPORT the api object
import { studentApi } from '@/lib/api'; 

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ isVisible: false, type: 'error', title: '', message: '' });

  const showStatus = (type, title, msg) => {
    setModal({ isVisible: true, type, title, message: msg });
  };

  const startsWithCapital = /^[A-Z]/.test(formData.password);
  const hasSpecial = /[!@#$%^&*]/.test(formData.password);
  const hasNoSpace = !/\s/.test(formData.password) && formData.password.length > 0;
  const isLongEnough = formData.password.length >= 8;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      showStatus('error', 'Empty Fields', 'Please fill in all fields.');
      return;
    }

    if (!(startsWithCapital && hasSpecial && hasNoSpace && isLongEnough)) {
      showStatus('error', 'Security Rule', 'Your password does not meet the requirements.');
      return;
    }

    setIsLoading(true);

    try {
      // 2. USE the studentApi instead of raw fetch
      const message = await studentApi.register(formData);

      // Matches your Java return string "Registration successful"
      showStatus('success', 'Success', 'Account created! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => router.push('/student/login'), 2500);

    } catch (err) {
      // 3. CATCH errors from the API (like "Registration failed")
      showStatus('error', 'Registration Failed', err.message || 'Could not connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      {/* ... rest of your JSX remains exactly the same ... */}
      <div className={styles.registerCard}>
        <h1 className={styles.title}>Create Account</h1>
        
        <form onSubmit={handleRegister} className={styles.form} noValidate>
          <input type="text" placeholder="Full Name" className={styles.input} 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <input type="email" placeholder="Email Address" className={styles.input} 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          
          <input type="password" placeholder="Create Password" className={styles.input} 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <div className={styles.instructionBox}>
            <p className={styles.instructionHeader}>Password Requirements:</p>
            <ul className={styles.instructionList}>
              <li className={startsWithCapital ? styles.valid : styles.invalid}>● Must START with a Capital letter</li>
              <li className={isLongEnough ? styles.valid : styles.invalid}>● At least 8 characters long</li>
              <li className={hasSpecial ? styles.valid : styles.invalid}>● One Special character (!@#$%^&*)</li>
              <li className={hasNoSpace ? styles.valid : styles.invalid}>● No spaces allowed</li>
            </ul>
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/student/login" className={styles.link}>Already have an account? Login</Link>
          <Link href="/" className={styles.backHome}>← Back to Home</Link>
        </div>
      </div>

      <AnimatePresence>
        {modal.isVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.modalOverlay}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className={styles.modalBox}>
              <div style={{ fontSize: '40px' }}>{modal.type === 'error' ? '⚠️' : '✅'}</div>
              <h3 style={{ color: modal.type === 'error' ? '#dc2626' : '#16a34a', margin: '10px 0' }}>{modal.title}</h3>
              <p className={styles.modalText}>{modal.message}</p>
              
              <button className={styles.modalBtn} 
                style={{ backgroundColor: modal.type === 'success' ? '#2563eb' : '#dc2626' }} 
                onClick={() => modal.type === 'success' ? router.push('/student/login') : setModal({ ...modal, isVisible: false })}>
                {modal.type === 'success' ? 'Go to Login' : 'Try Again'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
