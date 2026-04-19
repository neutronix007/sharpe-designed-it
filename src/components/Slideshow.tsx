import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % projects.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + projects.length) % projects.length), []);

  // Auto-advance every 3.5s — pauses on hover or when modal is open
  useEffect(() => {
    if (paused || selected) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [paused, selected, next]);

  const current = projects[index];

  return (
    <>
      {/* ── Slideshow card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setSelected(current)}
        className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden group cursor-pointer"
      >
        <div className="flex flex-col md:flex-row h-full">

          {/* Image */}
          <div className="relative w-full md:w-[58%] h-52 md:h-72 overflow-hidden shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={current.image || "https://img.youtube.com/vi/sjDxL0-elBE/maxresdefault.jpg"}
                alt={current.title}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Category pill */}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[9px] text-white/80 uppercase tracking-widest pointer-events-none">
              {current.category}
            </div>

            {/* Nav arrows — always show on mobile, hover on desktop */}
            <div className="absolute inset-0 flex items-center justify-between px-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Text */}
          <div className="p-5 flex-1 flex flex-col justify-between min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Featured Work</p>
                <h3 className="text-sm md:text-base font-semibold text-white leading-snug">{current.title}</h3>
                <p className="text-[11px] text-white/50 leading-relaxed line-clamp-3">{current.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-4 flex-wrap">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    i === index ? "bg-white w-5" : "bg-white/25 w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
      </motion.div>

      {/* ── Featured work modal — consistent size for every project ── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal — fixed consistent dimensions regardless of image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl glass-card rounded-3xl overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Fixed-height image — same crop for every project */}
              <div className="w-full h-64 md:h-72 shrink-0 overflow-hidden bg-black">
                <img
                  src={selected.image || "https://img.youtube.com/vi/sjDxL0-elBE/maxresdefault.jpg"}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#2563eb] uppercase tracking-widest">{selected.category}</p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold leading-tight">{selected.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{selected.description}</p>
                <a
                  href={selected.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all text-sm"
                >
                  View on Behance <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
