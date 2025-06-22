import { cn } from "@/lib/utils"

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={cn(className)}
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      transform="rotate(60 50 50)"
    />
    <path
      d="M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      transform="rotate(120 50 50)"
    />
    <circle cx="50" cy="50" r="12" fill="currentColor" />
  </svg>
);

export default Logo;
