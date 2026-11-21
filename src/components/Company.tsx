import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";
import { Check, ChevronDown, ChevronRight, MessageCircle, Plus } from "lucide-react";
import SEO from "./SEO";
import GlowButton from "./GlowButton";
import { track } from "../pixel";
import { ChoiceGroup, Corners, Field, PHONE_HINT, ProjectCard, SectionLabel, VideoModal, WorkStrip, ghanaWhatsApp, inputClass, type Project } from "./landingKit";

// Ad landing page for company websites (from GH₵3,500). Aimed at established companies, not small sellers:
// the price, the proof (company clients) and the form (role, budget, current site) all filter for that.

const WHATSAPP_NUMBER = "233591974504";
const PHONE_DISPLAY = "059 197 4504";
const GREEN = "#00ff00";

const PROJECTS: Project[] = [
  { slug: "grayline", title: "Grayline Logistics", what: "Logistics, 16 offices", kind: "client", video: "/grayline-web.mp4", live: "https://graylinelogisticsgh.com", grid: true },
  { slug: "west-stones", title: "West Stones LLC", what: "Shipping, USA → Ghana", kind: "client", video: "/west-stones-web.mp4", live: "https://weststonesllc.com", grid: true },
  { slug: "cfap", title: "CFAP", what: "Tax consulting, UK", kind: "client", video: "/cfap-web.mp4", live: "https://cfap.uk", grid: true },
  { slug: "onyin", title: "Onyin Technologies", what: "Software company", kind: "client", video: "/onyin-web.mp4", grid: true },
  { slug: "textzeme", title: "TextZeme", what: "Tech startup, New York", kind: "client", video: "/textzeme-web.mp4", grid: true },
  { slug: "laterite", title: "Laterite Build", what: "Construction", kind: "sample", video: "/laterite-web.mp4", grid: true },
  { slug: "okwan", title: "Ɔkwan Motors", what: "Car sales & rental", kind: "sample", video: "/okwan-web.mp4", grid: true },
  { slug: "dental", title: "Dental Health", what: "Clinic", kind: "sample", video: "/dental-web.mp4", grid: true },
  { slug: "nexora", title: "Nexora", what: "AI software", kind: "sample", video: "/nexora-web.mp4", grid: true },
  { slug: "artery", title: "Artery Health", what: "Health tech", kind: "sample", video: "/artery-web.mp4", grid: true },
];

const INDUSTRIES = [
  "Logistics & shipping", "Consulting, finance & law", "Real estate & construction", "Schools & training",
  "Clinics & health", "Tech & software", "NGOs & churches", "Manufacturing & trade",
];

const INCLUDED = [
  "Up to 6 pages: Home, About, Services, Projects or Clients, Team, Contact",
  "Quote / enquiry form that sends straight to your email",
  "Professional email on your own domain (e.g. info@yourcompany.com)",
  "Google Business Profile and basic Google setup, so clients can find you",
  "Works on any phone or computer, and loads fast on mobile data",
  "WhatsApp button, Google Maps and your social media links",
  "Your own .com and hosting, free for the first year",
  "2 rounds of changes before launch, and 30 days of support after",
];

const ADD_ONS = ["Extra pages", "News / blog", "Careers page", "Client or staff portal", "Bookings", "Online payments (Paystack)"];

const STEPS = [
  { title: "Send your brief", body: "Fill in the form below. It takes about two minutes." },
  { title: "Quick call and a fixed price", body: "We go through what you need, then send a written agreement with one total price." },
  { title: "Deposit and content", body: "You pay 50% to start and send your logo, photos and company details." },
  { title: "Review and go live", body: "Ready in 7–10 days. You review, we make your changes, you pay the balance and it goes live." },
];

const FAQ = [
  { q: "How much does it cost?", a: "From GH₵3,500 for a company website of up to 6 pages. Extras like a portal, bookings or online payments are quoted separately. You get one fixed total in writing before anything starts." },
  { q: "How long does it take?", a: "7–10 days after we receive your content. Bigger projects get a timeline in your agreement." },
  { q: "Can you redesign our current website?", a: "Yes. Tell us your current web address in the form and we'll suggest what to keep and what to change." },
  { q: "Who owns the website and domain?", a: "Your company does. The domain is registered in your name, and once fully paid you own the website and its code." },
  { q: "What do you need from us?", a: "Your logo, photos of your team, work or premises, and the details of your services. Missing something? We can help put it together." },
  { q: "What happens after the first year?", a: "Hosting stays free. Your domain renews at about GH₵200 a year, and your business email depends on the plan you choose." },
];

const ROLES = ["Owner / CEO / MD", "Manager", "Marketing / communications", "Other"];
const NEEDS = ["A new website (we don't have one)", "A redesign of our current website", "A website plus something extra (portal, bookings, payments)"];
const BUDGETS = ["GH₵3,500 – 5,000", "GH₵5,000 – 10,000", "GH₵10,000+", "Not sure yet"];
const WHEN = ["This month", "In the next 1–2 months", "Just planning for now"];

export default function Company() {
  const [state, handleSubmit] = useForm("xdayaoyz");
  const reduceMotion = useReducedMotion();
  const [industry, setIndustry] = useState("");
  const [lead, setLead] = useState({ name: "", company: "" });
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);

  // One Lead per enquiry; the website ad optimises for this
  useEffect(() => {
    if (!state.succeeded) return;
    track("Lead", { content_name: "company website" });
    formBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [state.succeeded]);

  const scrollToForm = () => document.getElementById("brief")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const askText = encodeURIComponent("Hi! I'd like to talk about a website for our company.");
  const waText = encodeURIComponent(`Hi! I just sent our company website brief.\nName: ${lead.name}\nCompany: ${lead.company}`);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);
    setLead({ name: String(data.get("name") ?? ""), company: String(data.get("company") ?? "") });
    const intl = ghanaWhatsApp(String(data.get("whatsapp") ?? ""));
    const link = e.currentTarget.elements.namedItem("whatsapp_link") as HTMLInputElement | null;
    if (link) link.value = intl ? `https://wa.me/${intl}` : "";
    return handleSubmit(e);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-mono overflow-x-hidden selection:bg-[#00ff00] selection:text-black">
      <SEO
        title="Company Websites | Sharpe Designed It — from GH₵3,500"
        description="Professional websites for companies in Ghana: up to 6 pages, quote form, business email on your domain and Google setup. From GH₵3,500, ready in 7–10 days."
        image="/og/agency.jpg"
        path="/company"
      />
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <header className="relative z-20 flex items-center justify-between px-5 md:px-12 py-5 border-b border-white/5">
        <a href="/agency" className="text-[11px] font-bold uppercase tracking-[0.4em]">
          SHARPE<span style={{ color: GREEN }}>.</span>DESIGNED<span style={{ color: GREEN }}>.</span>IT
        </a>
        <button onClick={scrollToForm} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff00] border border-[#00ff00]/30 px-4 py-2 hover:bg-[#00ff00] hover:text-black transition-colors">
          Get a quote
        </button>
      </header>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative mx-5 md:mx-12 mt-4 md:mt-8 px-5 md:px-16 pt-9 pb-8 md:pt-14 md:pb-12 flex flex-col items-center text-center gap-5">
          <Corners size="w-8 h-8" />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel>Company Websites</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-tech font-bold uppercase leading-[1.15] tracking-tight text-[6.8vw] md:text-[3.2vw] max-w-5xl"
          >
            A website that wins <span style={{ color: GREEN }}>your company</span> clients
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-[13px] md:text-[15px] text-white/65 font-sans max-w-xl leading-relaxed">
            When a client looks you up, your website should look as serious as your company is. We build it for you, with a quote form, business email and Google setup.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-col items-center gap-1">
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/50">From</div>
            <div className="font-display font-bold text-5xl md:text-6xl tracking-tight" style={{ color: GREEN }}>GH₵3,500</div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/50">Ready in 7–10 days · fixed price in writing</div>
          </motion.div>
          <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
            <GlowButton onClick={scrollToForm}>Get a quote</GlowButton>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${askText}`}
              onClick={() => track("Contact")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-white/60 hover:text-[#00ff00] transition-colors font-sans"
            >
              <MessageCircle size={13} className="text-[#00ff00]" />
              Prefer to talk first? <span className="underline underline-offset-2">WhatsApp {PHONE_DISPLAY}</span>
            </a>
          </motion.div>
        </section>

        <div className="mt-2 md:mt-4">
          <WorkStrip projects={PROJECTS} onOpen={setOpenProject} still={!!reduceMotion} />
        </div>

        {/* ── WHO IT'S FOR ── */}
        <section className="px-5 md:px-12 mt-16 md:mt-24 max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          <SectionLabel>Built.For</SectionLabel>
          <ul className="flex flex-wrap justify-center gap-2">
            {INDUSTRIES.map((x) => (
              <li key={x} className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-white/70">{x}</li>
            ))}
          </ul>
        </section>

        {/* ── WORK ── */}
        <section className="px-5 md:px-12 mt-20 md:mt-28 space-y-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <SectionLabel>Our.Work</SectionLabel>
            <h2 className="font-tech text-2xl md:text-4xl font-bold uppercase">Companies we've built for</h2>
            <p className="text-[11px] text-white/45 font-sans">Tap any site to watch it. Gold = client work, green = sample designs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-5 md:gap-x-4 max-w-7xl mx-auto">
            {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} onOpen={setOpenProject} />)}
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
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-3">Can be added (quoted separately)</div>
              <div className="flex flex-wrap gap-2">
                {ADD_ONS.map((a) => <span key={a} className="border border-white/10 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/55">+ {a}</span>)}
              </div>
            </div>
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

        {/* ── BRIEF FORM ── */}
        <section id="brief" className="px-5 md:px-12 mt-24 md:mt-32 scroll-mt-6">
          <div ref={formBoxRef} className="relative max-w-2xl mx-auto p-6 md:p-12 border border-white/10 bg-white/[0.02]">
            <Corners size="w-6 h-6" tone="border-[#00ff00]/60" />
            {state.succeeded ? (
              <div className="flex flex-col items-center text-center gap-6 py-6">
                <div className="w-14 h-14 border border-[#00ff00]/50 flex items-center justify-center"><Check size={26} style={{ color: GREEN }} /></div>
                <h2 className="font-tech text-xl md:text-2xl font-bold uppercase">Brief received</h2>
                <p className="text-[12px] text-white/60 leading-relaxed max-w-md font-sans">
                  Thanks{lead.name ? `, ${lead.name.split(" ")[0]}` : ""}! We'll review your brief and get back to you within one working day to arrange a quick call.
                </p>
                <div className="w-full max-w-sm border border-white/10 px-5 py-4 text-left space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Save our number</div>
                  <div className="flex justify-between gap-4 text-[12px] font-sans"><span className="text-white/60">WhatsApp &amp; calls</span><span className="font-bold">{PHONE_DISPLAY}</span></div>
                </div>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} onClick={() => track("Contact")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#00ff00] text-black px-7 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                  Message us on WhatsApp <ChevronRight size={14} />
                </a>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-9">
                  <SectionLabel>Company.Brief</SectionLabel>
                  <h2 className="font-tech text-xl md:text-3xl font-bold uppercase leading-tight">Tell us about your company</h2>
                  <p className="text-[12px] text-white/50 leading-relaxed font-sans">About two minutes. We reply within one working day with next steps. No payment today.</p>
                </div>
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <input type="hidden" name="_subject" value="🏢 COMPANY PAGE — New website brief" />
                  <input type="hidden" name="source" value="company-page" />
                  <input type="hidden" name="whatsapp_link" value="" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Your name"><input name="name" required autoComplete="name" placeholder="Kwame Asante" className={inputClass} /></Field>
                    <Field label="Your role">
                      <div className="relative">
                        <select name="role" required defaultValue="" className={`${inputClass} appearance-none pr-10`}>
                          <option value="" disabled>Pick one</option>
                          {ROLES.map((r) => <option key={r} value={r} className="bg-black text-white">{r}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                      </div>
                    </Field>
                  </div>

                  <Field label="Company name"><input name="company" required autoComplete="organization" placeholder="e.g. Asante Logistics Ltd" className={inputClass} /></Field>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="WhatsApp number">
                      <input
                        name="whatsapp" type="tel" required autoComplete="tel" inputMode="tel" placeholder="024 123 4567"
                        pattern="(\+?233|0)\s?[25][0-9](\s?[0-9]){7}" title={PHONE_HINT}
                        onInvalid={(e) => e.currentTarget.setCustomValidity(PHONE_HINT)}
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Work email"><input name="email" type="email" required autoComplete="email" placeholder="kwame@company.com" className={inputClass} /></Field>
                  </div>
                  <ValidationError field="email" errors={state.errors} className="text-xs text-red-400" />

                  <Field label="Industry">
                    <div className="relative">
                      <select name="industry" required value={industry} onChange={(e) => setIndustry(e.target.value)} className={`${inputClass} appearance-none pr-10 ${industry ? "" : "text-white/25"}`}>
                        <option value="" disabled>Pick one</option>
                        {[...INDUSTRIES, "Other"].map((x) => <option key={x} value={x} className="bg-black text-white">{x}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                    </div>
                  </Field>
                  {industry === "Other" && (
                    <Field label="Type your industry"><input name="industry_other" required placeholder="e.g. Printing" className={inputClass} /></Field>
                  )}

                  <Field label="Current website (if any)"><input name="current_site" placeholder="e.g. yourcompany.com, or leave blank" className={inputClass} /></Field>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">What do you need?</span>
                    <ChoiceGroup name="need" stacked options={NEEDS} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Budget</span>
                    <ChoiceGroup name="budget" options={BUDGETS} />
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">When do you want to start?</span>
                    <ChoiceGroup name="start" options={WHEN} />
                  </div>

                  <Field label="Anything else we should know? (optional)">
                    <textarea name="message" rows={3} placeholder="e.g. we want clients to request quotes online" className={`${inputClass} resize-y`} />
                  </Field>

                  <ValidationError errors={state.errors} className="text-xs text-red-400" />
                  <button type="submit" disabled={state.submitting} className="w-full bg-[#00ff00] text-black py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors disabled:opacity-60">
                    {state.submitting ? "Sending…" : "Send our brief"}
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
          <div className="flex justify-center pt-4"><GlowButton onClick={scrollToForm} size="sm">Get a quote</GlowButton></div>
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
