
"use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Toaster } from '../components/ui/toaster';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { FloatingWhatsAppButton } from '../components/common/FloatingWhatsAppButton';

const inter = Inter({ 
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      if (!document.title || document.title === "") {
         document.title = 'Bertera Niaga Global - Beyond Border Beyond Expectations';
      }
    }
  }, [isLoading]);

  return (
    <html lang="en">
      <head>
        <meta name="description" content="Premium Indonesian coffee producer and wholesaler for export." />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
            <Footer />
            <Toaster />
            <FloatingWhatsAppButton />
          </>
        )}
      </body>
    </html>
  );
}
