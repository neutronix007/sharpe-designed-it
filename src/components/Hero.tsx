import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ArrowUpRight, Play, X } from "lucide-react";
import Slideshow from "./Slideshow";
import SEO from "./SEO";

const tags = [
  "Motion Graphics",
  "Visual Identity",
  "Brand Identity",
  "Social Media Design",
  "Art Direction"
];

export default function Hero() {
  const slideshowRef = useRef<HTMLDivElement>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [videoBgReady, setVideoBgReady] = useState(false);

  // Fallback: always show background video after 2s on slow connections
  useEffect(() => {
    const fallback = setTimeout(() => setVideoBgReady(true), 2000);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const element = slideshowRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate relative position within the window for the tilt effect
      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * 30;

      gsap.to(element, {
        rotationY: xPos,
        rotationX: -yPos,
        ease: "power2.out",
        duration: 0.8,
        transformPerspective: 1000
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center lg:justify-start overflow-hidden pt-20 lg:pt-48 pb-20 lg:pb-40">
      <SEO
        title="Sharpe.Designed.It | Motion & Visual Identity Designer"
        description="Clifford Sharpe — Graphic & Motion Designer crafting high-end visual identities, motion graphics, and brand systems that drive measurable growth."
        image="/og-home.jpeg"
        path="/"
      />
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0">
          {/* Local video — text content animates first, video fades in when ready */}
          <video
            src="/home-page-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoBgReady(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoBgReady ? "opacity-100" : "opacity-0"}`}
          />
          {/* Original streaming source — uncomment to compare
          <div className="absolute inset-0 scale-[1.5] lg:scale-[1.2]">
            <iframe
              src="https://streamable.com/e/1rn30v?nocontrols=1&autoplay=1&muted=1&loop=1"
              className="w-full h-full border-none pointer-events-none"
              allow="autoplay; fullscreen"
            />
          </div>
          */}
        </div>
        {/* Bottom fade to blend with next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-10" />
        {/* Top fade for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Background Text (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.08 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="text-[25vw] font-display font-extrabold tracking-tighter text-white leading-none mb-[-5vw] whitespace-nowrap"
        >
          SHARPE
        </motion.h1>
      </div>

      <div 
        className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 lg:mt-0"
      >
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8 lg:mt-10">
          <div className="space-y-4">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-[0.9]"
            >
              Hi, I'm <br />
              <span className="text-white/40 font-loader italic">Clifford.</span>
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md text-base md:text-lg text-white/50 font-light leading-relaxed"
            >
              Graphic & Motion Designer — crafting high-end visual identities and motion graphics that drive brand growth and audience engagement.
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <button 
              onClick={() => setIsShowreelOpen(true)}
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-2 group text-sm md:text-base"
            >
              View Showreel
              <Play size={18} className="fill-black group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <ArrowUpRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8 lg:gap-12">
          {/* Slideshow Card with 3D Tilt */}
          <div 
            ref={slideshowRef} 
            className="w-full flex justify-start lg:preserve-3d"
          >
            <Slideshow />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-start lg:justify-end gap-3 max-w-sm">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="px-4 py-2 glass-pill rounded-full text-[10px] md:text-xs font-medium text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Trademark Text */}
      <div className="absolute bottom-12 right-12 text-[10px] uppercase tracking-widest text-white/20 font-medium z-10">
        © Registered Trademark 2026
      </div>

      {/* Showreel Modal */}
      <AnimatePresence>
        {isShowreelOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShowreelOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl aspect-video glass-card rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsShowreelOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                src="https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
