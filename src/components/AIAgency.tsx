import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Plus, ChevronRight, ChevronLeft, Quote, Monitor, X } from "lucide-react";
import SEO from "./SEO";

const PROJECTS = [
  {
    id: "01",
    title: "OCEAN.ODYSSEY",
    category: "INTERGALACTIC EXPERIENCE",
    localSrc: "/ocean odyssey.mp4",
    video: "",
    description: "Immersive digital experience for an intergalactic ocean where astronauts explore uncharted deep-space waters. Cinematic scroll-driven visuals, bioluminescent motion design, and zero-gravity UI built for the next frontier of space tourism.",
  },
  {
    id: "02",
    title: "SHARPE.PORTFOLIO",
    category: "PORTFOLIO DESIGN",
    localSrc: "/sharpe-designed-it.mp4",
    video: "",
    description: "Personal portfolio for Clifford Sharpe — graphic and motion designer. Built with kinetic animations, a custom cursor, and a dark editorial aesthetic that captures the full range of brand, motion, and digital work.",
  },
  {
    id: "03",
    title: "VOID.SYSTEMS",
    category: "WEB3 DEPLOY",
    localSrc: "",
    video: "https://streamable.com/e/ocgsz2?muted=1&nocontrols=1&autoplay=1&loop=1",
    description: "Immersive 3D environment for a decentralised finance protocol. Wallet-connect integration, generative on-chain asset previews, and a live countdown to token launch — all wrapped in a cinematic dark UI.",
  },
  {
    id: "04",
    title: "AXIOM.BRAND",
    category: "VISUAL IDENTITY",
    localSrc: "",
    video: "https://streamable.com/e/ocgsz2?muted=1&nocontrols=1&autoplay=1&loop=1",
    description: "Full brand system for a next-gen AI hardware company — custom wordmark, motion design guidelines, and a launch film that reached 2M organic views in 72 hours across LinkedIn and X.",
  },
  {
    id: "05",
    title: "FLUX.MOTION",
    category: "SOCIAL MEDIA",
    localSrc: "",
    video: "https://streamable.com/e/ocgsz2?muted=1&nocontrols=1&autoplay=1&loop=1",
    description: "High-volume social motion content for a global fintech brand. 30+ deliverables per sprint at broadcast quality — achieving a sustained 15% average CTR improvement across paid and organic channels.",
  },
  {
    id: "06",
    title: "PHANTOM.LAUNCH",
    category: "LAUNCH CAMPAIGN",
    localSrc: "",
    video: "https://streamable.com/e/ocgsz2?muted=1&nocontrols=1&autoplay=1&loop=1",
    description: "End-to-end launch campaign for a stealth-mode AI startup — brand identity, motion package, and a high-converting waitlist landing page that captured 50K signups in the first 48 hours of going live.",
  },
];

const TESTIMONIALS = [
  {
    name: "ELARA VANCE",
    role: "CEO @ NEURALIS",
    content: "The speed of execution and the sheer visual impact of the landing page they built for us was beyond anything we've seen. Conversion increased by 40% in the first week.",
    avatar: "https://picsum.photos/seed/elara/100/100",
  },
  {
    name: "KAIRO SHANE",
    role: "CTO @ VOID",
    content: "They don't just build websites; they forge digital experiences. The kinetic motion and attention to detail are unmatched in the industry.",
    avatar: "https://picsum.photos/seed/kairo/100/100",
  },
  {
    name: "MAYA CHEN",
    role: "HEAD OF BRAND @ AXIOM",
    content: "Clifford understood our technical product and translated it into a visual language that resonated with both engineers and investors. The launch film alone drove 2M views without a single paid boost.",
    avatar: "https://picsum.photos/seed/maya/100/100",
  },
  {
    name: "DRAE STORM",
    role: "CREATIVE DIRECTOR @ FLUX",
    content: "The motion deliverables consistently outperformed industry benchmarks. A rare combination of speed, precision, and creative instinct — we've never had a partner execute at this level.",
    avatar: "https://picsum.photos/seed/drae/100/100",
  },
  {
    name: "THEO BANKS",
    role: "FOUNDER @ NEURAL.IO",
    content: "From wireframe to launch in 72 hours. The landing page doubled our waitlist signups in the first month. This is the kind of partner you keep on retainer forever.",
    avatar: "https://picsum.photos/seed/theo/100/100",
  },
];

export default function AIAgency() {
  const containerRef = useRef(null);
  useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  // Aspect ratio detected from the video's natural dimensions; falls back to 16/9 for iframes
  const [modalAspect, setModalAspect] = useState<number>(16 / 9);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [testimonialDir, setTestimonialDir] = useState(1);

  // Hero video ready state — text animates in first, video fades in when ready
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  // Fallback: show video after 2.5s even on slow connections
  useEffect(() => {
    const fallback = setTimeout(() => setHeroVideoReady(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  // Auto-advance testimonials every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialDir(1);
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setTestimonialDir(1);
    setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialDir(-1);
    setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden font-mono selection:bg-[#00ff00] selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 z-[2] opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <SEO
        title="The Agency | Clifford Sharpe — We Build Killer Landing Pages"
        description="High-performance landing pages and digital experiences powered by kinetic motion and brand strategy. Engineered for conversion, built for the next frontier."
        image="/og-agency.jpeg"
        path="/ai-agency"
      />

      <div className="relative z-20 w-full flex flex-col p-8 md:p-12">

        {/* ── HERO ── */}
        {/* Text animates in first; video fades in after it's ready */}
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center gap-6 md:gap-8 p-8 md:p-16">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00ff00]/40 z-30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00ff00]/40 z-30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00ff00]/40 z-30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00ff00]/40 z-30" />

          {/* Title — animates in immediately */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-center order-2 space-y-2"
          >
            <h1 className="text-[6vw] md:text-[3.8vw] font-tech font-bold leading-tight tracking-tight uppercase max-w-5xl mx-auto">
              We Build Killer<br />Landing Pages
            </h1>
            <div className="flex justify-center gap-4">
              <span className="text-[10px] font-bold text-[#00ff00]/60 tracking-[0.5em]">THE.AGENCY</span>
              <span className="text-[10px] font-bold text-white/20 tracking-[0.5em]">EST.2099</span>
            </div>
          </motion.div>

          {/* Subtitle — animates in second */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="max-w-xl space-y-3 text-center order-3"
          >
            <div className="flex items-center gap-3 justify-center">
              <Plus size={12} className="text-[#00ff00]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">High-Performance Architecture</span>
            </div>
            <p className="text-[10px] md:text-[11px] leading-relaxed text-white/50 uppercase tracking-widest font-light px-4">
              We forge high-performance digital architectures powered by kinetic motion and neural intelligence.
              Engineered for conversion. Built for the next frontier of visual identity.
            </p>
          </motion.div>

          {/* CTA button — animates in third */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="order-5 relative group"
          >
            <div className="absolute -inset-[2px] rounded-sm overflow-hidden pointer-events-none">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#00ff00_360deg)]"
              />
            </div>
            <a
              href="https://cal.com/clifford-sharpe"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-8 py-4 bg-black text-[#00ff00] border border-[#00ff00]/20 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[#00ff00] hover:text-black transition-all"
            >
              Initialize Project <ChevronRight size={14} />
            </a>
          </motion.div>

          {/* Video — fades in once loaded (or after 2.5s fallback) */}
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: heroVideoReady ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden order-1 z-40"
          >
            <video
              src="/kinetic-forge-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={() => setHeroVideoReady(true)}
              className="w-full h-auto max-h-[50vh] object-contain mx-auto block"
            />
            <div className="absolute inset-0 bg-black/10 z-[1] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />
          </motion.div>
        </div>

        {/* ── DIGITAL ARTIFACTS GRID ── */}
        <section className="mt-32 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3">
              <Monitor size={14} className="text-[#00ff00]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Selected.Works</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Digital.Artifacts</h2>
          </motion.div>

          {/* 3×2 grid — all 6 visible at once */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-3 cursor-pointer group"
                onClick={() => { setModalAspect(16 / 9); setSelectedProject(project); }}
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/5">
                  {project.localSrc ? (
                    <video
                      src={project.localSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <iframe
                      src={project.video}
                      className="w-full h-full border-none pointer-events-none scale-[1.3] grayscale group-hover:grayscale-0 transition-all duration-700"
                      allow="autoplay; fullscreen"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-3 left-3 text-[10px] font-bold text-[#00ff00]">{project.id}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">{project.category}</div>
                    <div className="text-base font-bold uppercase tracking-tight">{project.title}</div>
                  </div>
                  {/* Expand hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="border border-[#00ff00]/40 text-[#00ff00] text-[9px] uppercase tracking-widest px-3 py-1.5">
                      View Details
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-white/30 uppercase leading-relaxed px-1 line-clamp-2">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROJECT MODAL — portrait / tall layout ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-3xl bg-black border border-white/10 flex flex-col overflow-hidden"
                style={{ maxHeight: "92vh" }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#00ff00]/60 z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#00ff00]/60 z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#00ff00]/60 z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00ff00]/60 z-10 pointer-events-none" />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 border border-white/20 flex items-center justify-center text-white/50 hover:text-[#00ff00] hover:border-[#00ff00]/40 transition-all bg-black"
                >
                  <X size={16} />
                </button>

                {/* Video — aspect ratio auto-detected from the file; iframes fall back to 16/9 */}
                <div
                  className="relative w-full bg-black flex-shrink-0"
                  style={{ aspectRatio: modalAspect }}
                >
                  {selectedProject.localSrc ? (
                    <video
                      src={selectedProject.localSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedMetadata={(e) => {
                        const v = e.currentTarget;
                        if (v.videoWidth && v.videoHeight) {
                          setModalAspect(v.videoWidth / v.videoHeight);
                        }
                      }}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={selectedProject.video}
                      className="w-full h-full border-none"
                      allow="autoplay; fullscreen"
                    />
                  )}
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-[1]" />
                </div>

                {/* Info panel */}
                <div className="flex-shrink-0 p-6 md:p-8 space-y-4 border-t border-white/5">
                  <div className="space-y-1">
                    <div className="text-[9px] text-[#00ff00] font-bold uppercase tracking-[0.4em]">{selectedProject.category}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">{selectedProject.id}</div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">{selectedProject.title}</h3>
                  </div>
                  <p className="text-[11px] text-white/50 uppercase leading-relaxed tracking-wide">
                    {selectedProject.description}
                  </p>
                  <a
                    href="https://www.behance.net/cliffordsharpe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] border border-[#00ff00]/30 px-5 py-3 hover:bg-[#00ff00] hover:text-black transition-all w-fit"
                  >
                    View on Behance <ChevronRight size={12} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── TESTIMONIALS SLIDESHOW ── */}
        <section className="mt-48 mb-32 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3">
              <Quote size={14} className="text-[#00ff00]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Neural.Feedback</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Client.Testimonials</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait" custom={testimonialDir}>
              <motion.div
                key={testimonialIdx}
                custom={testimonialDir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative p-8 md:p-16 border border-white/5 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#00ff00]/40" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00ff00]/40" />

                <Quote className="text-[#00ff00]/20 mb-8" size={40} />
                <p className="text-base md:text-xl text-white/80 italic leading-relaxed mb-10 uppercase tracking-wide">
                  "{TESTIMONIALS[testimonialIdx].content}"
                </p>
                <div className="flex items-center gap-5">
                  <img
                    src={TESTIMONIALS[testimonialIdx].avatar}
                    alt={TESTIMONIALS[testimonialIdx].name}
                    className="w-12 h-12 rounded-full border border-[#00ff00]/20 grayscale"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest">{TESTIMONIALS[testimonialIdx].name}</div>
                    <div className="text-[9px] text-[#00ff00]/60 uppercase tracking-widest mt-1">{TESTIMONIALS[testimonialIdx].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00ff00] hover:border-[#00ff00]/40 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-3">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setTestimonialDir(i > testimonialIdx ? 1 : -1); setTestimonialIdx(i); }}
                    className={`w-6 h-[2px] transition-all ${i === testimonialIdx ? "bg-[#00ff00]" : "bg-white/20"}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00ff00] hover:border-[#00ff00]/40 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ── AGENCY FOOTER ── */}
        <footer className="mt-24 pt-12 border-t border-white/5 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="space-y-4">
              <div className="text-[10px] font-bold text-[#00ff00] uppercase tracking-[0.4em]">THE.AGENCY</div>
              <p className="text-[9px] text-white/30 uppercase leading-relaxed tracking-widest">
                Clifford Sharpe — Graphic & Motion Designer. Forging high-performance digital architectures for brands worldwide.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Quick.Links</div>
              <div className="flex flex-col gap-2 text-[9px] uppercase tracking-widest text-white/20">
                <a href="/" className="hover:text-[#00ff00] transition-colors">Home.Page</a>
                <a href="/projects" className="hover:text-[#00ff00] transition-colors">Projects</a>
                <a href="/experience" className="hover:text-[#00ff00] transition-colors">Experience</a>
                <a href="https://linktr.ee/sharpe_designedit" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff00] transition-colors">All.Links</a>
              </div>
            </div>

            {/* Social / Contact */}
            <div className="space-y-4">
              <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Connect</div>
              <div className="flex flex-col gap-2 text-[9px] uppercase tracking-widest text-white/20">
                <a href="mailto:clifford.sharpe007@gmail.com" className="hover:text-[#00ff00] transition-colors">Email</a>
                <a href="https://www.linkedin.com/in/clifford-sharpe/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff00] transition-colors">LinkedIn</a>
                <a href="https://github.com/neutronix007/PortfolioProjects" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff00] transition-colors">GitHub</a>
                <a href="https://www.behance.net/cliffordsharpe" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff00] transition-colors">Behance</a>
                <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff00] transition-colors">Book a Call</a>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-4">
              <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">System.Status</div>
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/20">
                  <span>Neural Link</span>
                  <span className="text-[#00ff00]">Active</span>
                </div>
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/20">
                  <span>Availability</span>
                  <span className="text-[#00ff00]">Open</span>
                </div>
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/20">
                  <span>Uptime</span>
                  <span>99.9%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-8 text-[8px] uppercase tracking-[0.5em] text-white/10 border-t border-white/5">
            <div>© 2026 CLIFFORD SHARPE // THE AGENCY // ALL RIGHTS RESERVED</div>
            <div className="hidden md:flex items-center gap-4">
              <span>clifford.sharpe007@gmail.com</span>
              <div className="w-4 h-[1px] bg-white/5" />
              <span>clifford.sharpe007@gmail.com</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating ring */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed -top-20 -right-20 w-64 h-64 border border-white/5 rounded-full pointer-events-none"
      />
    </div>
  );
}
