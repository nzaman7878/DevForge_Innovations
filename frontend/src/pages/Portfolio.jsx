import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { CardContent } from '../components/ui/Card';
import { CardSkeleton, PageSkeleton } from '../components/ui/Skeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { ExternalLink, GitBranch, Layout, Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import Button from '../components/ui/Button';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web', 'Mobile', 'SaaS', 'AI', 'Ecommerce', 'Other'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="py-12 px-4">
      <SEO title="Our Portfolio" description="Explore our recent projects and see how we've helped businesses transform their digital presence." />
      <RevealOnScroll>
        <SectionHeader 
          title="Our Work" 
          subtitle="Explore our recent projects and see how we've helped businesses transform their digital presence."
          badge="Case Studies"
          isMainHeading={true}
        />
      </RevealOnScroll>

      {/* Filter Bar */}
      <RevealOnScroll>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-surface-elevated text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        {loading ? (
        <PageSkeleton className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </PageSkeleton>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 border border-slate-800 border-dashed rounded-3xl bg-surface-elevated/10">
          <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 relative">
            <Layout size={40} className="text-slate-500" />
            <Sparkles size={24} className="text-primary absolute -top-1 -right-1" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No Projects Yet</h3>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">We're currently brewing some amazing work in this category. Check back soon for updates!</p>
          <Button variant="secondary" onClick={() => setFilter('All')}>View All Work</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <Card key={project._id} hover className="flex flex-col h-full bg-surface-elevated/20">
              <div className="h-56 w-full bg-slate-800 relative overflow-hidden flex items-center justify-center group/img">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10"></div>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full bg-slate-800 group-hover/img:scale-110 transition-transform duration-700">
                    <span className="text-xl font-bold tracking-wider opacity-20">DEVFORGE</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full border border-slate-700 text-white">
                  {project.category}
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.map(tech => (
                    <span key={tech} className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <a href={project.liveLink || project.githubLink || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover font-medium transition-colors group/link">
                    View Case Study <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </RevealOnScroll>
    </div>
  );
}
