// components/Navbar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiLogIn,
  FiUserPlus,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiHeart
} from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

interface SearchProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { totalItems, isHydrated } = useCart();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Showcase', href: '/showcase' },
    { name: 'Wishlist', href: '/account/wishlist' },
    { name: 'Contact', href: '/contact' },
  ];



  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name || session?.user?.email || 'User';

  const handleLogout = async () => {
    setIsAccountDropdownOpen(false);
    await signOut({ callbackUrl: '/' });
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const handleLogin = () => {
    // This is just for the mobile menu click handler, actual login is handled by pages
    setIsAccountDropdownOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Live search effect
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.slice(0, 6));
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (productName: string) => {
    router.push(`/products?search=${encodeURIComponent(productName)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };



  return (
    <>
      {/* Search Overlay - Only show on mobile */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
        </div>
      )}

      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-xl shadow-white/5">
                <span className="text-sm tracking-tight">TC</span>
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black text-white tracking-tighter uppercase group-hover:text-indigo-400 transition-colors">TIMRAY.</span>
                <span className="block text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] -mt-1 group-hover:text-zinc-400 transition-colors">Concept</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-[11px] font-black text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all uppercase tracking-widest"
                >
                  {item.name}
                </Link>
              ))}

              {/* Search Bar - Appears inline next to Contact */}
              <div
                ref={searchRef}
                className={`ml-2 transition-all duration-300 ease-out ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}
              >
                <form onSubmit={handleSearchSubmit} className="relative text-white">
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="DISCOVER..."
                      className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none transition-all text-sm font-bold tracking-widest placeholder:text-zinc-700 text-white"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <FiSearch className="text-zinc-600" size={16} />
                    </div>
                  </div>

                  {/* Search Results Dropdown */}
                  {searchQuery && isSearchOpen && (
                    <div className="absolute top-full mt-4 w-96 bg-zinc-900/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/5 py-6 z-50 animate-slideUp">
                      {isSearching ? (
                        <div className="px-8 py-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Searching the catalog...</div>
                      ) : searchResults.length > 0 ? (
                        <div className="px-4">
                          <div className="px-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                            Found Results
                          </div>
                          <div className="space-y-1">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleSuggestionClick(product.name)}
                                className="flex items-center justify-between w-full px-4 py-4 text-zinc-300 hover:bg-white/5 hover:text-white rounded-[1.5rem] transition-all text-left"
                              >
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-zinc-800 rounded-lg mr-4 overflow-hidden relative">
                                    <Image src={product.image} alt="" fill className="object-cover" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-black tracking-tight leading-none mb-1">{product.name}</div>
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{product.category}</div>
                                  </div>
                                </div>
                                <span className="text-sm font-black text-white">{formatPrice(product.price)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : searchQuery.trim().length >= 2 ? (
                        <div className="px-8 py-4 text-zinc-500 text-sm font-medium">No matches discovered.</div>
                      ) : null}

                      {searchQuery.trim() && (
                        <div className="mt-4 pt-4 border-t border-white/5 px-4">
                          <button
                            type="submit"
                            className="flex items-center justify-between w-full px-6 py-4 bg-indigo-500 text-white rounded-[1.5rem] font-black text-xs tracking-widest uppercase hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20"
                          >
                            <span>Detailed Search for "{searchQuery}"</span>
                            <FiChevronRight size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right-side Icons */}
            <div className="flex items-center space-x-4">

              {/* Search Icon - Desktop (hidden when search is open) */}
              <button
                onClick={handleSearchToggle}
                className={`hidden md:flex p-3 rounded-2xl transition-all ${isSearchOpen
                  ? 'opacity-0 w-0 overflow-hidden'
                  : 'opacity-100 text-zinc-400 hover:text-white hover:bg-white/10 shadow-lg shadow-black/20'}`}
                aria-label="Search"
              >
                <FiSearch size={22} />
              </button>

              {/* Search Close Button - Desktop (shown when search is open) */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className={`hidden md:flex items-center p-2 rounded-lg transition-all ${isSearchOpen
                  ? 'opacity-100 text-zinc-500 hover:text-white hover:bg-white/10'
                  : 'opacity-0 w-0 overflow-hidden'}`}
                aria-label="Close search"
              >
                <FiX size={20} />
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={handleSearchToggle}
                className="md:hidden p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg"
                aria-label="Search"
              >
                {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
              </button>

              {/* Cart with Badge */}
              <Link
                href="/cart"
                className="relative p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all shadow-lg shadow-black/20 group"
              >
                <FiShoppingCart size={22} />
                {isHydrated && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-black rounded-lg w-5 h-5 flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-4 text-zinc-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all shadow-lg shadow-black/20 group"
                  aria-label="Account"
                >
                  <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-zinc-700 transition-all">
                    <FiUser size={18} />
                  </div>
                  <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">
                    {isLoggedIn ? 'Account' : 'JOIN US'}
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-500 ${isAccountDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-zinc-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 py-6 z-50 animate-slideUp overflow-hidden">
                    {/* Decorative element in dropdown */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] -mr-16 -mt-16 pointer-events-none" />

                    {isLoggedIn ? (
                      // Logged In State
                      <>
                        <div className="px-8 pb-6 border-b border-white/5 relative z-10">
                          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Authenticated</div>
                          <div className="text-lg font-black text-white truncate">{userName}</div>
                        </div>

                        <div className="pt-4 space-y-1 px-4 relative z-10">
                          <Link
                            href="/account"
                            className="flex items-center px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <FiUser className="mr-4 text-zinc-600 group-hover:text-indigo-400" size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Profile Discovery</span>
                          </Link>

                          {session?.user?.role === 'ADMIN' && (
                            <Link
                              href="/admin"
                              className="flex items-center px-6 py-4 text-indigo-400 font-black hover:bg-indigo-500 hover:text-white rounded-2xl transition-all group"
                              onClick={() => setIsAccountDropdownOpen(false)}
                            >
                              <FiSettings className="mr-4 group-hover:text-white" size={18} />
                              <span className="text-xs uppercase tracking-widest">Admin Control</span>
                            </Link>
                          )}

                          <Link
                            href="/account/orders"
                            className="flex items-center px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <svg className="mr-4 text-zinc-600 group-hover:text-indigo-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="text-xs font-black uppercase tracking-widest">Order History</span>
                          </Link>

                          <Link
                            href="/account/wishlist"
                            className="flex items-center px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                            onClick={() => setIsAccountDropdownOpen(false)}
                          >
                            <FiHeart className="mr-4 text-zinc-600 group-hover:text-red-500" size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Saved Gems</span>
                          </Link>

                          <div className="border-t border-white/5 my-4 mx-4"></div>

                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
                          >
                            <FiLogOut className="mr-4" size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      // Logged Out State
                      <div className="px-6 space-y-4">
                        <div className="px-2 mb-6">
                          <div className="text-lg font-black text-white leading-tight">JOIN THE <br />TIMRAY HUB.</div>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Elevate your experience.</p>
                        </div>

                        <Link
                          href="/login"
                          className="flex items-center justify-center w-full py-4 bg-white text-black rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5"
                          onClick={() => {
                            setIsAccountDropdownOpen(false);
                            handleLogin();
                          }}
                        >
                          <FiLogIn className="mr-3" size={16} />
                          Sign In
                        </Link>

                        <Link
                          href="/signup"
                          className="flex items-center justify-center w-full py-4 bg-zinc-800 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                          onClick={() => setIsAccountDropdownOpen(false)}
                        >
                          <FiUserPlus className="mr-3" size={16} />
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Full width below navbar */}
          {isSearchOpen && (
            <div className="md:hidden border-t border-white/5 py-4 animate-slideDown">
              <form onSubmit={handleSearchSubmit} className="px-4">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, categories, brands..."
                    className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-white/5 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-white placeholder:text-zinc-600"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiSearch className="text-zinc-500" size={20} />
                  </div>
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white font-black uppercase text-[10px] tracking-widest"
                  >
                    Go
                  </button>
                </div>

                {/* Mobile Search Results */}
                {searchQuery && (
                  <div className="mt-4 bg-zinc-900 rounded-[2rem] border border-white/5 py-4 shadow-2xl">
                    <div className="px-4 pb-2">
                      {isSearching ? (
                        <div className="text-gray-500 text-sm">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">
                            Artifacts Found
                          </div>
                          <div className="space-y-2">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                onClick={() => handleSuggestionClick(product.name)}
                                className="flex items-center justify-between w-full px-4 py-3 text-zinc-300 hover:bg-white/5 rounded-xl transition-all text-left"
                              >
                                <span className="text-white font-bold">{product.name}</span>
                                <span className="text-zinc-500 font-black text-[10px] uppercase">{formatPrice(product.price)}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      ) : searchQuery.trim().length >= 2 ? (
                        <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest text-center py-4">Artifact Not Found</div>
                      ) : (
                        <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest text-center py-4">Search protocol requires 2+ chars</div>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {isMenuOpen && !isSearchOpen && (
            <div className="md:hidden border-t border-white/5 py-4 h-[calc(100vh-64px)] overflow-y-auto bg-black/95 backdrop-blur-xl animate-fadeIn">
              {/* Navigation Links */}
              <div className="space-y-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-6 py-4 text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Account Options */}
              <div className="border-t border-white/5 mt-8 pt-8 px-4">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <div className="px-6 py-4">
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Signed in as</div>
                      <div className="text-lg font-black text-white">{userName}</div>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center px-6 py-4 text-zinc-400 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="mr-4" size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Profile Discovery</span>
                    </Link>

                    {session?.user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center px-6 py-4 text-indigo-400 font-bold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FiSettings className="mr-4" size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Admin Control</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-6 py-4 text-red-500"
                    >
                      <FiLogOut className="mr-4" size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/login"
                      className="flex items-center justify-center py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-white/5"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogin();
                      }}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

    </>
  );
}