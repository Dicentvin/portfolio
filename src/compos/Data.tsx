import React from 'react';
import { Database, ListChecks, Languages } from 'lucide-react';

const databases  = [{ name: 'MongoDb', pct: 90 }, { name: 'SQL', pct: 95 }, { name: 'PostgreSQL', pct: 75 }];
const languages  = [{ name: 'English', pct: 90, flag: '🇬🇧' }, { name: 'Igbo', pct: 60, flag: 'Ib' }, { name: 'Yoruba', pct: 30, flag: 'Yo' }];
const practices  = ['mongo database', 'Data Analysis', 'Data Preparation', 'microsoft SQL', 'Data Integration', 'web Development'];

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300">
      {icon} {label}
    </span>
  );
}

function CircleCard({ name, pct }: { name: string; pct: number }) {
  const r = 40, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="flex flex-col items-center gap-3 bg-neutral-950 rounded-2xl p-5 border border-white/5">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#1e1e1e" strokeWidth="8" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#7bd850" strokeWidth="8"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)" />
        <text x="50" y="54" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{pct}%</text>
      </svg>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

function LangRow({ name, pct, flag }: { name: string; pct: number; flag: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold flex-shrink-0">{flag}</span>
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1"><span>{name}</span><span className="text-neutral-400">{pct}%</span></div>
        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#7bd850] rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function GeneralSkillsSection() {
  return (
    <section className="py-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">General Skills</h2>
      <div className="mb-10">
        <Badge icon={<Database size={14} />} label="DATABASE" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {databases.map(d => <CircleCard key={d.name} name={d.name} pct={d.pct} />)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Badge icon={<Languages size={14} />} label="LANGUAGES" />
          <div className="mt-5 space-y-5">
            {languages.map(l => <LangRow key={l.name} {...l} />)}
          </div>
        </div>
        <div>
          <Badge icon={<ListChecks size={14} />} label="ENGINEERING PRACTICES" />
          <ul className="mt-5 space-y-3">
            {practices.map(p => (
              <li key={p} className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="text-[#7bd850] font-bold">✓</span> {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
