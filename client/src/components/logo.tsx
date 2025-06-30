// This file has been migrated to /client/src/components/logo.tsx

import { cn } from "@/lib/utils"
import Image from "next/image"

const Logo = ({ className }: { className?: string }) => (
    <Image
        src="/QAIU_LOGO_V1_cut-removebg-preview.png"
        alt="QAIU Logo"
        width={172}
        height={48}
        className={cn("h-12 w-auto", className)}
        priority
    />
);

export default Logo;
