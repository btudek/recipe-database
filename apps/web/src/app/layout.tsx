import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Recipe Database',
    template: '%s | Recipe Database',
  },
  description: 'Discover and cook amazing recipes with detailed instructions, portion scaling, and chef-quality techniques.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Recipe Database',
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
