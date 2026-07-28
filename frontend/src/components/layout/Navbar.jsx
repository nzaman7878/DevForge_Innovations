import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { User, LayoutDashboard, Settings, LogOut, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/');
  };

  const dashboardLink = user?.role === 'admin' ? '/admin' : '/client';

  const activeStyle = ({ isActive }) =>
    isActive ? "text-primary font-medium transition-colors" : "hover:text-primary transition-colors text-slate-300";

  const mobileActiveStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-medium text-lg py-2 transition-colors"
      : "text-slate-300 hover:text-white text-lg py-2 transition-colors";

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white p-2 rounded z-[100]">
      Skip to main content
    </a>
    <header className="border-b border-slate-800 bg-surface/80 backdrop-blur-md sticky top-0 z-50" onKeyDown={handleKeyDown}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary tracking-tight">DevForge</Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={activeStyle}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
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
                    to="/settings"
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
              <Link to="/contact" className="hidden sm:inline-block">
                <Button variant="primary" size="sm">Get in Touch</Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-4 pb-6 pt-2 border-t border-slate-800/50 bg-surface/95 backdrop-blur-lg">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={mobileActiveStyle}>
              {link.label}
            </NavLink>
          ))}
          
          <div className="h-px bg-slate-800 my-3" />
          
          {!user && (
            <div className="flex flex-col gap-3 pt-1">
              <Link to="/login" className="text-slate-300 hover:text-white text-lg py-2 transition-colors">
                Sign In
              </Link>
              <Link to="/contact">
                <Button variant="primary" size="md" className="w-full">Get in Touch</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
    </>
  );
}
