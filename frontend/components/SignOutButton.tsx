'use client';

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center px-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300 group"
        >
            <FiLogOut className="mr-3 group-hover:translate-x-1 transition-transform" />
            Sign Out
        </button>
    );
}
