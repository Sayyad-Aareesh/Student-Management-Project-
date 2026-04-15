
export const metadata = {
    title: 'About Us', // This changes the browser tab title
    description: 'Learn about the purpose and goals of our Student Management System',
  };
  
  export default function AboutLayout({ children }) {
    return (
      <section style={{ minHeight: '100vh' }}>
        {/* This 'children' will be your page.js content */}
        {children}
      </section>
    );
  }
  
