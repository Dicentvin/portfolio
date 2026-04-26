import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Award, Loader2 } from 'lucide-react';
import { getResume, type ResumeData } from '../lib/db';

const FALLBACK: ResumeData = {
  name: 'Chukwudi Vincent', title: 'Data Scientist & Full Stack Developer',
  email: 'andrewvincentfreelanceacademy@gmail.com', phone: '+234 812 111 16 68', location: 'Lagos, Nigeria',
  summary: 'Passionate data scientist and full stack developer with 6+ years of experience building data-driven applications and scalable web systems. Expert in Python, SQL, React, and cloud infrastructure.',
  experience: [
    { role: 'Senior Data Scientist', company: 'TechCorp Analytics', period: '2022 – Present', location: 'Lagos', bullets: ['Led end-to-end ML pipeline development reducing inference time 40%', 'Built real-time dashboards serving 50K+ daily users', 'Managed team of 3 junior data scientists'] },
    { role: 'Full Stack Developer',  company: 'DataBridge Solutions', period: '2020 – 2022', location: 'Abuja',  bullets: ['Architected B2B SaaS platform handling $2M+ annually', 'Integrated 12+ third-party APIs', 'Reduced page load time by 65%'] },
    { role: 'Junior Developer',      company: 'Freelance',            period: '2018 – 2020', location: 'Remote', bullets: ['Built 20+ client websites across e-commerce and SaaS', 'Data analysis for SMEs using Python and Excel'] },
  ],
  education: [
    { degree: 'B.Sc. Computer Science',         school: 'University of Lagos', period: '2014 – 2018', note: 'First Class Honours' },
    { degree: 'Data Science Certificate', school: 'Coursera / IBM',     period: '2019',        note: 'ML, Data Visualization, Python' },
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

export default function ResumeSingle() {
  const navigate = useNavigate();
  const [data, setData]     = useState<ResumeData>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResume().then(r => { if (r) setData(r); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[50vh] text-neutral-400"><Loader2 className="animate-spin mr-2" size={22} />Loading...</div>;

  return (
    <section className="py-4 space-y-3 max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/resume')} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-[#7bd850] transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Resume
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#7bd850] text-black text-sm font-bold hover:bg-[#7bd850]/90 transition-colors">
          <Download size={13} /> Download PDF
        </button>
      </div>

      {/* Header banner */}
      <div className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 border border-white/10 rounded-2xl p-7 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #7bd850 0%, transparent 50%), radial-gradient(circle at 80% 50%, #22d3ee 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-[#7bd850] font-semibold mt-1">{data.title}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-neutral-400">
            <span className="flex items-center gap-1.5"><Mail size={13} />{data.email}</span>
            <span className="flex items-center gap-1.5"><Phone size={13} />{data.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} />{data.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <ResCard icon={null} label="PROFILE SUMMARY">
        <p className="text-neutral-400 leading-relaxed text-sm">{data.summary}</p>
      </ResCard>

      {/* Experience */}
      <ResCard icon={<Briefcase size={13} />} label="EXPERIENCE">
        <div className="space-y-7 pl-2 border-l border-white/10">
          {data.experience.map((e, i) => (
            <div key={i} className="relative pl-4">
              <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-[#7bd850]" />
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <div><p className="font-semibold">{e.role}</p><p className="text-[#7bd850] text-sm">{e.company}</p></div>
                <div className="text-right"><span className="text-xs px-2.5 py-1 bg-neutral-800 rounded-full text-neutral-300 block">{e.period}</span><p className="text-xs text-neutral-500 mt-1">{e.location}</p></div>
              </div>
              <ul className="space-y-1.5">{e.bullets.map((b, j) => <li key={j} className="flex gap-2 text-sm text-neutral-400"><span className="text-[#7bd850] flex-shrink-0">›</span>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </ResCard>

      {/* Education */}
      <ResCard icon={<GraduationCap size={13} />} label="EDUCATION">
        <div className="space-y-3">
          {data.education.map((e, i) => (
            <div key={i} className="flex items-start justify-between gap-4 p-4 bg-neutral-900 rounded-xl border border-white/5">
              <div><p className="font-semibold text-sm">{e.degree}</p><p className="text-[#7bd850] text-sm">{e.school}</p><p className="text-xs text-neutral-500 mt-0.5">{e.note}</p></div>
              <span className="text-xs px-2.5 py-1 bg-neutral-800 rounded-full text-neutral-300 whitespace-nowrap flex-shrink-0">{e.period}</span>
            </div>
          ))}
        </div>
      </ResCard>

      {/* Skills */}
      <ResCard icon={<Code size={13} />} label="SKILLS">
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
      </ResCard>

      {/* Certifications */}
      <ResCard icon={<Award size={13} />} label="CERTIFICATIONS">
        <div className="space-y-3">
          {data.certifications.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl border border-white/5 hover:border-[#7bd850]/20 transition-colors">
              <div><p className="text-sm font-semibold">{c.name}</p><p className="text-xs text-neutral-500">{c.issuer}</p></div>
              <span className="text-xs text-[#7bd850] font-semibold">{c.year}</span>
            </div>
          ))}
        </div>
      </ResCard>
    </section>
  );
}

function ResCard({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-[#7bd850]/20 text-[#7bd850] text-xs font-semibold uppercase tracking-wider">
          {icon} {label}
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {children}
    </div>
  );
}
