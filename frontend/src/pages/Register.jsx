import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>
          <p className="text-slate-400 text-center text-sm mt-2">Join DevForge Innovations</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">{error}</div>}
            
            <Input 
              label="Full Name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input 
              label="Email Address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button type="submit" className="w-full mt-2">Register</Button>
            
            <p className="text-center text-sm text-slate-400 mt-4">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in here</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
