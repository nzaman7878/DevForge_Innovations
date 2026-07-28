import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function RevealOnScroll({ children, className = '', options = {} }) {
  const { ref, isVisible } = useScrollReveal(options);

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
