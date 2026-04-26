import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../compos/Sidebar';

export default function Layout() {
  return (
    <div
      className="min-h-screen text-white relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-[#121212]/92" />
      <div className="relative z-10 max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-[auto_240px_1fr] gap-4 md:items-start">
        <Sidebar />
        <main className="min-w-0 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
