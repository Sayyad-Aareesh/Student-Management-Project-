'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();

  // If the current path is the Home Page, don't animate
  if (pathname === '/') {
    return <>{children}</>;
  }

  // For all other pages, apply the smooth slide-up
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }}
    >
      {children}
    </motion.div>
  );
}
