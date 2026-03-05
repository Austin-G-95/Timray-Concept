'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { FiShoppingCart, FiHeart, FiX, FiPlus, FiMinus, FiStar, FiZoomIn, FiCheck, FiArrowRight } from 'react-icons/fi';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();

  const categories = ['All', 'Headphones', 'Earphones', 'Phone Cases', 'Laptop Accessories', 'Jamboxes', 'Smart Watches', 'Flash Drives', 'Peripherals'];

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [selectedCategory, searchQuery]);

  const fetchWishlist = async () => {
    try {
      // Use local storage instead of API call
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('wishlist');
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]);
    }
  };

  const toggleWishlist = async (productId: string) => {
    const isInWishlist = wishlist.includes(productId);
    const newWishlist = isInWishlist
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    setWishlist(newWishlist);

    try {
      // Store in localStorage instead of API call
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      }
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
      setWishlist(wishlist);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch products from API
      const response = await fetch('/api/products');
      const allProducts = await response.json();
      let filteredProducts = allProducts;

      // Apply category filter
      if (selectedCategory !== 'All') {
        filteredProducts = allProducts.filter((p: any) => p.category === selectedCategory);
      }

      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter((p: any) => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
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

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-2 text-indigo-400 text-sm font-black tracking-[0.4em] uppercase mb-6">
              <span className="w-8 h-[2px] bg-indigo-500" />
              <span>Timray Archive</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              ARTIFACT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
                ARCHIVES.
              </span>
            </h1>
            {searchQuery && (
              <p className="text-zinc-500 mt-8 text-xl font-medium">
                Results located for <span className="text-white uppercase">"{searchQuery}"</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="text-5xl font-black text-white mb-2 tracking-tighter">{products.length}</div>
            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Items Discovered</div>
          </div>
        </div>

        {/* Category Filter - Premium Tabs */}
        <div className="flex flex-wrap gap-4 mb-20">
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${selectedCategory === cat
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105'
                : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[500px] bg-zinc-900/30 rounded-[2.5rem] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20 font-black uppercase tracking-widest">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-zinc-900/20 rounded-[3rem] border border-white/5">
            <div className="text-6xl mb-8 opacity-20">🔍</div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">No artifacts found</h3>
            <p className="text-zinc-500 font-medium uppercase tracking-widest text-[10px]">
              {searchQuery
                ? `No artifact records match "${searchQuery}" in our core database.`
                : 'No artifacts found for this dimensional classification.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, index) => {
              const inCart = isInCart(product.id);
              const quantity = getItemQuantity(product.id);
              const inWishlist = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 group cursor-pointer animate-slideUp"
                  onClick={() => openModal(product)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Section */}
                  <div className="relative h-72 bg-zinc-800 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Quick View Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                        <FiZoomIn size={18} />
                        <span>Inspect</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {product.stock <= 5 && product.stock > 0 && (
                        <div className="bg-amber-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-xl shadow-amber-500/20">
                          Low Supply
                        </div>
                      )}
                      {inCart && (
                        <div className="bg-indigo-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl shadow-indigo-500/20">
                          <FiCheck /> {quantity} Synced
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-6 right-6 p-4 rounded-2xl backdrop-blur-3xl transition-all duration-500 border border-white/5 ${inWishlist
                        ? 'bg-indigo-500 text-white shadow-xl shadow-indigo-500/40'
                        : 'bg-black/40 text-white hover:bg-white hover:text-black'}`}
                    >
                      <FiHeart size={20} className={inWishlist ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Info Section */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                        {product.category}
                      </span>
                      <div className="flex items-center text-yellow-500 text-[10px] font-black uppercase tracking-widest">
                        <FiStar fill="currentColor" className="mr-2" />
                        <span>{product.rating || '4.8'} REF</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-3 truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>

                    <p className="text-zinc-500 text-[10px] font-medium mb-10 line-clamp-2 min-h-[40px] uppercase tracking-widest leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="text-2xl font-black text-white tracking-tighter">
                        {formatPrice(product.price)}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className={`p-5 rounded-2xl transition-all shadow-xl active:scale-90 group/cart overflow-hidden relative ${inCart
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white text-black hover:bg-indigo-500 hover:text-white'}`}
                      >
                        <FiShoppingCart size={22} className="relative z-10" />
                        <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover/cart:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cinematic Modal */}
      {
        isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl animate-fadeIn" onClick={closeModal} />

            {/* Modal Content */}
            <div className="relative bg-zinc-950 border border-white/10 w-full max-w-7xl rounded-[4rem] overflow-hidden shadow-[0_100px_150px_-30px_rgba(0,0,0,0.8)] animate-slideUp max-h-full overflow-y-auto scrollbar-hide">
              <button
                onClick={closeModal}
                className="absolute top-10 right-10 z-10 p-4 bg-white/5 text-white rounded-2xl hover:bg-white hover:text-black transition-all border border-white/5"
              >
                <FiX size={24} />
              </button>

              <div className="flex flex-col lg:flex-row min-h-[800px]">
                {/* Image Side */}
                <div className="relative w-full lg:w-1/2 h-[500px] lg:h-auto overflow-hidden bg-zinc-900">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute bottom-20 left-20">
                    <div className="inline-block px-6 py-2 bg-indigo-500 text-white text-[10px] font-black tracking-[0.4em] uppercase rounded-lg mb-6">
                      CORE ARTIFACT
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                      {selectedProduct.name.split(' ').map((word, i) => i === 0 ? <span key={i}>{word}<br /></span> : word + ' ')}
                    </h2>
                  </div>
                </div>

                {/* Info Side */}
                <div className="w-full lg:w-1/2 p-10 md:p-24 flex flex-col bg-zinc-950">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-12">
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">
                        {selectedProduct.category}
                      </span>
                      <div className="text-4xl font-black text-white tracking-tighter">
                        {formatPrice(selectedProduct.price)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-yellow-500 mb-12 bg-white/5 inline-flex px-6 py-3 rounded-2xl border border-white/5">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={14} fill={i < Math.floor(selectedProduct.rating || 4.8) ? 'currentColor' : 'none'} stroke="currentColor" />
                      ))}
                      <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-4">
                        {selectedProduct.rating || '4.8'} • VERIFIED DATA
                      </span>
                    </div>

                    <div className="space-y-12">
                      <div>
                        <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Classification</h4>
                        <p className="text-zinc-400 text-xl leading-relaxed font-medium">
                          {selectedProduct.fullDescription || selectedProduct.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-12">
                        <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                          <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4">Core Protocols</h4>
                          <p className="text-zinc-500 text-[10px] font-black tracking-widest leading-relaxed uppercase">
                            Guaranteed authentic with 12 months manual sync warranty and premium archive support.
                          </p>
                        </div>
                        <div className="p-8 bg-zinc-900/40 rounded-3xl border border-white/5">
                          <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4">Deployment</h4>
                          <p className="text-zinc-500 text-[10px] font-black tracking-widest leading-relaxed uppercase">
                            Nationwide nexus delivery with high-priority secure handling.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-20 pt-16 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row gap-8">
                      <div className="flex items-center bg-white/5 rounded-[2rem] p-3 border border-white/5">
                        <button
                          onClick={() => removeFromCart(selectedProduct.id)}
                          className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl"
                        >
                          <FiMinus size={20} />
                        </button>
                        <span className="text-3xl font-black text-white w-20 text-center tracking-tighter">
                          {getItemQuantity(selectedProduct.id)}
                        </span>
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl"
                        >
                          <FiPlus size={20} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          closeModal();
                        }}
                        className="flex-1 bg-white text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center group shadow-2xl shadow-white/5 active:scale-95 overflow-hidden relative"
                      >
                        <span className="relative z-10 flex items-center">
                          <FiShoppingCart className="mr-4" size={24} />
                          SYNC TO COLLECTION
                        </span>
                        <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }


    </div >
  );
}