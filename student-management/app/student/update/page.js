'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Professional Symbols
import { studentApi } from '../../../lib/api'; 
import StatusModal from '../../components/StatusModal';
import styles from './update.module.css';

export default function UpdateProfilePage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  // --- PASSWORD CONDITIONS (Matches Registration) ---
  const startsWithCapital = /^[A-Z]/.test(formData.password);
  const isLongEnough = formData.password.length >= 8;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const hasNoSpace = !/\s/.test(formData.password);
  const isPasswordValid = startsWithCapital && isLongEnough && hasSpecial && hasNoSpace;

  useEffect(() => {
    const savedData = localStorage.getItem('loggedStudent');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setStudent(parsed);
      setFormData({ 
        name: parsed.name, 
        email: parsed.email, 
        password: parsed.password || '' 
      });
    } else {
      router.push('/student/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    try {
      const updatedData = await studentApi.update(student.id, formData);
      localStorage.setItem('loggedStudent', JSON.stringify(updatedData));
      
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Update Successful',
        message: 'Your profile has been updated. Redirecting to dashboard...'
      });

      setTimeout(() => router.push('/student/dashboard'), 2000);
    } catch (err) {
      setModal({ isOpen: true, type: 'error', title: 'Error', message: 'Failed to sync with server.' });
    }
  };

  if (!student) return <div className={styles.loading}>Loading Profile...</div>;

  return (
    <main className={styles.container}>
      <div className={styles.updateCard}>
        <h1 className={styles.title}>Update Profile</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className={styles.input} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className={styles.input} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>New Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                className={styles.input}
                required
              />
              <button 
                type="button" 
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className={styles.instructionBox}>
              <p className={styles.instructionHeader}>Password Requirements:</p>
              <ul className={styles.instructionList}>
                <li className={startsWithCapital ? styles.valid : styles.invalid}>● Starts with Capital letter</li>
                <li className={isLongEnough ? styles.valid : styles.invalid}>● At least 8 characters long</li>
                <li className={hasSpecial ? styles.valid : styles.invalid}>● One Special character (!@#)</li>
                <li className={hasNoSpace ? styles.valid : styles.invalid}>● No spaces allowed</li>
              </ul>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.updateBtn} disabled={!isPasswordValid}>Save Changes</button>
            
            {/* FIXED: Direct redirect to dashboard */}
            <button 
              type="button" 
              onClick={() => router.push('/student/dashboard')} 
              className={styles.backBtn}
            >
              Cancel & Exit
            </button>
          </div>
        </form>
      </div>

      <StatusModal 
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </main>
  );
}
