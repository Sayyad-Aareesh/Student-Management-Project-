export const metadata = {
    title: 'Admin Dashboard',
    description: 'Student Management System - Admin Portal',
  };
  
  export default function DashboardLayout({ children }) {
    return (
      <section>
        {/* This renders the specific page content (like your dashboard, table, etc.) */}
        {children}
      </section>
    );
  }
  

