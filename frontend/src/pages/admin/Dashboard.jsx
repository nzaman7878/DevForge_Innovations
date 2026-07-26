import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardContent } from '../../components/ui/Card';
import { Users, FileText, Briefcase, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Projects', value: '12', icon: <Briefcase className="text-blue-400" size={24} /> },
    { label: 'Published Posts', value: '8', icon: <FileText className="text-emerald-400" size={24} /> },
    { label: 'Active Leads', value: '24', icon: <Users className="text-purple-400" size={24} /> },
    { label: 'Conversion Rate', value: '4.2%', icon: <TrendingUp className="text-amber-400" size={24} /> },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Admin'}</h1>
        <p className="text-slate-400">Here's what's happening with your agency today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-surface-elevated/30 border-slate-800">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-surface-elevated/30 border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Recent Leads</h3>
            <div className="text-sm text-slate-400">No recent leads found.</div>
          </CardContent>
        </Card>
        <Card className="bg-surface-elevated/30 border-slate-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium hover:bg-primary/20 transition-colors">
                + New Project
              </button>
              <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
                + New Post
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
