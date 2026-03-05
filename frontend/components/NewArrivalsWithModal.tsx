'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar, FiX, FiZoomIn, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  description: string;
  fullDescription?: string | null;
  features?: string | null;
  specs?: string | null;
}

export default function NewArrivalsWithModal() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const cart = useCart();
  const addToCart = cart?.addToCart;
  const removeFromCart = cart?.removeFromCart;
  const getItemQuantity = cart?.getItemQuantity;
  const isInCart = cart?.isInCart;

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?limit=6&orderBy=createdAt&order=desc');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart?.(product);
    showToast(`${product.name} added!`, 'success');
  };

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
        } else {
          setWishlist(prev => prev.filter(id => id !== productId));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = async (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';

    // Fetch full details if missing
    if (!product.fullDescription && !product.features && !product.specs) {
      setIsLoadingDetails(true);
      try {
        const res = await fetch(`/api/products?id=${product.id}`);
        if (res.ok) {
          const fullData = await res.json();
          setSelectedProduct(prev => prev?.id === fullData.id ? { ...prev, ...fullData } : prev);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setIsLoadingDetails(false);
      }
    }
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
    }).format(price);
  };

  // Helper to parse features from string
  const getFeatures = (featuresStr?: string | null) => {
    if (!featuresStr) return [];
    if (featuresStr.includes('\n')) return featuresStr.split('\n').filter(f => f.trim());
    return featuresStr.split(',').filter(f => f.trim());
  };

  // Helper to parse specs from JSON or string
  const getSpecs = (specsStr?: string | null) => {
    if (!specsStr) return {};
    try {
      return JSON.parse(specsStr);
    } catch (e) {
      return { "Info": specsStr };
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-zinc-900/50 rounded-3xl overflow-hidden animate-pulse">
            <div className="h-64 bg-zinc-800"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-zinc-800 rounded w-1/3"></div>
              <div className="h-6 bg-zinc-800 rounded w-2/3"></div>
              <div className="h-4 bg-zinc-800 rounded w-full"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
                <div className="h-10 w-10 bg-zinc-800 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const inCart = isInCart?.(product.id) || false;
          const inWishlist = wishlist.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-pointer"
              onClick={() => openModal(product)}
            >
              {/* Product Image */}
              <div className="relative h-64 bg-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Quick View Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full font-bold shadow-2xl">
                    <FiZoomIn size={16} />
                    <span className="text-sm">Quick View</span>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${inWishlist
                    ? 'bg-indigo-500 text-white'
                    : 'bg-black/20 text-white hover:bg-white hover:text-black'}`}
                >
                  <FiHeart size={16} className={inWishlist ? 'fill-current' : ''} />
                </button>

                {/* New Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                    New
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center text-yellow-500 text-xs font-bold">
                    <FiStar fill="currentColor" className="mr-1" size={12} />
                    <span>{product.rating || '4.8'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h3>

                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-white">
                    {formatPrice(product.price)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className={`p-3 rounded-xl transition-all ${inCart
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
                  >
                    <FiShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[200]">
          <div className="px-6 py-3 rounded-xl bg-green-500 text-white font-bold text-sm shadow-2xl">
            {toast.message}
          </div>
        </div>
      )}

      {/* Modal - Optimized */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-zinc-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image Side */}
              <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[500px] bg-zinc-800">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
              </div>

              {/* Info Side */}
              <div className="w-full lg:w-1/2 p-8 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">
                      {selectedProduct.category}
                    </span>
                    <div className="text-2xl font-black text-white">
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-white mb-4">
                    {selectedProduct.name}
                  </h2>

                  <div className="flex items-center space-x-2 text-yellow-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} fill={i < Math.floor(selectedProduct.rating || 4) ? 'currentColor' : 'none'} stroke="currentColor" size={16} />
                    ))}
                    <span className="text-zinc-400 text-sm font-bold ml-3">
                      {selectedProduct.rating || '4.8'} • {selectedProduct.reviews || '42'} Reviews
                    </span>
                  </div>

                  {/* Loading State for Details */}
                  {isLoadingDetails ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-zinc-800 rounded w-1/4"></div>
                      <div className="h-20 bg-zinc-800 rounded w-full"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Description</h4>
                        <p className="text-zinc-300 leading-relaxed">
                          {selectedProduct.fullDescription || selectedProduct.description}
                        </p>
                      </div>

                      {/* Features */}
                      {getFeatures(selectedProduct.features).length > 0 && (
                        <div>
                          <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {getFeatures(selectedProduct.features).slice(0, 4).map((feature: string, index: number) => (
                              <li key={index} className="flex items-center text-zinc-300 text-sm">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Specs */}
                      {Object.keys(getSpecs(selectedProduct.specs)).length > 0 && (
                        <div>
                          <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Specs</h4>
                          <div className="space-y-2">
                            {Object.entries(getSpecs(selectedProduct.specs)).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-zinc-500 text-xs font-bold uppercase">{key}</span>
                                <span className="text-white text-sm font-black">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
                      <button
                        onClick={() => removeFromCart?.(selectedProduct.id)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="text-xl font-black text-white w-12 text-center">
                        {getItemQuantity?.(selectedProduct.id) || 0}
                      </span>
                      <button
                        onClick={() => addToCart?.(selectedProduct)}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeModal();
                      }}
                      className="flex-1 bg-white text-black py-4 rounded-2xl font-black hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center"
                    >
                      <FiShoppingCart className="mr-2" size={20} />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}