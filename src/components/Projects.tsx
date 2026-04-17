import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
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

const YT_EMBED = "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&mute=1&controls=0&loop=1&playlist=sjDxL0-elBE&modestbranding=1";
const YT_MODAL = "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&controls=1";

const projects = [
  // ── Row 1 (full-width hero) ─────────────────────────────────────
  {
    id: 1,
    title: "Google Real Estate Expo — Zeme Inc",
    category: "Motion Design",
    image: "https://img.youtube.com/vi/sjDxL0-elBE/maxresdefault.jpg",
    videoEmbed: YT_EMBED,
    videoModal: YT_MODAL,
    user: "@sharpe.motion",
    description: "Motion graphics and video production for the Google Real Estate Expo and NY Real Estate Expo. High-impact content driving measurable audience growth and a 15% follower increase across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  // ── Row 2 (2/3 + 1/3) ──────────────────────────────────────────
  {
    id: 2,
    title: "Social Media Posts for Beda Consult",
    category: "Social Media Design",
    image: "/Social media posts for beda consult.jpg",
    videoEmbed: "/Social media posts for beda consult.mp4",
    videoModal: "",
    user: "@sharpe.design",
    description: "A series of professional social media assets created for Beda Consult's digital presence. The designs balance corporate credibility with visual clarity to drive engagement, reinforcing brand identity and communicating services effectively across platforms.",
    behance: "https://www.behance.net/gallery/194743025/Social-Media-Posts-for-Beda-Consult",
  },
  {
    id: 3,
    title: "Social Media Designs for Vintage Travel Consult",
    category: "Social Media Design",
    image: "/Social media designs for vintage travel consult.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.content",
    description: "A curated set of social media graphics for a vintage-themed travel consulting brand. The visuals blend nostalgic aesthetic cues with modern digital layout to communicate wanderlust and trust, maintaining a consistent brand voice across multiple platforms.",
    behance: "https://www.behance.net/gallery/187052353/Social-Media-Designs-for-Vintage-Travel-Consult",
  },
  // ── Row 3 (1/3 + 2/3) ──────────────────────────────────────────
  {
    id: 4,
    title: "Social Media Designs for NOS POS",
    category: "Social Media Design",
    image: "/Social media designsfor NOS.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.nos",
    description: "A focused social media design package for NOS-POS, translating their brand into scroll-stopping digital content. Adaptable across post formats while maintaining visual consistency, built to support the brand's online communication goals.",
    behance: "https://www.behance.net/gallery/172884727/Social-Media-Designs-For-NOS-POS-1",
  },
  {
    id: 5,
    title: "UTA Music App — Logo Design & Brand Identity",
    category: "UI Design & Brand Identity",
    image: "/Cover image brand guidelines.jpg",
    videoEmbed: "/uta music app.mp4",
    videoModal: "",
    user: "@sharpe.uta",
    description: "Logo design and full brand identity system for UTA, a music streaming app. Crafted a distinctive visual language — wordmark, iconography, colour system, and UI guidelines — that bridges music culture with a clean, modern digital product experience.",
    behance: "https://www.behance.net/gallery/182086685/Uta-Music-App-Logo-Design-and-Brand-Identity",
  },
  // ── Row 4 (2/3 + 1/3) ──────────────────────────────────────────
  {
    id: 6,
    title: "Sharpe Designed.It Brand Identity",
    category: "Brand Identity",
    image: "/sharpe designed it square cover image.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.brand",
    description: "The brand identity suite for Sharpe Designed.It — encompassing logo design and full visual identity development. A direct expression of the studio's philosophy and aesthetic standards, anchoring its professional presence across all touchpoints.",
    behance: "https://www.behance.net/gallery/174283517/Sharpe-DesignedIt-Logo-Design-and-Brand-Identity",
  },
  {
    id: 7,
    title: "Pony Decor — Logo Design & Brand Identity",
    category: "Brand Identity",
    image: "/pony decor thumbnail.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.brand",
    description: "Full logo design and brand identity system for Pony Decor, an interior décor brand. Developed a refined visual language — custom wordmark, colour palette, and brand guidelines — that captures the brand's elegance and positions it confidently in the luxury home décor market.",
    behance: "https://www.behance.net/gallery/176240365/Pony-Decor-Logo-Design-and-Brand-Identity",
  },
  // ── Row 5 (full-width hero) ─────────────────────────────────────
  {
    id: 8,
    title: "New York Real Estate Expo — Zeme Inc",
    category: "Motion Graphics",
    image: "",
    videoEmbed: "/Real Estate Expo Oct 2024 with Sound V3.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description: "High-impact product video and motion graphics produced for Zeme Inc's October Real Estate Expo. Full end-to-end production — script to screen — delivering broadcast-quality visuals that drove measurable engagement at the event and across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
];

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

      {/* ── Masonry grid — 8 projects, 5 rows ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-5 relative z-10">

        {/* Row 1 — full-width hero */}
        <ProjectCard project={projects[0]} variant="hero"
          cardHeight="h-[300px] md:h-[520px]" delay={0} onClick={() => open(projects[0])} />

        {/* Row 2 — wide (2/3) + narrow (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCard project={projects[1]} variant="fromLeft" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(projects[1])} />
          <ProjectCard project={projects[2]} variant="fromRight" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(projects[2])} />
        </div>

        {/* Row 3 — narrow (1/3) + wide (2/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCard project={projects[3]} variant="fromLeft" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(projects[3])} />
          <ProjectCard project={projects[4]} variant="fromRight" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(projects[4])} />
        </div>

        {/* Row 4 — wide (2/3) + narrow (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCard project={projects[5]} variant="fromLeft" className="md:col-span-2" cardHeight="h-[280px] md:h-[420px]" delay={0.05} onClick={() => open(projects[5])} />
          <ProjectCard project={projects[6]} variant="fromRight" className="md:col-span-1" cardHeight="h-[280px] md:h-[420px]" delay={0.15} onClick={() => open(projects[6])} />
        </div>

        {/* Row 5 — full-width hero */}
        <ProjectCard project={projects[7]} variant="hero"
          cardHeight="h-[300px] md:h-[480px]" delay={0.05} onClick={() => open(projects[7])} />
      </div>

      {/* ── Description & CTA ── */}
      <div className="mt-14 text-center space-y-6 px-8 z-10 relative">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
          className="max-w-xl mx-auto text-white/40 text-xs md:text-sm leading-relaxed">
          As a motion and graphic designer, I transform complex ideas into visually stunning narratives.
          Explore a curated selection of works that push the boundaries of digital form.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer"
            className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all shadow-lg text-sm">
            Collaborate with me
          </a>
          <a href="https://www.behance.net/cliffordsharpe" target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-2 text-sm">
            View full archive <ArrowUpRight size={16} />
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
                className="relative w-full max-w-[92vw] max-h-[92vh] glass-card rounded-3xl overflow-y-auto flex flex-col"
              >
                <button onClick={close}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <X size={20} />
                </button>

                {/* Video fills full width in 16:9 */}
                <div className="w-full aspect-video bg-black shrink-0">
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
