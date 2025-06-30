import { Atom } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center text-center">
        <Atom className="h-12 w-12 animate-spin text-primary" style={{ animationDuration: '2s' }} />
        <p className="mt-4 text-lg font-semibold text-foreground">Loading Quantum State...</p>
        <p className="text-sm text-muted-foreground">Please wait a moment.</p>
      </div>
    </div>
  );
}
