import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://therecipedatabase.net'),
  title: {
    default: 'The Recipe Database - Discover Delicious Recipes',
    template: '%s | The Recipe Database',
  },
  description: 'Explore thousands of recipes with detailed ingredients, step-by-step instructions, and health scores. Filter by cuisine, category, and diet.',
  keywords: ['recipe', 'cooking', 'food', 'ingredients', 'healthy eating', 'easy recipes', 'dinner ideas', 'meal planning'],
  authors: [{ name: 'The Recipe Database' }],
  creator: 'The Recipe Database',
  publisher: 'The Recipe Database',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The Recipe Database',
    title: 'The Recipe Database - Discover Delicious Recipes',
    description: 'Explore thousands of recipes with detailed ingredients, step-by-step instructions, and health scores. Filter by cuisine, category, and diet.',
    url: 'https://therecipedatabase.net',
    images: [
      {
        url: 'https://therecipedatabase.net/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Recipe Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Recipe Database - Discover Delicious Recipes',
    description: 'Explore thousands of recipes with detailed ingredients, step-by-step instructions, and health scores. Filter by cuisine, category, and diet.',
    images: ['https://therecipedatabase.net/og-image.png'],
    creator: '@recipedatabase',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canonicalUrl = 'https://therecipedatabase.net';
  
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6286510969915582" crossOrigin="anonymous"></script>
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
