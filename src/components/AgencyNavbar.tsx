import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import GlowButton from "./GlowButton";

interface AgencyNavbarProps {
  top: number;
  onContactClick: () => void;
}

const LINKS = [
  { label: "Work", target: "work" },
  { label: "Results", target: "results" },
];

export default function AgencyNavbar({ top, onContactClick }: AgencyNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openContact = () => {
    setIsMenuOpen(false);
    onContactClick();
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, top }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-0 right-0 z-[190] mx-5 md:mx-8 border border-white/10 bg-black/70 backdrop-blur-md rounded-lg"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        <a
          href="/agency"
          onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="text-[12px] font-bold uppercase tracking-[0.3em] hover:text-[#00ff00] transition-colors"
        >
          The<span className="text-[#00ff00]">.</span>Agency
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-[#00ff00] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={openContact}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-[#00ff00] transition-colors"
          >
            Contact
          </button>
        </div>

        <GlowButton onClick={openContact} size="sm" className="hidden md:block">
          Start a Project
        </GlowButton>

        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="md:hidden text-white/70 hover:text-[#00ff00] transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col gap-5 px-4 py-6">
              {LINKS.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="text-left text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-[#00ff00] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <GlowButton onClick={openContact} size="sm" className="w-fit">
                Start a Project
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
