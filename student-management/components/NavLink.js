'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [hover, setHover] = useState(false);

  if (!href) return null;

  return (
    <Link 
      href={href} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        // LAYOUT
        padding: '12px 24px',
        textDecoration: 'none',
        borderRadius: '8px',
        display: 'inline-block',
        minWidth: '180px',
        textAlign: 'center',
        fontWeight: '700',
        transition: 'all 0.3s ease',
        cursor: 'pointer',

        // COLOR LOGIC (The Important Part)
        // If Active: Blue | If Hover: Light Gray | Default: White
        backgroundColor: isActive ? '#2563eb' : (hover ? '#e2e8f0' : '#ffffff'),
        
        // Text Color: White if Active, Gray otherwise
        color: isActive ? '#ffffff' : '#475569',
        
        // Border: Blue if Active, Gray otherwise
        border: isActive ? '2px solid #1e40af' : '1px solid #cbd5e1',

        // BUBBLING EFFECT
        transform: hover && !isActive ? 'translateY(-5px)' : 'none',
        boxShadow: hover ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      {children}
    </Link>
  );
}
