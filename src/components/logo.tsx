import { cn } from "@/lib/utils"
import Image from "next/image"

const Logo = ({ className }: { className?: string }) => (
    <Image
        src="/logo.png"
        alt="QAIU Logo"
        width={115}
        height={32}
        className={cn("h-8 w-auto", className)}
        priority
    />
);

export default Logo;
