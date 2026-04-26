import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800 border border-white/10 mb-4 text-[#7bd850]">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-neutral-500 text-sm mt-1">Portfolio CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 rounded-2xl p-7 space-y-4">
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="admin@example.com"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#7bd850] transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-[#7bd850] transition-colors pr-10" />
              <button type="button" onClick={() => setShowPw(p => !p)}
                className="absolute right-3 top-2.5 text-neutral-500 hover:text-white transition-colors">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#7bd850] text-black font-bold text-sm hover:bg-[#7bd850]/90 transition-colors disabled:opacity-60">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Logging in...</> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
