import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <svg
        viewBox="0 0 450 140"
        className="h-16 w-auto"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Red Arc framing the camera */}
        <path
          d="M 110 25 A 60 60 0 1 0 110 125"
          fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* White Camera Body Silhouette */}
        <path
          d="M 45 55 L 50 50 L 75 50 L 80 55 L 105 55 L 105 105 L 35 105 L 35 55 Z"
          fill="white"
        />
        
        {/* Stylized Red Lens overlapping camera */}
        <g transform="translate(70, 80)">
          <circle r="22" fill="#ef4444" />
          <circle r="16" fill="black" />
          <circle r="12" fill="#333" />
          {/* Lens reflection */}
          <circle cx="-5" cy="-5" r="3" fill="white" opacity="0.4" />
        </g>

        {/* Text SAGAR in Bold Red */}
        <text
          x="120"
          y="85"
          fontSize="52"
          fontWeight="900"
          fill="#ef4444"
          fontFamily="Times New Roman, serif"
          style={{ letterSpacing: '-1px' }}
        >
          SAGAR
        </text>

        {/* Text Studio in White Script */}
        <text
          x="285"
          y="85"
          fontSize="52"
          fill="white"
          fontFamily="'Playfair Display', serif"
          fontStyle="italic"
        >
          Studio
        </text>

        {/* Text PHOTOGRAPHY below */}
        <text
          x="125"
          y="115"
          fontSize="28"
          fill="white"
          fontFamily="serif"
          style={{ letterSpacing: '6px' }}
        >
          PHOTOGRAPHY
        </text>

        {/* Wing Element on the right */}
        <g transform="translate(390, 75)" fill="white">
          <path d="M 0 0 C 15 -10, 35 5, 25 35 C 30 15, 20 0, 0 5 Z" />
          <path d="M 0 -10 C 20 -25, 45 -5, 35 25 C 40 5, 30 -10, 0 -5 Z" opacity="0.8" />
          <path d="M 0 -20 C 25 -40, 55 -15, 45 15 C 50 -5, 40 -20, 0 -15 Z" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
