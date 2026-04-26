import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Adaeze Okonkwo',  role: 'CTO, FinPay Nigeria',   initials: 'A', color: 'bg-[#7bd850] text-black', stars: 5, text: 'Chukwudi delivered our data pipeline 2 weeks early. Fraud losses dropped 89% in the first month. Exceptional talent.' },
  { name: 'Kolade Mensah',   role: 'VP Data, RetailCo',      initials: 'K', color: 'bg-blue-500 text-white',  stars: 5, text: 'The Azure warehouse reduced reporting from 8 hours to 15 minutes. Our sales team finally has real-time visibility they needed.' },
  { name: 'Sarah Thompson',  role: 'Founder, GrowthStack',   initials: 'S', color: 'bg-purple-500 text-white', stars: 5, text: 'Technically exceptional and never misses a deadline. He's the first developer I call for any new project. Highly recommended.' },
  { name: 'Olumide Adesanya',role: 'CMO, ShopEase Africa',   initials: 'O', color: 'bg-amber-500 text-black',  stars: 5, text: 'His segmentation model increased our email conversion by 31%. He explained every technical decision clearly to our team.' },
];

export default function Testimonials() {
  return (
    <section className="py-4">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-3">
          <Star size={13} /> TESTIMONIALS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-neutral-950 border border-white/10 rounded-2xl p-6 hover:border-[#7bd850]/20 transition-colors">
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} size={14} className="text-[#7bd850] fill-[#7bd850]" />
              ))}
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${t.color}`}>
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
