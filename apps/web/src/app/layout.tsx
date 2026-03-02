import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://web-tau-weld-69.vercel.app'),
  title: {
    default: 'Recipe Database - Discover Your Next Favorite Recipe',
    template: '%s | Recipe Database',
  },
  description: 'Explore thousands of original recipes with precise measurements, portion scaling, US/Metric unit conversion, and chef-quality Michelin mode techniques.',
  keywords: ['recipes', 'cooking', 'food', 'meal planning', 'chef tips', 'michelin mode', 'easy recipes', 'dinner ideas'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Recipe Database',
    title: 'Recipe Database - Discover Your Next Favorite Recipe',
    description: 'Explore thousands of original recipes with precise measurements, portion scaling, and chef-quality techniques.',
    url: 'https://web-tau-weld-69.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipe Database - Discover Your Next Favorite Recipe',
    description: 'Explore thousands of original recipes with precise measurements, portion scaling, and chef-quality techniques.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1794557219157944" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-1 bg-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
