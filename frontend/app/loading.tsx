export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-t-2 border-l-2 border-indigo-500 rounded-full animate-spin" />
        <div className="absolute inset-0 border-r-2 border-b-2 border-zinc-800 rounded-full animate-spin-reverse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <div className="text-[10px] font-black text-white uppercase tracking-[0.3em] animate-pulse">
          Initializing Protocols
        </div>
        <div className="mt-2 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
          Syncing with Nexus
        </div>
      </div>
    </div>
  );
}
