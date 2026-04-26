import React from 'react';

export default function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-4xl md:text-5xl font-bold text-[#7bd850]">{number}</span>
      <span className="text-sm text-neutral-400 text-center">{label}</span>
    </div>
  );
}
