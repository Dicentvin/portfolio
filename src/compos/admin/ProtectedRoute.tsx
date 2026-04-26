import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
      <Loader2 size={28} className="animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}
