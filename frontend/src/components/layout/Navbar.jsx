import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar() {
  const activeStyle = ({ isActive }) =>
    isActive ? "text-primary font-medium transition-colors" : "hover:text-primary transition-colors text-slate-300";

  return (
    <header className="border-b border-slate-800 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight">DevForge</Link>
        <nav className="hidden md:flex gap-8 text-sm">
          <NavLink to="/" className={activeStyle}>Home</NavLink>
          <NavLink to="/services" className={activeStyle}>Services</NavLink>
          <NavLink to="/portfolio" className={activeStyle}>Portfolio</NavLink>
          <NavLink to="/about" className={activeStyle}>About</NavLink>
          <NavLink to="/blog" className={activeStyle}>Blog</NavLink>
        </nav>
        <Link to="/contact">
          <Button variant="primary" size="sm">Get in Touch</Button>
        </Link>
      </div>
    </header>
  );
}
