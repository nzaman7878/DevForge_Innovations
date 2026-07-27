import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import SEO from '../components/ui/SEO';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-16">
      <SEO title="Software Development Agency" />
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20">
          <Zap size={16} />
          <span>Transforming Ideas into Digital Reality</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Future</span> of Your Business
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          DevForge Innovations is a premium software development agency specializing in bespoke web applications, mobile experiences, and AI-driven solutions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      <section className="px-4 pb-12">
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
    </div>
  );
}
