import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { submitContactMessage } from '../lib/db';

const CONTACTS = [
  { icon: <Phone size={20} />,   label: 'Phone',   value: '+234 812 111 16 68' },
  { icon: <Mail size={20} />,    label: 'Email',   value: 'andrewvincentfreelanceacademy@gmail.com' },
  { icon: <MapPin size={20} />,  label: 'Address', value: 'Lagos, Nigeria' },
];

function ContactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-neutral-950 border border-white/10 rounded-xl px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="p-2.5 border border-[#7bd850]/30 rounded-xl text-[#7bd850]">{icon}</div>
        <span className="text-sm text-neutral-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-right break-all max-w-[55%]">{value}</span>
    </div>
  );
}

function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-14 h-14 rounded-full bg-[#7bd850]/10 border-2 border-[#7bd850] flex items-center justify-center text-[#7bd850]">
        <CheckCircle2 size={28} />
      </div>
      <h3 className="text-xl font-bold">Message Sent!</h3>
      <p className="text-neutral-400 text-sm">Thanks for reaching out. I'll get back to you soon.</p>
      <button onClick={() => setStatus('idle')} className="text-sm text-[#7bd850] hover:underline mt-1">
        Send another message
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Your Name</label>
          <input name="name" value={form.name} onChange={handleChange} required
            placeholder="John Doe"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#7bd850] transition-colors" />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required
            placeholder="john@example.com"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#7bd850] transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-neutral-400 mb-2">Your Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
          placeholder="Tell me about your project..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#7bd850] transition-colors resize-none" />
      </div>
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'loading'}
        className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#7bd850] text-black font-bold hover:bg-[#7bd850]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading' ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Message</>}
      </button>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section className="py-4">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-800 border border-white/10 text-sm text-neutral-300 mb-3">
          <Mail size={13} /> CONTACT
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Let's Get in Touch!</h2>
      </div>

      <div className="space-y-3 mb-6">
        {CONTACTS.map((c, i) => <ContactCard key={i} {...c} />)}
      </div>

      <div className="bg-neutral-950 border border-white/10 rounded-2xl p-7">
        <h3 className="text-xl font-bold mb-6">Let's make your project brilliant!</h3>
        <ContactForm />
      </div>
    </section>
  );
}
