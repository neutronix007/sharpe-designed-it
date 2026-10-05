import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";

interface PromoBannerProps {
  onCtaClick: () => void;
}

export default function PromoBanner({ onCtaClick }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 left-0 right-0 z-[200] bg-gradient-to-r from-[#00ff00]/20 to-[#00ff00]/10 border-b border-[#00ff00]/40 backdrop-blur-sm mx-5 md:mx-8 rounded-lg"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3 flex-1">
              <Zap size={20} className="text-[#00ff00] flex-shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-widest text-[#00ff00]">
                  Limited Time Offer
                </span>
                <p className="text-[10px] md:text-[11px] text-white/70 uppercase tracking-wide">
                  Get your website built in <span className="text-[#00ff00] font-bold">48 hours</span> • Perfect for startups & launches
                </p>
              </div>
            </div>

            {/* Middle: CTA Button */}
            <button
              onClick={onCtaClick}
              className="px-4 md:px-6 py-2 bg-[#00ff00] text-black font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-white transition-all flex-shrink-0 whitespace-nowrap"
            >
              Claim Offer
            </button>

            {/* Right: Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/40 hover:text-[#00ff00] transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
