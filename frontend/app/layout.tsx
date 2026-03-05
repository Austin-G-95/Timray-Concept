// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { NextAuthProvider } from '@/components/NextAuthProvider';

export const metadata: Metadata = {
  title: 'Timray Concept - Premium Tech & Accessories',
  description: 'Curated devices and accessories built to perform, crafted to impress. Experience the future—delivered today.',
  keywords: ['tech', 'electronics', 'gadgets', 'premium', 'accessories', 'timray concept'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <NextAuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}