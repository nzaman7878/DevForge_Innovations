import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
          <NavLink to="/pricing" className={activeStyle}>Pricing</NavLink>
          <NavLink to="/about" className={activeStyle}>About</NavLink>
          <NavLink to="/blog" className={activeStyle}>Blog</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 group hover:bg-slate-800/50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors hidden sm:inline-block">
                  {user.name}
                </span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-300 hover:text-white hidden sm:inline-block">Sign In</Link>
              <Link to="/contact">
                <Button variant="primary" size="sm">Get in Touch</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
