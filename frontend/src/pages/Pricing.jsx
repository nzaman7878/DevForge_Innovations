import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle2, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import SEO from '../components/ui/SEO';

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (packageId) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/payments/create-checkout-session', { packageId });
      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const packages = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: '$1,500',
      description: 'Perfect for small businesses needing a modern web presence.',
      features: ['5-Page Website', 'Responsive Design', 'Basic SEO Setup', 'Contact Form', '1 Month Support'],
      highlight: false,
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: '$3,500',
      description: 'Ideal for growing brands that need more functionality.',
      features: ['Up to 15 Pages', 'Custom UI/UX Design', 'Advanced SEO & Analytics', 'CMS Integration', '3 Months Support'],
      highlight: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '$8,000',
      description: 'Full-scale web applications and platforms.',
      features: ['Unlimited Pages', 'Full-Stack Custom App', 'User Authentication', 'Database Architecture', '6 Months Support'],
      highlight: false,
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <SEO title="Pricing" description="Simple, transparent pricing. Choose the package that fits your business needs." />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">pricing</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Choose the package that fits your business needs. No hidden fees, just premium delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-surface border rounded-3xl p-8 transition-all ${
                pkg.highlight 
                  ? 'border-primary shadow-2xl shadow-primary/10 relative transform md:-translate-y-4' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-black text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full flex items-center gap-1">
                    <Zap size={14} /> Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{pkg.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">{pkg.price}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleCheckout(pkg.id)}
                disabled={loading}
                variant={pkg.highlight ? 'primary' : 'outline'}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
