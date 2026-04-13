'use client';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatusModal from '../../components/StatusModal';
import styles from './reset.module.css';

function ResetForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [formData, setFormData] = useState({ 
        email: searchParams.get('email') || '', 
        newPassword: '',
        confirmPassword: ''
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, message: '', title: '', type: 'success' });

    // Validation States for real-time UI
    const [checks, setChecks] = useState({
        length: false,
        number: false,
        upper: false,
        lower: false,
        special: false,
        match: false
    });

    // Update checkmarks as user types
    useEffect(() => {
        const p = formData.newPassword;
        setChecks({
            length: p.length >= 8,
            number: /[0-9]/.test(p),
            upper: /[A-Z]/.test(p),
            lower: /[a-z]/.test(p),
            special: /[@#$%^&+=]/.test(p),
            match: p === formData.confirmPassword && p !== ''
        });
    }, [formData.newPassword, formData.confirmPassword]);

    const handleReset = async (e) => {
        e.preventDefault();
        
        // Final validation check before sending to Java backend
        if (!Object.values(checks).every(Boolean)) {
            setModal({
                isOpen: true,
                type: 'error',
                title: 'Invalid Password',
                message: 'Please satisfy all the red requirements before submitting.'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8087/api/student/reset-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    newPassword: formData.newPassword
                })
            });

            if (response.ok) {
                setModal({ isOpen: true, type: 'success', title: 'Success!', message: 'Password updated! Redirecting...' });
                setTimeout(() => router.push('/student/login'), 2000);
            } else {
                setModal({ isOpen: true, type: 'error', title: 'Error', message: 'User not found.' });
            }
        } catch (error) {
            setModal({ isOpen: true, type: 'error', title: 'Offline', message: 'Backend server is down.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <form className={styles.form} onSubmit={handleReset}>
                    <h1 className={styles.title}>Reset Password</h1>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input 
                            type="email" 
                            className={styles.input} 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>New Password</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                            required 
                        />
                    </div>

                    {/* REAL-TIME REQUIREMENTS LIST */}
                    <div className={styles.checkList}>
                        <p className={checks.length ? styles.valid : styles.invalid}>
                            {checks.length ? '✔' : '✘'} password should be 8+ Characters long
                        </p>
                        <p className={checks.upper ? styles.valid : styles.invalid}>
                            {checks.upper ? '✔' : '✘'} One Uppercase (A-Z)
                        </p>
                        <p className={checks.lower ? styles.valid : styles.invalid}>
                            {checks.lower ? '✔' : '✘'} One Lowercase (a-z)
                        </p>
                        <p className={checks.number ? styles.valid : styles.invalid}>
                            {checks.number ? '✔' : '✘'} One Number (0-9)
                        </p>
                        <p className={checks.special ? styles.valid : styles.invalid}>
                            {checks.special ? '✔' : '✘'} Special Char (@#$%^&+=)
                        </p>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input 
                            type="password" 
                            className={styles.input} 
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                            required 
                        />
                        <p className={checks.match ? styles.validText : styles.invalidText}>
                            {formData.confirmPassword && (checks.match ? "Passwords match!" : "Passwords do not match.")}
                        </p>
                    </div>
                    
                    <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Update Password'}
                    </button>
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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className={styles.loading}>Loading Form...</div>}>
            <ResetForm />
        </Suspense>
    );
}
