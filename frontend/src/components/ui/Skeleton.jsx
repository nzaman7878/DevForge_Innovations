import React from 'react';

export default function Skeleton({ className = '', variant = 'rect' }) {
  const baseStyles = 'animate-pulse bg-slate-800/60 rounded';
  
  const variants = {
    rect: 'w-full h-4',
    circle: 'rounded-full',
    card: 'w-full h-48 rounded-2xl',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
}

// Card-shaped skeleton for portfolio/blog grids
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`bg-surface border border-slate-800 rounded-2xl overflow-hidden ${className}`}>
      {/* Image placeholder */}
      <div className="w-full h-48 bg-slate-800/60 animate-pulse" />
      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="h-5 bg-slate-800/60 rounded animate-pulse w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-800/60 rounded animate-pulse w-full" />
          <div className="h-3 bg-slate-800/60 rounded animate-pulse w-5/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-slate-800/60 rounded-md animate-pulse" />
          <div className="h-6 w-16 bg-slate-800/60 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Table row skeleton for admin views
export function TableRowSkeleton({ cols = 4, className = '' }) {
  return (
    <tr className={className}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className={`h-4 bg-slate-800/60 rounded animate-pulse ${i === 0 ? 'w-40' : 'w-24'}`} />
        </td>
      ))}
    </tr>
  );
}

// Stats card skeleton for dashboards
export function StatCardSkeleton({ className = '' }) {
  return (
    <div className={`bg-surface border border-slate-800 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-800/60 animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-slate-800/60 rounded animate-pulse w-16" />
          <div className="h-3 bg-slate-800/60 rounded animate-pulse w-24" />
        </div>
      </div>
    </div>
  );
}

// Lead card skeleton for admin leads
export function LeadCardSkeleton({ className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-slate-800/60 rounded animate-pulse w-40" />
              <div className="h-3 bg-slate-800/60 rounded animate-pulse w-32" />
            </div>
            <div className="h-7 w-24 bg-slate-800/60 rounded-full animate-pulse" />
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 space-y-2">
            <div className="h-3 bg-slate-800/60 rounded animate-pulse w-full" />
            <div className="h-3 bg-slate-800/60 rounded animate-pulse w-4/5" />
            <div className="h-3 bg-slate-800/60 rounded animate-pulse w-3/5" />
          </div>
        </div>
        <div className="xl:w-64 space-y-4">
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 space-y-3">
            <div className="h-4 bg-slate-800/60 rounded animate-pulse w-28" />
            <div className="h-8 bg-slate-800/60 rounded animate-pulse w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Full page loading skeleton with role="status"
export function PageSkeleton({ children, className = '' }) {
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">Loading content...</span>
      {children}
    </div>
  );
}
