export default function Loading() {
    return (
        <div className="min-h-screen bg-black pt-32 px-4 flex justify-center">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                    <div className="space-y-6">
                        <div className="w-32 h-8 bg-zinc-900 rounded-full animate-pulse" />
                        <div className="w-96 h-20 bg-zinc-900 rounded-3xl animate-pulse" />
                        <div className="w-64 h-4 bg-zinc-900 rounded-full animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 h-96 bg-zinc-900/30 rounded-[3rem] animate-pulse border border-white/5" />
                    <div className="h-96 bg-zinc-900/30 rounded-[3rem] animate-pulse border border-white/5" />
                </div>
            </div>
        </div>
    );
}
