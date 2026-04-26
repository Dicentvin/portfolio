import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const timeline = [
  { period: '2022 – Present', title: 'Big Data Engineer',        company: 'Los Angeles · Google',    desc: '3+ years with Big Data & Cloud: Spark, Hive, Flink, Presto, Snowflake, MapReduce, YARN, AWS.' },
  { period: '2021 – 2022',   title: 'Data Warehouse Developer',  company: 'New York · Microsoft',    desc: 'AWS-based data warehouse with Tableau analytics for BI and reporting.' },
  { period: '2020 – 2021',   title: 'Junior Data Analyst',       company: 'Chicago · IBM',           desc: 'Analyzed large datasets, built dashboards, and assisted in ETL pipelines.' },
  { period: '2019 – 2020',   title: 'Intern Data Scientist',     company: 'Boston · Facebook',       desc: 'Assisted in building predictive models and cleaning large datasets.' },
  { period: '2018 – 2019',   title: 'Frontend Developer',        company: 'Austin · Twitter',        desc: 'Built responsive UI components and improved web performance.' },
  { period: '2017 – 2018',   title: 'UI/UX Designer',            company: 'Seattle · Amazon',        desc: 'Designed user interfaces and conducted usability testing.' },
];

const courses = [
  { year: '2017 - 2018', title: 'Michigan Technological Courses', location: 'Houghton',    desc: 'Michigan Technological University offers a B.S Computer Network.' },
  { year: '2016 - 2017', title: 'Computer Science Major',         location: 'New York',    desc: 'Management Information Systems, focusing on information systems design.' },
];
const edu = [
  { year: '2012 - 2016', title: 'BA in Computer Technologies', location: 'Carson, USA',       desc: 'Engineering design process to design, develop, test, maintain software.' },
  { year: '2004 - 2012', title: 'Whitney High School',          location: 'Los Angeles, USA', desc: 'Crafting captivating digital experiences that put users at the heart of design.' },
];

function Card({ year, title, location, desc }: { year: string; title: string; location: string; desc: string }) {
  return (
    <div className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
      <span className="text-xs text-[#7bd850] font-semibold tracking-wider">{year}</span>
      <h3 className="font-bold mt-1">{title}</h3>
      <p className="text-sm text-neutral-400 mt-0.5">{location}</p>
      <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{desc}</p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: typeof courses }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs tracking-widest text-neutral-400 uppercase mb-5">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => <Card key={i} year={item.year} title={item.title} location={item.location} desc={item.desc} />)}
      </div>
    </div>
  );
}

export default function WorkEducation() {
  const [page, setPage] = useState(0);
  const perPage  = 2;
  const total    = Math.ceil(timeline.length / perPage);
  const visible  = timeline.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-4">
      <span className="inline-flex items-center px-4 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wider text-[#7bd850] mb-4">
        Resume
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-8">Work Experience &amp; Education</h2>

      {/* Work experience slider */}
      <div className="mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {visible.map((item, i) => (
              <div key={i} className="bg-neutral-950 border border-white/10 rounded-2xl p-6">
                <span className="text-xs text-[#7bd850] font-semibold tracking-wider">{item.period}</span>
                <h3 className="font-bold mt-1">{item.title}</h3>
                <p className="text-sm text-neutral-400 mt-0.5">{item.company}</p>
                <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}
            className="p-2 rounded-full bg-neutral-800 hover:bg-[#7bd850] hover:text-black disabled:opacity-30 transition-all">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-neutral-400">{page + 1} / {total}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, total - 1))} disabled={page === total - 1}
            className="p-2 rounded-full bg-neutral-800 hover:bg-[#7bd850] hover:text-black disabled:opacity-30 transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Section title="Courses"   items={courses} />
      <Section title="Education" items={edu} />
    </section>
  );
}
