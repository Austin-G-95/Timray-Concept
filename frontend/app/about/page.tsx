// app/about/page.tsx
import AboutSection from '@/components/AboutSection';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Banner for About Page */}
      <div className="relative py-32 px-4 bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center px-6 py-2 bg-zinc-900 border border-white/10 backdrop-blur-3xl rounded-full mb-10 animate-fadeIn">
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">TIMRAY ORIGIN</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9] animate-slideUp">
            REDEFINING <span className="text-indigo-500">EXCELLENCE</span>.
          </h1>
          <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Where innovation meets industrial craftsmanship. We're delivering experiences that transform how you interact with the digital world.
          </p>
        </div>
      </div>

      <AboutSection />


    </main>
  );
}