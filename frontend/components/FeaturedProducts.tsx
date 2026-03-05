'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiZoomIn, FiStar, FiX, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export default function FeaturedProducts({ products }: { products: Product[] }) {
    const cart = useCart();
    const addToCart = cart?.addToCart;
    const isInCart = cart?.isInCart;
    const getItemQuantity = cart?.getItemQuantity;
    const removeFromCart = cart?.removeFromCart;

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [isWishlisting, setIsWishlisting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            if (res.ok) {
                const data = await res.json();
                setWishlist(data);
            }
        } catch (err) {
            console.error('Failed to fetch wishlist', err);
        }
    };

    const toggleWishlist = async (productId: string) => {
        setIsWishlisting(true);
        try {
            const res = await fetch('/api/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.added) {
                    setWishlist(prev => [...prev, productId]);
                    showToast('Added to wishlist', 'info');
                } else {
                    setWishlist(prev => prev.filter(id => id !== productId));
                    showToast('Removed from wishlist', 'info');
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsWishlisting(false);
        }
    };

    const handleAddToCart = (product: Product) => {
        addToCart?.(product);
        showToast(`${product.name} added to collection!`, 'success');
    };

    const openModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getFeatures = (featuresStr: string | null | undefined) => {
        if (!featuresStr) return [];
        if (featuresStr.includes('\n')) return featuresStr.split('\n').filter(f => f.trim());
        return featuresStr.split(',').filter(f => f.trim());
    };

    const getSpecs = (specsStr: string | null | undefined) => {
        if (!specsStr) return {};
        try {
            return JSON.parse(specsStr);
        } catch (e) {
            return { "Info": specsStr };
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => {
                    const inCart = isInCart?.(product.id) || false;
                    const inWishlist = wishlist.includes(product.id);

                    return (
                        <div
                            key={product.id}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group cursor-pointer"
                            onClick={() => openModal(product)}
                        >
                            <div className="relative h-80 bg-zinc-800">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <FiZoomIn size={18} />
                                        <span>Quick View</span>
                                    </div>
                                </div>

                                <button
                                    disabled={isWishlisting}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(product.id);
                                    }}
                                    className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-all ${inWishlist
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-black/20 text-zinc-400 hover:bg-white hover:text-black'}`}
                                >
                                    <FiHeart size={18} className={inWishlist ? 'fill-current' : ''} />
                                </button>

                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                                        {product.category}
                                    </div>
                                    {product.price > 500000 && (
                                        <div className="bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                                            Premium
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center text-yellow-500 text-xs font-black">
                                        <FiStar fill="currentColor" className="mr-1" />
                                        <span>{product.rating || '4.8'}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                    {product.name}
                                </h3>

                                <p className="text-zinc-500 text-xs font-medium mb-8 line-clamp-2 min-h-[32px]">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="text-2xl font-black text-white tracking-tighter">
                                        {formatPrice(product.price)}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        className={`p-4 rounded-2xl transition-all ${inCart
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white/5 text-zinc-400 hover:bg-indigo-500 hover:text-white hover:scale-110 active:scale-95'}`}
                                    >
                                        <FiShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick View Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fadeIn"
                        onClick={closeModal}
                    />

                    <div className="relative bg-zinc-900 border border-white/5 w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-slideUp max-h-full overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-8 right-8 z-10 p-3 bg-white/5 text-white rounded-full hover:bg-white hover:text-black transition-all"
                        >
                            <FiX size={28} />
                        </button>

                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto overflow-hidden bg-zinc-800">
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12">
                                    <div className="inline-block px-4 py-2 bg-indigo-500 text-white text-[10px] font-black tracking-widest uppercase rounded-lg mb-4">
                                        {selectedProduct.category}
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter">
                                        {selectedProduct.name}
                                    </h2>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-12">
                                        <div className="text-4xl font-black text-white tracking-tighter">
                                            {formatPrice(selectedProduct.price)}
                                        </div>
                                        <div className="flex items-center space-x-2 text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar key={i} fill={i < Math.floor(selectedProduct.rating || 4) ? 'currentColor' : 'none'} stroke="currentColor" />
                                            ))}
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-3">
                                                {selectedProduct.rating || '4.8'} Authenticated
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <div>
                                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6">Overview</h4>
                                            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                                                {selectedProduct.fullDescription || selectedProduct.description}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-12">
                                            {getFeatures(selectedProduct.features).length > 0 && (
                                                <div>
                                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-8">Capabilities</h4>
                                                    <ul className="space-y-4">
                                                        {getFeatures(selectedProduct.features).map((feature: string, index: number) => (
                                                            <li key={index} className="flex items-center text-zinc-300 text-sm font-bold uppercase tracking-wide">
                                                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {Object.keys(getSpecs(selectedProduct.specs)).length > 0 && (
                                                <div>
                                                    <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-8">Architecture</h4>
                                                    <div className="space-y-4">
                                                        {Object.entries(getSpecs(selectedProduct.specs)).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between items-center py-3 border-b border-white/5">
                                                                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{key}</span>
                                                                <span className="text-white text-sm font-black uppercase">{value as string}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-12 border-t border-white/5">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex items-center bg-white/5 rounded-[2rem] p-2 border border-white/5">
                                            <button
                                                onClick={() => removeFromCart?.(selectedProduct.id)}
                                                className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                            >
                                                <FiMinus size={20} />
                                            </button>
                                            <span className="text-2xl font-black text-white w-16 text-center">
                                                {getItemQuantity?.(selectedProduct.id) || 0}
                                            </span>
                                            <button
                                                onClick={() => addToCart?.(selectedProduct)}
                                                className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                            >
                                                <FiPlus size={20} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => {
                                                handleAddToCart(selectedProduct);
                                                closeModal();
                                            }}
                                            className="flex-1 bg-white text-black py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center group shadow-2xl active:scale-95"
                                        >
                                            <FiShoppingCart className="mr-3" size={20} />
                                            Integrate Artifact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notifications */}
            {toast && (
                <div className="fixed bottom-12 right-12 z-[200] animate-slideUp">
                    <div className={`px-10 py-5 rounded-[2rem] shadow-2xl backdrop-blur-2xl border border-white/10 flex items-center space-x-4 ${toast.type === 'success' ? 'bg-green-500/10 text-green-400' :
                        toast.type === 'error' ? 'bg-red-500/10 text-red-400' :
                            'bg-indigo-500/10 text-indigo-400'
                        }`}>
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        <span className="font-black text-[10px] uppercase tracking-[0.3em]">{toast.message}</span>
                    </div>
                </div>
            )}
        </>
    );
}
