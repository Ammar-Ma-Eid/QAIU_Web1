import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import GlobalLoader from '@/components/global-loader';
import { NavigationEvents } from '@/components/navigation-events';
import { Suspense } from 'react';

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const fontHeadline = SpaceGrotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'QAIU - Quantum Computing at Alamein International University',
  description: 'The official website for the Quantum Computing at Alamein International University student club.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={cn('font-body antialiased', fontBody.variable, fontHeadline.variable)}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <GlobalLoader />
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
