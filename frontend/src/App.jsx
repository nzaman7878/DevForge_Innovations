import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <div className="p-8">Home Page Content</div>;
const Services = () => <div className="p-8">Services Page Content</div>;
const Portfolio = () => <div className="p-8">Portfolio Page Content</div>;
const About = () => <div className="p-8">About Us Page Content</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-blue-500">DevForge</Link>
            <nav className="flex gap-6">
              <Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link>
              <Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
              <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
            </nav>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Get in Touch
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <footer className="border-t border-slate-800 py-8 text-center text-slate-400">
          <p>&copy; 2026 DevForge Innovations. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
