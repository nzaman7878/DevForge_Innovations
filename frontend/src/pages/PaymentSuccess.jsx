import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function PaymentSuccess() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-300">
        <CheckCircle2 size={48} className="text-emerald-400" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl text-slate-400 max-w-lg mb-8">
        Thank you for choosing DevForge Innovations. We have received your payment and will be in touch shortly to kick off your project.
      </p>
      <div className="flex gap-4">
        <Link to="/client">
          <Button>Go to Client Dashboard</Button>
        </Link>
        <Link to="/">
          <Button variant="ghost">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
