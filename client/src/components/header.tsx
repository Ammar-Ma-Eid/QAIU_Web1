// This file has been migrated to /client/src/components/header.tsx

'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo'; // migrated to /client/src/components/logo.tsx
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-12" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-lg font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <a
              href="https://qworld.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QWorld
            </a>
          </Button>
          <Button variant="default" asChild>
            <a
              href="https://qegypt.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              QEgypt
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12">
              <nav className="flex flex-col gap-8">
                <Link
                  href="/"
                  className="flex items-center gap-3 mb-4"
                  onClick={() => setIsOpen(false)}
                >
                  <Logo className="h-12" />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold transition-colors hover:text-primary px-2 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://qworld.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    QWorld
                  </a>
                </Button>
                <Button variant="default" asChild>
                  <a
                    href="https://qegypt.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    QEgypt
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
