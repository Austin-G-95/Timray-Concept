'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Icon from '../ui/Icon';

// We'll create this context next
import { CartContext } from '@/context/CartContext';

export default function CartIcon() {
  // const { totalItems } = useContext(CartContext); // We'll uncomment after creating context
  const totalItems = 0; // Temporary mock

  return (
    <Link href="/cart" className="relative group">
      <div className="p-2 rounded-full hover:bg-gray-100 transition">
        <Icon name="cart" size={24} className="text-gray-700 group-hover:text-blue-600" />
        
        {/* Cart Badge */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-xl border invisible group-hover:visible z-50">
        <div className="text-sm font-medium text-gray-900 mb-2">
          Shopping Cart
        </div>
        {totalItems === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        ) : (
          <>
            <p className="text-gray-600 text-sm">
              {totalItems} item{totalItems > 1 ? 's' : ''} in cart
            </p>
            <div className="mt-2 pt-2 border-t">
              <Link 
                href="/cart" 
                className="flex items-center justify-center w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
              >
                View Cart
                <Icon name="arrowRight" size={16} className="ml-2" />
              </Link>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}