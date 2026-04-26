import React from 'react';
import { Database, Wrench } from 'lucide-react';

const SKILLS = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',       title: 'Python',           pct: 95 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', title: 'PostgreSQL',       pct: 85 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',            title: 'Django',           pct: 80, bg: 'bg-white' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', title: 'JavaScript',       pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           title: 'React JS',         pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',         title: 'Next JS',          pct: 75, bg: 'bg-white' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',       title: 'Express JS',       pct: 75, bg: 'bg-white' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',title: 'Shadcn / Tailwind',pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',   title: 'Bootstrap',        pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',      title: 'Photoshop',        pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           title: 'HTML',             pct: 75 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',             title: 'CSS',              pct: 75 },
];

function SkillCard({ icon, title, pct, bg = '' }: { icon: string; title: string; pct: number; bg?: string }) {
  return (
    <div className="bg-neutral-950 rounded-2xl p-5 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${bg}`}>
            <img src={icon} alt={title} className="w-7 h-7 object-contain" />
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <span className="text-xs bg-neutral-800 px-2.5 py-1 rounded-full text-neutral-300">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#7bd850] rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function TechnologiesSection() {
  return (
    <section className="py-4">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-3">
          <Wrench size={14} /> TECHNICAL SKILLS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Technologies</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILLS.map(s => <SkillCard key={s.title} icon={s.icon} title={s.title} pct={s.pct} bg={s.bg} />)}
      </div>
      <div className="mt-8">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300">
          <Database size={14} /> TOOL SKILLS
        </span>
      </div>
    </section>
  );
}
