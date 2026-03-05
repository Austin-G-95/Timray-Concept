'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const PaystackCheckout = dynamic(() => import('@/components/PaystackCheckout'), { ssr: false });

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();

    const handleSuccess = async (reference: any) => {
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total: totalAmount,
                    status: 'PAID',
                    reference: reference.reference
                })
            });

            if (res.ok) {
                alert("Payment Successful! Your order has been registered. Reference: " + reference.reference);
                clearCart();
                router.push('/');
            } else {
                alert("Payment received, but failed to register order. Please contact support. Ref: " + reference.reference);
            }
        } catch (error) {
            console.error("Order registration error:", error);
            alert("Error registering order. Please contact support.");
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden relative">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />

                <div className="relative z-10 text-center max-w-md">
                    <div className="w-32 h-32 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                        <FiShoppingCartEmpty className="w-12 h-12 text-zinc-500 group-hover:text-white transition-colors duration-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                        YOUR COLLECTION <br />
                        <span className="text-zinc-600">IS EMPTY.</span>
                    </h1>

                    <p className="text-zinc-500 text-lg font-medium mb-12">
                        Don't let excellence wait. Discover our latest premium drops and build your perfect tech setup.
                    </p>

                    <Link
                        href="/products"
                        className="inline-flex items-center px-10 py-5 bg-white text-black text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
                    >
                        <FiArrowLeft className="mr-3" size={18} />
                        Explore Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-400 text-sm font-black tracking-[0.2em] uppercase mb-4">
                            <span className="w-8 h-[2px] bg-indigo-500" />
                            <span>Your Selection</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                            SHOPPING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                                CART.
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-4xl font-black text-white mb-1">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </div>
                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Selected Items</div>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
                    {/* Cart Items */}
                    <section className="lg:col-span-7">
                        <ul className="space-y-6 sm:space-y-8">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex flex-col sm:flex-row py-6 sm:py-10 bg-zinc-900/50 backdrop-blur-xl p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5 shadow-2xl group relative overflow-hidden">
                                    {/* Background glow on hover */}
                                    <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-700 pointer-events-none" />

                                    <div className="flex-shrink-0 relative w-full sm:w-40 h-48 sm:h-40 rounded-3xl overflow-hidden bg-zinc-800">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="mt-8 sm:mt-0 sm:ml-10 flex-1 flex flex-col justify-between relative z-10">
                                        <div className="flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 block">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-3 bg-white/5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all active:scale-90"
                                                >
                                                    <FiTrash2 size={20} />
                                                </button>
                                            </div>

                                            <div className="mt-auto pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all disabled:opacity-20"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FiMinus size={16} />
                                                    </button>
                                                    <span className="px-4 sm:px-6 font-black text-white text-lg">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                                    >
                                                        <FiPlus size={16} />
                                                    </button>
                                                </div>

                                                <div className="text-xl sm:text-2xl font-black text-white ml-auto">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12 flex justify-between items-center px-4">
                            <Link href="/products" className="text-sm font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center">
                                <FiArrowLeft className="mr-3" />
                                Add more items
                            </Link>
                            <button
                                onClick={clearCart}
                                className="text-sm font-black text-zinc-700 hover:text-red-500 uppercase tracking-widest transition-colors"
                            >
                                Clear Collection
                            </button>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <section className="mt-12 lg:mt-0 bg-zinc-900 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:col-span-5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />

                        <h2 className="text-2xl font-black text-white mb-10 relative z-10">ORDER SUMMARY</h2>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between py-2">
                                <dt className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Subtotal</dt>
                                <dd className="text-xl font-black text-white">{formatPrice(totalAmount)}</dd>
                            </div>
                            <div className="flex items-center justify-between py-2 border-t border-white/5">
                                <dt className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Shipping</dt>
                                <dd className="text-sm font-black text-green-400 uppercase tracking-widest">Calculated Next</dd>
                            </div>
                            <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                <dt className="text-zinc-400 font-black text-lg uppercase tracking-widest">Total</dt>
                                <dd className="text-3xl font-black text-white">{formatPrice(totalAmount)}</dd>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            {session?.user ? (
                                <PaystackCheckout
                                    amount={totalAmount}
                                    email={session.user.email || 'customer@example.com'}
                                    onSuccess={handleSuccess}
                                />
                            ) : (
                                <button
                                    onClick={() => router.push('/login?callbackUrl=/cart')}
                                    className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-95"
                                >
                                    Log in to Checkout
                                </button>
                            )}
                        </div>

                        <div className="mt-8 text-center text-[10px] font-black tracking-widest text-zinc-600 uppercase">
                            Secure Payment Powered by Paystack
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function FiShoppingCartEmpty({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
}
