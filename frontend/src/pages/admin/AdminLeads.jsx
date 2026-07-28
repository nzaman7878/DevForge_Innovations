import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, Building2, User, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { LeadCardSkeleton } from '../../components/ui/Skeleton';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/leads`);
      setLeads(res.data);
    } catch (error) {
      console.error('Error fetching leads', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/leads/${id}/status`, { status: newStatus });
      toast.success('Lead status updated');
      fetchLeads();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/leads/${id}`);
        toast.success('Lead deleted');
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast.error('Error deleting lead');
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-primary/10 text-primary border-primary/20';
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Qualified': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Closed': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getScoreColor = (score) => {
    if (score === null || score === undefined) return 'text-slate-500';
    if (score >= 80) return 'text-emerald-400 font-bold';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lead Management</h1>
          <p className="text-slate-400">Review incoming inquiries and AI-scored prospects.</p>
        </div>
      </div>

      <div className="bg-surface-elevated/30 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div role="status" aria-live="polite" className="divide-y divide-slate-800/60">
            <span className="sr-only">Loading leads...</span>
            {Array.from({ length: 3 }).map((_, i) => <LeadCardSkeleton key={i} />)}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No leads yet. Inbox zero!</div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {leads.map(lead => (
              <div key={lead._id} className="p-6 hover:bg-slate-800/20 transition-colors">
                <div className="flex flex-col xl:flex-row gap-6">
                  
                  {/* Left Column: Core Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{lead.name}</h3>
                        <a href={`mailto:${lead.email}`} className="text-primary hover:underline text-sm">{lead.email}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-full border focus:outline-none appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button 
                          onClick={() => handleDelete(lead._id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {lead.company && (
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Building2 size={16} />
                        <span>{lead.company}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-4 mt-2">
                      {lead.projectType && (
                        <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {lead.projectType}
                        </div>
                      )}
                      {lead.budget && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                          Budget: {lead.budget}
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mt-4">
                      <div className="flex items-center gap-2 mb-2 text-slate-300">
                        <MessageSquare size={16} />
                        <span className="text-sm font-medium">Message</span>
                      </div>
                      <p className="text-slate-400 text-sm whitespace-pre-wrap">{lead.message}</p>
                    </div>
                  </div>

                  {/* Right Column: AI & Metadata */}
                  <div className="xl:w-64 flex flex-col gap-4 border-t xl:border-t-0 xl:border-l border-slate-800/60 pt-4 xl:pt-0 xl:pl-6">
                    <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-indigo-400 mb-2">
                        <Sparkles size={16} />
                        <span className="text-sm font-medium">Gemini AI Score</span>
                      </div>
                      <div className="text-3xl tracking-tighter">
                        {lead.aiScore !== null ? (
                          <span className={getScoreColor(lead.aiScore)}>{lead.aiScore}/100</span>
                        ) : (
                          <span className="text-slate-500 text-lg">Unscored</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {lead.aiScore >= 80 ? 'High Intent Prospect' : lead.aiScore >= 50 ? 'Moderate Intent' : lead.aiScore !== null ? 'Low Quality / Spam' : 'AI scoring unavailable'}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Received</p>
                      <p className="text-sm text-slate-300">{new Date(lead.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
