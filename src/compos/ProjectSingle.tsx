import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Layers, CheckCircle2, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { getProjectBySlug, getProjects, type Project } from '../lib/db';

export default function ProjectSingle() {
  const { slug }  = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProjectBySlug(slug)
      .then(async p => {
        if (!p) { setError('Project not found.'); return; }
        setProject(p);
        if (p.related?.length) {
          const all = await getProjects(true);
          setRelated(all.filter(r => p.related!.includes(r.slug) && r.slug !== slug).slice(0, 2));
        }
      })
      .catch(() => setError('Failed to load project.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-neutral-400"><Loader2 className="animate-spin mr-2" size={22} />Loading...</div>;
  if (error || !project) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-neutral-400">
      <p>{error || 'Project not found.'}</p>
      <button onClick={() => navigate('/projects')} className="text-[#7bd850] text-sm hover:underline">← Back to Projects</button>
    </div>
  );

  return (
    <section className="py-4 max-w-3xl">
      <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-[#7bd850] transition-colors mb-6 group">
        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
      </button>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-6 h-60 md:h-80">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags?.slice(0, 4).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-neutral-200">{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
          <p className="text-neutral-400 text-sm mt-1">{project.subtitle}</p>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[['Role', project.role], ['Client', project.client], ['Duration', project.duration], ['Year', project.year]].map(([l, v]) => (
          <div key={l} className="bg-neutral-800/50 rounded-xl p-3 border border-white/5">
            <p className="text-xs text-neutral-500 mb-1">{l}</p>
            <p className="text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-8">
        <a href={project.live_url} className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#7bd850] text-black text-sm font-bold hover:bg-[#7bd850]/90 transition-colors">
          <ExternalLink size={13} /> Live Demo
        </a>
        <a href={project.github_url} className="flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-800 text-white text-sm font-medium border border-white/10 hover:bg-neutral-700 transition-colors">
          <Github size={13} /> View Code
        </a>
      </div>

      {/* Overview */}
      <Block label="OVERVIEW" icon={<Layers size={12} />}>
        <p className="text-neutral-300 leading-relaxed text-sm">{project.overview}</p>
      </Block>

      {/* Challenge / Solution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-neutral-800/40 border border-white/5 rounded-xl p-5">
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">The Challenge</p>
          <p className="text-sm text-neutral-300 leading-relaxed">{project.challenge}</p>
        </div>
        <div className="bg-neutral-800/40 border border-[#7bd850]/10 rounded-xl p-5">
          <p className="text-xs text-[#7bd850] uppercase tracking-widest mb-3">The Solution</p>
          <p className="text-sm text-neutral-300 leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Outcomes */}
      <Block label="KEY OUTCOMES" icon={<CheckCircle2 size={12} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.outcomes?.map((o, i) => (
            <div key={i} className="flex gap-3 p-3 bg-neutral-800/40 rounded-xl border border-white/5">
              <span className="text-[#7bd850] mt-0.5 flex-shrink-0">✓</span>
              <p className="text-sm text-neutral-300">{o}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* Tech Stack */}
      <Block label="TECH STACK" icon={<Tag size={12} />}>
        <div className="space-y-4">
          {Object.entries(project.tech_stack || {}).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-xs text-neutral-500 mb-2">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map(item => (
                  <span key={item} className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs border border-white/5 hover:border-[#7bd850]/30 hover:text-[#7bd850] transition-colors">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <div className="grid grid-cols-2 gap-4 my-8">
          {project.gallery.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden h-40">
              <img src={img} alt={`screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-5">More Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(rel => (
              <Link key={rel.id} to={`/projects/${rel.slug}`}
                className="group relative rounded-xl overflow-hidden h-44 border border-white/10 hover:border-[#7bd850]/40 transition-all duration-300">
                <img src={rel.image} alt={rel.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-[#7bd850] mb-0.5">{rel.subtitle}</p>
                    <h4 className="text-sm font-semibold">{rel.title}</h4>
                  </div>
                  <ArrowRight size={15} className="text-neutral-400 group-hover:text-[#7bd850] -rotate-45 transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Block({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-[#7bd850] text-xs font-semibold border border-[#7bd850]/20 uppercase tracking-wider">
          {icon} {label}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {children}
    </div>
  );
}
