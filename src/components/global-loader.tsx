'use client';

import { useLoadingStore } from '@/store/loading-store';
import { Atom } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function GlobalLoader() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isLoading) {
      setShow(true);
    } else {
      // Delay hiding to allow for smooth fade-out animation
      timeoutId = setTimeout(() => setShow(false), 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isLoading]);


  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center text-center">
        <Atom className="h-12 w-12 animate-spin text-primary" style={{ animationDuration: '2s' }} />
        <p className="mt-4 text-lg font-semibold text-foreground">Loading Quantum State...</p>
        <p className="text-sm text-muted-foreground">Please wait a moment.</p>
      </div>
    </div>
  );
}
