// components/AboutSection.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiCheck,
  FiUsers,
  FiPackage,
  FiAward,
  FiGlobe,
  FiStar,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiChevronRight,
  FiArrowRight
} from 'react-icons/fi';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'MISSION', icon: FiStar },
    { id: 'values', label: 'VALUES', icon: FiCheck },
    { id: 'story', label: 'STORY', icon: FiTrendingUp },
  ];

  const stats = [
    { number: '500+', label: 'CORE PRODUCTS', icon: FiPackage },
    { number: '10K+', label: 'ACTIVE NODES', icon: FiUsers },
    { number: '50+', label: 'ELITE PARTNERS', icon: FiAward },
    { number: '24/7', label: 'SYNC SUPPORT', icon: FiClock },
  ];

  const values = [
    {
      title: 'ABSOLUTE QUALITY',
      description: 'Every artifact undergoes rigorous testing to meet our core protocols.',
      icon: FiStar,
      color: 'text-indigo-400 bg-white/5'
    },
    {
      title: 'NODE CENTRIC',
      description: 'Your synchronization is our priority. We listen, adapt, and deliver.',
      icon: FiUsers,
      color: 'text-indigo-400 bg-white/5'
    },
    {
      title: 'RAPID INNOVATION',
      description: 'Constantly exploring new dimensions to bring you the future.',
      icon: FiTrendingUp,
      color: 'text-indigo-400 bg-white/5'
    },
    {
      title: 'TRANSPARENT CORE',
      description: 'Honest pricing, clear protocols, and reliable after-sync support.',
      icon: FiShield,
      color: 'text-indigo-400 bg-white/5'
    },
  ];

  const teamMembers = [
    {
      name: 'Timothy Akubo',
      role: 'CEO & FOUNDER',
      description: 'Visionary leader with 15+ years in tech innovation and business strategy.',
      initials: 'TA'
    },
    {
      name: 'Adaora Okafor',
      role: 'PRODUCT SYNC',
      description: 'Former product lead at major tech companies, expert in user experience.',
      initials: 'AO'
    },
    {
      name: 'Chinedu Okwu',
      role: 'TECH DIRECTOR',
      description: 'Expert in hardware innovation and product development systems.',
      initials: 'CO'
    },
    {
      name: 'Austin-Great Akubo',
      role: 'WEB DEVELOPER',
      description: 'Full-stack developer specializing in modern web technologies and user interfaces.',
      initials: 'AA'
    },
  ];

  const milestones = [
    { year: '2018', title: 'CORE GENESIS', description: 'Timray Concept started in a small workspace' },
    { year: '2019', title: 'ALPHA LAUNCH', description: 'Launched our first premium product line' },
    { year: '2020', title: 'GLOBAL SYNC', description: 'Built our e-commerce platform' },
    { year: '2021', title: 'ELITE STATUS', description: 'Won "Best Tech Retailer" award' },
    { year: '2022', title: 'CROSS BORDER', description: 'Started international deliveries' },
    { year: '2023', title: '10K MILESTONE', description: 'Reached milestone of 10,000+ customers' },
  ];

  return (
    <section className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-1.5 bg-zinc-900 border border-white/5 rounded-full mb-8">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">The Architecture</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
            REDEFINING THE <span className="text-indigo-500">DIGITAL NEXUS</span>.
          </h2>
          <p className="text-zinc-500 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            We're not just another tech retailer. We're curators of innovation, dedicated to bringing you
            the most advanced and reliable technology products that enhance your daily life.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/5 transition-all duration-500 group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-black mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.number}</div>
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
          {/* Left Column - Image/Text */}
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-[3rem] blur-3xl group-hover:bg-indigo-500/30 transition-all duration-1000 -z-10" />
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl relative">
              <FiGlobe className="w-24 h-24 text-indigo-500/20 absolute -right-4 -top-4" />
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">GLOBAL VISION.</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                At Timray Concept, we believe technology should be accessible, reliable, and transformative.
                We carefully select each product in our collection, ensuring it meets our standards for
                performance, design, and value.
              </p>
              <div className="flex items-center space-x-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                <div className="h-[1px] flex-1 bg-white/5"></div>
                <span>ESTABLISHED 2018</span>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div>
            {/* Tab Navigation */}
            <div className="flex p-1.5 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl mb-12">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center py-4 px-4 rounded-xl transition-all duration-500 ${isActive
                      ? 'bg-white text-black shadow-2xl'
                      : 'text-zinc-500 hover:text-white'}`}
                  >
                    <Icon className="mr-3" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px] flex flex-col justify-center animate-fadeIn">
              {activeTab === 'mission' && (
                <div className="animate-slideIn">
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Access Humanity.</h3>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                    To democratize access to premium technology by providing carefully curated products,
                    exceptional customer service, and educational resources that empower people to make
                    informed tech decisions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Curated Artifacts', 'Elite Support', 'Core Knowledge', 'Future Drive'].map((item, index) => (
                      <div key={index} className="flex items-center text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-6 py-4 rounded-xl border border-white/5">
                        <FiCheck className="text-indigo-400 mr-4" size={16} strokeWidth={3} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="animate-slideIn">
                  <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">Core Protocols.</h3>
                  <div className="grid gap-4">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div key={index} className="flex items-center p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                          <div className={`p-4 rounded-xl ${value.color} mr-6 group-hover:scale-110 transition-transform`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white mb-1 uppercase tracking-widest">{value.title}</h4>
                            <p className="text-zinc-500 text-xs font-medium">{value.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="animate-slideIn">
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">The Genesis.</h3>
                  <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                    What started as a passion project between tech enthusiasts has grown into a trusted
                    destination for premium technology. Founded in 2018, we've remained committed to our
                    original vision.
                  </p>
                  <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                    <h4 className="text-[10px] font-black text-zinc-600 mb-8 uppercase tracking-[0.3em]">CHRONOLOGY</h4>
                    <div className="grid gap-6">
                      {milestones.slice(0, 3).map((milestone, index) => (
                        <div key={index} className="flex items-center group">
                          <div className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors w-20">{milestone.year}</div>
                          <div className="ml-6 border-l border-white/10 pl-6 py-1">
                            <div className="text-[10px] font-black text-white uppercase tracking-widest">{milestone.title}</div>
                            <div className="text-zinc-600 text-[10px] font-medium uppercase tracking-widest mt-1">{milestone.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">THE CORE COUNCIL.</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
              A passionate team of tech enthusiasts, product experts, and customer advocates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 text-center hover:bg-white/5 transition-all duration-500 group">
                <div className="relative w-24 h-24 mx-auto mb-8">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-full h-full rounded-full bg-white text-black flex items-center justify-center border-4 border-zinc-900">
                    <span className="text-2xl font-black tracking-tighter">{member.initials}</span>
                  </div>
                </div>
                <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{member.name}</h3>
                <div className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{member.role}</div>
                <p className="text-zinc-600 text-xs font-medium leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Integration in Page, but we upgrade Footer separately */}
        {/* Let's simplify the bottom of AboutSection to lead back to products */}

        <div className="pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900/30 p-12 rounded-[3rem] border border-white/5">
            <div className="mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Initiate Synchronization?</h2>
              <p className="text-zinc-500 font-medium">Discover our curated collection of premium tech artifacts.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/products"
                className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl flex items-center justify-center group"
              >
                Explore Collection
                <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link
                href="/contact"
                className="px-10 py-5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                Access Support
              </Link>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}