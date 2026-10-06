import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ChevronRight, ChevronLeft, Quote, Monitor, X, Crown, LayoutTemplate } from "lucide-react";
import SEO from "./SEO";
import ContactForm from "./ContactForm";
import PromoForm from "./PromoForm";
import PromoBanner from "./PromoBanner";
import AgencyNavbar from "./AgencyNavbar";
import GlowButton from "./GlowButton";

type ProjectKind = "client" | "template";

const PROJECTS: {
  id: string;
  title: string;
  category: string;
  kind: ProjectKind;
  localSrc: string;
  thumbSrc: string;
  video: string;
  liveUrl: string;
  description: string;
}[] = [
  {
    id: "01",
    title: "CFAP.UK",
    category: "TAX ADVISORY",
    kind: "client",
    localSrc: "/cfap-web.mp4",
    thumbSrc: "/thumbs/cfap.mp4",
    video: "",
    liveUrl: "https://cfap.uk",
    description: "Website for an independent UK tax practice specialising in HMRC enquiries, compliance checks, tax disputes and appeals. Clear, credible and built to turn worried visitors into booked consultations.",
  },
  {
    id: "02",
    title: "SELIX.FINANCE",
    category: "PAYMENT PLATFORM",
    kind: "template",
    localSrc: "/selix.mp4",
    thumbSrc: "/thumbs/selix.mp4",
    video: "",
    liveUrl: "",
    description: "Cross-border payments site for fintech brands. Covers crypto and fiat on/off-ramping, custody and global payouts, with pricing, developer and resources pages ready to go.",
  },
  {
    id: "03",
    title: "KIVO.PEPPER",
    category: "E-COMMERCE",
    kind: "template",
    localSrc: "/kivo-web.mp4",
    thumbSrc: "/thumbs/kivo.mp4",
    video: "",
    liveUrl: "",
    description: "Bold product launch site for a food or spice brand. Immersive product showcase, scroll animations and storytelling built to turn visitors into buyers.",
  },
  {
    id: "04",
    title: "NEXORA.AI",
    category: "AI AUTOMATION",
    kind: "template",
    localSrc: "/nexora-web.mp4",
    thumbSrc: "/thumbs/nexora.mp4",
    video: "",
    liveUrl: "https://nexora.cliffordsharpe.com",
    description: "SaaS landing page for AI and automation products. Dashboard preview, how-it-works, metrics, testimonials and pricing sections built to drive demo bookings.",
  },
  {
    id: "05",
    title: "LUEUR.SKINCARE",
    category: "BEAUTY BRAND",
    kind: "template",
    localSrc: "/lueur-web.mp4",
    thumbSrc: "/thumbs/lueur.mp4",
    video: "",
    liveUrl: "https://lueur.cliffordsharpe.com",
    description: "Elegant site for skincare and beauty brands. Soft video backgrounds, results-driven storytelling and social proof that make premium products feel worth it.",
  },
  {
    id: "06",
    title: "TEXTZEME.AI",
    category: "RENTAL PLATFORM",
    kind: "client",
    localSrc: "/textzeme-web.mp4",
    thumbSrc: "/thumbs/textzeme.mp4",
    video: "",
    liveUrl: "",
    description: "AI-powered rental discovery platform that lives in iMessage. Text Zeme once and get matching New York apartments in real time, the moment they hit the market.",
  },
  {
    id: "07",
    title: "DENTAL.HEALTH",
    category: "HEALTHCARE",
    kind: "template",
    localSrc: "/dental-web.mp4",
    thumbSrc: "/thumbs/dental.mp4",
    video: "",
    liveUrl: "https://dental.cliffordsharpe.com",
    description: "Modern website for dental clinics and healthcare practices. Showcases services, cosmetic work and equipment, and builds trust so patients book with confidence.",
  },
  {
    id: "08",
    title: "PRISMA.STUDIO",
    category: "CREATIVE STUDIO",
    kind: "template",
    localSrc: "/prism-web.mp4",
    thumbSrc: "/thumbs/prism.mp4",
    video: "",
    liveUrl: "https://prisma.cliffordsharpe.com",
    description: "Portfolio site for filmmakers, visual artists and creative studios. Animated typography, work showcase and process sections that let the craft speak first.",
  },
  {
    id: "09",
    title: "OCEAN.ODYSSEY",
    category: "INTERACTIVE EXPERIENCE",
    kind: "template",
    localSrc: "/ocean odyssey.mp4",
    thumbSrc: "/thumbs/ocean-odyssey.mp4",
    video: "",
    liveUrl: "",
    description: "Immersive, cinematic site for adventure, travel and experience brands. Bold visuals and smooth animations that make visitors want to be there.",
  },
];

// React sets `muted` only as a DOM property; browsers check the attribute before allowing autoplay of videos with audio tracks.
function KindBadge({ kind }: { kind: ProjectKind }) {
  return kind === "client" ? (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#f5c518] text-black text-[8px] font-bold uppercase tracking-[0.2em]">
      <Crown size={10} strokeWidth={2.5} /> Client Work
    </div>
  ) : (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/70 backdrop-blur-sm border border-[#00ff00]/40 text-[#00ff00] text-[8px] font-bold uppercase tracking-[0.2em]">
      <LayoutTemplate size={10} strokeWidth={2.5} /> Template
    </div>
  );
}

const forceMutedAutoplay = (el: HTMLVideoElement | null) => {
  if (!el) return;
  el.muted = true;
  el.defaultMuted = true;
  el.setAttribute("muted", "");
};

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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactTemplate, setContactTemplate] = useState<string | undefined>();
  const [isPromoFormOpen, setIsPromoFormOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
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
      {/* Promo Banner */}
      <PromoBanner onCtaClick={() => setIsPromoFormOpen(true)} onClose={() => setIsBannerVisible(false)} />
      <AgencyNavbar top={isBannerVisible ? 70 : 20} onContactClick={() => setIsContactOpen(true)} />

      {/* Background Grid */}
      <div className="fixed inset-0 z-[2] opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      </div>

      <SEO
        title="The Agency | Clifford Sharpe — We Build Killer Landing Pages"
        description="Custom landing pages and websites built to convert. Beautiful design, smooth animations, and fast performance. We help brands stand out online."
        image="/og-agency.jpeg"
        path="/agency"
      />

      <div className="relative z-20 w-full flex flex-col p-8 md:p-12" style={{ paddingTop: isBannerVisible ? "9.5rem" : "6.5rem", transition: "padding-top 0.4s ease" }}>

        {/* ── HERO ── */}
        {/* Text animates in first; video fades in after it's ready */}
        <div className="relative min-h-[calc(100vh-11rem)] flex flex-col items-center justify-center gap-5 md:gap-6 px-8 md:px-16 py-10 md:py-12">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00ff00]/40 z-30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00ff00]/40 z-30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00ff00]/40 z-30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00ff00]/40 z-30" />

          {/* Title — animates in immediately */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative z-50 text-center order-2 space-y-2 -mt-16 md:-mt-28"
          >
            <h1 className="text-[6vw] md:text-[3.8vw] font-tech font-bold leading-tight tracking-tight uppercase max-w-5xl mx-auto">
              We Build Killer<br />Landing Pages
            </h1>
          </motion.div>

          {/* Subtitle — animates in second */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="max-w-xl space-y-3 text-center order-3"
          >
            <p className="text-[10px] md:text-[11px] leading-relaxed text-white/50 uppercase tracking-widest font-light px-4">
              We build landing pages that convert. Beautiful design. Smooth animations. Fast load times.
              Everything your brand needs to stand out and drive results.
            </p>
          </motion.div>

          {/* CTA button — animates in third */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="order-5 relative group"
          >
            <GlowButton onClick={() => setIsContactOpen(true)}>Start a Project</GlowButton>
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
              className="w-full h-auto max-h-[46vh] object-contain mx-auto block"
            />
            <div className="absolute inset-0 bg-black/10 z-[1] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-[2] pointer-events-none" />
          </motion.div>

          {/* ── Scroll indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 order-6 z-30 pointer-events-none"
          >
            <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/30">Scroll</span>
            {/* animated line + arrowhead */}
            <div className="relative flex flex-col items-center gap-0">
              <motion.div
                animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-[#00ff00]/60 to-transparent origin-top"
              />
              <motion.div
                animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <path d="M1 1L5 5.5L9 1" stroke="#00ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── DIGITAL ARTIFACTS GRID ── */}
        <section id="work" className="mt-32 space-y-12 scroll-mt-40">
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
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Our.Work</h2>
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
                <div className="relative aspect-video overflow-hidden border border-white/10 bg-white/5">
                  {project.localSrc ? (
                    <video
                      src={project.thumbSrc}
                      ref={forceMutedAutoplay}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
                      onPause={(e) => { if (!document.hidden) e.currentTarget.play().catch(() => {}); }}
                      className="w-full h-full object-cover pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <iframe
                      src={project.video}
                      className="w-full h-full border-none pointer-events-none scale-[1.3] grayscale group-hover:grayscale-0 transition-all duration-700"
                      allow="autoplay; fullscreen"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 text-[10px] font-bold text-[#00ff00]">{project.id}</div>
                  <div className="absolute top-3 right-3"><KindBadge kind={project.kind} /></div>
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS SLIDESHOW ── */}
        <section id="results" className="mt-48 mb-32 space-y-16 scroll-mt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex items-center gap-3">
              <Quote size={14} className="text-[#00ff00]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">What.Clients.Say</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Real.Results</h2>
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
                Clifford Sharpe — Designer. We build landing pages and websites that drive real results for startups and brands.
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
                <a href="mailto:info@cliffordsharpe.com" className="hover:text-[#00ff00] transition-colors">Email</a>
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
              <span>info@cliffordsharpe.com</span>
              <div className="w-4 h-[1px] bg-white/5" />
              <span>info@cliffordsharpe.com</span>
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

      {/* ── PROJECT MODAL — portrait / tall layout ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
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
              className="relative w-full max-w-3xl bg-black border border-white/10 flex flex-col overflow-y-auto overscroll-contain"
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
                style={{ aspectRatio: modalAspect, maxHeight: "60vh" }}
              >
                {selectedProject.localSrc ? (
                  <video
                    src={selectedProject.localSrc}
                    ref={forceMutedAutoplay}
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
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">{selectedProject.id}</span>
                    <KindBadge kind={selectedProject.kind} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">{selectedProject.title}</h3>
                </div>
                <p className="text-[11px] text-white/50 uppercase leading-relaxed tracking-wide">
                  {selectedProject.description}
                </p>
                {selectedProject.kind === "client" && (
                  <p className="flex items-center gap-2 text-[10px] text-[#f5c518]/80 uppercase tracking-widest">
                    <Crown size={12} /> Built exclusively for this client. Not available as a template.
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                {selectedProject.kind === "template" && (
                  <GlowButton
                    size="sm"
                    onClick={() => {
                      setContactTemplate(selectedProject.title);
                      setSelectedProject(null);
                      setIsContactOpen(true);
                    }}
                  >
                    Start with this template
                  </GlowButton>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] border border-[#00ff00]/30 px-5 py-3 hover:bg-[#00ff00] hover:text-black transition-all w-fit"
                  >
                    {selectedProject.kind === "client" ? "Visit Site" : "Live Demo"} <ChevronRight size={12} />
                  </a>
                )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsContactOpen(false); setContactTemplate(undefined); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <ContactForm template={contactTemplate} onClose={() => { setIsContactOpen(false); setContactTemplate(undefined); }} />
          </div>
        )}
      </AnimatePresence>

      {/* Promo Form Modal */}
      <AnimatePresence>
        {isPromoFormOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPromoFormOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <PromoForm onClose={() => setIsPromoFormOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
