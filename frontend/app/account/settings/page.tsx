'use client';

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiShield, FiBell, FiEye } from 'react-icons/fi';

export default function SettingsPage() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-16">
                    <a href="/account" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all mb-8 group">
                        <FiArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Archive
                    </a>
                    <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                        <span className="w-8 h-[1px] bg-indigo-500" />
                        <span>Authorized Node</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                        NODE <br />
                        <span className="text-zinc-800">CONFIG.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Sidebar Nav */}
                    <div className="space-y-2">
                        {[
                            { name: 'Identity', icon: FiUser, active: true },
                            { name: 'Security', icon: FiShield, active: false },
                            { name: 'Archives', icon: FiBell, active: false },
                            { name: 'Privacy', icon: FiEye, active: false },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center space-x-4 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${item.active
                                    ? 'bg-white text-black'
                                    : 'bg-zinc-900/40 text-zinc-500 hover:text-white hover:bg-zinc-800'
                                    }`}
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Settings Body */}
                    <div className="md:col-span-2 space-y-10">
                        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-14">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-12">Core Identity</h2>

                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Operator Alias</label>
                                    <div className="relative group/input">
                                        <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            defaultValue={session.user.name || ''}
                                            className="w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-indigo-500/50 outline-none transition-all text-white font-bold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Communication Link</label>
                                    <div className="relative group/input">
                                        <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-white transition-colors" size={18} />
                                        <input
                                            type="email"
                                            disabled
                                            defaultValue={session.user.email || ''}
                                            className="w-full pl-14 pr-6 py-5 bg-black/20 border border-white/5 rounded-2xl text-zinc-600 font-bold opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="mt-3 ml-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest leading-relaxed">
                                        Primary link is restricted for security protocols. Contact Nexus Support to modify.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <button className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95">
                                        Commit Changes
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-500/5 border border-red-500/10 rounded-[3rem] p-10 md:p-14">
                            <h2 className="text-xl font-black text-red-500 uppercase tracking-tight mb-4">Sever Protocol</h2>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-8 leading-relaxed">
                                Terminating this node link is an irreversible operation. All archived data will be purged.
                            </p>
                            <button className="text-[10px] font-black text-red-500 underline uppercase tracking-widest hover:text-red-400 transition-colors">
                                Decommission Authorized Node
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
