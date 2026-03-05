'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart, FiHeart, FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

import { Product } from '@/lib/types';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            fetchWishlist();
        } else {
            setIsLoading(false);
        }
    }, [session]);

    const fetchWishlist = async () => {
        try {
            // Get product IDs first
            const resIds = await fetch('/api/wishlist');
            if (resIds.ok) {
                const ids = await resIds.json();

                if (ids.length === 0) {
                    setWishlist([]);
                    setIsLoading(false);
                    return;
                }

                // Get full product details
                const resProducts = await fetch('/api/products');
                if (resProducts.ok) {
                    const allProducts: Product[] = await resProducts.json();
                    const filtered = allProducts.filter(p => ids.includes(p.id));
                    setWishlist(filtered);
                }
            }
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            if (res.ok) {
                setWishlist(prev => prev.filter(p => p.id !== productId));
            }
        } catch (err) {
            console.error("Failed to remove from wishlist", err);
        }
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

    if (!session) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
                <div className="w-24 h-24 bg-zinc-900 border border-white/5 rounded-[2rem] flex items-center justify-center mb-10">
                    <FiHeart className="w-10 h-10 text-zinc-700" />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">WISHLIST ARCHIVE.</h1>
                <p className="text-zinc-500 mb-12 font-bold uppercase tracking-widest text-xs">Please authorize your node to access saved artifacts.</p>
                <Link href="/login?callbackUrl=/account/wishlist" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl shadow-indigo-500/10">
                    INITIALIZE LOGIN
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 animate-fadeIn">
                    <div>
                        <div className="inline-flex items-center px-4 py-1.5 bg-zinc-900 border border-white/5 rounded-full mb-6">
                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Core Selection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            MY <span className="text-indigo-500">FAVORITES.</span>
                        </h1>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-6">A collection of your most desired tech artifacts.</p>
                    </div>
                    <Link href="/products" className="flex items-center text-zinc-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest bg-zinc-900/50 border border-white/5 px-8 py-4 rounded-xl mt-8 md:mt-0 group">
                        <FiArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        Return to Hub
                    </Link>
                </div>

                {wishlist.length === 0 ? (
                    <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-24 text-center animate-slideUp">
                        <div className="w-24 h-24 bg-zinc-800 border border-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                            <FiHeart className="w-10 h-10 text-zinc-600" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">ARCHIVE EMPTY.</h2>
                        <p className="text-zinc-600 mb-12 text-[10px] font-black uppercase tracking-widest">You haven't saved any artifacts to your core memory yet.</p>
                        <Link href="/products" className="inline-flex items-center px-12 py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl group">
                            EXPLORE ARTIFACTS
                            <FiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {wishlist.map((product, index) => (
                            <div key={product.id} className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden group hover:border-indigo-500/50 transition-all duration-700 animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        priority={index < 2}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-6 right-6 p-4 bg-black/60 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-3xl border border-white/5"
                                        title="Purge Artifact"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                                <div className="p-10">
                                    <div className="text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase mb-4">{product.category}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3 truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{product.name}</h3>
                                    <p className="text-zinc-600 text-sm font-medium line-clamp-2 mb-10 leading-relaxed uppercase tracking-widest text-[10px]">{product.description}</p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="text-3xl font-black text-white tracking-tighter">{formatPrice(product.price)}</div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-5 bg-white text-black rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl group/cart overflow-hidden relative"
                                        >
                                            <FiShoppingCart size={24} className="relative z-10" />
                                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/cart:translate-y-0 transition-transform duration-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
