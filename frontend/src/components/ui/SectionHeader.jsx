import React from 'react';

export default function SectionHeader({ 
  title, 
  subtitle, 
  alignment = 'center', 
  badge = null,
  className = '',
  isMainHeading = false
}) {
  const alignments = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
  };

  const HeadingTag = isMainHeading ? 'h1' : 'h2';

  return (
    <div className={`flex flex-col max-w-3xl mb-16 ${alignments[alignment]} ${className}`}>
      {badge && (
        <span className="bg-highlight/10 text-highlight px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-6 inline-block border border-highlight/20">
          {badge}
        </span>
      )}
      <HeadingTag className="text-4xl md:text-5xl mb-6">{title}</HeadingTag>
      {subtitle && (
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
