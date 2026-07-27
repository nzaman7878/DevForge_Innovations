import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/ui/Card';
import { Users, FileText, Briefcase, TrendingUp, FolderKanban } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({ stats: null, recentLeads: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsList = [
    { label: 'Public Projects', value: data.stats?.projects || 0, icon: <Briefcase className="text-blue-400" size={24} /> },
    { label: 'Client Projects', value: data.stats?.clientProjects || 0, icon: <FolderKanban className="text-indigo-400" size={24} /> },
    { label: 'Published Posts', value: data.stats?.posts || 0, icon: <FileText className="text-emerald-400" size={24} /> },
    { label: 'Total Leads', value: data.stats?.leads || 0, icon: <Users className="text-purple-400" size={24} /> },
    { label: 'Conversion Rate', value: data.stats?.conversionRate || '0%', icon: <TrendingUp className="text-amber-400" size={24} /> },
  ];

  if (loading) {
    return <div className="py-12 text-center text-slate-400">Loading dashboard...</div>;
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Admin'}</h1>
        <p className="text-slate-400">Here's what's happening with your agency today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {statsList.map((stat, idx) => (
          <Card key={idx} className="bg-surface-elevated/30 border-slate-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium whitespace-nowrap">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-surface-elevated/30 border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Recent Leads</h3>
            {data.recentLeads.length === 0 ? (
              <div className="text-sm text-slate-400">No recent leads found.</div>
            ) : (
              <ul className="space-y-4">
                {data.recentLeads.map((lead) => (
                  <li key={lead._id} className="flex justify-between items-center border-b border-slate-800 pb-3 last:border-0">
                    <div>
                      <p className="font-semibold text-slate-200">{lead.name}</p>
                      <p className="text-sm text-slate-400">{lead.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">
                      {lead.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card className="bg-surface-elevated/30 border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <Link to="/admin/projects" className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium hover:bg-primary/20 transition-colors">
                + New Project
              </Link>
              <Link to="/admin/posts" className="px-4 py-2 bg-slate-800 text-slate-300 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                + New Post
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
