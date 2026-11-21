import { useEffect, type ReactNode } from "react";
import { Crown, LayoutTemplate, Play, X } from "lucide-react";
import { videoFor } from "../blackFriday";

// Shared building blocks for the ad landing pages (/promo and /company): brand corners and labels,
// project cards that open a video, and the form pieces.

// A project shown as a still poster; the full video only downloads when tapped
export type Project = { slug: string; title: string; what: string; kind: "client" | "sample"; video: string; live?: string; grid?: boolean };

export const PHONE_HINT = "Enter your Ghana number, like 024 123 4567";

export function Corners({ size = "w-6 h-6", tone = "border-[#00ff00]/40" }: { size?: string; tone?: string }) {
  return (
    <>
      <div className={`absolute top-0 left-0 ${size} border-t border-l ${tone} pointer-events-none`} />
      <div className={`absolute top-0 right-0 ${size} border-t border-r ${tone} pointer-events-none`} />
      <div className={`absolute bottom-0 left-0 ${size} border-b border-l ${tone} pointer-events-none`} />
      <div className={`absolute bottom-0 right-0 ${size} border-b border-r ${tone} pointer-events-none`} />
    </>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff00]">{children}</div>;
}

export function KindBadge({ kind }: { kind: Project["kind"] }) {
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
export function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void; key?: string }) {
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
export function VideoModal({ p, onClose }: { p: Project; onClose: () => void }) {
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
export function WorkStrip({ projects, onOpen, still }: { projects: Project[]; onOpen: (p: Project) => void; still: boolean }) {
  const items = still ? projects : [...projects, ...projects];
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
            aria-hidden={i >= projects.length || undefined}
            tabIndex={i >= projects.length ? -1 : undefined}
            className="relative w-[170px] md:w-[240px] aspect-video flex-none overflow-hidden border border-white/10 group"
          >
            <img src={`/posters/${p.slug}.webp`} alt={i < projects.length ? `${p.title} website` : ""} loading={i < 6 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/90 to-transparent text-left text-[9px] font-bold uppercase tracking-wider">
              {p.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full bg-white/[0.04] border border-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00ff00]/60 transition-colors font-sans";

export function ChoiceGroup({ name, options, stacked = false, onPick }: { name: string; options: string[]; stacked?: boolean; onPick?: (v: string) => void }) {
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
export function ghanaWhatsApp(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (/^0[25]\d{8}$/.test(digits)) return "233" + digits.slice(1);
  if (/^233[25]\d{8}$/.test(digits)) return digits;
  return null;
}
