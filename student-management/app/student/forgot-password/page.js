'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusModal from '../../components/StatusModal';
import styles from './forgot.module.css';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, message: '', title: '', type: 'success' });

    const handleResetRequest = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Using your Java Backend Endpoint
            const response = await fetch(`http://localhost:8087/api/student/forgot-password?email=${email}`, {
                method: 'POST'
            });

            if (response.ok) {
                setModal({
                    isOpen: true,
                    type: 'success',
                    title: 'Email Verified',
                    message: 'Account found! Redirecting to set your new password...'
                });
                // Pass email in URL so the next page knows whose password to change
                setTimeout(() => router.push(`/student/reset-password?email=${email}`), 2000);
            } else {
                setModal({ 
                    isOpen: true, 
                    type: 'error', 
                    title: 'User Not Found', 
                    message: 'This email is not registered in our system.' 
                });
            }
        } catch (error) {
            setModal({ 
                isOpen: true, 
                type: 'error', 
                title: 'Server Offline', 
                message: 'Could not connect to the backend server.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <form className={styles.form} onSubmit={handleResetRequest}>
                    <h1 className={styles.title}>Forgot Password?</h1>
                    <p className={styles.subtitle}>Enter your email to receive a reset link.</p>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="e.g. name@student.com" 
                            className={styles.input} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className={styles.resetBtn} disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                    
                    <div className={styles.footer}>
                        <Link href="/student/login" className={styles.backLink}>
                            ← Back to Login
                        </Link>
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
