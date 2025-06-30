'use client';

import dynamic from 'next/dynamic';

const InteractiveBackground = dynamic(
  () => import('@/components/interactive-background'),
  {
    ssr: false,
  }
);

export default function ClientInteractiveBackground() {
  return <InteractiveBackground />;
}

// This file has been migrated to /client/src/components/client-interactive-background.tsx
