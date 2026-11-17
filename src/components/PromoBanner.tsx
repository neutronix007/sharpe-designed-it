import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";
import { useBlackFridayCountdown } from "../blackFriday";

interface PromoBannerProps {
  onCtaClick: () => void;
  onClose?: () => void;
}

export default function PromoBanner({ onCtaClick, onClose }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const countdown = useBlackFridayCountdown();
  const bf = !!countdown;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-5 left-0 right-0 z-[200] bg-gradient-to-r from-[#00ff00]/20 to-[#00ff00]/10 border border-[#00ff00]/40 backdrop-blur-sm mx-5 md:mx-8 rounded-lg"
        >
          <div className="max-w-7xl mx-auto h-10 px-3 md:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Zap size={14} className="text-[#00ff00] flex-shrink-0" />
              <p className="truncate text-[10px] md:text-[11px] text-white/70 uppercase tracking-wide">
                <span className="font-bold tracking-widest text-[#00ff00]">{bf ? "Black Friday" : "Limited Offer"}</span>
                <span className="mx-2 text-white/30">•</span>
                {bf ? (
                  <>
                    <span className="sm:hidden">Free bonuses · ends <span className="text-[#00ff00] font-bold">30 Nov</span></span>
                    <span className="hidden sm:inline">Website in 2 days for GH₵1,200 <span className="text-[#00ff00] font-bold">+ free extra page &amp; logo touch-up</span></span>
                    <span className="hidden lg:inline"> · ends in {countdown!.label}</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Website in <span className="text-[#00ff00] font-bold">2 days</span></span>
                    <span className="hidden sm:inline">Your website in <span className="text-[#00ff00] font-bold">2 days</span> for GH₵1,200</span>
                    <span className="hidden lg:inline"> — perfect for startups & launches</span>
                  </>
                )}
              </p>
            </div>

            <button
              onClick={onCtaClick}
              className="px-3 md:px-4 py-1.5 bg-[#00ff00] text-black font-bold text-[9px] md:text-[10px] uppercase tracking-[0.1em] hover:bg-white transition-all flex-shrink-0 whitespace-nowrap"
            >
              Claim Offer
            </button>

            <button
              onClick={() => { setIsVisible(false); onClose?.(); }}
              className="text-white/40 hover:text-[#00ff00] transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
