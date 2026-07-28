import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-sm">DF</span>
            DevForge
          </Link>
          <p className="mt-6 text-xl text-slate-300 font-medium max-w-md leading-relaxed">
            Building the future of software, one line of code at a time.
          </p>
        </div>

        <div className="relative z-10">
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <p className="text-slate-300 italic mb-4">"The platform they built for us completely transformed our business operations. Highly recommended."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-primary font-bold">M</div>
              <div>
                <p className="text-sm font-semibold text-white">Marcus Rossi</p>
                <p className="text-xs text-slate-400">Founder, RetailGenius</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-2">Sign in to your DevForge account to continue.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">{error}</div>}
            
            <Input 
              label="Email Address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
            
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            
            <Button type="submit" className="w-full mt-4 h-12 text-base">Sign In</Button>
            
            <p className="text-center text-sm text-slate-400 mt-6">
              Don't have an account? <Link to="/register" className="text-primary hover:text-blue-400 font-medium transition-colors">Create one now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
