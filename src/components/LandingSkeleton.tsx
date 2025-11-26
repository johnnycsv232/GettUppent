'use client';

export default function LandingSkeleton() {
    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
            {/* Hero Skeleton */}
            <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative">
                <div className="w-48 h-10 bg-white/5 rounded-full mb-12 animate-pulse" />
                <div className="w-3/4 h-32 bg-white/5 rounded-3xl mb-8 animate-pulse" />
                <div className="w-1/2 h-8 bg-white/5 rounded-xl mb-12 animate-pulse" />
                <div className="flex gap-6">
                    <div className="w-48 h-16 bg-white/10 rounded-xl animate-pulse" />
                    <div className="w-48 h-16 bg-white/5 rounded-xl animate-pulse" />
                </div>
            </section>

            {/* Pricing Skeleton */}
            <section className="py-40 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center mb-24">
                        <div className="w-1/2 h-20 bg-white/5 rounded-3xl animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-[600px] bg-white/5 rounded-[2rem] border border-white/10 p-10 animate-pulse">
                                <div className="w-20 h-6 bg-white/10 rounded mb-8" />
                                <div className="w-40 h-10 bg-white/10 rounded mb-8" />
                                <div className="w-full h-24 bg-white/5 rounded mb-12" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="w-full h-6 bg-white/5 rounded" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
