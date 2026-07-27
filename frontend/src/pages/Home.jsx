import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Zap, Star, Users, CheckCircle, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import SEO from '../components/ui/SEO';

export default function Home() {
  const [stats, setStats] = useState({ projects: 0, clients: 0, uptime: 0 });

  useEffect(() => {
    // Simple animated counters
    const interval = setInterval(() => {
      setStats(prev => ({
        projects: prev.projects < 50 ? prev.projects + 1 : 50,
        clients: prev.clients < 40 ? prev.clients + 1 : 40,
        uptime: prev.uptime < 99 ? prev.uptime + 1 : 99,
      }));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-24 py-16">
      <SEO title="Software Development Agency" />
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Zap size={16} />
          <span>Transforming Ideas into Digital Reality</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Future</span> of Your Business
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
          DevForge Innovations is a premium software development agency specializing in bespoke web applications, mobile experiences, and AI-driven solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <Link to="/contact">
            <Button size="lg" className="w-full sm:w-auto flex items-center gap-2">
              Start Your Project <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              View Our Work
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hover className="bg-surface-elevated/50 backdrop-blur border-slate-800/60">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Code className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Web Development</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Scalable, high-performance web applications built with modern frameworks like React and Next.js.</p>
            </CardContent>
          </Card>
          <Card hover className="bg-surface-elevated/50 backdrop-blur border-slate-800/60">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Smartphone className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Apps</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Native and cross-platform mobile experiences that engage users on iOS and Android seamlessly.</p>
            </CardContent>
          </Card>
          <Card hover className="bg-surface-elevated/50 backdrop-blur border-slate-800/60">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Zap className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Integration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Intelligent automation and generative AI solutions to give your business a competitive edge.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4 py-16 bg-slate-800/20 rounded-3xl border border-slate-800/50 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 text-primary rounded-full mb-2"><CheckCircle size={24} /></div>
            <h4 className="text-4xl font-extrabold text-white">{stats.projects}+</h4>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Projects Delivered</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full mb-2"><Users size={24} /></div>
            <h4 className="text-4xl font-extrabold text-white">{stats.clients}+</h4>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Happy Clients</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full mb-2"><Globe size={24} /></div>
            <h4 className="text-4xl font-extrabold text-white">{stats.uptime}%</h4>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Technologies We Master</h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">We use the most modern and robust technologies to build software that scales securely.</p>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['React', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Google Cloud', 'Tailwind CSS', 'Docker', 'Stripe', 'Redis'].map(tech => (
            <div key={tech} className="px-6 py-3 bg-surface-elevated/50 border border-slate-700/50 rounded-full text-slate-300 font-medium hover:bg-slate-800 hover:text-primary transition-colors cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sarah Jenkins", role: "CEO at TechFlow", quote: "DevForge delivered our SaaS platform ahead of schedule. The code quality and UI design are world-class." },
            { name: "Marcus Rossi", role: "Founder, RetailGenius", quote: "Working with them was incredible. They integrated AI into our ecommerce site which boosted conversions by 40%." },
            { name: "Aisha Patel", role: "CTO, HealthSync", quote: "A truly professional agency. Their architectural decisions saved us months of technical debt." }
          ].map((test, i) => (
            <Card key={i} className="bg-surface-elevated/40 border-slate-800">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4 text-emerald-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-slate-300 italic mb-6">"{test.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-primary font-bold">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{test.name}</p>
                    <p className="text-xs text-slate-400">{test.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-12">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to build something amazing?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Let's discuss your next project. We provide a free technical consultation and a detailed project proposal.
          </p>
          <Link to="/contact" className="relative z-10">
            <Button size="lg" className="px-8 shadow-xl shadow-primary/20">
              Get Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
