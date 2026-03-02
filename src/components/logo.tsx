import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 100 100"
        className="h-10 w-10 text-primary fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Lens Ring */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        
        {/* Camera Aperture Blades */}
        <path d="M50 12 L70 30 L50 40 L30 30 Z" opacity="0.8" />
        <path d="M88 50 L70 70 L60 50 L70 30 Z" opacity="0.6" />
        <path d="M50 88 L30 70 L40 50 L70 70 Z" opacity="0.4" />
        <path d="M12 50 L30 30 L40 50 L30 70 Z" opacity="0.6" />

        {/* Central Lens Glass */}
        <circle cx="50" cy="50" r="12" fill="currentColor" />
        <circle cx="46" cy="46" r="3" fill="white" opacity="0.6" />
        
        {/* Monogram */}
        <text 
          x="50" 
          y="92" 
          fontSize="10" 
          fontWeight="900" 
          textAnchor="middle" 
          fill="currentColor" 
          style={{ letterSpacing: '2px' }}
        >
          SAGAR
        </text>
      </svg>
    </div>
  );
}
