// components/Hero.tsx
'use client';

import Link from 'next/link';
import Icon from './ui/Icon'; // Assuming you created this earlier

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden text-white ">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-black"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        
        {/* Main Logo/Heading */}
        <div className="mb-8">
          <h1 className="text-5xl-white md:text-7xl font-bold ">
            Timray Concept
          </h1>
          <h2 className="text-2xl md:text-3xl text-white-600 font-semibold mt-5">
            Where Tech Gets Personal
          </h2>
        </div>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Curated devices and accessories built to perform, crafted to impress. 
          Experience the future—delivered today.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/products" 
            className="group inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white border-blue-500 font-semibold rounded-lg hover:bg-rgb(163, 0, 0)-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl min-w-[200px]"
          >
            <Icon name="cart" size={20} className="mr-3" />
            Shop Highlights
          </Link>
          
          <Link
            href="/about"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 min-w-[200px]"
          >
            <Icon name="help" size={20} className="mr-3" />
            Why Timray Concept?
          </Link>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-20">
          <div className="flex flex-col items-center text-gray-400 animate-bounce">
            <span className="text-sm mb-2">Scroll to explore</span>
            <Icon name="chevronDown" size={24} />
          </div>
        </div>
        
      </div>
    </section>
  );
}