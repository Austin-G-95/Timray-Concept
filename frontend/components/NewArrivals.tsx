'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

import { Product, BaseProduct } from '@/lib/types';

// Partial product type for list view
type PartialProduct = Pick<Product, 'id' | 'name' | 'price' | 'image' | 'category' | 'rating' | 'reviews' | 'description'>;

export default function NewArrivals({ products }: { products: PartialProduct[] }) {
  const cart = useCart();
  const addToCart = cart?.addToCart;
  const getItemQuantity = cart?.getItemQuantity;
  const isInCart = cart?.isInCart;

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (product: BaseProduct) => {
    addToCart?.(product);
    showToast(`${product.name} added!`, 'success');
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const inCart = isInCart?.(product.id) || false;
          const inWishlist = wishlist.includes(product.id);

          return (
            <Link
              key={product.id}
              href={`/products?id=${product.id}`}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group block"
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

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
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
                      e.preventDefault();
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
            </Link>
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
    </>
  );
}