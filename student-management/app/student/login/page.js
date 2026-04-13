'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusModal from '../../components/StatusModal'; 
import styles from './login.module.css';

export default function StudentLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [modal, setModal] = useState({ 
        isOpen: false, 
        message: '', 
        title: '', 
        type: 'error' 
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 1. Normalize the email to match database lowercase strategy
        const normalizedEmail = email.trim().toLowerCase(); 

        try {
            // 2. Send the request to your Java Backend
            const response = await fetch('http://localhost:8087/api/student/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: normalizedEmail, 
                    password: password 
                })
            });

            if (!response.ok) {
                setModal({ 
                    isOpen: true, 
                    type: 'error', 
                    title: 'Login Failed', 
                    message: 'Invalid email or password. Please try again.' 
                });
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            
            // 3. Save student data so the Dashboard can show "Welcome, Name!"
            localStorage.setItem('loggedStudent', JSON.stringify(data));
            
            // 4. Success! Go to Dashboard
            router.push('/student/dashboard');

        } catch (error) {
            setModal({ 
                isOpen: true, 
                type: 'error', 
                title: 'Connection Error', 
                message: 'Could not reach the server. Ensure Spring Boot is running on port 8087.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.loginCard}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <h1 className={styles.title}>Login</h1>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className={styles.input} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className={styles.input} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className={styles.forgotContainer}>
                        <Link href="/student/forgot-password" className={styles.forgotLink}>
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <p className={styles.footer}>
                        Don't have an account? <Link href="/student/register">Register here</Link>
                    </p>
                <p>
                    <button 
              type="button" 
              onClick={() => router.push('../')} 
              className={styles.backBtn}
            >
              Cancel & Return To Home
            </button>
            </p>
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
