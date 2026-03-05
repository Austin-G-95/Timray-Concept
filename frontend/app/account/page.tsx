import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FiPackage, FiHeart, FiUser, FiArrowRight, FiClock } from 'react-icons/fi';
import SignOutButton from "@/components/SignOutButton";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?callbackUrl=/account");
    }

    let orders: any[] = [];
    let wishlist: any[] = [];

    try {
        // Parallel Fetching
        const [ordersResult, wishlistResult] = await Promise.allSettled([
            prisma.order.findMany({
                where: { userId: session.user.id },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 5
            }),
            prisma.wishlist.findMany({
                where: { userId: session.user.id },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 10
            })
        ]);

        if (ordersResult.status === 'fulfilled') orders = ordersResult.value;
        if (wishlistResult.status === 'fulfilled') wishlist = wishlistResult.value;

    } catch (error) {
        console.error("Database connection failed in AccountPage:", error);
        // We leave orders and wishlist as empty arrays to avoid crashing
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-black text-white py-24 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header/Profile Hero */}
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 mb-12 flex flex-col md:flex-row justify-between items-center group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all duration-700" />

                    <div className="flex items-center mb-8 md:mb-0 relative z-10">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                            <div className="relative w-full h-full bg-white text-black rounded-full flex items-center justify-center text-3xl font-black border-4 border-zinc-900">
                                {session.user.name ? session.user.name.charAt(0).toUpperCase() : <FiUser />}
                            </div>
                        </div>
                        <div className="ml-8">
                            <div className="inline-flex items-center px-4 py-1 bg-white/5 border border-white/5 rounded-full mb-3">
                                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">Authorized Node</span>
                            </div>
                            <h1 className="text-4xl font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-tighter">
                                {session.user.name}
                            </h1>
                            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs mt-1">{session.user.email}</p>
                        </div>
                    </div>
                    <SignOutButton />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Orders Section */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden">
                            <div className="p-10 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center mr-6">
                                        <FiPackage size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight">TRANSACTION LOGS</h2>
                                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Your recent synchronization artifacts</p>
                                    </div>
                                </div>
                                <Link href="/account/orders" className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
                                    View Full Logs →
                                </Link>
                            </div>

                            {orders.length === 0 ? (
                                <div className="p-20 text-center">
                                    <div className="w-20 h-20 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FiPackage size={32} className="text-zinc-700" />
                                    </div>
                                    <p className="text-zinc-600 text-sm font-black uppercase tracking-widest">No transaction data detected.</p>
                                    <Link href="/products" className="inline-block mt-6 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                                        Initiate Order
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <div key={order.id} className="p-10 group hover:bg-white/5 transition-colors">
                                            <div className="flex flex-col sm:flex-row justify-between mb-8 pb-8 border-b border-white/5 border-dashed">
                                                <div>
                                                    <div className="flex items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">
                                                        <FiClock className="mr-2" />
                                                        ARCHIVED ON {formatDate(order.createdAt)}
                                                    </div>
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${order.status === 'DELIVERED' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                                                        'bg-zinc-800 text-zinc-500 border border-white/5'
                                                        }`}>
                                                        {order.status}
                                                    </div>
                                                </div>
                                                <p className="text-3xl font-black text-white mt-4 sm:mt-0 tracking-tighter">{formatPrice(order.total)}</p>
                                            </div>
                                            <div className="flex items-center space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                                                {order.orderItems.map((item: any) => (
                                                    <Link key={item.id} href={`/products`} className="flex-shrink-0 relative w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-indigo-500/50 transition-all group/item">
                                                        <Image
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            fill
                                                            className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                                                        />
                                                    </Link>
                                                ))}
                                                <Link href={`/account/orders/${order.id}`} className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all">
                                                    <FiArrowRight size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Wishlist Sidebar */}
                    <div className="space-y-12">
                        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden">
                            <div className="p-10 border-b border-white/5 flex items-center bg-white text-black">
                                <FiHeart className="mr-4" size={24} />
                                <h2 className="text-lg font-black uppercase tracking-tight">CORE FAVORITES</h2>
                            </div>
                            {wishlist.length === 0 ? (
                                <div className="p-12 text-center">
                                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">No artifacts synced.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="p-8 flex items-center group hover:bg-white/5 transition-colors">
                                            <Link href={`/products`} className="flex-shrink-0 relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </Link>
                                            <div className="ml-6 flex-1">
                                                <Link href={`/products`} className="text-xs font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-widest line-clamp-1 mb-2">
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm font-bold text-zinc-500">{formatPrice(item.product.price)}</p>
                                            </div>
                                            <Link href={`/products`} className="ml-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black">
                                                <FiArrowRight size={14} />
                                            </Link>
                                        </div>
                                    ))}
                                    <div className="p-8 bg-zinc-900/50">
                                        <Link href="/account/wishlist" className="w-full py-4 bg-zinc-800 border border-white/5 rounded-xl text-center text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all flex items-center justify-center">
                                            Manage Core Wishlist <FiArrowRight className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Node Settings Placeholder */}
                        <div className="bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-[3rem] p-10 text-black">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">NODE CORE SETTINGS</h3>
                            <p className="text-sm font-bold mb-8 opacity-80 uppercase tracking-widest">Security protocols and data identity management.</p>
                            <Link href="/account/settings" className="block w-full py-4 bg-black text-white text-center text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all">
                                Access Protocol
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
