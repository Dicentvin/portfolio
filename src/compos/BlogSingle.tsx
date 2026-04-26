import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from '../lib/db';

export default function BlogSingle() {
  const { slug }    = useParams<{ slug: string }>();
  const navigate    = useNavigate();
  const [post, setPost]       = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getBlogPostBySlug(slug)
      .then(async p => {
        if (!p) { setError('Post not found.'); return; }
        setPost(p);
        if (p.related?.length) {
          const all = await getBlogPosts(true);
          setRelated(all.filter(r => p.related!.includes(r.slug) && r.slug !== slug).slice(0, 2));
        }
      })
      .catch(() => setError('Failed to load post.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-neutral-400"><Loader2 className="animate-spin mr-2" size={22} />Loading...</div>;
  if (error || !post) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-neutral-400">
      <p>{error || 'Post not found.'}</p>
      <button onClick={() => navigate('/blog')} className="text-[#7bd850] text-sm hover:underline">← Back to Blog</button>
    </div>
  );

  return (
    <section className="py-4 max-w-3xl">
      <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-[#7bd850] transition-colors mb-6 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
      </button>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-7 h-64 md:h-80">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7bd850]/20 border border-[#7bd850]/40 text-[#7bd850] text-xs mb-3">
            <BookOpen size={11} /> {post.category?.toUpperCase()}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-7 pb-7 border-b border-white/10">
        <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
        <span className="flex items-center gap-1.5"><Clock size={13} /> {post.read_time}</span>
        <button className="flex items-center gap-1.5 ml-auto hover:text-[#7bd850] transition-colors">
          <Share2 size={13} /> Share
        </button>
      </div>

      {/* Excerpt */}
      <p className="text-lg text-neutral-300 leading-relaxed italic border-l-2 border-[#7bd850] pl-5 mb-7">{post.excerpt}</p>

      {/* Body */}
      <div className="space-y-5 mb-8">
        {post.content?.map((block, i) => {
          if (block.type === 'paragraph') return <p key={i} className="text-neutral-300 leading-relaxed text-[15px]">{block.text}</p>;
          if (block.type === 'heading')   return <h2 key={i} className="text-xl md:text-2xl font-bold text-white pt-3">{block.text}</h2>;
          if (block.type === 'quote')     return (
            <blockquote key={i} className="bg-neutral-800/50 border border-white/10 rounded-xl p-6 my-6">
              <p className="text-lg text-white italic font-medium">"{block.text}"</p>
            </blockquote>
          );
          return null;
        })}
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 py-6 border-t border-b border-white/10 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs hover:bg-neutral-700 transition-colors cursor-pointer">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-5">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.slug}`}
                className="group bg-neutral-800/50 hover:bg-neutral-800 border border-white/10 hover:border-[#7bd850]/40 rounded-xl overflow-hidden transition-all duration-300">
                <div className="h-32 overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-neutral-400 mb-1">{r.date}</p>
                  <h4 className="text-sm font-semibold group-hover:text-[#7bd850] transition-colors flex items-center justify-between">
                    {r.title} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
