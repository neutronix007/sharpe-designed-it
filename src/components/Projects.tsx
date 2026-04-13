import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const projects = [
  {
    id: 1,
    title: "Real Estate Expo Motion Series",
    category: "Motion Design",
    image: "https://picsum.photos/seed/neon/800/1000",
    rotation: -15,
    xOffset: -280,
    user: "@sharpe.motion",
    description: "Motion graphics and video production for the Google Real Estate Expo and NY Real Estate Expo. High-impact content driving measurable audience growth and a 15% follower increase across social platforms."
  },
  {
    id: 2,
    title: "Beda Consult Brand System",
    category: "Visual Identity",
    image: "https://picsum.photos/seed/abstract/800/1000",
    rotation: -8,
    xOffset: -140,
    user: "@sharpe.design",
    description: "Comprehensive visual identity and brand guidelines developed for a multi-client design agency. Standardised brand language across 13+ accounts with a 30% engagement uplift."
  },
  {
    id: 3,
    title: "Social Media Campaign Series",
    category: "Content Design",
    image: "https://picsum.photos/seed/digital/800/1000",
    rotation: 0,
    xOffset: 0,
    user: "@sharpe.content",
    description: "Recurring monthly social media graphic production at scale — 15+ videos and 52+ graphics per month — supporting brand consistency and a 25% boost in audience engagement."
  },
  {
    id: 4,
    title: "Logo & Brand Guidelines Collection",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/kinetic/800/1000",
    rotation: 8,
    xOffset: 140,
    user: "@sharpe.brand",
    description: "A curated collection of 50+ logos and brand identity systems produced for global clients, achieving a 90% customer satisfaction rate and a 40% client referral boost."
  },
  {
    id: 5,
    title: "Freelance Motion Reel",
    category: "Motion Graphics",
    image: "https://picsum.photos/seed/vibrant/800/1000",
    rotation: 15,
    xOffset: 280,
    user: "@sharpe.reel",
    description: "A compiled motion reel showcasing video production, animation, and social content spanning work at Zeme Inc and independent client engagements across the USA and globally."
  }
];

export default function Projects() {
  const bluePillRef = useRef<HTMLDivElement>(null);
  const greenPillRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 30;
      const y = (clientY - window.innerHeight / 2) / 30;

      if (bluePillRef.current) {
        gsap.to(bluePillRef.current, {
          x: x * 2,
          y: y * 2,
          rotationX: -y * 0.8,
          rotationY: x * 0.8,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (greenPillRef.current) {
        gsap.to(greenPillRef.current, {
          x: -x * 1.5,
          y: -y * 1.5,
          rotationX: y * 0.5,
          rotationY: -x * 0.5,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen bg-[#050505] pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Heading */}
      <div className="text-center space-y-4 mb-8 px-8 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
        >
          A curated collection of my <br />
          <span className="text-white/40 italic font-loader">most impactful works.</span>
        </motion.h2>
        
        {/* User Tags (Floating) */}
        <div className="relative h-8 w-full max-w-2xl mx-auto hidden md:block">
          <motion.div 
            ref={bluePillRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute left-10 -top-4 px-4 py-2 bg-[#2563eb] text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg preserve-3d"
          >
            @sharpe.studio
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2563eb] rotate-45" />
          </motion.div>
          
          <motion.div 
            ref={greenPillRef}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute right-10 -top-10 px-4 py-2 bg-[#059669] text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg preserve-3d"
          >
            @creative.flow
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#059669] rotate-45" />
          </motion.div>
        </div>
      </div>

      {/* Projects Stack */}
      <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center perspective-1000">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: project.xOffset * 2, rotate: project.rotation }}
            whileInView={{ 
              opacity: 1, 
              x: typeof window !== 'undefined' && window.innerWidth < 768 ? project.xOffset * 0.5 : project.xOffset, 
              rotate: project.rotation 
            }}
            transition={{ 
              duration: 1, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 50
            }}
            whileHover={{ 
              scale: 1.1, 
              rotate: 0, 
              zIndex: 50,
              y: -50,
              transition: { duration: 0.3 }
            }}
            onClick={() => setSelectedProject(project)}
            viewport={{ once: true }}
            className="absolute w-[160px] md:w-[280px] aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl group cursor-pointer"
            style={{ zIndex: index }}
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-xs font-medium text-white/60 uppercase tracking-widest mb-1">{project.category}</p>
              <h3 className="text-xl font-display font-bold text-white flex items-center justify-between">
                {project.title}
                <ArrowUpRight size={20} />
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Description & Buttons */}
      <div className="mt-8 text-center space-y-6 px-8 z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto text-white/40 text-xs md:text-sm leading-relaxed"
        >
          As a motion and graphic designer, I transform complex ideas into visually stunning narratives. 
          Explore a curated selection of works that push the boundaries of digital form.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all shadow-lg text-sm">
            Collaborate with me
          </a>
          <a href="https://www.behance.net/cliffordsharpe" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 text-sm">
            View full archive
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Quick View Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-card rounded-[40px] overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8">
                <div className="space-y-2">
                  <p className="text-[#2563eb] font-medium tracking-widest uppercase text-xs">{selectedProject.category}</p>
                  <h3 className="text-4xl md:text-5xl font-display font-bold">{selectedProject.title}</h3>
                </div>

                <p className="text-white/60 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://www.behance.net/cliffordsharpe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                  >
                    View on Behance
                    <ExternalLink size={18} />
                  </a>
                  <div className="px-6 py-4 glass-pill rounded-2xl text-white/40 text-sm font-medium">
                    {selectedProject.user}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
