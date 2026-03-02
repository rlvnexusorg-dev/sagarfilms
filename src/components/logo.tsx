import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <svg
        viewBox="0 0 400 120"
        className="h-12 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red Arc */}
        <path
          d="M 100 20 A 50 50 0 1 0 100 100"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-red-600"
        />

        {/* Camera Body */}
        <path
          d="M 40 45 L 45 40 L 65 40 L 70 45 L 90 45 L 90 85 L 30 85 L 30 45 Z"
          fill="currentColor"
        />
        
        {/* Lens */}
        <circle cx="60" cy="65" r="15" fill="#111" stroke="#ef4444" strokeWidth="3" />
        <circle cx="60" cy="65" r="8" fill="#333" />
        <circle cx="56" cy="61" r="2" fill="white" opacity="0.5" />

        {/* Text SAGAR */}
        <text
          x="105"
          y="75"
          fontSize="48"
          fontWeight="bold"
          fill="#ef4444"
          fontFamily="serif"
          style={{ letterSpacing: '-1px' }}
        >
          SAGAR
        </text>

        {/* Text Studio */}
        <text
          x="265"
          y="75"
          fontSize="48"
          fill="currentColor"
          fontFamily="'Playfair Display', serif"
          fontStyle="italic"
        >
          Studio
        </text>

        {/* Text PHOTOGRAPHY */}
        <text
          x="110"
          y="105"
          fontSize="24"
          fill="currentColor"
          fontFamily="serif"
          style={{ letterSpacing: '8px' }}
        >
          PHOTOGRAPHY
        </text>

        {/* Wing Element */}
        <g transform="translate(360, 60)" fill="currentColor">
          <path d="M 0 0 C 20 -10, 40 10, 30 40 C 35 20, 25 5, 0 5 Z" />
          <path d="M 0 -10 C 25 -25, 50 0, 40 30 C 45 10, 35 -5, 0 -5 Z" opacity="0.8" />
          <path d="M 0 -20 C 30 -40, 60 -10, 50 20 C 55 0, 45 -15, 0 -15 Z" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
