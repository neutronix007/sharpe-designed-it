import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
import { Check, ChevronDown, ChevronRight, Crown, LayoutTemplate, MessageCircle, Play, Plus, X } from "lucide-react";
import SEO from "./SEO";
import GlowButton from "./GlowButton";
import { track } from "../pixel";
import { BF_BONUSES, isBlackFriday, useBlackFridayCountdown, videoFor } from "../blackFriday";

// Ad landing page for the 2-day website promo. Kept light for mobile data: no intro loader, posters first,
// and each clip only loads once it scrolls into view.

// Someone who lands on /promo has already seen the quick-look headline and price from promo.html (it's still
// inside #root when this file loads). Show the real ones in place instead of blinking them out and fading back.
const LANDED_HERE = typeof document !== "undefined" && !!document.querySelector("#root > *");
const heroIntro = <T,>(from: T): T | false => (LANDED_HERE ? false : from);

// One number for WhatsApp and calls
const WHATSAPP_NUMBER = "233591974504";
const PHONE_DISPLAY = "059 197 4504";
const GREEN = "#00ff00";

// Projects shown on this page. Cards are still pictures (posters); the full video only downloads when tapped.
// `grid` ones get a labelled card in "Sites we've built"; all of them scroll past in the strip under the hero.
type Project = { slug: string; title: string; what: string; kind: "client" | "sample"; video: string; live?: string; grid?: boolean };
const PROJECTS: Project[] = [
  { slug: "patery", title: "PatEry Luxe", what: "Food gifting, Accra", kind: "client", video: "/patery-web.mp4", grid: true },
  { slug: "grayline", title: "Grayline Logistics", what: "Parcel delivery", kind: "client", video: "/grayline-web.mp4", live: "https://graylinelogisticsgh.com", grid: true },
  { slug: "west-stones", title: "West Stones", what: "Car & parts shipping", kind: "client", video: "/west-stones-web.mp4", live: "https://weststonesllc.com", grid: true },
  { slug: "graceworld", title: "Graceworld", what: "Online shop", kind: "client", video: "/graceworld-web.mp4", grid: true },
  { slug: "cfap", title: "CFAP", what: "Tax consulting", kind: "client", video: "/cfap-web.mp4", live: "https://cfap.uk", grid: true },
  { slug: "okwan", title: "Ɔkwan Motors", what: "Car sales & rental", kind: "sample", video: "/okwan-web.mp4", grid: true },
  { slug: "ahoden", title: "Ahoɔden", what: "Gym & fitness", kind: "sample", video: "/ahoden-web.mp4", grid: true },
  { slug: "ahenfie", title: "Ahenfie Events", what: "Event décor", kind: "sample", video: "/ahenfie-web.mp4", grid: true },
  { slug: "laterite", title: "Laterite Build", what: "Builders", kind: "sample", video: "/laterite-web.mp4", grid: true },
  { slug: "lueur", title: "Lueur", what: "Skincare brand", kind: "sample", video: "/lueur-web.mp4", grid: true },
  { slug: "kivo", title: "Kivo Pepper", what: "Food product", kind: "sample", video: "/kivo-web.mp4" },
  { slug: "eden", title: "Eden Retreat", what: "Hotel & retreat", kind: "sample", video: "/eden-web.mp4" },
  { slug: "textzeme", title: "TextZeme", what: "Rental app", kind: "client", video: "/textzeme-web.mp4" },
  { slug: "dental", title: "Dental Health", what: "Dental clinic", kind: "sample", video: "/dental-web.mp4" },
  { slug: "onyin", title: "Onyin Technologies", what: "Point-of-sale app", kind: "client", video: "/onyin-web.mp4" },
  { slug: "nexora", title: "Nexora", what: "AI software", kind: "sample", video: "/nexora-web.mp4" },
];

// What the promo includes; during Black Friday the bonuses are folded in
const included = (bf: boolean) => [
  bf ? "4 pages that work on any phone or computer (1 extra page free for Black Friday)" : "3 pages that work on any phone or computer",
  "Your own web address (.com) and hosting, free for the first year",
  "WhatsApp button and Google Maps",
  "Contact form that sends to your email",
  "Basic Google setup so people can find you",
  "Emails to your web address land in your inbox",
  ...(bf ? ["Logo touch-up, free for Black Friday"] : []),
  bf ? "2 rounds of changes before launch (Black Friday bonus)" : "1 round of changes before launch",
  "Customers order on WhatsApp (shops with online payment, bookings and platforms start from GH₵10,000)",
];

const STEPS = [
  { title: "Send your request", body: "Fill in the short form below. It takes about a minute." },
  { title: "Book your slot", body: "We confirm on WhatsApp and you pay a GH₵600 deposit by MoMo." },
  { title: "Send your content", body: "Your logo, photos and a few lines about your business. The 2 days start here." },
  { title: "Review and go live", body: "You check the site, we make your changes, you pay the GH₵600 balance and it goes live." },
];

const FAQ = [
  { q: "What do I need to provide?", a: "Your logo, some photos and a few lines about what you do. Missing something? Tell us in the form and we'll help." },
  { q: "Who owns the website and web address?", a: "You do. The web address is registered in your name." },
  { q: "What happens after the first year?", a: "Hosting stays free. Your web address renews at about GH₵200 a year from year two." },
  { q: "When do the 2 days start?", a: "Once we have your deposit and your content." },
  { q: "I need something bigger", a: "Online shops with MoMo or card payment, booking systems, data and airtime platforms, and software (SaaS) websites start from GH₵10,000. Pick \"Something bigger\" in the form and we'll send you a quote." },
];


function Corners({ size = "w-6 h-6", tone = "border-[#00ff00]/40" }: { size?: string; tone?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 ${size} border-t border-l ${tone} pointer-events-none`} />
      <div className={`absolute top-0 right-0 ${size} border-t border-r ${tone} pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 ${size} border-b border-l ${tone} pointer-events-none`} />
      <div className={`absolute bottom-0 right-0 ${size} border-b border-r ${tone} pointer-events-none`} />
    </>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff00]">{children}</div>;
}

function KindBadge({ kind }: { kind: Project["kind"] }) {
  return kind === "client" ? (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#f5c518] text-black text-[7px] font-bold uppercase tracking-[0.18em]">
      <Crown size={8} strokeWidth={2.5} /> Client
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black/75 border border-[#00ff00]/40 text-[#00ff00] text-[7px] font-bold uppercase tracking-[0.18em]">
      <LayoutTemplate size={8} strokeWidth={2.5} /> Sample
    </span>
  );
}

// A still picture of the site; tapping it opens the full video
function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void; key?: string }) {
  return (
    <button type="button" onClick={() => onOpen(p)} className="group text-left w-full">
      <div className="relative aspect-video overflow-hidden border border-white/10 bg-white/5">
        <img src={`/posters/${p.slug}.webp`} alt={`${p.title} website`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-2 right-2"><KindBadge kind={p.kind} /></div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
          <span className="w-9 h-9 rounded-full bg-black/60 border border-[#00ff00]/50 flex items-center justify-center opacity-80 group-hover:opacity-100">
            <Play size={14} className="text-[#00ff00] ml-0.5" fill="currentColor" />
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-0.5">
        <span className="text-[11px] font-bold uppercase tracking-tight truncate">{p.title}</span>
        <span className="text-[9px] uppercase tracking-widest text-white/40 truncate">{p.what}</span>
      </div>
    </button>
  );
}

// Full video of one project. Phones get the smaller file.
function VideoModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${p.title} website video`}>
      <div className="relative w-full max-w-5xl border border-white/10 bg-black" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute -top-11 right-0 w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#00ff00] bg-black">
          <X size={16} />
        </button>
        <video
          key={p.slug}
          src={videoFor(p.video)}
          poster={`/posters/${p.slug}.webp`}
          autoPlay
          muted
          loop
          playsInline
          ref={(v) => { if (v) { v.muted = true; v.setAttribute("muted", ""); } }}
          className="w-full max-h-[70vh] object-contain bg-black"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold uppercase">{p.title}</span>
            <span className="text-[9px] uppercase tracking-widest text-white/40">{p.what}</span>
            <KindBadge kind={p.kind} />
          </div>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] hover:underline">
              Visit live site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Endless strip of project pictures under the hero, so visitors see real work on the first screen
function WorkStrip({ onOpen, still }: { onOpen: (p: Project) => void; still: boolean }) {
  const items = still ? PROJECTS : [...PROJECTS, ...PROJECTS];
  return (
    <div className={`relative ${still ? "overflow-x-auto" : "overflow-hidden"} [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]`}>
      <style>{`@keyframes promo-strip { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      <div
        className="flex gap-3 w-max hover:[animation-play-state:paused]"
        style={still ? undefined : { animation: "promo-strip 70s linear infinite" }}
      >
        {items.map((p, i) => (
          <button
            key={`${p.slug}-${i}`}
            type="button"
            onClick={() => onOpen(p)}
            aria-hidden={i >= PROJECTS.length || undefined}
            tabIndex={i >= PROJECTS.length ? -1 : undefined}
            className="relative w-[170px] md:w-[240px] aspect-video flex-none overflow-hidden border border-white/10 group"
          >
            <img src={`/posters/${p.slug}.webp`} alt={i < PROJECTS.length ? `${p.title} website` : ""} loading={i < 6 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/90 to-transparent text-left text-[9px] font-bold uppercase tracking-wider">
              {p.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-white/[0.04] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00ff00]/60 transition-colors font-sans";

function ChoiceGroup({ name, options, stacked = false, onPick }: { name: string; options: string[]; stacked?: boolean; onPick?: (v: string) => void }) {
  return (
    <div className={stacked ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}>
      {options.map((opt, i) => (
        <label key={opt} className="cursor-pointer">
          <input type="radio" name={name} value={opt} required={i === 0} onChange={() => onPick?.(opt)} className="peer sr-only" />
          <span
            className={`block px-3.5 py-2.5 border border-white/10 text-white/60 peer-checked:bg-[#00ff00] peer-checked:border-[#00ff00] peer-checked:text-black peer-focus-visible:border-[#00ff00] transition-colors ${
              stacked ? "text-[12px] font-sans leading-snug" : "text-[10px] font-bold uppercase tracking-[0.15em]"
            }`}
          >
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

// Ghana mobile number (024 123 4567, 0541234567, +233 24 123 4567) as 233XXXXXXXXX, or null if it isn't one
function ghanaWhatsApp(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^0[25]\d{8}$/.test(digits)) return "233" + digits.slice(1);
  if (/^233[25]\d{8}$/.test(digits)) return digits;
  return null;
}

// Kind of business: tells us which of our designs to start from
const BUSINESS_TYPES = [
  "Food & drinks",
  "Fashion & beauty",
  "Shop or online sales",
  "Cars & transport",
  "Building & property",
  "Health & fitness",
  "Events & hotels",
  "Professional services (law, tax, consulting)",
  "Tech, software or data",
  "Church, school or NGO",
  "Other",
];

const BIGGER = "Something bigger (from GH₵10,000)";
const GOALS = [
  "Show my work and get people to contact me (GH₵1,200)",
  "Show my products and take orders on WhatsApp (GH₵1,200)",
  BIGGER,
];

const PHONE_HINT = "Enter your Ghana number, like 024 123 4567";

export default function Promo() {
  const [state, handleSubmit] = useForm("xdayaoyz");
  // Same palm fronds as the agency hero, swaying from the stem. Off for reduced-motion users.
  const reduceMotion = useReducedMotion();
  const palmSway = (deg: number, duration: number, delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { rotate: [0, deg, -deg * 0.4, deg * 0.7, 0], skewX: [0, deg * 0.35, 0, -deg * 0.25, 0] },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
        };
  // One Lead per successful request; this is the event the ads optimise for
  useEffect(() => {
    if (state.succeeded) track("Lead", { content_name: "2-day website promo" });
  }, [state.succeeded]);
  const [lead, setLead] = useState<{ name: string; business: string; type: string }>({ name: "", business: "", type: "" });
  const [businessType, setBusinessType] = useState("");
  const [goal, setGoal] = useState("");
  const bigger = goal === BIGGER;
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const countdown = useBlackFridayCountdown();
  const bf = !!countdown;
  const askText = encodeURIComponent(`Hi! I have a question about the GH₵1,200 website promo${bf ? " (Black Friday deal)" : ""}.`);

  const scrollToForm = () => document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const formBoxRef = useRef<HTMLDivElement>(null);

  // The thank-you is much shorter than the form, so bring it into view instead of leaving people below it
  useEffect(() => {
    if (state.succeeded) formBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.succeeded]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    setLead({
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      type: String((data.get("business_type") === "Other" ? data.get("business_type_other") : data.get("business_type")) ?? ""),
    });
    const intl = ghanaWhatsApp(String(data.get("whatsapp") ?? ""));
    const link = e.currentTarget.elements.namedItem("whatsapp_link") as HTMLInputElement | null;
    // Tap-to-chat link in the request email, so the number never needs retyping
    if (link) link.value = intl ? `https://wa.me/${intl}` : "";
    return handleSubmit(e);
  };

  const waText = encodeURIComponent(
    `Hi! I just sent a request on your website ${bigger ? "for a bigger project" : `for the GH₵1,200 promo${bf ? " (Black Friday deal)" : ""}`}.\nName: ${lead.name}\nBusiness: ${lead.business}${lead.type ? ` (${lead.type})` : ""}`
  );

  return (
    <div className="relative min-h-screen bg-black text-white font-mono overflow-x-hidden selection:bg-[#00ff00] selection:text-black">
      <SEO
        title="2-Day Website Promo | Sharpe Designed It — GH₵1,200"
        description="Your business website in 2 days for GH₵1,200. 3 pages that work on any phone or computer, your own web address free for the first year, WhatsApp and Google Maps."
        image="/og/agency.jpg"
        path="/promo"
      />

      {/* Dot grid, same as the agency page */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 md:px-12 py-5 border-b border-white/5">
        <a href="/agency" className="text-[11px] font-bold uppercase tracking-[0.4em]">
          SHARPE<span style={{ color: GREEN }}>.</span>DESIGNED<span style={{ color: GREEN }}>.</span>IT
        </a>
        <button onClick={scrollToForm} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] border border-[#00ff00]/30 px-4 py-2 hover:bg-[#00ff00] hover:text-black transition-colors">
          Request
        </button>
      </header>

      <main className="relative z-10">
        {/* ── HERO ── */}
        {/* Black Friday bar: shows from 17 Nov until the end of 30 Nov, then disappears by itself */}
        {countdown && (
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 bg-[#00ff00] text-black text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <span>Black Friday deal · <span className="tabular-nums">ends in {countdown.label}</span></span>
            <span className="hidden sm:inline opacity-60">·</span>
            <span className="opacity-80 sm:opacity-100">Free bonuses if you book by 30 Nov</span>
          </button>
        )}
        <section className="relative mx-5 md:mx-12 mt-4 md:mt-8 px-5 md:px-16 pt-9 pb-8 md:pt-14 md:pb-12 flex flex-col items-center text-center gap-5">
          <Corners size="w-8 h-8" />
          {/* Palm fronds framing the hero: top-left, and the same frond mirrored at bottom-right */}
          <motion.div
            initial={{ opacity: 0, x: "-14%" }}
            animate={{ opacity: 1, x: "-30%" }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute -left-5 md:-left-12 -top-6 z-0 w-[34vw] md:w-[22vw] max-w-[420px] pointer-events-none select-none"
            aria-hidden="true"
          >
            <motion.div style={{ originX: 0, originY: 1 }} {...palmSway(3, 7, 0)}>
              <img src="/palm-frond.webp" alt="" draggable={false} className="w-full [mask-image:linear-gradient(to_top,transparent,black_22%)]" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute -right-5 md:-right-12 bottom-0 z-0 w-[30vw] md:w-[19vw] max-w-[380px] pointer-events-none select-none"
            aria-hidden="true"
          >
            <motion.div style={{ originX: 1, originY: 1 }} {...palmSway(-3.5, 8.5, 1.2)}>
              <img src="/palm-frond.webp" alt="" draggable={false} className="w-full translate-x-[6%] -scale-x-100 rotate-[8deg] [mask-image:linear-gradient(to_top,transparent,black_22%)]" />
            </motion.div>
          </motion.div>
          <motion.div className="relative z-10" initial={heroIntro({ opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>{bf ? "Black Friday Deal" : "2-Day Website Promo"}</SectionLabel>
          </motion.div>
          <motion.h1
            initial={heroIntro({ opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-10 font-tech font-bold uppercase leading-[1.15] tracking-tight text-[7.5vw] md:text-[3.4vw] max-w-4xl"
          >
            Your business website <span className="whitespace-nowrap">in 2 days</span>
          </motion.h1>
          <motion.div initial={heroIntro({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="relative z-10 flex flex-col items-center gap-1">
            <div className="font-display font-bold text-5xl md:text-7xl tracking-tight" style={{ color: GREEN }}>GH₵1,200</div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              Usually <span className="line-through">GH₵2,700</span>
            </div>
          </motion.div>
          {/* Black Friday: the bonuses; otherwise the three basics */}
          <motion.ul
            initial={heroIntro({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10 flex flex-wrap justify-center gap-2 max-w-2xl"
          >
            {(bf ? BF_BONUSES.map((b) => `+ ${b}`) : ["Your own web address", "Works on any phone or computer", "Ready in 2 days"]).map((t) => (
              <li
                key={t}
                className={`flex items-center gap-2 border px-3 py-2 text-[10px] uppercase tracking-[0.12em] ${bf ? "border-[#00ff00]/40 bg-[#00ff00]/[0.06] text-white" : "border-white/10 text-white/70"}`}
              >
                {!bf && <Check size={12} style={{ color: GREEN }} />} {t}
              </li>
            ))}
          </motion.ul>
          <motion.div className="relative z-10 flex flex-col items-center gap-3" initial={heroIntro({ opacity: 0, y: 16 })} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>
            <GlowButton onClick={scrollToForm}>Start my website</GlowButton>
            {/* People with questions chat instead of filling the form */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${askText}`}
              onClick={() => track("Contact")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-white/60 hover:text-[#00ff00] transition-colors font-sans"
            >
              <MessageCircle size={13} className="text-[#00ff00]" />
              Have a question first? <span className="underline underline-offset-2">Chat with us on WhatsApp</span>
            </a>
          </motion.div>
        </section>

        {/* Real work on the first screen */}
        <div className="mt-2 md:mt-4">
          <WorkStrip onOpen={setOpenProject} still={!!reduceMotion} />
        </div>

        {/* ── WORK ── */}
        <section className="px-5 md:px-12 mt-20 md:mt-28 space-y-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <SectionLabel>Recent.Work</SectionLabel>
            <h2 className="font-tech text-2xl md:text-4xl font-bold uppercase">Sites we've built</h2>
            <p className="text-[11px] text-white/45 font-sans">Tap any site to watch it.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 md:gap-x-4 max-w-7xl mx-auto">
            {PROJECTS.filter((p) => p.grid).map((p) => (
              <ProjectCard key={p.slug} p={p} onOpen={setOpenProject} />
            ))}
          </div>
          <div className="text-center">
            <a href="/agency#work" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-[#00ff00] transition-colors">
              See all our work <ChevronRight size={12} />
            </a>
          </div>
        </section>

        {/* ── INCLUDED + HOW IT WORKS ── */}
        <section className="px-5 md:px-12 mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          <div className="relative p-7 md:p-10 border border-white/5 bg-white/[0.02]">
            <Corners size="w-5 h-5" />
            <SectionLabel>What.You.Get</SectionLabel>
            <ul className="mt-7 space-y-4">
              {included(bf).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[12px] uppercase tracking-wide text-white/75 leading-relaxed">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: GREEN }} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative p-7 md:p-10 border border-white/5 bg-white/[0.02]">
            <Corners size="w-5 h-5" />
            <SectionLabel>How.It.Works</SectionLabel>
            <ol className="mt-7 space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="text-[11px] font-bold" style={{ color: GREEN }}>0{i + 1}</span>
                  <div>
                    <div className="text-[12px] font-bold uppercase tracking-wide">{s.title}</div>
                    <p className="mt-1 text-[11px] text-white/50 leading-relaxed font-sans">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── REQUEST FORM ── */}
        <section id="request" className="px-5 md:px-12 mt-24 md:mt-32 scroll-mt-6">
          <div
            ref={formBoxRef}
            className="relative max-w-2xl mx-auto p-6 md:p-12 border border-white/10 bg-white/[0.02]"
          >
            <Corners size="w-6 h-6" tone="border-[#00ff00]/60" />
            {state.succeeded ? (
              <div className="flex flex-col items-center text-center gap-6 py-6">
                <div className="w-14 h-14 border border-[#00ff00]/50 flex items-center justify-center">
                  <Check size={26} style={{ color: GREEN }} />
                </div>
                <h2 className="font-tech text-xl md:text-2xl font-bold uppercase">Request received</h2>
                <p className="text-[12px] text-white/60 leading-relaxed max-w-md font-sans">
                  Thanks{lead.name ? `, ${lead.name.split(" ")[0]}` : ""}! We'll get in touch between 8am and 6pm. Want to move faster? Send us a message now and we'll pick it up from there.
                </p>
                {/* Leads often ignore unknown numbers, so tell them which number we'll use */}
                <div className="w-full max-w-sm border border-white/10 px-5 py-4 text-left space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Save our number</div>
                  <div className="flex justify-between gap-4 text-[12px] font-sans"><span className="text-white/60">WhatsApp &amp; calls</span><span className="font-bold">{PHONE_DISPLAY}</span></div>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                  onClick={() => track("Contact")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#00ff00] text-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                >
                  Message us on WhatsApp <ChevronRight size={14} />
                </a>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-9">
                  <SectionLabel>Book.Your.Slot</SectionLabel>
                  <h2 className="font-tech text-xl md:text-3xl font-bold uppercase leading-tight">Ready to start? Book your slot</h2>
                  <p className="text-[12px] text-white/50 leading-relaxed font-sans">
                    About a minute. No payment today.{" "}
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${askText}`} onClick={() => track("Contact")} target="_blank" rel="noopener noreferrer" className="text-[#00ff00] underline underline-offset-2">
                      Only have a question? Ask on WhatsApp.
                    </a>
                  </p>
                </div>
                {/* Says plainly what this form is for, so people who want a course, an app or a full shop know before they fill it */}
                <div className="mb-8 border border-[#00ff00]/30 bg-[#00ff00]/[0.04] p-5 space-y-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ff00]">What this form is for</div>
                  <div className="space-y-1 text-[12px] text-white/80 leading-relaxed font-sans">
                    <div className="font-bold text-white">The promo: GH₵1,200 in total</div>
                    <p>A 3-page website for your business, ready 2 days after you send your logo, photos and a few lines about what you do. Customers contact you or order on WhatsApp.</p>
                    {bf && (
                      <p className="text-[#00ff00]">Black Friday: book by 30 November and you also get 1 extra page, a logo touch-up and 2 rounds of changes, free.</p>
                    )}
                  </div>
                  <div className="space-y-1 text-[12px] text-white/80 leading-relaxed font-sans pt-3 border-t border-white/10">
                    <div className="font-bold text-white">Something bigger: from GH₵10,000</div>
                    <p>A shop where customers pay online by MoMo or card, a booking system, a data or airtime platform, or a website for your software (SaaS). We chat first, then send you a quote.</p>
                  </div>
                  <p className="text-[11px] text-white/45 font-sans">We don't sell courses or training.</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <input type="hidden" name="_subject" value="🚀 PROMO PAGE — New website request" />
                  <input type="hidden" name="source" value="promo-page" />
                  <input type="hidden" name="whatsapp_link" value="" />
                  {bf && <input type="hidden" name="offer" value="Black Friday (extra page + logo touch-up + 2 rounds of changes)" />}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Your name">
                      <input name="name" required autoComplete="name" placeholder="Ama Mensah" className={inputClass} />
                    </Field>
                    <Field label="WhatsApp number">
                      <input
                        name="whatsapp"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="024 123 4567"
                        pattern="(\+?233|0)\s?[25][0-9](\s?[0-9]){7}"
                        title={PHONE_HINT}
                        onInvalid={(e) => e.currentTarget.setCustomValidity(PHONE_HINT)}
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <ValidationError field="whatsapp" errors={state.errors} className="text-xs text-red-400" />

                  <Field label="Email">
                    <input name="email" type="email" autoComplete="email" placeholder="ama@example.com" className={inputClass} />
                  </Field>
                  <ValidationError field="email" errors={state.errors} className="text-xs text-red-400" />

                  <Field label="Business name">
                    <input name="business" required placeholder="e.g. Ama's Kitchen" className={inputClass} />
                  </Field>

                  <Field label="What kind of business is it?">
                    <div className="relative">
                      <select
                        name="business_type"
                        required
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 ${businessType ? "" : "text-white/25"}`}
                      >
                        <option value="" disabled>Pick one</option>
                        {BUSINESS_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-black text-white">{t}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    </div>
                  </Field>
                  {businessType === "Other" && (
                    <Field label="Type your kind of business">
                      <input name="business_type_other" required placeholder="e.g. printing press" className={inputClass} />
                    </Field>
                  )}

                  <Field label="What do you sell or do?">
                    <input name="sells" required placeholder="e.g. phones and accessories" className={inputClass} />
                  </Field>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">What do you need?</span>
                    <ChoiceGroup name="site_goal" stacked options={GOALS} onPick={setGoal} />
                    {!bigger && (
                      <span className="text-[11px] text-white/40 font-sans">
                        Something bigger means a shop with online payment, bookings, a data or airtime platform, a SaaS website, and similar.
                      </span>
                    )}
                  </div>
                  {bigger && (
                    <Field label="Tell us briefly what you want it to do">
                      <textarea
                        name="project_details"
                        required
                        rows={3}
                        placeholder="e.g. a site where people buy data bundles and pay with MoMo"
                        className={`${inputClass} resize-y`}
                      />
                    </Field>
                  )}

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Do you have a logo, photos of your business, and a few lines about what you do?</span>
                    <ChoiceGroup name="content_ready" stacked options={["Yes, I have them", "I have some of them", "No, I need help with them"]} />
                    <span className="text-[11px] text-white/40 font-sans">That's fine if not, we can help you put them together.</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">When do you want to start?</span>
                    <ChoiceGroup name="start" stacked options={["This week", "Within the next 2 weeks", "This month"]} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer border border-white/10 p-4">
                    <input type="checkbox" name="price_agreed" value="yes" required className="mt-0.5 w-4 h-4 accent-[#00ff00] flex-shrink-0" />
                    {bigger ? (
                      <span className="text-[11px] text-white/70 leading-relaxed font-sans">
                        I understand bigger projects start from <strong className="text-white">GH₵10,000</strong>, and I'll get a quote before paying anything.
                      </span>
                    ) : (
                      <span className="text-[11px] text-white/70 leading-relaxed font-sans">
                        I understand the promo is <strong className="text-white">GH₵1,200</strong>, with a <strong className="text-white">GH₵600 deposit</strong> to start
                        {bf ? <>, and the <strong className="text-[#00ff00]">Black Friday bonuses</strong> apply if I book by 30 November.</> : "."}
                      </span>
                    )}
                  </label>

                  <ValidationError errors={state.errors} className="text-xs text-red-400" />

                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">What happens next</div>
                    <ol className="space-y-1.5 text-[12px] text-white/70 font-sans leading-relaxed list-decimal pl-5">
                      <li>We message you on WhatsApp, usually the same day.</li>
                      {bigger ? (
                        <>
                          <li>We ask a few questions about what you need.</li>
                          <li>We send you a quote and a timeline. You only pay if you agree.</li>
                        </>
                      ) : (
                        <>
                          <li>You pay GH₵600 by MoMo to book your slot.</li>
                          <li>You send your logo, photos and text, and we build your site in 2 days.</li>
                        </>
                      )}
                    </ol>
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-[#00ff00] text-black py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors disabled:opacity-60"
                  >
                    {state.submitting ? "Sending…" : "Send my request (no payment now)"}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-5 md:px-12 mt-24 md:mt-32 max-w-2xl mx-auto space-y-8">
          <div className="text-center"><SectionLabel>Questions</SectionLabel></div>
          <div className="border-t border-white/10">
            {(bf
              ? [{ q: "What's in the Black Friday deal?", a: "Same GH₵1,200 price, plus 1 extra page (4 instead of 3), a logo touch-up and 2 rounds of changes instead of 1, all free. Book by 30 November: send the form and pay the GH₵600 deposit to lock it in. Your build can start after that." }, ...FAQ]
              : FAQ
            ).map((f) => (
              <details key={f.q} className="group border-b border-white/10">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-[12px] font-bold uppercase tracking-wide">
                  {f.q}
                  <Plus size={14} className="flex-shrink-0 text-white/40 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-5 -mt-1 text-[12px] text-white/55 leading-relaxed font-sans">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <GlowButton onClick={scrollToForm} size="sm">Start my website</GlowButton>
          </div>
        </section>
      </main>

      {openProject && <VideoModal p={openProject} onClose={() => setOpenProject(null)} />}

      <footer className="relative z-10 mt-24 px-5 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[9px] uppercase tracking-[0.35em] text-white/25">
        <span>© 2026 Sharpe Designed It</span>
        <a href="/agency" className="hover:text-[#00ff00] transition-colors">cliffordsharpe.com/agency</a>
      </footer>
    </div>
  );
}
