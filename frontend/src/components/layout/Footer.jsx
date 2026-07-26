import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-surface py-12 text-center text-slate-400 text-sm mt-auto">
      <p>&copy; {new Date().getFullYear()} DevForge Innovations. All rights reserved.</p>
    </footer>
  );
}
