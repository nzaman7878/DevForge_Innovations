import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card, { CardContent } from '../components/ui/Card';
import { CardSkeleton, PageSkeleton } from '../components/ui/Skeleton';
import SectionHeader from '../components/ui/SectionHeader';
import { ExternalLink, GitBranch } from 'lucide-react';
import SEO from '../components/ui/SEO';
import RevealOnScroll from '../components/ui/RevealOnScroll';

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
        <div className="text-center text-slate-500 py-12 border border-slate-800 rounded-2xl bg-surface-elevated/30">
          No projects found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <Card key={project._id} hover className="flex flex-col h-full bg-surface-elevated/20">
              <div className="h-48 w-full bg-slate-800 relative overflow-hidden flex items-center justify-center group">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 w-full h-full bg-slate-800 group-hover:scale-105 transition-transform duration-500">
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
                    <span key={tech} className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800/60">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:text-blue-400 transition-colors font-medium">
                      <ExternalLink size={16} /> Live Site
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors font-medium">
                      <GitBranch size={16} /> Source Code
                    </a>
                  )}
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
