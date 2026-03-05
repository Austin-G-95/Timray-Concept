import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShield, FiTruck, FiZap, FiStar, FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Sonic Wave EarPods",
      description: "Premium wireless earbuds with active noise cancellation",
      price: 35000,
      originalPrice: 45000,
      image: "/img/Sonic Wave EarPods.jpg",
      rating: 4.8,
      reviews: 128,
      badge: "BESTSELLER",
      category: "Earphones"
    },
    {
      id: 2,
      name: "Gaming Headset RGB",
      description: "7.1 surround sound gaming headset with RGB lighting",
      price: 95000,
      originalPrice: 120000,
      image: "/img/Bose-QuietComfort-Ultra-Headphones-black-1200x675.webp",
      rating: 4.7,
      reviews: 287,
      badge: "HOT",
      category: "Headphones"
    },
    {
      id: 3,
      name: "Amoled GPS Watch Pro",
      description: "Advanced fitness tracker with AMOLED display and GPS",
      price: 320000,
      originalPrice: 380000,
      image: "/img/Amoled GPS Watch.jpg",
      rating: 4.9,
      reviews: 567,
      badge: "PREMIUM",
      category: "Smart Watches"
    },
    {
      id: 4,
      name: "Fast Charger Pro 65W",
      description: "65W USB-C fast charger with multiple ports",
      price: 42000,
      originalPrice: 55000,
      image: "/img/Fast Charger.jpg",
      rating: 4.6,
      reviews: 445,
      badge: "NEW",
      category: "Accessories"
    },
    {
      id: 5,
      name: "Elite Wireless Keyboard",
      description: "Mechanical keyboard with RGB backlight",
      price: 135000,
      originalPrice: 165000,
      image: "/img/Keyboard.jpg",
      rating: 4.7,
      reviews: 445,
      badge: "TRENDING",
      category: "Peripherals"
    },
    {
      id: 6,
      name: "BoomBox Pro Speaker",
      description: "Powerful 40W stereo sound with 24-hour battery",
      price: 155000,
      originalPrice: 185000,
      image: "/img/images (1).jpeg",
      rating: 4.7,
      reviews: 456,
      badge: "LIMITED",
      category: "Jamboxes"
    }
  ];

  const categories = [
    { 
      name: "Headphones", 
      count: "15+ Products", 
      image: "/img/Headphone 1.webp",
      description: "Premium audio experience"
    },
    { 
      name: "Earphones", 
      count: "12+ Products", 
      image: "/img/Sonic Wave EarPods.jpg",
      description: "Wireless freedom"
    },
    { 
      name: "Smart Watches", 
      count: "8+ Products", 
      image: "/img/Amoled GPS Watch.jpg",
      description: "Wearable technology"
    },
    { 
      name: "Accessories", 
      count: "20+ Products", 
      image: "/img/Fast Charger.jpg",
      description: "Essential tech gear"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "30+", label: "Premium Products" },
    { number: "24/7", label: "Customer Support" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO SECTION - Clean Minimalist */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-7xl px-4 mx-auto">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/80 backdrop-blur-xl rounded-full border border-gray-600/30 text-sm font-bold uppercase tracking-wider mb-12">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-200">Premium Tech Collection</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
            <span className="block text-white mb-4">
              TIMRAY
            </span>
            <span className="block text-gray-300">
              CONCEPT
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover the future of technology with our curated collection of 
            <span className="text-white font-bold"> premium gadgets</span> and 
            <span className="text-white font-bold"> cutting-edge accessories</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/products" className="group relative px-12 py-6 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
              <span className="relative z-10 flex items-center justify-center">
                Shop Collection
                <FiShoppingBag className="ml-3 text-xl group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link href="/showcase" className="group px-12 py-6 bg-transparent border-2 border-gray-600 text-gray-200 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-gray-800 hover:border-gray-500 transition-all backdrop-blur-xl">
              <span className="flex items-center justify-center">
                View Showcase
                <FiEye className="ml-3 text-xl" />
              </span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>
      {/* FEATURES SECTION - Dark Premium */}
      <section className="py-20 bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">WHY CHOOSE TIMRAY</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience excellence with every purchase through our premium service standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'SECURE PAYMENTS', 
                desc: 'Bank-level encryption with multiple payment options', 
                icon: <FiShield className="w-8 h-8" />,
                color: 'from-green-600 to-emerald-600'
              },
              { 
                title: 'FAST DELIVERY', 
                desc: 'Express shipping nationwide with real-time tracking', 
                icon: <FiTruck className="w-8 h-8" />,
                color: 'from-blue-600 to-cyan-600'
              },
              { 
                title: 'PREMIUM QUALITY', 
                desc: 'Authentic products with comprehensive warranty coverage', 
                icon: <FiZap className="w-8 h-8" />,
                color: 'from-purple-600 to-pink-600'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800 text-center hover:bg-gray-800/50 transition-all hover:scale-105 hover:border-gray-700">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION - Premium Dark */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-full text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">
              <FiStar className="w-4 h-4 text-yellow-400" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">PREMIUM PICKS</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Handpicked products that define excellence in technology and design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden hover:bg-gray-800/70 transition-all hover:scale-105 hover:shadow-2xl hover:border-gray-600">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-800 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-lg ${
                      product.badge === 'BESTSELLER' ? 'bg-yellow-500 text-black' :
                      product.badge === 'HOT' ? 'bg-red-500 text-white' :
                      product.badge === 'PREMIUM' ? 'bg-purple-500 text-white' :
                      product.badge === 'NEW' ? 'bg-green-500 text-white' :
                      product.badge === 'TRENDING' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-white hover:text-black transition-all">
                      <FiHeart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-white hover:text-black transition-all">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs">
                      <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white font-bold">{product.rating}</span>
                      <span className="text-gray-300">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-black text-white">
                          ₦{product.price.toLocaleString()}
                        </div>
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.reviews} reviews
                      </div>
                    </div>
                    
                    <button className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center space-x-2">
                      <FiShoppingBag className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="inline-flex items-center px-10 py-5 bg-gray-700 text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-gray-600 transition-all transform hover:scale-105 shadow-2xl">
              View All Products
              <FiArrowRight className="ml-3 text-xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION - Premium Dark */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-full text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">
              <span>Shop by Category</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">EXPLORE COLLECTIONS</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our comprehensive range of premium technology products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, i) => (
              <Link key={i} href="/products" className="group relative h-96 rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 hover:scale-105 transition-all hover:shadow-2xl hover:border-gray-700">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl font-black text-white mb-2 group-hover:text-gray-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {category.description}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {category.count}
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <FiArrowRight className="w-5 h-5 text-white group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - Dark Premium */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-full text-sm font-bold uppercase tracking-wider text-gray-300 mb-6">
              <FiStar className="w-4 h-4 text-yellow-400" />
              <span>Customer Reviews</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">WHAT THEY SAY</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Timray Concept
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Adaora Okafor",
                role: "Tech Enthusiast",
                review: "Exceptional quality and lightning-fast delivery. The Sonic Wave EarPods exceeded all my expectations!",
                rating: 5
              },
              {
                name: "Chinedu Okwu",
                role: "Gaming Professional",
                review: "The RGB Gaming Headset is a game-changer. Crystal clear audio and premium build quality.",
                rating: 5
              },
              {
                name: "Funmi Adebayo",
                role: "Fitness Coach",
                review: "My Amoled GPS Watch Pro tracks everything perfectly. Best investment for my health journey!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700 p-8 hover:bg-gray-800/70 transition-all hover:scale-105">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <FiStar key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.review}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white font-black text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION - Premium Dark */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gray-900/50 rounded-3xl border border-gray-700 p-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              STAY AHEAD OF THE <span className="text-gray-300">CURVE</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get exclusive access to new arrivals, special offers, and insider tech insights delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 bg-gray-800 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
              />
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Join 50,000+ tech enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}