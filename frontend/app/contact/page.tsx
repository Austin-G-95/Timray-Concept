// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiArrowRight } from 'react-icons/fi';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative py-32 px-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center px-6 py-2 bg-zinc-900 border border-white/10 backdrop-blur-3xl rounded-full mb-10 animate-fadeIn">
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">Node Connection</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9] animate-slideUp">
            INITIATE <span className="text-indigo-500">COMMUNICATION</span>.
          </h1>
          <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Have questions about our artifacts or need synchronization assistance? Our core team is standing by.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Information */}
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tighter">THE NEXUS POINTS.</h2>
              <div className="space-y-10">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mr-6 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">IDENTITY MAIL</h3>
                    <p className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">support@timrayconcept.com</p>
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest mt-2">SYNC TIME: &lt; 2 HOURS</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mr-6 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">VOICE PROTOCOL</h3>
                    <p className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">+1 (555) TIM-RAYC</p>
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest mt-2">MON-FRI, 0900-1800 EST</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mr-6 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">CORE BASE</h3>
                    <p className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">123 Innovation Drive, SF</p>
                    <p className="text-zinc-600 text-xs font-black uppercase tracking-widest mt-2">BY PROTOCOL APPOINTMENT ONLY</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-20 p-10 bg-zinc-900/30 backdrop-blur-3xl rounded-[2.5rem] border border-white/5">
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">SYNCHRONIZATION WINDOWS</h3>
                <div className="space-y-4">
                  {[
                    ['MON - FRI', '09:00 - 18:00'],
                    ['SATURDAY', '10:00 - 16:00'],
                    ['SUNDAY', 'OFFLINE']
                  ].map(([day, hours], index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                      <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em]">{day}</span>
                      <span className="text-xs font-bold text-white">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-all duration-700" />

                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">ENCODE MESSAGE.</h2>
                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-10">WE RESPOND AT LIGHT SPEED</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">ORIGIN NAME</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:bg-white/5 text-white font-bold placeholder:text-zinc-700 transition-all"
                      placeholder="Enter identity"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">RETURN ADDRESS</label>
                    <input
                      type="email"
                      className="w-full px-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:bg-white/5 text-white font-bold placeholder:text-zinc-700 transition-all"
                      placeholder="you@nexus.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">SUBJECT PROTOCOL</label>
                    <select
                      className="w-full px-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:bg-white/5 text-white font-bold appearance-none transition-all"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    >
                      <option value="" className="bg-black">SELECT ARCHIVE</option>
                      <option value="support" className="bg-black">ARTIFACT SUPPORT</option>
                      <option value="sales" className="bg-black">SALES PROTOCOLS</option>
                      <option value="partnership" className="bg-black">ELITE PARTNERSHIP</option>
                      <option value="other" className="bg-black">OTHER TRANSMISSIONS</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">DATA TRANSMISSION</label>
                    <textarea
                      rows={4}
                      className="w-full px-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:bg-white/5 text-white font-bold placeholder:text-zinc-700 resize-none transition-all"
                      placeholder="How can we assist your synchronization today?"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-[0.98] group/btn overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      TRANSMIT DATA
                      <FiSend className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}