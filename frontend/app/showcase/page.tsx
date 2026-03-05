'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiShoppingBag, FiStar, FiChevronRight, FiChevronLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function ShowcasePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        // Fetch products from API
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.slice(0, 5)); // Just top 5 for showcase
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            });
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">No products available</h2>
                    <Link href="/products" className="text-indigo-400 hover:text-indigo-300">
                        Browse all products
                    </Link>
                </div>
            </div>
        );
    }

    const activeProduct = products[currentIndex];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-indigo-500/30">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                {products.map((p, i) => (
                    <div
                        key={p.id}
                        className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${i === currentIndex ? 'opacity-40' : 'opacity-0'}`}
                    >
                        <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="100vw"
                            quality={50}
                            className={`object-cover blur-[2px] transition-transform duration-[10s] ${i === currentIndex ? 'scale-110' : 'scale-100'}`}
                            priority={i === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/60" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Product Info */}
                    <div className="animate-fadeInLeft">
                        <div className="inline-flex items-center px-6 py-2 bg-zinc-900 border border-white/10 backdrop-blur-3xl rounded-full mb-10">
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Elite Artifact Showcase</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter uppercase">
                            {activeProduct.name.split(' ')[0]} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                                {activeProduct.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-xl mb-12 max-w-lg leading-relaxed font-medium uppercase tracking-widest text-[12px]">
                            {activeProduct.fullDescription || activeProduct.description}
                        </p>

                        {activeProduct.features && (
                            <div className="mb-14 flex flex-wrap gap-4">
                                {(activeProduct.features.includes('\n') ? activeProduct.features.split('\n') : activeProduct.features.split(',')).slice(0, 3).map((f, i) => (
                                    <div key={i} className="flex items-center bg-white/5 border border-white/5 px-6 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-xl">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                        {f.trim()}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-10 mb-16">
                            <div className="text-5xl font-black text-white tracking-tighter">{formatPrice(activeProduct.price)}</div>
                            <div className="h-12 w-[1px] bg-white/10" />
                            <div className="flex items-center text-yellow-500 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <FiStar fill="currentColor" size={14} />
                                <span className="ml-3 text-zinc-400 text-[10px] font-black tracking-widest uppercase">Verified Hub Rating</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button
                                onClick={() => addToCart(activeProduct)}
                                className="px-12 py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center shadow-2xl relative group/btn overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    <FiShoppingCart className="mr-4" size={20} /> SYNC TO COLLECTION
                                </span>
                                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            </button>
                            <Link
                                href="/products"
                                className="px-12 py-6 bg-zinc-900/50 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center group"
                            >
                                BROWSE ARCHIVES <FiArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Product Image with cinematic float */}
                    <div className="relative group animate-fadeInRight md:flex justify-center hidden">
                        <div className="relative w-[600px] h-[600px] transform hover:rotate-2 transition-transform duration-[2s]">
                            {/* Floating Glow */}
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[150px] rounded-full animate-pulse" />

                            <Image
                                src={activeProduct.image}
                                alt={activeProduct.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 600px"
                                className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.8)] animate-float"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-16 right-16 flex items-center space-x-8 z-20">
                    <button
                        onClick={prevSlide}
                        className="w-20 h-20 rounded-[2rem] border border-white/5 bg-zinc-900/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-3xl group"
                    >
                        <FiChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex space-x-4">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-[2px] transition-all duration-700 ${i === currentIndex ? 'w-20 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'w-6 bg-white/10 hover:bg-white/30'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="w-20 h-20 rounded-[2rem] border border-white/5 bg-zinc-900/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-3xl group"
                    >
                        <FiChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Product Counter */}
                <div className="absolute bottom-16 left-16">
                    <div className="text-[12rem] font-black text-white/[0.03] leading-none tracking-tighter">
                        0{currentIndex + 1}
                    </div>
                    <div className="text-zinc-600 text-[10px] font-black tracking-[1em] ml-8 -mt-10 uppercase">
                        ACCOUNT 0{currentIndex + 1} / 0{products.length}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-80px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInLeft {
                    animation: fadeInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(80px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInRight {
                    animation: fadeInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}
