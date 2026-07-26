import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const { logout } = useAuth();

  const links = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/projects', icon: <Briefcase size={20} />, label: 'Projects' },
    { to: '/admin/posts', icon: <FileText size={20} />, label: 'Blog Posts' },
    { to: '/admin/leads', icon: <Users size={20} />, label: 'Leads' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-surface-elevated/40 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 hidden md:flex">
      <div className="p-6">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Admin Menu</h2>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-colors font-medium text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
