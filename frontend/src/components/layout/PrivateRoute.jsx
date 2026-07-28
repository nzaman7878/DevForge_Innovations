import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div role="status" aria-live="polite" className="flex-1 flex items-center justify-center text-slate-400 py-24">
      <Loader2 size={24} className="animate-spin mr-2" />
      <span className="sr-only">Loading content...</span>
    </div>
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // Or to an unauthorized page
  }

  return children;
}
