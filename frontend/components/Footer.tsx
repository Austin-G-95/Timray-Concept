'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub, FiArrowRight, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative bg-black text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Decorative gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">

          {/* Brand & Philosophy */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-white/10">
                <span className="text-black font-black text-xl">T</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">TIMRAY<span className="text-indigo-500">.</span>CONCEPT</span>
            </Link>
            <p className="text-zinc-500 text-lg leading-relaxed max-w-md mb-10 font-medium">
              We define the intersection of technology and luxury. Our mission is to curate personal tools that empower creativity and simplify complexity for the modern professional.
            </p>
            <div className="flex items-center space-x-6">
              {[
                { icon: <FiInstagram />, label: 'Instagram' },
                { icon: <FiTwitter />, label: 'Twitter' },
                { icon: <FiFacebook />, label: 'Facebook' },
                { icon: <FiGithub />, label: 'Github' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <span className="text-lg transition-transform group-hover:scale-110">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">COLLECTIONS</h3>
              <ul className="space-y-4">
                {['Audio', 'Wearables', 'Laptops', 'Gaming'].map((item) => (
                  <li key={item}>
                    <Link href={`/products?category=${item}`} className="text-zinc-500 hover:text-white transition-colors flex items-center group text-sm font-bold">
                      <span className="w-0 group-hover:w-4 h-[1px] bg-indigo-500 mr-0 group-hover:mr-3 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">EXPERIENCE</h3>
              <ul className="space-y-4">
                {['Our Story', 'Tech Showcase', 'Collaborations', 'Ambassadors'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-zinc-500 hover:text-white transition-colors flex items-center group text-sm font-bold">
                      <span className="w-0 group-hover:w-4 h-[1px] bg-indigo-500 mr-0 group-hover:mr-3 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-8">RESOURCES</h3>
              <ul className="space-y-4">
                {['Shipping', 'Warranty', 'Help Center', 'Returns'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-zinc-500 hover:text-white transition-colors flex items-center group text-sm font-bold">
                      <span className="w-0 group-hover:w-4 h-[1px] bg-indigo-500 mr-0 group-hover:mr-3 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="relative p-8 md:p-12 rounded-[3rem] bg-indigo-600 overflow-hidden mb-24 group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">JOIN THE<br /> INNER CIRCLE.</h3>
              <p className="text-indigo-100 font-medium">Get early access to exclusive drops and premium tech insights.</p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="relative group/input">
                <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within/input:text-white transition-colors" />
                <input
                  type="email"
                  placeholder="Your premium email"
                  className="bg-white/10 border border-white/20 rounded-2xl px-14 py-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 w-full sm:w-80 backdrop-blur-md transition-all"
                />
              </div>
              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-8 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
            <Link href="/privacy" className="hover:text-indigo-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-500 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-indigo-500 transition-colors">Cookies</Link>
          </div>

          <p className="text-[10px] font-black tracking-[0.2em] text-zinc-600 uppercase">
            © {new Date().getFullYear()} TIMRAY CONCEPT • CRAFTED FOR THE BOLD
          </p>

          <div className="flex items-center space-x-2 text-[10px] font-black tracking-widest text-zinc-600 uppercase">
            <span>Powered by</span>
            <span className="text-white">Next.js</span>
            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
            <span className="text-white">Prisma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}