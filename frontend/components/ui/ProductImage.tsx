// components/ui/ProductImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);
  
  // If image doesn't load, show placeholder
  if (error) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-lg`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}