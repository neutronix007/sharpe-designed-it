import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
import { Check, ChevronRight, Crown, LayoutTemplate, Plus } from "lucide-react";
import SEO from "./SEO";
import GlowButton from "./GlowButton";
import { track } from "../pixel";

// Ad landing page for the 48-hour promo. Kept light for mobile data: no intro loader, posters first,
// and each clip only loads once it scrolls into view.

const WHATSAPP_NUMBER = "233509605932";
const GREEN = "#00ff00";

const WORK = [
  { slug: "patery", title: "PatEry Luxe", what: "Food gifting, Accra", kind: "client" },
  { slug: "graceworld", title: "Graceworld Ventures", what: "Online shop, Ghana", kind: "client" },
  { slug: "lueur", title: "Lueur Skincare", what: "Beauty brand", kind: "sample" },
  { slug: "laterite", title: "Laterite Build", what: "Builders & contractors", kind: "sample" },
] as const;

const INCLUDED = [
  "3 pages that look great on phones",
  "Your own .com domain + hosting for 1 year",
  "WhatsApp button and Google Maps",
  "Contact form that sends to your email",
  "Basic Google setup so people can find you",
  "Email forwarding on your domain",
  "1 round of changes before launch",
];

const STEPS = [
  { title: "Send your request", body: "Fill in the short form below. It takes about a minute." },
  { title: "Book your slot", body: "We confirm on WhatsApp and you pay a GH₵600 deposit by MoMo." },
  { title: "Send your content", body: "Your logo, photos and a few lines about your business. The 48 hours start here." },
  { title: "Review and go live", body: "You check the site, we make your changes, you pay the GH₵600 balance and it goes live." },
];

const FAQ = [
  { q: "What do I need to provide?", a: "Your logo, some photos and a few lines about what you do. Missing something? Tell us in the form and we'll help." },
  { q: "Who owns the website and domain?", a: "You do. The domain is registered in your name." },
  { q: "What happens after the first year?", a: "Hosting stays free. The domain renews at about GH₵200 a year from year two." },
  { q: "When do the 48 hours start?", a: "Once we have your deposit and your content." },
  { q: "I need something bigger", a: "Online stores, booking systems, extra pages and apps are priced separately. Mention it in the form and we'll send a quote." },
];

const BUSINESS_TYPES = ["Food & drink", "Beauty & salon", "Shop / online store", "Services", "Property & construction", "Health", "Other"];

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

// Poster shows immediately; the clip only downloads and plays while the card is on screen
function LazyClip({ slug, title }: { slug: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src) v.src = `/thumbs/${slug}.mp4`;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [slug]);
  return (
    <video
      ref={ref}
      poster={`/promo/${slug}.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} website preview`}
      className="w-full h-full object-cover"
    />
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

function ChoiceGroup({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => (
        <label key={opt} className="cursor-pointer">
          <input type="radio" name={name} value={opt} required={i === 0} className="peer sr-only" />
          <span className="block px-3.5 py-2.5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 peer-checked:bg-[#00ff00] peer-checked:border-[#00ff00] peer-checked:text-black peer-focus-visible:border-[#00ff00] transition-colors">
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

export default function Promo() {
  const [state, handleSubmit] = useForm("xdayaoyz");
  // One Lead per successful request; this is the event the ads optimise for
  useEffect(() => {
    if (state.succeeded) track("Lead", { content_name: "48-hour promo" });
  }, [state.succeeded]);
  const [lead, setLead] = useState<{ name: string; business: string; type: string }>({ name: "", business: "", type: "" });

  const scrollToForm = () => document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    setLead({
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      type: String(data.get("business_type") ?? ""),
    });
    return handleSubmit(e);
  };

  const waText = encodeURIComponent(
    `Hi! I just sent a request on your website for the GH₵1,200 promo.\nName: ${lead.name}\nBusiness: ${lead.business}${lead.type ? ` (${lead.type})` : ""}`
  );

  return (
    <div className="relative min-h-screen bg-black text-white font-mono overflow-x-hidden selection:bg-[#00ff00] selection:text-black">
      <SEO
        title="48-Hour Website Promo | Sharpe Designed It — GH₵1,200"
        description="A professional website for your business in 48 hours. 3 pages, your own .com domain and hosting for a year, WhatsApp and Google Maps. GH₵1,200."
        image="/og/agency.jpg"
        path="/promo"
      />

      {/* Dot grid, same as the agency page */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 md:px-12 py-5 border-b border-white/5">
        <a href="/agency" className="text-[11px] font-bold uppercase tracking-[0.4em]">
          THE<span style={{ color: GREEN }}>.</span>AGENCY
        </a>
        <button onClick={scrollToForm} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] border border-[#00ff00]/30 px-4 py-2 hover:bg-[#00ff00] hover:text-black transition-colors">
          Request
        </button>
      </header>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative mx-5 md:mx-12 mt-6 md:mt-10 px-6 md:px-16 py-14 md:py-24 flex flex-col items-center text-center gap-7">
          <Corners size="w-8 h-8" />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>48-Hour Website Promo</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-tech font-bold uppercase leading-[1.15] tracking-tight text-[7.5vw] md:text-[3.4vw] max-w-4xl"
          >
            Get your business online in 48 hours
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="flex flex-col items-center gap-1">
            <div className="font-display font-bold text-5xl md:text-7xl tracking-tight" style={{ color: GREEN }}>GH₵1,200</div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">
              Usually <span className="line-through">GH₵2,700</span>
            </div>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 max-w-xl"
          >
            {["Domain + hosting for 1 year", "Built for phones", "Ready in 48 hours"].map((t) => (
              <li key={t} className="flex items-center gap-2 border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-white/70">
                <Check size={12} style={{ color: GREEN }} /> {t}
              </li>
            ))}
          </motion.ul>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>
            <GlowButton onClick={scrollToForm}>Request your website</GlowButton>
          </motion.div>
        </section>

        {/* ── WORK ── */}
        <section className="px-5 md:px-12 mt-24 md:mt-32 space-y-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <SectionLabel>Recent.Work</SectionLabel>
            <h2 className="font-tech text-2xl md:text-4xl font-bold uppercase">Sites we've built</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {WORK.map((w) => (
              <figure key={w.slug} className="relative border border-white/10 bg-white/[0.02]">
                <div className="relative aspect-video overflow-hidden">
                  <LazyClip slug={w.slug} title={w.title} />
                  <div className="absolute top-3 right-3">
                    {w.kind === "client" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#f5c518] text-black text-[8px] font-bold uppercase tracking-[0.2em]">
                        <Crown size={10} strokeWidth={2.5} /> Client
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/70 border border-[#00ff00]/40 text-[#00ff00] text-[8px] font-bold uppercase tracking-[0.2em]">
                        <LayoutTemplate size={10} strokeWidth={2.5} /> Sample design
                      </span>
                    )}
                  </div>
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 px-4 py-3.5 border-t border-white/5">
                  <span className="text-sm font-bold uppercase tracking-tight">{w.title}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 text-right">{w.what}</span>
                </figcaption>
              </figure>
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
              {INCLUDED.map((item) => (
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
          <div className="relative max-w-2xl mx-auto p-6 md:p-12 border border-white/10 bg-white/[0.02]">
            <Corners size="w-6 h-6" tone="border-[#00ff00]/60" />
            {state.succeeded ? (
              <div className="flex flex-col items-center text-center gap-6 py-6">
                <div className="w-14 h-14 border border-[#00ff00]/50 flex items-center justify-center">
                  <Check size={26} style={{ color: GREEN }} />
                </div>
                <h2 className="font-tech text-xl md:text-2xl font-bold uppercase">Request received</h2>
                <p className="text-[12px] text-white/60 leading-relaxed max-w-md font-sans">
                  Thanks{lead.name ? `, ${lead.name.split(" ")[0]}` : ""}! We'll message you on WhatsApp between 8am and 6pm. Want to move faster? Send us a message now and we'll pick it up from there.
                </p>
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
                  <SectionLabel>Request.Form</SectionLabel>
                  <h2 className="font-tech text-xl md:text-3xl font-bold uppercase leading-tight">Request your website</h2>
                  <p className="text-[12px] text-white/50 leading-relaxed font-sans">About a minute. We'll reply on WhatsApp.</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <input type="hidden" name="_subject" value="🚀 PROMO PAGE — New website request" />
                  <input type="hidden" name="source" value="promo-page" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Your name">
                      <input name="name" required autoComplete="name" placeholder="Ama Mensah" className={inputClass} />
                    </Field>
                    <Field label="WhatsApp number">
                      <input name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="024 123 4567" pattern="[0-9+ ]{9,16}" className={inputClass} />
                    </Field>
                  </div>
                  <ValidationError field="whatsapp" errors={state.errors} className="text-xs text-red-400" />

                  <Field label="Business name">
                    <input name="business" required placeholder="e.g. Ama's Kitchen" className={inputClass} />
                  </Field>

                  <Field label="What does your business do?">
                    <select name="business_type" required defaultValue="" className={`${inputClass} appearance-none invalid:text-white/25`}>
                      <option value="" disabled>Choose one</option>
                      {BUSINESS_TYPES.map((t) => <option key={t} value={t} className="bg-black">{t}</option>)}
                    </select>
                  </Field>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Do you have your logo, photos and text ready?</span>
                    <ChoiceGroup name="content_ready" options={["Yes", "Some of it", "No, I need help"]} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">When do you want to start?</span>
                    <ChoiceGroup name="start" options={["This week", "This month", "Just looking"]} />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer border border-white/10 p-4">
                    <input type="checkbox" name="price_agreed" value="yes" required className="mt-0.5 w-4 h-4 accent-[#00ff00] flex-shrink-0" />
                    <span className="text-[11px] text-white/70 leading-relaxed font-sans">
                      I understand the promo is <strong className="text-white">GH₵1,200</strong>, with a <strong className="text-white">GH₵600 deposit</strong> to start.
                    </span>
                  </label>

                  <ValidationError errors={state.errors} className="text-xs text-red-400" />

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-[#00ff00] text-black py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors disabled:opacity-60"
                  >
                    {state.submitting ? "Sending…" : "Send request"}
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
            {FAQ.map((f) => (
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
            <GlowButton onClick={scrollToForm} size="sm">Request your website</GlowButton>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-24 px-5 md:px-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[9px] uppercase tracking-[0.35em] text-white/25">
        <span>© 2026 Sharpe Designed It</span>
        <a href="/agency" className="hover:text-[#00ff00] transition-colors">cliffordsharpe.com/agency</a>
      </footer>
    </div>
  );
}
