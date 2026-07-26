import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="flex flex-1 w-full h-full min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-10 w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
