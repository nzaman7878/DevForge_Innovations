import React from 'react';

export default function Card({ children, className = '', hover = false, ...props }) {
  const hoverStyles = hover ? 'hover:-translate-y-1 hover:border-slate-600 transition-all duration-300' : '';
  
  return (
    <div 
      className={`bg-surface border border-slate-800 rounded-2xl overflow-hidden ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 pt-0 flex-1 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`p-6 pt-0 mt-auto ${className}`}>{children}</div>;
}
