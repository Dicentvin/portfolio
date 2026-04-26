import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { getBlogPosts, type BlogPost } from '../lib/db';

const CATEGORIES = ['All', 'Music', 'Design', 'Code'];

export default function BlogSection() {
  const [active, setActive]   = useState('All');
  const [posts, setPosts]     = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    getBlogPosts(true)
      .then(setPosts)
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active);

  return (
    <section className="py-4">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-3">
          <BookOpen size={13} /> MY BLOG
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Exploring Our Blog</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-7">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              active === cat
                ? 'bg-[#7bd850] text-black shadow-lg shadow-[#7bd850]/20'
                : 'bg-neutral-800 text-neutral-300 border border-white/5 hover:bg-neutral-700'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2 size={22} className="animate-spin mr-2" /> Loading posts...
        </div>
      )}
      {error && <p className="text-red-400 text-sm text-center py-10">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-neutral-500 text-center py-20">No posts found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(post => <BlogCard key={post.id} post={post} />)}
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 hover:border-[#7bd850]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#7bd850]/5 hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={post.image} alt={post.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-neutral-400">{post.date}</span>
          <span className="text-xs text-neutral-500">{post.read_time}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-[#7bd850] transition-colors">{post.title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
        <span className="flex items-center gap-1.5 text-sm text-[#7bd850] font-semibold">
          Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
