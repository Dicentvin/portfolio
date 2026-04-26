import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import {
  LogOut, BookOpen, FolderOpen, MessageSquare, FileText,
  Plus, Trash2, Eye, EyeOff, Loader2, CheckCircle2, RefreshCw, Circle,
} from 'lucide-react';
import {
  getBlogPosts, deleteBlogPost, saveBlogPost,
  getProjects, deleteProject,
  getMessages, markMessageRead, deleteMessage,
  getResume, saveResume,
  type BlogPost, type Project, type ContactMessage, type ResumeData,
} from '../../lib/db';
import { supabase } from '../../lib/supabase';

type Tab = 'blog' | 'projects' | 'messages' | 'resume';

const TABS: { key: Tab; icon: React.ReactNode; label: string }[] = [
  { key: 'blog',     icon: <BookOpen size={16} />,      label: 'Blog Posts' },
  { key: 'projects', icon: <FolderOpen size={16} />,    label: 'Projects'   },
  { key: 'messages', icon: <MessageSquare size={16} />, label: 'Messages'   },
  { key: 'resume',   icon: <FileText size={16} />,       label: 'Resume'    },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [tab, setTab]    = useState<Tab>('blog');

  if (!user) { navigate('/admin'); return null; }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between bg-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#7bd850]" />
          <span className="font-bold text-sm">Portfolio CMS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500 hidden sm:block">{user.email}</span>
          <button onClick={async () => { await logout(); navigate('/admin'); }}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-14 sm:w-52 border-r border-white/10 flex flex-col gap-1 p-2 sm:p-3 bg-neutral-900 flex-shrink-0">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-3 px-2 sm:px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                tab === t.key
                  ? 'bg-[#7bd850]/10 text-[#7bd850] border border-[#7bd850]/20'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}>
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto p-5 sm:p-7">
          {tab === 'blog'     && <BlogTab />}
          {tab === 'projects' && <ProjectsTab />}
          {tab === 'messages' && <MessagesTab />}
          {tab === 'resume'   && <ResumeTab />}
        </main>
      </div>
    </div>
  );
}

// ─── Blog Tab ─────────────────────────────────────────────────────────────────
function BlogTab() {
  const [posts, setPosts]       = useState<BlogPost[]>([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getBlogPosts(false).then(setPosts).finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const toggle = async (post: BlogPost) => {
    await saveBlogPost({ ...post, published: !post.published });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    setDeleting(id);
    await deleteBlogPost(id);
    load();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Blog Posts</h2>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
            <RefreshCw size={14} />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7bd850] text-black text-sm font-bold hover:bg-[#7bd850]/90 transition-colors">
            <Plus size={13} /> New Post
          </button>
        </div>
      </div>

      {loading ? <Spinner /> : posts.length === 0 ? <Empty msg="No blog posts yet. Add them via Supabase Studio → blog_posts table." /> : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="flex items-center gap-3 p-4 bg-neutral-900 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <img src={post.image} alt="" className="w-11 h-11 rounded-lg object-cover flex-shrink-0 bg-neutral-800" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{post.title}</p>
                <p className="text-xs text-neutral-500">{post.date} · {post.category}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggle(post)} title={post.published ? 'Unpublish' : 'Publish'}
                  className={`p-1.5 rounded-lg transition-colors ${post.published ? 'text-[#7bd850] hover:bg-[#7bd850]/10' : 'text-neutral-500 hover:bg-white/5'}`}>
                  {post.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => remove(post.id!)} disabled={deleting === post.id}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  {deleting === post.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-neutral-600 mt-5">
        Add posts via Supabase Studio → blog_posts table. Required columns: slug, title, date, read_time, category, image, excerpt, content (jsonb), tags (text[]), published.
      </p>
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getProjects(false).then(setProjects).finally(() => setLoading(false));
  }, []);

  useEffect(load, [load]);

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    await deleteProject(id);
    load();
    setDeleting(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Projects</h2>
        <button onClick={load} className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
          <RefreshCw size={14} />
        </button>
      </div>

      {loading ? <Spinner /> : projects.length === 0 ? <Empty msg="No projects yet. Add them via Supabase Studio → projects table." /> : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-4 bg-neutral-900 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <img src={p.image} alt="" className="w-11 h-11 rounded-lg object-cover flex-shrink-0 bg-neutral-800" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{p.title}</p>
                <p className="text-xs text-neutral-500">{p.year} · {p.category?.join(', ')}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  p.published ? 'bg-[#7bd850]/10 text-[#7bd850] border border-[#7bd850]/20' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {p.published ? 'Live' : 'Draft'}
                </span>
                <button onClick={() => remove(p.id!)} disabled={deleting === p.id}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  {deleting === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-neutral-600 mt-5">
        Add projects via Supabase Studio → projects table. Required columns: slug, title, subtitle, category (text[]), image, year, duration, role, client, tags (text[]), overview, challenge, solution, outcomes (text[]), tech_stack (jsonb), gallery (text[]), live_url, github_url, published, order.
      </p>
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(() => {
    getMessages().then(msgs => { setMessages(msgs); setLoading(false); });
  }, []);

  useEffect(() => {
    load();
    // Supabase Realtime — subscribe to new messages
    const channel = supabase
      .channel('contact_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, load)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [load]);

  const expand = async (msg: ContactMessage) => {
    setExpanded(expanded === msg.id ? null : msg.id!);
    if (!msg.read) { await markMessageRead(msg.id!); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    load();
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold">Messages</h2>
        {unread > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-[#7bd850] text-black text-xs font-bold">
            {unread} new
          </span>
        )}
        <button onClick={load} className="p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors ml-auto">
          <RefreshCw size={14} />
        </button>
      </div>

      {loading ? <Spinner /> : messages.length === 0 ? <Empty msg="No messages yet." /> : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`bg-neutral-900 border rounded-xl overflow-hidden transition-colors ${!msg.read ? 'border-[#7bd850]/30' : 'border-white/5'}`}>
              <button onClick={() => expand(msg)} className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left">
                {!msg.read
                  ? <Circle size={8} className="text-[#7bd850] fill-[#7bd850] flex-shrink-0" />
                  : <Circle size={8} className="text-neutral-700 flex-shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${!msg.read ? 'font-semibold' : 'text-neutral-300'}`}>{msg.name}</p>
                  <p className="text-xs text-neutral-500 truncate">
                    {msg.email} · {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : '—'}
                  </p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); remove(msg.id!); }}
                  className="p-1.5 rounded-lg text-neutral-600 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </button>
              {expanded === msg.id && (
                <div className="px-4 pb-4 border-t border-white/5 pt-3">
                  <p className="text-sm text-neutral-300 leading-relaxed">{msg.message}</p>
                  <a href={`mailto:${msg.email}`}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#7bd850] hover:underline">
                    Reply to {msg.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Resume Tab ───────────────────────────────────────────────────────────────
function ResumeTab() {
  const [data, setData]       = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    getResume().then(r => { if (r) setData(r); }).finally(() => setLoading(false));
  }, []);

  const update = (field: keyof ResumeData, value: string) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      await saveResume(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (!data)   return <Empty msg="No resume data. Run the SQL seed or add a row to the resume table in Supabase Studio." />;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Resume</h2>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            saved
              ? 'bg-neutral-800 text-[#7bd850] border border-[#7bd850]/30 cursor-default'
              : 'bg-[#7bd850] text-black hover:bg-[#7bd850]/90 disabled:opacity-60'
          }`}>
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
           : saved  ? <><CheckCircle2 size={14} /> Saved!</>
           : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-4">
        {(['name', 'title', 'email', 'phone', 'location'] as (keyof ResumeData)[]).map(field => (
          <div key={field}>
            <label className="block text-xs text-neutral-400 capitalize mb-1.5">{field}</label>
            <input
              value={(data[field] as string) || ''}
              onChange={e => update(field, e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7bd850] transition-colors"
            />
          </div>
        ))}
        <div>
          <label className="block text-xs text-neutral-400 mb-1.5">Summary</label>
          <textarea
            value={data.summary || ''}
            onChange={e => update('summary', e.target.value)}
            rows={4}
            className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7bd850] transition-colors resize-none"
          />
        </div>
        <p className="text-xs text-neutral-600">
          For experience, education, skills and certifications — edit directly in Supabase Studio (JSONB columns).
        </p>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Spinner = () => (
  <div className="flex items-center justify-center py-20 text-neutral-400">
    <Loader2 size={22} className="animate-spin mr-2" /> Loading...
  </div>
);

const Empty = ({ msg }: { msg: string }) => (
  <div className="flex items-center justify-center py-20 text-neutral-500 text-sm text-center">{msg}</div>
);
