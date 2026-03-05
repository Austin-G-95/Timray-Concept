import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { FiPackage, FiArrowLeft, FiClock, FiCheckCircle, FiTruck, FiBox } from 'react-icons/fi';

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?callbackUrl=/account/orders");
    }

    let orders: any[] = [];

    try {
        orders = await prisma.order.findMany({
            where: { userId: session.user.id },
            include: {
                orderItems: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Database connection failed in OrdersPage:", error);
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-16 animate-fadeIn">
                    <Link href="/account" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all mb-8 group">
                        <FiArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform" />
                        Back to Archive
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-black tracking-[0.4em] uppercase mb-4">
                                <span className="w-8 h-[1px] bg-indigo-500" />
                                <span>Operation Logs</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                                TRANSACTION <br />
                                <span className="text-zinc-800">HISTORY.</span>
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-3xl font-black text-white leading-none">{orders.length}</div>
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">Total Artifacts</div>
                            </div>
                        </div>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-24 text-center animate-slideUp">
                        <div className="w-24 h-24 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl">
                            <FiPackage size={40} className="text-zinc-700" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">NULL STATE DETECTED</h2>
                        <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest max-w-sm mx-auto mb-12">
                            No acquisition protocols have been initialized for this authorized node.
                        </p>
                        <Link href="/products" className="inline-flex items-center px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl">
                            Initialize First Acquisition
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order, idx) => (
                            <div
                                key={order.id}
                                className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden group hover:border-white/10 transition-all animate-slideUp"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Order Header */}
                                <div className="p-8 md:p-12 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div>
                                        <div className="flex items-center space-x-3 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">
                                            <FiClock className="text-indigo-500" />
                                            <span>ARCHIVED: {formatDate(order.createdAt)}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className="text-xs font-black text-white uppercase tracking-widest">ID: #{order.id.slice(-8).toUpperCase()}</span>
                                            {order.reference && (
                                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">REF: {order.reference}</span>
                                            )}
                                            <div className="flex items-center px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 animate-pulse" />
                                                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total Valuation</div>
                                        <div className="text-4xl font-black text-white tracking-tighter">{formatPrice(order.total)}</div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-8 md:p-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {order.orderItems.map((item: any) => (
                                            <div key={item.id} className="flex items-center space-x-6 p-6 bg-black/40 rounded-[2rem] border border-white/5 group/item hover:bg-black/60 transition-all">
                                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800 border border-white/5">
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{item.product.category}</div>
                                                    <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2 group-hover/item:text-indigo-400 transition-colors">{item.product.name}</h4>
                                                    <div className="flex items-center space-x-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                                        <span>QTY: {item.quantity}</span>
                                                        <span>•</span>
                                                        <span>{formatPrice(item.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Footer/Progression */}
                                <div className="px-8 md:px-12 py-8 bg-black/20 flex flex-wrap items-center gap-10">
                                    <div className="flex items-center space-x-4 opacity-100">
                                        <div className="p-2 bg-indigo-500 text-white rounded-lg"><FiCheckCircle size={14} /></div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Confirmed</span>
                                    </div>
                                    <div className="flex items-center space-x-4 opacity-30">
                                        <div className="p-2 bg-zinc-800 text-zinc-500 rounded-lg"><FiBox size={14} /></div>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Prepared</span>
                                    </div>
                                    <div className="flex items-center space-x-4 opacity-30">
                                        <div className="p-2 bg-zinc-800 text-zinc-500 rounded-lg"><FiTruck size={14} /></div>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sent</span>
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
