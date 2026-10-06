import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface GlowButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "md" | "sm";
  className?: string;
}

export default function GlowButton({ onClick, children, size = "md", className = "" }: GlowButtonProps) {
  const padding = size === "sm" ? "px-5 py-2.5" : "px-8 py-4";
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[2px] rounded-sm overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#00ff00_360deg)]"
        />
      </div>
      <button
        onClick={onClick}
        className={`relative z-10 ${padding} bg-black text-[#00ff00] border border-[#00ff00]/20 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#00ff00] hover:text-black transition-all whitespace-nowrap`}
      >
        {children} <ChevronRight size={size === "sm" ? 12 : 14} />
      </button>
    </div>
  );
}
