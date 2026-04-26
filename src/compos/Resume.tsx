import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import { getResume, type ResumeData } from '../lib/db';

const FALLBACK: ResumeData = {
  name: 'Chukwudi Vincent', title: 'Data Scientist & Full Stack Developer',
  email: 'andrewvincentfreelanceacademy@gmail.com', phone: '+234 812 111 16 68',
  location: 'Lagos, Nigeria',
  summary: 'Passionate data scientist and full stack developer with 6+ years of experience building data-driven applications and scalable web systems.',
  experience: [
    { role: 'Senior Data Scientist', company: 'TechCorp Analytics', period: '2022 – Present', location: 'Lagos', bullets: ['Led end-to-end ML pipeline development', 'Built real-time dashboards for 50K+ users', 'Managed team of 3 data scientists'] },
    { role: 'Full Stack Developer',  company: 'DataBridge Solutions', period: '2020 – 2022', location: 'Abuja',  bullets: ['Architected B2B SaaS platform ($2M+ annually)', 'Integrated 12+ third-party APIs', 'Reduced page load time 65%'] },
  ],
  education: [
    { degree: 'B.Sc. Computer Science', school: 'University of Lagos', period: '2014 – 2018', note: 'First Class Honours' },
  ],
  skills: {
    'Languages & Frameworks': ['Python', 'TypeScript', 'React', 'Node.js', 'FastAPI'],
    'Data & ML': ['Pandas', 'NumPy', 'scikit-learn', 'TensorFlow', 'SQL', 'PostgreSQL'],
    'Cloud & DevOps': ['AWS', 'Azure', 'Docker', 'GitHub Actions'],
  },
  certifications: [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Azure Data Fundamentals',           issuer: 'Microsoft',           year: '2022' },
    { name: 'Professional Data Engineer',        issuer: 'Google Cloud',        year: '2021' },
  ],
};

export default function Resume() {
  const [data, setData] = useState<ResumeData>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResume().then(r => { if (r) setData(r); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-neutral-400"><Loader2 className="animate-spin mr-2" size={22} />Loading...</div>;

  return (
    <section className="py-4 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-2">RESUME</span>
          <h2 className="text-3xl md:text-4xl font-bold">My Resume</h2>
        </div>
        <div className="flex gap-3">
          <Link to="/resume/view" className="flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-800 border border-white/10 text-sm font-medium hover:border-[#7bd850]/40 transition-colors">
            <ExternalLink size={14} /> Full View
          </Link>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#7bd850] text-black text-sm font-bold hover:bg-[#7bd850]/90 transition-colors">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-[#7bd850] font-medium mt-1">{data.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-neutral-400">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Summary */}
      <Card title="Profile Summary">
        <p className="text-neutral-400 leading-relaxed text-sm">{data.summary}</p>
      </Card>

      {/* Experience */}
      <Card title="Experience">
        <div className="space-y-6">
          {data.experience.map((e, i) => (
            <div key={i} className="relative pl-5 border-l border-white/10">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#7bd850]" />
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <div><p className="font-semibold">{e.role}</p><p className="text-[#7bd850] text-sm">{e.company}</p></div>
                <div className="text-right"><span className="text-xs px-2 py-1 bg-neutral-800 rounded-full text-neutral-300">{e.period}</span><p className="text-xs text-neutral-500 mt-1">{e.location}</p></div>
              </div>
              <ul className="space-y-1">{e.bullets.map((b, j) => <li key={j} className="flex gap-2 text-sm text-neutral-400"><span className="text-[#7bd850]">›</span>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card title="Skills">
        <div className="space-y-4">
          {Object.entries(data.skills).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-neutral-800 border border-white/5 text-xs text-neutral-300 hover:border-[#7bd850]/30 hover:text-[#7bd850] transition-colors">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certifications */}
      <Card title="Certifications">
        <div className="space-y-3">
          {data.certifications.map((c, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-neutral-900 rounded-xl border border-white/5">
              <div><p className="text-sm font-semibold">{c.name}</p><p className="text-xs text-neutral-500">{c.issuer}</p></div>
              <span className="text-xs text-[#7bd850] font-semibold">{c.year}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-[#7bd850]/20 text-[#7bd850] text-xs font-semibold uppercase tracking-wider">{title}</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {children}
    </div>
  );
}
