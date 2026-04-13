import NavLink from '@/components/NavLink';
import styles from './home.module.css';

export const metadata = {
  title: 'Home | Student Management',
};


export default function HomePage() {
  return (
    <main className={styles.mainContainer}>
      {/* Main Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome to Student Management
        </h1>
        <p className={styles.welcomeSub}>
          Efficiently manage student records and administrative tasks.
        </p>
      </section>

      {/* Navigation Links Grid */}
      <div className={styles.linkGrid}>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/admin/login">Admin Login</NavLink>
        <NavLink href="/student/register">Student Registration</NavLink>
        <NavLink href="/student/login">Student Login</NavLink>
      </div>
      
      {/* Optional helper text for returning students */}
      <p className={styles.helperText}>
        Already registered? Click <strong>Student Login</strong> to access your dashboard.
      </p>
    </main>
  );
}
