import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden min-h-[calc(100vh-200px)]">
      <SEO title="404 Not Found" />
      
      {/* Animated Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-primary to-emerald-400 rounded-3xl blur-[80px] animate-[spin_20s_linear_infinite] mix-blend-screen"></div>
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-t from-highlight to-rose-400 rounded-full blur-[60px] animate-[spin_15s_linear_infinite_reverse] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-primary/20 rotate-12 shadow-lg shadow-primary/20">
          <Search size={40} className="text-primary -rotate-12" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-4 tracking-tighter drop-shadow-2xl">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Lost in the digital void</h2>
        
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          The page you're looking for has vanished into the ether. Double-check the URL, or navigate back to familiar territory.
        </p>

        <div className="bg-surface-elevated/40 border border-slate-800 rounded-2xl p-6 mb-10 backdrop-blur-md">
          <p className="text-sm font-medium text-slate-300 mb-4">Maybe you were looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/portfolio" className="text-sm text-primary hover:text-white transition-colors font-medium">Portfolio</Link>
            <span className="text-slate-600">•</span>
            <Link to="/services" className="text-sm text-primary hover:text-white transition-colors font-medium">Services</Link>
            <span className="text-slate-600">•</span>
            <Link to="/contact" className="text-sm text-primary hover:text-white transition-colors font-medium">Contact</Link>
          </div>
        </div>

        <Link to="/">
          <Button size="lg" className="px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
