import React from 'react';

export default function Input({ 
  label, 
  id, 
  error,
  className = '', 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`bg-surface-elevated border ${error ? 'border-red-500' : 'border-slate-700 focus:border-primary'} text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-primary'} transition-colors w-full ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
