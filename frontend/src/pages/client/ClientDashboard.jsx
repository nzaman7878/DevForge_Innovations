import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../ui/Button';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        // AuthContext automatically attaches the token
        const res = await axios.get('http://localhost:5000/api/client-projects/mine');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching client projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Planning': return <Clock size={20} className="text-amber-400" />;
      case 'Development': return <Briefcase size={20} className="text-blue-400" />;
      case 'Review': return <FileText size={20} className="text-purple-400" />;
      case 'Completed': return <CheckCircle size={20} className="text-emerald-400" />;
      default: return <Clock size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
            <p className="text-slate-400">Track your active projects and deliverables.</p>
          </div>
          <Button variant="ghost" onClick={logout}>Sign Out</Button>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading your projects...</div>
        ) : projects.length === 0 ? (
          <div className="bg-surface border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
            <Briefcase size={48} className="text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Active Projects</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              It looks like you don't have any active projects assigned to your account yet. Contact our team to get started.
            </p>
            <Button>Start a New Project</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project._id} className="bg-surface border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all shadow-xl group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-slate-700 transition-colors">
                      {getStatusIcon(project.status)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
                        {project.status}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-400 mb-8 line-clamp-2 min-h-[3rem]">
                  {project.description}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Project Progress</span>
                    <span className="font-medium text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <FileText size={16} />
                    <span>{project.documents?.length || 0} Documents shared</span>
                  </div>
                  <button className="text-primary hover:text-primary-light flex items-center gap-1 text-sm font-medium transition-colors">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
