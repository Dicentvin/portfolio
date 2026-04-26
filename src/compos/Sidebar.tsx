import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  User, Code, Briefcase, FolderOpen, GraduationCap,
  FileText, BookOpen, Star, MessageSquare,
  Linkedin, Github, Twitter, Dribbble,
  Download, Send, Menu, X,
} from 'lucide-react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.png';

const NAV = [
  { icon: <User size={18} />,         to: '/',              label: 'About'        },
  { icon: <Code size={18} />,         to: '/skills',        label: 'Skills'       },
  { icon: <Briefcase size={18} />,    to: '/works',         label: 'Works'        },
  { icon: <FolderOpen size={18} />,   to: '/projects',      label: 'Projects'     },
  { icon: <GraduationCap size={18} />,to: '/education',     label: 'Education'    },
  { icon: <FileText size={18} />,     to: '/resume',        label: 'Resume'       },
  { icon: <BookOpen size={18} />,     to: '/blog',          label: 'Blog'         },
  { icon: <Star size={18} />,         to: '/testimonials',  label: 'Testimonials' },
  { icon: <MessageSquare size={18} />,to: '/contact',       label: 'Contact'      },
];

const IMAGES  = [img2, img1];
const ROLES   = ['Software Engineer', 'Data Scientist', 'FullStack Developer', 'Graphic Designer'];

// ── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx]       = useState(0);
  const [char, setChar]     = useState(0);
  const [text, setText]     = useState('');
  const [deleting, setDel]  = useState(false);

  useEffect(() => {
    const cur   = texts[idx];
    const speed = deleting ? 45 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = cur.substring(0, char + 1);
        setText(next);
        setChar(c => c + 1);
        if (char + 1 === cur.length) setTimeout(() => setDel(true), 1600);
      } else {
        const next = cur.substring(0, char - 1);
        setText(next);
        setChar(c => c - 1);
        if (char - 1 === 0) {
          setDel(false);
          setIdx(i => (i + 1) % texts.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [char, deleting, idx, texts]);

  return (
    <span className="text-[#7bd850] font-semibold text-sm">
      {text}<span className="animate-blink">|</span>
    </span>
  );
}

// ── Social button ─────────────────────────────────────────────────────────────
const Social = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center text-white hover:bg-[#7bd850] hover:text-black transition-all duration-200">
    {icon}
  </a>
);

// ── Main Sidebar component ────────────────────────────────────────────────────
export default function Sidebar() {
  const navigate        = useNavigate();
  const [imgIdx, setImgIdx]   = useState(0);
  const [menuOpen, setMenu]   = useState(false);

  // Image crossfade
  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── COL 1: Icon nav (desktop only) ─────────────────────────────── */}
      <nav className="hidden md:flex flex-col gap-1 bg-[#1e1e1f] p-3 rounded-xl border border-white/5 shadow-2xl sticky top-4 h-fit">
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
              ${isActive ? 'text-[#7bd850] bg-white/10' : 'text-neutral-500 hover:text-white hover:bg-white/8'}`
            }
          >
            {item.icon}
            <span className="absolute left-full ml-3 px-2 py-1 bg-white text-black text-xs font-semibold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── COL 2: Profile card ─────────────────────────────────────────── */}
      <aside className="bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl sticky top-4 h-fit hidden md:block">
        {/* Crossfading images */}
        <div className="relative w-full h-72 overflow-hidden bg-neutral-900">
          {IMAGES.map((img, i) => (
            <img
              key={i} src={img} alt="profile"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${i === imgIdx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        <div className="p-5 flex flex-col items-center text-center">
          <h2 className="text-lg font-bold tracking-tight">CHUKWUDI VINCENT</h2>
          <div className="mt-1.5"><Typewriter texts={ROLES} /></div>
          <div className="flex gap-2 mt-3">
            <Social icon={<Linkedin size={14} />} />
            <Social icon={<Github size={14} />} />
            <Social icon={<Twitter size={14} />} />
            <Social icon={<Dribbble size={14} />} />
          </div>
        </div>

        <div className="flex border-t border-white/10">
          <button className="flex-1 py-3.5 text-xs font-medium flex items-center justify-center gap-1.5 text-neutral-400 hover:text-[#7bd850] transition-colors">
            <Download size={13} /> Download CV
          </button>
          <div className="w-px bg-white/10" />
          <button onClick={() => navigate('/contact')} className="flex-1 py-3.5 text-xs font-medium flex items-center justify-center gap-1.5 text-neutral-400 hover:text-[#7bd850] transition-colors">
            <Send size={13} /> Contact Me
          </button>
        </div>
      </aside>

      {/* ── MOBILE: full-width header card ──────────────────────────────── */}
      <div className="md:hidden col-span-full bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {/* Image on top */}
        <div className="relative w-full h-72 overflow-hidden bg-neutral-900">
          {IMAGES.map((img, i) => (
            <img
              key={i} src={img} alt="profile"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${i === imgIdx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* Name + role + socials + hamburger */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold truncate">CHUKWUDI VINCENT</h2>
            <div className="mt-0.5"><Typewriter texts={ROLES} /></div>
            <div className="flex gap-2 mt-2">
              <Social icon={<Linkedin size={12} />} />
              <Social icon={<Github size={12} />} />
              <Social icon={<Twitter size={12} />} />
              <Social icon={<Dribbble size={12} />} />
            </div>
          </div>
          <button
            onClick={() => setMenu(o => !o)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition flex-shrink-0"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Slide-down nav */}
        <div className={`overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="border-t border-white/10 p-3 flex flex-col gap-0.5">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive ? 'text-[#7bd850] bg-white/8' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex border-t border-white/10">
          <button className="flex-1 py-3 text-xs font-medium flex items-center justify-center gap-1.5 text-neutral-400 hover:text-[#7bd850] transition-colors">
            <Download size={13} /> Download CV
          </button>
          <div className="w-px bg-white/10" />
          <button onClick={() => navigate('/contact')} className="flex-1 py-3 text-xs font-medium flex items-center justify-center gap-1.5 text-neutral-400 hover:text-[#7bd850] transition-colors">
            <Send size={13} /> Contact Me
          </button>
        </div>
      </div>
    </>
  );
}
