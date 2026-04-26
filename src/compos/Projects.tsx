import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { getProjects, type Project } from '../lib/db';

const FILTERS = ['ALL', 'SQL', 'PYTHON', 'AZURE', 'AWS'];

export default function ProjectsSection() {
  const [active, setActive]     = useState('ALL');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    getProjects(true)
      .then(setProjects)
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'ALL' ? projects : projects.filter(p => p.category.includes(active));

  return (
    <section className="py-4">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-3">
          <Briefcase size={13} /> PROJECTS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Explore Portfolio By Technology</h2>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-7">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              active === f
                ? 'bg-[#7bd850] text-black shadow-lg shadow-[#7bd850]/20'
                : 'bg-neutral-800 text-neutral-300 border border-white/5 hover:bg-neutral-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2 size={22} className="animate-spin mr-2" /> Loading projects...
        </div>
      )}
      {error && <p className="text-red-400 text-sm text-center py-10">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-neutral-500 text-center py-20">No projects found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={i === 0 && active === 'ALL'}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#7bd850]/40 transition-all duration-300 bg-neutral-950 ${
        featured ? 'sm:col-span-2 h-80' : 'h-60'
      }`}
    >
      <img
        src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

      {/* Year badge */}
      <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-xs text-neutral-300 backdrop-blur-sm">
        {project.year}
      </div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="flex gap-1.5 flex-wrap mb-3">
          {project.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-xs text-neutral-300 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[#7bd850] mb-1">{project.subtitle}</p>
            <h3 className={`font-bold text-white leading-tight ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
              {project.title}
            </h3>
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center group-hover:bg-[#7bd850] group-hover:border-[#7bd850] transition-all duration-300">
            <ArrowRight size={15} className="text-neutral-400 group-hover:text-black transition-colors -rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}
