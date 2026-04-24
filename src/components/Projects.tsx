import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { projects, YT_EMBED, YT_MODAL } from "../data/projects";
// (SEO is handled centrally by HomePage)

// ── Lazy-loaded video: only starts loading/playing when near the viewport ──
function LazyVideo({ src, poster, className }: { src: string; poster?: string; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "300px" }   // start loading 300px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {inView && (
        <video
          src={src}
          {...(poster ? { poster } : {})}
          autoPlay muted loop playsInline
          className={className}
        />
      )}
    </div>
  );
}

// ── Entrance variants ──────────────────────────────────────────────
const cardVariants = {
  hero: { hidden: { opacity: 0, y: 48, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1 } },
  fromLeft: { hidden: { opacity: 0, x: -48, y: 24 }, visible: { opacity: 1, x: 0, y: 0 } },
  fromRight: { hidden: { opacity: 0, x: 48, y: 24 }, visible: { opacity: 1, x: 0, y: 0 } },
};

// ── Reusable card ──────────────────────────────────────────────────
function ProjectCard({
  project,
  className = "",
  cardHeight = "h-[260px] md:h-[320px]",
  variant = "fromLeft",
  delay = 0,
  onClick,
}: {
  project: typeof projects[0];
  className?: string;
  cardHeight?: string;
  variant?: keyof typeof cardVariants;
  delay?: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={cardVariants[variant]}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${cardHeight} ${className}`}
    >
      {/* Background — local video, YouTube, or image */}
      {project.videoEmbed && project.videoEmbed.startsWith("/") ? (
        <LazyVideo
          src={project.videoEmbed}
          poster={project.image || undefined}
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : project.videoEmbed ? (
        <>
          <img src={project.image} alt={project.title} referrerPolicy="no-referrer" loading="lazy"
            className="absolute inset-0 w-full h-full object-cover" />
          <iframe src={project.videoEmbed}
            className="absolute inset-0 w-full h-full border-none pointer-events-none scale-[1.15]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </>
      ) : (
        <img src={project.image} alt={project.title} referrerPolicy="no-referrer" loading="lazy"
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 scale-100" />
      )}

      {/* Gradient + hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Expand icon */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={16} />
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest mb-1">{project.category}</p>
        <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight">{project.title}</h3>
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const bluePillRef = useRef<HTMLDivElement>(null);
  const greenPillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      if (bluePillRef.current) gsap.to(bluePillRef.current, { x: x * 2, y: y * 2, rotationX: -y * 0.8, rotationY: x * 0.8, duration: 0.6, ease: "power2.out" });
      if (greenPillRef.current) gsap.to(greenPillRef.current, { x: -x * 1.5, y: -y * 1.5, rotationX: y * 0.5, rotationY: -x * 0.5, duration: 0.8, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Look up by id so Projects.tsx is unaffected by array order in projects.ts
  const byId = (id: number) => projects.find((p) => p.id === id)!;

  const open = (p: typeof projects[0]) => setSelectedProject(p);
  const close = () => setSelectedProject(null);
  const hasVideo = (p: typeof projects[0]) => !!(p.videoEmbed || p.videoModal);

  return (
    <section className="relative bg-[#050505] pt-24 pb-24 overflow-hidden">
      {/* ── Floating interactive pills ── */}
      <motion.div ref={bluePillRef}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute left-[6%] top-[9%] px-4 py-2 bg-[#2563eb] text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg preserve-3d pointer-events-none z-10">
        @sharpe.studio
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2563eb] rotate-45" />
      </motion.div>

      <motion.div ref={greenPillRef}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
        className="absolute right-[6%] top-[6%] px-4 py-2 bg-[#059669] text-white rounded-full text-sm font-medium flex items-center gap-2 shadow-lg preserve-3d pointer-events-none z-10">
        @creative.flow
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#059669] rotate-45" />
      </motion.div>

      {/* ── Heading ── */}
      <div className="text-center space-y-4 mb-14 px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
        >
          A curated collection of my <br />
          <span className="text-white/40 italic font-loader">most impactful works.</span>
        </motion.h2>
      </div>

      {/* ── Masonry grid — 8 projects, 5 rows — with gradient fade + Archive CTA ── */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-5 relative z-10">

          {/* Row 1 — full-width hero */}
          <ProjectCard project={byId(1)} variant="hero"
            cardHeight="h-[300px] md:h-[520px]" delay={0} onClick={() => open(byId(1))} />

          {/* Row 2 — wide (2/3) + narrow (1/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProjectCard project={byId(2)} variant="fromLeft" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(byId(2))} />
            <ProjectCard project={byId(3)} variant="fromRight" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(byId(3))} />
          </div>

          {/* Row 3 — narrow (1/3) + wide (2/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProjectCard project={byId(4)} variant="fromLeft" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(byId(4))} />
            <ProjectCard project={byId(5)} variant="fromRight" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(byId(5))} />
          </div>

          {/* Row 4 — wide (2/3) + narrow (1/3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProjectCard project={byId(6)} variant="fromLeft" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(byId(6))} />
            <ProjectCard project={byId(7)} variant="fromRight" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(byId(7))} />
          </div>

          {/* Row 5 — full-width hero */}
          <ProjectCard project={byId(8)} variant="hero"
            cardHeight="h-[300px] md:h-[480px]" delay={0.05} onClick={() => open(byId(8))} />
        </div>

        {/* Gradient fade — bleeds over the last row, CTA sits inside it */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-20 flex items-end justify-center pb-12 pointer-events-none">
          <Link
            to="/archive"
            className="pointer-events-auto flex items-center gap-2.5 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 active:scale-95 transition-all shadow-2xl text-sm group"
          >
            View Full Archive
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* ── Collaborate CTA ── */}
      <div className="mt-10 text-center z-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 rounded-full font-medium transition-all text-sm">
            Want to collaborate? Let's talk →
          </a>
        </motion.div>
      </div>

      {/* ── Quick-view modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {hasVideo(selectedProject) ? (
              /* ── VIDEO modal — cinematic, near-fullscreen ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[92vw] glass-card rounded-3xl overflow-hidden flex flex-col"
              >
                <button onClick={close}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X size={20} />
                </button>

                {/* Video — capped so the info strip below is always visible */}
                <div
                  className="w-full bg-black shrink-0"
                  style={{ aspectRatio: "16/9", maxHeight: "calc(90vh - 120px)" }}
                >
                  {selectedProject.videoModal ? (
                    <iframe src={selectedProject.videoModal}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  ) : selectedProject.videoEmbed && selectedProject.videoEmbed.startsWith("/") ? (
                    <video
                      src={selectedProject.videoEmbed}
                      {...(selectedProject.image ? { poster: selectedProject.image } : {})}
                      autoPlay controls
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <iframe src={selectedProject.videoEmbed}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                  )}
                </div>

                {/* Info strip */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 md:px-10 py-5 border-t border-white/5 shrink-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2563eb] font-medium tracking-widest uppercase text-[10px] mb-0.5">{selectedProject.category}</p>
                    <h3 className="text-xl md:text-2xl font-display font-bold truncate">{selectedProject.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mt-1 line-clamp-2 max-w-2xl">{selectedProject.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="px-3 py-2 glass-pill rounded-xl text-white/40 text-xs font-medium hidden md:block">
                      {selectedProject.user}
                    </div>
                    <a href={selectedProject.behance} target="_blank" rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:bg-white/90 transition-all text-sm whitespace-nowrap">
                      Behance <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── IMAGE modal — large, side-by-side ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                className="relative w-full max-w-[85vw] max-h-[90vh] glass-card rounded-[40px] overflow-hidden flex flex-col md:flex-row"
              >
                <button onClick={close}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 min-h-[260px] md:min-h-0">
                  <img src={selectedProject.image} alt={selectedProject.title}
                    className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center space-y-8 overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-[#2563eb] font-medium tracking-widest uppercase text-xs">{selectedProject.category}</p>
                    <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">{selectedProject.title}</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base">{selectedProject.description}</p>
                  <div className="flex items-center gap-4 pt-4">
                    <a href={selectedProject.behance} target="_blank" rel="noopener noreferrer"
                      className="flex-1 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
                      View on Behance <ExternalLink size={18} />
                    </a>
                    <div className="px-6 py-4 glass-pill rounded-2xl text-white/40 text-sm font-medium">
                      {selectedProject.user}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
