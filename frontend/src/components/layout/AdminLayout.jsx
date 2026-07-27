import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-1 w-full h-full min-h-[calc(100vh-4rem)] relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-slate-800 text-white rounded-lg border border-slate-700 shadow-xl"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AdminSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <div className="flex-1 p-6 md:p-10 w-full overflow-x-hidden pt-16 md:pt-10">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
