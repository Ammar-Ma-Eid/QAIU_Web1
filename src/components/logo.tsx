'use client';

import { cn } from "@/lib/utils"

const Logo = ({ className }: { className?: string }) => (
    <div className={cn("font-headline text-2xl font-bold tracking-tighter text-foreground", className)}>
      QAIU
    </div>
);

export default Logo;
