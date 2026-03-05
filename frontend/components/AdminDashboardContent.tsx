'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPlus, FiX, FiEdit2, FiTrash2, FiUpload, FiPackage, FiDollarSign, FiList } from 'react-icons/fi';

interface AdminDashboardProps {
    userName: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    fullDescription?: string;
    features?: string;
    specs?: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    rating: number;
    reviews: number;
}

export default function AdminDashboardContent({ userName }: AdminDashboardProps) {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fullDescription: '',
        features: '',
        specs: '',
        price: '',
        category: 'Headphones',
        image: '',
        stock: '10'
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = formData.image;

            // Upload image if file selected
            if (imageFile) {
                const uploadData = new FormData();
                uploadData.append('file', imageFile);
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData
                });
                if (uploadRes.ok) {
                    const uploadResult = await uploadRes.json();
                    imageUrl = uploadResult.url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            const productData = {
                ...formData,
                image: imageUrl,
                id: editingProduct?.id
            };

            const method = editingProduct ? 'PUT' : 'POST';
            const res = await fetch('/api/products', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
                setIsModalOpen(false);
                setEditingProduct(null);
                setFormData({ name: '', description: '', fullDescription: '', features: '', specs: '', price: '', category: 'Headphones', image: '', stock: '10' });
                setImageFile(null);
                setImagePreview(null);
                fetchProducts();
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error processing product');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Delete failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            fullDescription: product.fullDescription || '',
            features: product.features || '',
            specs: product.specs || '',
            price: product.price.toString(),
            category: product.category,
            image: product.image,
            stock: product.stock.toString()
        });
        setImagePreview(product.image);
        setIsModalOpen(true);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col selection:bg-indigo-500/30">
            {/* Sidebar-style Nav (Top) - Cinematic */}
            <div className="bg-black/80 backdrop-blur-2xl border-b border-white/5 px-8 py-5 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => router.push('/')}>
                    <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                        <span className="text-sm">TC</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase">Nexus Control</h1>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] leading-none mt-1">Administrator Protocol</p>
                    </div>
                </div>
                <div className="flex items-center space-x-8">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-white uppercase tracking-widest">{userName}</p>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-0.5">Core Access Level 01</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/5 hidden sm:block" />
                    <Link href="/" className="px-6 py-3 bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Exit to Nexus
                    </Link>
                </div>
            </div>

            <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
                            <span className="w-8 h-[1px] bg-indigo-500" />
                            <span>System Overview</span>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Inventory <span className="text-zinc-800">Matrix.</span></h2>
                    </div>
                    <button
                        onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', fullDescription: '', features: '', specs: '', price: '', category: 'Headphones', image: '', stock: '10' }); setImagePreview(null); setIsModalOpen(true); }}
                        className="px-10 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95 group flex items-center"
                    >
                        <FiPlus className="mr-3 group-hover:rotate-90 transition-transform" size={18} />
                        Initialize New Artifact
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { label: 'Artifacts Sync', value: products.length, icon: FiPackage, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
                        { label: 'Capital Value', value: formatPrice(products.reduce((acc, p) => acc + (p.price * p.stock), 0)), icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/5' },
                        { label: 'Active Streams', value: '0', icon: FiList, color: 'text-amber-400', bg: 'bg-amber-400/5' },
                        { label: 'Authorized Nodes', value: '2', icon: FiPlus, color: 'text-purple-400', bg: 'bg-purple-400/5' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 group hover:border-white/10 transition-all">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon size={22} />
                            </div>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Inventory Table Container */}
                <div className="bg-zinc-900/30 backdrop-blur-xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-zinc-900/50">
                                    <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Artifact Identity</th>
                                    <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Classification</th>
                                    <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Availability</th>
                                    <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Valuation</th>
                                    <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-right">Access Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-16 h-16 relative rounded-2xl overflow-hidden bg-zinc-800 border border-white/5 group-hover:scale-110 transition-transform">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{product.name}</p>
                                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">ID: {product.id.substring(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-4 py-2 bg-white/5 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 group-hover:text-white group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${product.stock > 5 ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-red-500 shadow-red-500/50'}`} />
                                                <span className="font-black text-white uppercase tracking-tighter text-lg">{product.stock}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="font-black text-white tabular-nums">{formatPrice(product.price)}</span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500 hover:text-white transition-all active:scale-90"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Comprehensive Product Modal - Dark Cinematic */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 z-[100] animate-fadeIn overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/10 rounded-[3rem] w-full max-w-2xl my-8 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                        <div className="p-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Protocol Initialization</div>
                                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{editingProduct ? 'Update Artifact' : 'New Artifact'}</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 text-zinc-500 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-8">
                                    {/* Core Data */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Artifact Designation</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-black text-white uppercase tracking-tight placeholder:text-zinc-800"
                                                placeholder="e.g. Nexus Core X1"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Protocol Summary</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-medium text-zinc-300 placeholder:text-zinc-800"
                                                placeholder="Enter primary functions..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Valuation (₦)</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-black text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Availability Quota</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={formData.stock}
                                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-black text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Advanced Specs */}
                                    <div className="space-y-8 pt-8 border-t border-white/5">
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Deep Narrative</label>
                                            <textarea
                                                rows={4}
                                                value={formData.fullDescription}
                                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-medium text-zinc-300 placeholder:text-zinc-800"
                                                placeholder="Artifact origin and deep utility..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Capabilities (Line Break Delimited)</label>
                                            <textarea
                                                rows={4}
                                                value={formData.features}
                                                onChange={e => setFormData({ ...formData, features: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-medium text-zinc-300 placeholder:text-zinc-800"
                                                placeholder="Power Output: 50W..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Core Architecture (JSON Schema)</label>
                                            <textarea
                                                rows={4}
                                                value={formData.specs}
                                                onChange={e => setFormData({ ...formData, specs: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-mono text-indigo-400 text-xs"
                                                placeholder='{ "Logic": "A15 Path", "Relay": "50GHz" }'
                                            />
                                        </div>
                                    </div>

                                    {/* Media & Meta */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Classification Matrix</label>
                                            <select
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 outline-none transition-all font-black text-white appearance-none uppercase tracking-widest cursor-pointer"
                                            >
                                                {['Headphones', 'Phone Cases', 'Laptop Accessories', 'Earphones', 'Jamboxes', 'Smart Watches', 'Flash Drives', 'Peripherals'].map(cat => (
                                                    <option key={cat} value={cat} className="bg-zinc-900 border-none">{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4 ml-2">Visual Sync Output</label>
                                            <div className="relative group overflow-hidden bg-white/5 border border-white/5 rounded-2xl h-[62px] flex items-center px-8 hover:bg-white/10 transition-all cursor-pointer">
                                                <FiUpload className="text-zinc-500 mr-4 group-hover:text-indigo-400" />
                                                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest truncate group-hover:text-white">
                                                    {imageFile ? imageFile.name : 'Upload Data...'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {imagePreview && (
                                    <div className="mt-8 p-10 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10 animate-fadeIn">
                                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 text-center">Visual Signal Detected</p>
                                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                                            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-10">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-white text-black font-black py-6 rounded-[2rem] hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95 uppercase tracking-[0.2em] text-xs"
                                    >
                                        {isLoading ? 'Decrypting Protocols...' : (editingProduct ? 'Commit Artifact Update' : 'Initialize New Protocol')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
