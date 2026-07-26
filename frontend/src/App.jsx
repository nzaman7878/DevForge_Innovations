import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  const activeStyle = ({ isActive }) =>
    isActive ? "text-blue-500 font-medium transition-colors" : "hover:text-blue-400 transition-colors";

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-500 tracking-tight">DevForge</Link>
            <nav className="hidden md:flex gap-8 text-sm">
              <NavLink to="/" className={activeStyle}>Home</NavLink>
              <NavLink to="/services" className={activeStyle}>Services</NavLink>
              <NavLink to="/portfolio" className={activeStyle}>Portfolio</NavLink>
              <NavLink to="/about" className={activeStyle}>About</NavLink>
              <NavLink to="/blog" className={activeStyle}>Blog</NavLink>
            </nav>
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-500/20">
              Get in Touch
            </Link>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <footer className="border-t border-slate-800 py-12 text-center text-slate-400 text-sm">
          <p>&copy; 2026 DevForge Innovations. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
