import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, ExternalLink, Play } from "lucide-react";
import { projects } from "../data/projects";

// ── Filter categories — add new ones here as you expand your work ──
const FILTERS = ["All", "Motion Graphics", "Brand Identity", "Social Media", "UI Design"];

export default function Archive() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const hasVideo = (p: typeof projects[0]) => !!(p.videoEmbed || p.videoModal);
  const close = () => setSelectedProject(null);

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-24">

      {/* ── Minimal header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2"
        >
          <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-medium">All Work</p>
          <h1
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            Archive
          </h1>
          <p className="text-white/40 text-sm md:text-base pt-1">
            Every project, filtered by discipline.
          </p>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="flex flex-wrap items-center gap-2.5 mt-10"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "glass-pill text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
          {/* Live project count */}
          <span className="ml-auto text-white/25 text-xs font-medium tabular-nums">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </motion.div>
      </div>

      {/* ── Uniform grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedProject(project)}
                className="relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* Background — image or dark placeholder for video-only cards */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 scale-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Video indicator pill */}
                {hasVideo(project) && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                    <Play size={9} className="fill-white text-white" />
                    <span className="text-[9px] text-white/70 font-medium uppercase tracking-widest">Video</span>
                  </div>
                )}

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-base md:text-lg font-display font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-28 space-y-2"
            >
              <p className="text-white/30 text-lg font-display font-bold">
                No projects in this category yet.
              </p>
              <p className="text-white/20 text-sm">
                Check back soon — more work is on the way.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Modal — identical pattern to Projects.tsx ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-5">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {hasVideo(selectedProject) ? (
              /* ── VIDEO modal ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[92vw] glass-card rounded-3xl overflow-hidden flex flex-col"
              >
                <button
                  onClick={close}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Video — capped so info strip is always visible */}
                <div
                  className="w-full bg-black shrink-0"
                  style={{ aspectRatio: "16/9", maxHeight: "calc(90vh - 120px)" }}
                >
                  {selectedProject.videoModal ? (
                    <iframe
                      src={selectedProject.videoModal}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : selectedProject.videoEmbed.startsWith("/") ? (
                    <video
                      src={selectedProject.videoEmbed}
                      {...(selectedProject.image ? { poster: selectedProject.image } : {})}
                      autoPlay
                      controls
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <iframe
                      src={selectedProject.videoEmbed}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* Info strip */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 md:px-10 py-5 border-t border-white/5 shrink-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2563eb] font-medium tracking-widest uppercase text-[10px] mb-0.5">
                      {selectedProject.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display font-bold truncate">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mt-1 line-clamp-2 max-w-2xl">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="px-3 py-2 glass-pill rounded-xl text-white/40 text-xs font-medium hidden md:block">
                      {selectedProject.user}
                    </div>
                    <a
                      href={selectedProject.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:bg-white/90 transition-all text-sm whitespace-nowrap"
                    >
                      Behance <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── IMAGE modal ── */
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                className="relative w-full max-w-[85vw] max-h-[90vh] glass-card rounded-[40px] overflow-hidden flex flex-col md:flex-row"
              >
                <button
                  onClick={close}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 min-h-[260px] md:min-h-0">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center space-y-8 overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-[#2563eb] font-medium tracking-widest uppercase text-xs">
                      {selectedProject.category}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <p className="text-white/60 leading-relaxed text-base">
                    {selectedProject.description}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <a
                      href={selectedProject.behance}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                    >
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
    </div>
  );
}
