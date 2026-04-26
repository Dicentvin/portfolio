import React from 'react';
import TypewriterText from './typewriter';
import StatItem from './StatItems';

export default function MainContent({ lines }: { lines: string[] }) {
  return (
    <main className="bg-neutral-950 rounded-2xl shadow-xl p-8 md:p-10 flex flex-col justify-center border border-white/10 min-h-[70vh]">
      <p className="text-lg mb-4">
        <span className="text-[#7bd850]"> Hello, I'm </span>{' '}
        <TypewriterText lines={lines} />
      </p>

      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
        Senior fullStack Developer &{' '}
        <span className="bg-[#7bd850] text-black px-3 py-1 rounded-lg inline-block">
          Software Developer
        </span>{' '}
        Based in Lagos state Nigeria.
      </h1>

      <p className="text-neutral-400 max-w-2xl mb-10 leading-relaxed">
        Have worked in a variety of project, including key frontend development,
        backend development, and fullStack development. Strong programming background
        combined with close collaboration with business customers.
      </p>

      <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
        <StatItem number="12"  label="Completed Projects" />
        <StatItem number="5"   label="Years of Experience" />
        <StatItem number="2+"  label="Awards Winning" />
      </div>
    </main>
  );
}
