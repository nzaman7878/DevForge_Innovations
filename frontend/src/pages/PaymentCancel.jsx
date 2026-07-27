import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function PaymentCancel() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-300">
        <XCircle size={48} className="text-red-400" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-xl text-slate-400 max-w-lg mb-8">
        Your payment process was cancelled or interrupted. No charges were made to your account.
      </p>
      <div className="flex gap-4">
        <Link to="/pricing">
          <Button>Return to Pricing</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
