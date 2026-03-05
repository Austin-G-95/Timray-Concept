'use client';

import { useState } from 'react';
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
  fullDescription?: string;
  features?: string;
  specs?: string;
}

export default function NewArrivalsSimple() {
  const cart = useCart();
  const addToCart = cart?.addToCart;
  const removeFromCart = cart?.removeFromCart;
  const getItemQuantity = cart?.getItemQuantity;
  const isInCart = cart?.isInCart;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' } | null>(null);

  // Static product data for fast loading
  const products: Product[] = [
    {
      id: "1",
      name: "Elite Audio Nexus",
      price: 245000,
      image: '/Bose-QuietComfort-Ultra-Headphones-black-1200x675.webp',
      category: 'Headphones',
      rating: 4.9,
      reviews: 42,
      description: 'High-fidelity cinematic sound experience with active noise cancellation.',
      fullDescription: 'Experience premium audio with our Elite Audio Nexus headphones. Featuring advanced noise cancellation technology and superior sound quality.',
      features: 'Active Noise Cancellation\n50mm Drivers\n30-hour Battery Life\nWireless & Wired Modes',
      specs: '{"Driver": "50mm Neodymium", "Frequency": "20Hz-20kHz", "Battery": "30 hours", "Weight": "250g"}'
    },
    {
      id: "2", 
      name: "Sonic Wave EarPods",
      price: 35000,
      image: '/Sonic Wave EarPods.jpg',
      category: 'Earphones',
      rating: 4.8,
      reviews: 28,
      description: 'Crystal clear audio with ergonomic fit and 8-hour battery life per charge.',
      fullDescription: 'Compact wireless earbuds designed for comfort and exceptional sound quality. Perfect for daily use and workouts.',
      features: 'Wireless Connectivity\nErgonomic Design\n8-hour Battery\nTouch Controls',
      specs: '{"Driver": "10mm", "Battery": "8 hours", "Connectivity": "Bluetooth 5.0", "Weight": "4g each"}'
    },
    {
      id: "3",
      name: "Amoled GPS Watch", 
      price: 320000,
      image: '/Amoled GPS Watch.jpg',
      category: 'Smart Watches',
      rating: 4.9,
      reviews: 35,
      description: 'AMOLED display with GPS, heart rate monitoring, and 10-day battery life.',
      fullDescription: 'Advanced smartwatch with comprehensive health tracking and GPS navigation. Built for active lifestyles.',
      features: 'AMOLED Display\nGPS Tracking\nHeart Rate Monitor\n10-day Battery\nWater Resistant',
      specs: '{"Display": "1.4-inch AMOLED", "Battery": "10 days", "GPS": "Built-in", "Water Rating": "5ATM"}'
    }
  ];

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
    setTimeout(() => setToast(null), 2000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart?.(product);
    showToast(`${product.name} added to cart!`);
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
    }).format(price);
  };

  const getFeatures = (featuresStr?: string) => {
    if (!featuresStr) return [];
    return featuresStr.split('\n').filter(f => f.trim());
  };

  const getSpecs = (specsStr?: string) => {
    if (!specsStr) return {};
    try {
      return JSON.parse(specsStr);
    } catch (e) {
      return {};
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const inCart = isInCart?.(product.id) || false;

          return (
            <div
              key={product.id}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group cursor-pointer"
              onClick={() => openModal(product)}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Quick View Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full font-bold shadow-xl">
                    <FiZoomIn size={16} />
                    <span className="text-sm">Quick View</span>
                  </div>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Simple wishlist toggle without API call for performance
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  <FiHeart size={14} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase">
                    {product.category}
                  </span>
                  <div className="flex items-center text-yellow-500 text-xs">
                    <FiStar fill="currentColor" className="mr-1" size={12} />
                    <span>{product.rating || '4.8'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h3>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-white">
                    {formatPrice(product.price)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className={`p-2 rounded-lg transition-all ${inCart
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
                  >
                    <FiShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[200]">
          <div className="px-6 py-3 rounded-lg bg-green-500 text-white font-bold text-sm shadow-xl">
            {toast.message}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-zinc-900 border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              <FiX size={20} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image Side */}
              <div className="relative w-full lg:w-1/2 h-[300px] lg:h-[400px] bg-zinc-800">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Info Side */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-indigo-400 uppercase">
                      {selectedProduct.category}
                    </span>
                    <div className="text-2xl font-bold text-white">
                      {formatPrice(selectedProduct.price)}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4">
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

                  <div className="space-y-4">
                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Description</h4>
                      <p className="text-zinc-300 leading-relaxed">
                        {selectedProduct.fullDescription || selectedProduct.description}
                      </p>
                    </div>

                    {/* Features */}
                    {getFeatures(selectedProduct.features).length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {getFeatures(selectedProduct.features).map((feature: string, index: number) => (
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
                        <h4 className="text-xs font-bold text-zinc-500 uppercase mb-2">Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(getSpecs(selectedProduct.specs)).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-1 border-b border-white/5">
                              <span className="text-zinc-500 text-xs font-bold uppercase">{key}</span>
                              <span className="text-white text-sm font-bold">{value as string}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/5">
                      <button
                        onClick={() => removeFromCart?.(selectedProduct.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="text-lg font-bold text-white w-10 text-center">
                        {getItemQuantity?.(selectedProduct.id) || 0}
                      </span>
                      <button
                        onClick={() => addToCart?.(selectedProduct)}
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeModal();
                      }}
                      className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center"
                    >
                      <FiShoppingCart className="mr-2" size={18} />
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