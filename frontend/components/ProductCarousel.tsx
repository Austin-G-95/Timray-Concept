// components/ProductCarousel.tsx
'use client';

import { Carousel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {
  Phone as Smartphone,
  Laptop,
  Headset as Headphones,
  ArrowRight
} from 'react-bootstrap-icons';

export default function ProductCarousel() {
  const products = [
    {
      title: "Nebula X Smartphone",
      description: "120Hz AMOLED, 50MP OIS, and blazing-fast charging.",
      buttonText: "Explore",
      icon: Smartphone,
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Quantum Pro Laptop",
      description: "Intel i9, 32GB RAM, 1TB SSD, RTX 4070. Ultimate performance.",
      buttonText: "View Details",
      icon: Laptop,
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "Aurora Wireless Earbuds",
      description: "Active Noise Cancellation, 30hr battery, crystal clear audio.",
      buttonText: "Buy Now",
      icon: Headphones,
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3 text-gray-900">
          Timray Concept
        </h2>
        <h3 className="text-2xl text-center mb-10 text-blue-600 font-semibold">
          Flagship Showcase
        </h3>

        <Carousel
          fade
          indicators={true}
          controls={true}
          interval={5000}
          className="rounded-2xl overflow-hidden shadow-2xl"
          prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
          nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
        >
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <Carousel.Item key={index}>
                <div
                  className="h-[450px] md:h-[550px] flex items-center justify-center p-8"
                  style={{ background: product.bgColor }}
                >
                  <div className="text-center text-white max-w-2xl">
                    <div className="mb-6">
                      <IconComponent size={60} className="inline-block opacity-80" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">
                      {product.title}
                    </h3>
                    <p className="text-xl mb-10 opacity-90 leading-relaxed">
                      {product.description}
                    </p>
                    <Button
                      variant="outline-light"
                      size="lg"
                      className="px-10 py-3 font-semibold border-2"
                    >
                      {product.buttonText}
                      <ArrowRight className="ml-2 inline" />
                    </Button>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}