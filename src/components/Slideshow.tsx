import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Real Estate Expo Motion",
    desc: "Motion graphics and video production for Google Real Estate Expo and NY Real Estate Expo.",
    image: "https://picsum.photos/seed/motion1/800/450"
  },
  {
    id: 2,
    title: "Beda Consult Brand System",
    desc: "Visual identity and brand guidelines delivered across 13+ client accounts.",
    image: "https://picsum.photos/seed/brand2/800/450"
  },
  {
    id: 3,
    title: "Freelance Motion Reel",
    desc: "50+ logos, 800+ marketing materials, and social campaigns for global clients.",
    image: "https://picsum.photos/seed/abstract3/800/450"
  }
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
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={projects[index].image}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Play size={10} fill="white" className="ml-0.5" />
          </div>

          {/* Navigation Arrows */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-widest">Featured Work</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              {projects[index].title}: {projects[index].desc}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* iOS Glassy Hover Overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}
