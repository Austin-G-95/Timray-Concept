// app/faq/page.tsx
'use client';

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSearch, FiHelpCircle, FiPackage, FiCreditCard, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { id: 'orders', name: 'Orders & Shipping', icon: FiPackage, color: 'text-indigo-400' },
    { id: 'payments', name: 'Payments', icon: FiCreditCard, color: 'text-indigo-400' },
    { id: 'delivery', name: 'Delivery', icon: FiTruck, color: 'text-indigo-400' },
    { id: 'returns', name: 'Returns & Warranty', icon: FiShield, color: 'text-indigo-400' },
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our products, select your desired items, click "Add to Cart," and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your purchase. You\'ll receive an order confirmation email immediately.'
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance with a recent order.'
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through encrypted connections. We do not store your payment information.'
    },
    {
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption and PCI-compliant payment processors. Your payment details are never stored on our servers. All transactions are processed through secure payment gateways with fraud protection.'
    },
    {
      category: 'delivery',
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (3-5 business days), express shipping (1-2 business days), and overnight delivery for urgent orders. Shipping costs vary based on location and package weight. You\'ll see shipping options at checkout.'
    },
    {
      category: 'delivery',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Please note that customs duties and taxes may apply and are the responsibility of the recipient.'
    },
    {
      category: 'delivery',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can use this number on our website or the carrier\'s website to track your package in real-time. You\'ll also receive delivery notifications.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused products in original packaging. Items must be in resalable condition. To initiate a return, contact our support team or use the returns portal in your account. Return shipping is free for defective items.'
    },
    {
      category: 'returns',
      question: 'How long do refunds take?',
      answer: 'Once we receive your return, refunds are processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method and bank processing times (typically 5-10 business days).'
    },
    {
      category: 'returns',
      question: 'What is covered under warranty?',
      answer: 'All products come with a minimum 1-year manufacturer warranty covering defects in materials and workmanship. Extended warranties are available for select products. Warranty claims require proof of purchase and are processed through our support team.'
    },
    {
      category: 'general',
      question: 'Are your products genuine and new?',
      answer: 'Absolutely. We only sell 100% genuine, brand-new products directly from authorized distributors and manufacturers. Each product comes with official warranty and authenticity certificates. Counterfeit products are never sold on our platform.'
    },
    {
      category: 'general',
      question: 'Do you offer technical support?',
      answer: 'Yes, we provide comprehensive technical support for all products sold. Our support team is available via email, live chat, and phone. We also offer setup guides, troubleshooting resources, and firmware updates on our support portal.'
    },
    {
      category: 'general',
      question: 'How do I contact customer support?',
      answer: 'You can reach our support team through multiple channels: Email (support@timrayconcept.com), Live Chat (available on website), Phone (+1-555-123-4567), or through the contact form on our website. Response time is typically under 2 hours during business hours.'
    },
    {
      category: 'general',
      question: 'What makes Timray Concept different?',
      answer: 'We curate only premium, innovative tech products that undergo rigorous quality testing. Our expert team provides personalized recommendations, exceptional customer service, and comprehensive after-sales support. We focus on building long-term relationships with tech enthusiasts.'
    }
  ];

  const filteredFAQs = searchQuery
    ? faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faqs;

  const getFAQsByCategory = (categoryId: string) => {
    return filteredFAQs.filter(faq => faq.category === categoryId);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative py-32 px-4 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center px-6 py-2 bg-zinc-900 border border-white/10 backdrop-blur-3xl rounded-full mb-10 animate-fadeIn">
            <FiHelpCircle className="mr-3 text-indigo-400" />
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Protocol Search</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9] animate-slideUp">
            PROTOCOL <span className="text-indigo-500">ARCHIVE</span>.
          </h1>
          <p className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Find answers to core questions about our artifacts, synchronization, and protocols.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="sticky top-0 z-30 py-8 px-4 bg-black/80 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <FiSearch className="text-zinc-600 group-focus-within:text-white transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-16 pr-24 py-5 bg-white/5 border border-white/5 rounded-2xl focus:border-indigo-500/50 focus:bg-white/10 focus:outline-none text-white font-bold placeholder:text-zinc-700 transition-all"
            />
            {searchQuery && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Clear Archive
                </button>
              </div>
            )}
          </div>
          {searchQuery && (
            <div className="mt-4 text-center animate-fadeIn">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                Located {filteredFAQs.length} matching result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Quick Links */}
          <div className="mb-24 animate-fadeIn">
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-12 text-center">CORE DIMENSIONS</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const count = getFAQsByCategory(category.id).length;

                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      const element = document.getElementById(category.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 text-left hover:bg-white/5 hover:border-indigo-500/30 transition-all duration-500 group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-xl bg-white text-black group-hover:scale-110 transition-transform`}>
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{count} NODES</span>
                    </div>
                    <h3 className="text-sm font-black text-white mb-2 uppercase tracking-widest">{category.name}</h3>
                    <p className="text-zinc-600 text-xs font-medium leading-relaxed">
                      Synchronization protocols for {category.name.toLowerCase()}
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-[10px] font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                      ACCESS PROTOCOLS <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-32">
            {categories.map((category) => {
              const categoryFAQs = getFAQsByCategory(category.id);
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category.id} id={category.id} className="animate-fadeIn">
                  <div className="flex items-center mb-12">
                    <div className={`p-4 rounded-2xl bg-zinc-900 border border-white/5 mr-6 text-indigo-400`}>
                      <category.icon size={28} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{category.name}</h2>
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">{categoryFAQs.length} questions recorded</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {categoryFAQs.map((faq, index) => {
                      const uniqueId = `${category.id}-${index}`;
                      const isOpen = openIndex === (index + categories.indexOf(category) * 10);

                      return (
                        <div
                          key={index}
                          className={`bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-zinc-900/60 border-indigo-500/30 shadow-2xl shadow-indigo-500/5' : 'hover:bg-zinc-900/50'}`}
                        >
                          <button
                            onClick={() => toggleFAQ(index + categories.indexOf(category) * 10)}
                            className="w-full px-8 py-6 text-left flex items-center justify-between group"
                          >
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-6 transition-all duration-500 ${isOpen ? 'bg-white text-black' : 'bg-zinc-900 border border-white/5 text-zinc-500 group-hover:text-white'}`}>
                                <span className="text-xs font-black">Q</span>
                              </div>
                              <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-white' : 'text-zinc-400'}`}>{faq.question}</span>
                            </div>
                            {isOpen ? (
                              <FiChevronUp className="text-indigo-500" size={20} />
                            ) : (
                              <FiChevronDown className="text-zinc-600" size={20} />
                            )}
                          </button>

                          {isOpen && (
                            <div className="px-8 pb-8 pt-2 animate-slideIn">
                              <div className="flex items-start">
                                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-6 mt-1 flex-shrink-0 text-white shadow-lg shadow-indigo-500/20">
                                  <span className="text-xs font-black">A</span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-zinc-400 text-lg leading-relaxed font-medium">{faq.answer}</p>
                                  <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                      PROTOCOL SYNCED?
                                      <button className="text-zinc-400 hover:text-white ml-4 transition-colors">AFFIRMATIVE</button>
                                      <button className="text-zinc-400 hover:text-white ml-4 transition-colors">NEGATIVE</button>
                                    </p>
                                    <div className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">
                                      VERIFIED HUB RESPONSE
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still Need Help Section */}
          <div className="mt-32 pt-24 border-t border-white/5">
            <div className="bg-zinc-900/40 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -mr-32 -mt-32" />

              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white text-black rounded-3xl mb-12 shadow-2xl">
                  <FiHelpCircle className="w-12 h-12" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tighter uppercase">STILL HAVE QUESTIONS?</h2>
                <p className="text-zinc-500 mb-12 text-xl font-medium leading-relaxed">
                  Can't find the answer you're looking for in the archive? Our dedicated support team is here to establish a manual link.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="/contact"
                    className="px-12 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-2xl flex items-center justify-center group"
                  >
                    INITIATE CONTACT
                    <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="mailto:support@timrayconcept.com"
                    className="px-12 py-6 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center"
                  >
                    TRANSMIT EMAIL
                  </a>
                </div>

                <div className="mt-20 pt-12 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <div>
                      <div className="text-[10px] font-black text-zinc-600 mb-2 uppercase tracking-widest">SYNC RATE</div>
                      <div className="text-white font-black uppercase tracking-tighter">&lt; 2 HOURS</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-zinc-600 mb-2 uppercase tracking-widest">PROTOCOLS</div>
                      <div className="text-white font-black uppercase tracking-tighter">24/7 ACTIVE</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-zinc-600 mb-2 uppercase tracking-widest">CORE RATING</div>
                      <div className="text-white font-black uppercase tracking-tighter">98% SATISFACTION</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-slideUp { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideIn { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}