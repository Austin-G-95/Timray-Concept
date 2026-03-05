'use client';

export default function NewArrivalsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden animate-pulse"
                >
                    {/* Image Skeleton */}
                    <div className="h-64 bg-zinc-800" />

                    {/* Info Side Skeleton */}
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="h-2 w-20 bg-zinc-800 rounded" />
                            <div className="h-2 w-8 bg-zinc-800 rounded" />
                        </div>

                        <div className="h-6 w-3/4 bg-zinc-800 rounded" />

                        <div className="space-y-2">
                            <div className="h-2 w-full bg-zinc-800 rounded" />
                            <div className="h-2 w-5/6 bg-zinc-800 rounded" />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <div className="h-6 w-24 bg-zinc-800 rounded" />
                            <div className="h-12 w-12 bg-zinc-800 rounded-2xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
