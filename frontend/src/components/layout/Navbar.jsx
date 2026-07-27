import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { User, LayoutDashboard, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  const dashboardLink = user?.role === 'admin' ? '/admin' : '/client';

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
          {user ? (
            <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 group hover:bg-slate-800/50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
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
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-surface-elevated border border-slate-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  role="menu"
                >
                  <div className="px-4 py-2 border-b border-slate-800/50 mb-1">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  
                  <Link 
                    to={dashboardLink}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    role="menuitem"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  
                  <Link 
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    role="menuitem"
                  >
                    <User size={16} />
                    My Profile
                  </Link>

                  <Link 
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    role="menuitem"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  
                  <div className="h-px bg-slate-800/50 my-1"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors text-left"
                    role="menuitem"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
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
