import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
      <SEO title="404 Not Found" />
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8">
        <AlertCircle size={48} className="text-red-400" />
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg" className="px-8 shadow-lg shadow-primary/20">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
