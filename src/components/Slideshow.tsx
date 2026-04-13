import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Vintage Travel Consult",
    category: "Social Media Design",
    desc: "Social media graphics blending nostalgic aesthetics with modern digital layout — communicating wanderlust and trust across platforms.",
    image: "/Social media designs for vintage travel consult.jpg",
  },
  {
    id: 2,
    title: "Beda Consult Social Posts",
    category: "Social Media Design",
    desc: "Professional social assets balancing corporate credibility with visual clarity, reinforcing brand identity across all channels.",
    image: "/Social media posts for beda consult.jpg",
  },
  {
    id: 3,
    title: "NOS POS Social Designs",
    category: "Social Media Design",
    desc: "Scroll-stopping digital content for NOS-POS — adaptable across post formats while maintaining a strong, consistent visual identity.",
    image: "/Social media designsfor NOS.jpg",
  },
  {
    id: 4,
    title: "Sharpe Designed.It Brand Identity",
    category: "Brand Identity",
    desc: "Full logo design and visual identity suite for the studio — a direct expression of its design philosophy and aesthetic standards.",
    image: "/sharpe designed it square cover image.jpg",
  },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-md glass-card rounded-2xl overflow-hidden group"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="relative w-full md:w-[55%] aspect-video md:aspect-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={projects[index].image}
              alt={projects[index].title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Play badge */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Play size={10} fill="white" className="ml-0.5" />
          </div>

          {/* Category pill */}
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[9px] text-white/70 uppercase tracking-widest">
            {projects[index].category}
          </div>

          {/* Navigation Arrows */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none"
              >
                <button onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h3 className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Featured Work</h3>
              <p className="text-sm font-semibold text-white leading-snug">{projects[index].title}</p>
              <p className="text-[11px] text-white/50 leading-relaxed">{projects[index].desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-4">
            {projects.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`h-[3px] rounded-full transition-all duration-300 ${i === index ? "bg-white w-5" : "bg-white/25 w-3"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
