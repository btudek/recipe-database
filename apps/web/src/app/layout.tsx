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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
