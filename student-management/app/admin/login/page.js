'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '../../../lib/api'; // Import your specific adminApi
import StatusModal from '../../components/StatusModal'; 
import styles from './admin.module.css';


export default function AdminLoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
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

        try {
            // 1. Using your best adminApi.login method
            const adminData = await adminApi.login(credentials);
            
            // 2. Save both Name and Email (Matches what the Dashboard checks)
            localStorage.setItem('adminName', adminData.name);
            localStorage.setItem('adminEmail', adminData.email);
            
            // 3. Show Success Modal
            setModal({ 
                isOpen: true, 
                type: 'success', 
                title: 'Access Granted', 
                message: `Welcome, ${adminData.name}. Loading secure panel...` 
            });

            // 4. Redirect after a small delay
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1500);

        } catch (error) {
            // Catches "Invalid admin credentials" or "Backend offline"
            setModal({ 
                isOpen: true, 
                type: 'error', 
                title: 'Login Failed', 
                message: error.message 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.loginCard}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <h1 className={styles.title}>Admin Portal</h1>
                    <p className={styles.subtitle}>Secure Database Management</p>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            type="email" 
                            placeholder="Admin Email" 
                            className={styles.input} 
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className={styles.input} 
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                            required 
                        />
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Login to System'}
                    </button>
                    
                    <div className={styles.footer}>
                        <Link href="/" className={styles.backHome}>← Exit to Public Site</Link>
                    </div>
                </form>
            </div>

            {/* Universal Status Modal */}
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
