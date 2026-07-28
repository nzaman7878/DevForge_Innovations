import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Globe, Zap, CheckCircle2, ChevronRight, BarChart3, Users, Layout, Star, Smartphone, CheckCircle } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import SEO from '../components/ui/SEO';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const [stats, setStats] = useState({ projects: 0, clients: 0, uptime: 0 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  useEffect(() => {
    if (!statsVisible) return;
    
    let startTimestamp = null;
    const duration = 1500;
    const targetProjects = 50;
    const targetClients = 40;
    const targetUptime = 99;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = easeOutCubic(progress);

      setStats({
        projects: Math.floor(easeProgress * targetProjects),
        clients: Math.floor(easeProgress * targetClients),
        uptime: Math.floor(easeProgress * targetUptime),
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [statsVisible]);

  return (
    <div className="flex flex-col gap-24 py-16">
      <SEO title="Software Development Agency" />
      
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 mt-8 lg:mt-16 mb-24 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10 pointer-events-none"></div>
        
        {/* Text Content */}
        <div className="lg:col-span-3 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Zap size={16} />
            <span>Transforming Ideas into Digital Reality</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Future</span> of Your Business
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
            DevForge Innovations is a premium software development agency specializing in bespoke web applications, mobile experiences, and AI-driven solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full flex items-center justify-center gap-2">
                Start Your Project <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Element: Code Editor Mockup */}
        <div className="lg:col-span-2 w-full animate-in fade-in zoom-in-95 duration-1000 delay-300">
          <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/80 shadow-2xl backdrop-blur-sm">
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            {/* Code lines */}
            <div className="p-5 font-mono text-sm leading-relaxed text-slate-300 text-left">
              <div className="flex gap-4"><span className="text-slate-600 select-none">1</span><span><span className="text-purple-400">import</span> {'{'} <span className="text-blue-300">Innovation</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'devforge'</span>;</span></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">2</span></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">3</span><span><span className="text-purple-400">const</span> <span className="text-blue-300">buildFuture</span> = <span className="text-purple-400">async</span> (idea) =&gt; {'{'}</span></div>
              <div className="flex gap-4 pl-4"><span className="text-slate-600 select-none">4</span><span><span className="text-purple-400">try</span> {'{'}</span></div>
              <div className="flex gap-4 pl-8"><span className="text-slate-600 select-none">5</span><span><span className="text-purple-400">const</span> product = <span className="text-purple-400">await</span> Innovation.<span className="text-amber-300">scale</span>(idea);</span></div>
              <div className="flex gap-4 pl-8"><span className="text-slate-600 select-none">6</span><span><span className="text-purple-400">return</span> product.<span className="text-amber-300">launch</span>();</span></div>
              <div className="flex gap-4 pl-4"><span className="text-slate-600 select-none">7</span><span>{'}'} <span className="text-purple-400">catch</span> (limits) {'{'}</span></div>
              <div className="flex gap-4 pl-8"><span className="text-slate-600 select-none">8</span><span className="text-slate-500 italic">// We don't have those</span></div>
              <div className="flex gap-4 pl-4"><span className="text-slate-600 select-none">9</span><span>{'}'}</span></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">10</span><span>{'}'};</span></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">11</span></div>
              <div className="flex gap-4"><span className="text-slate-600 select-none">12</span><span><span className="text-blue-300">buildFuture</span>(<span className="text-emerald-300">'your_vision'</span>);</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Logo Strip */}
      <section className="max-w-5xl mx-auto px-4 border-t border-b border-slate-800/60 py-8 mb-16 text-center animate-in fade-in duration-1000 delay-500">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-6">Trusted by forward-thinking teams</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale">
          <span className="text-xl font-bold font-serif tracking-wider text-slate-300">TechFlow</span>
          <span className="text-xl font-bold tracking-tight text-slate-300">RetailGenius</span>
          <span className="text-xl font-bold italic text-slate-300">HealthSync</span>
          <span className="text-xl font-bold uppercase tracking-widest text-slate-300">AeroSpace</span>
          <span className="text-xl font-bold tracking-wide text-slate-300">NexusData</span>
        </div>
      </section>

      {/* Feature Highlights */}
      <RevealOnScroll>
        <section className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Box 1: Large */}
            <Card hover className="bg-surface-elevated/50 backdrop-blur md:col-span-2 md:row-span-2 flex flex-col relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-full blur-3xl"></div>
              <CardContent className="p-8 md:p-12 flex flex-col h-full z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                  <Code className="text-primary" size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Web Development</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">Scalable, high-performance web applications built with modern frameworks like React, Next.js, and Node.js. We architect solutions that handle massive traffic while delivering buttery-smooth user experiences.</p>
                <div className="mt-auto pt-8">
                  <div className="inline-flex gap-2 p-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bento Box 2: Standard */}
            <Card hover className="bg-surface-elevated/50 backdrop-blur flex flex-col justify-center">
              <CardContent className="p-8 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 border border-accent/20">
                  <Smartphone className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Mobile Apps</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Native and cross-platform mobile experiences that engage users on iOS and Android seamlessly.</p>
              </CardContent>
            </Card>

            {/* Bento Box 3: Standard */}
            <Card hover className="bg-surface-elevated/50 backdrop-blur flex flex-col justify-center">
              <CardContent className="p-8 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center mb-5 border border-highlight/20">
                  <Zap className="text-highlight" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Integration</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Intelligent automation and generative AI solutions to give your business a competitive edge.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </RevealOnScroll>

      {/* Statistics Section */}
      <section ref={statsRef} className={`px-4 py-16 bg-slate-800/20 rounded-3xl border border-slate-800/50 mx-4 transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
            <div className="flex items-center justify-center w-12 h-12 bg-highlight/20 text-highlight rounded-full mb-2"><Globe size={24} /></div>
            <h4 className="text-4xl font-extrabold text-white">{stats.uptime}%</h4>
            <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <RevealOnScroll>
        <section className="px-4 text-center">
          <SectionHeader 
          title="Technologies We Master" 
          subtitle="We use the most modern and robust technologies to build software that scales securely."
          badge="Tech Stack"
        />
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['React', 'Node.js', 'Next.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Google Cloud', 'Tailwind CSS', 'Docker', 'Stripe', 'Redis'].map(tech => (
            <div key={tech} className="px-6 py-3 bg-surface-elevated/50 border border-slate-700/50 rounded-full text-slate-300 font-medium hover:bg-slate-800 hover:text-primary transition-colors cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>
      </RevealOnScroll>

      {/* Testimonials Section */}
      <RevealOnScroll>
        <section className="px-4">
          <SectionHeader 
            title="What Our Clients Say" 
            badge="Testimonials"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "CEO at TechFlow", quote: "DevForge delivered our SaaS platform ahead of schedule. The code quality and UI design are world-class." },
              { name: "Marcus Rossi", role: "Founder, RetailGenius", quote: "Working with them was incredible. They integrated AI into our ecommerce site which boosted conversions by 40%." },
              { name: "Aisha Patel", role: "CTO, HealthSync", quote: "A truly professional agency. Their architectural decisions saved us months of technical debt." }
            ].map((test, i) => (
              <Card key={i} className={`bg-surface-elevated/40 border-transparent border-l-2 border-l-primary/30 relative mt-0 md:mt-${i * 8}`}>
                <div className="absolute top-4 left-4 text-7xl text-primary/10 font-serif leading-none select-none">"</div>
                <CardContent className="p-8 pt-10 relative z-10">
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">"{test.quote}"</p>
                  <div className="flex items-center gap-3 mt-auto">
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
      </RevealOnScroll>

      {/* CTA Section */}
      <RevealOnScroll>
        <section className="px-4 pb-12">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none"></div>
            
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/20 blur-3xl rounded-full group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
            
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
      </RevealOnScroll>

    </div>
  );
}
