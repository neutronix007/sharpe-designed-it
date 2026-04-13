import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";

const experiences = [
  {
    company: "Zeme Inc",
    role: "Graphic & Motion Designer",
    location: "Remote, USA",
    period: "Jan 2024 – Present",
    description: "Led motion graphics and video production for the Google Real Estate Expo and NY Real Estate Expo. Delivered 15+ monthly videos across social media platforms, driving 15% follower growth, a 10% boost in click-through rate, and a 25% engagement increase through AI-enhanced design workflows."
  },
  {
    company: "Beda Consult Ltd",
    role: "Graphic Designer (Contract)",
    location: "Remote",
    period: "Sep 2023 – Present",
    description: "Produced 52+ high-quality graphics monthly across 13+ client accounts. Designed 5+ unique logos and brand guidelines, achieving a 30% engagement increase and a 15% improvement in project turnaround through collaborative design platforms."
  },
  {
    company: "Onyin Technologies Ltd",
    role: "Graphic Designer & Technical Support",
    location: "Remote, UK",
    period: "Aug 2022 – Apr 2023",
    description: "Drove 23% follower growth and a 30% sales increase through social and web design. Generated a 19% customer engagement surge and secured $50k in investment funding via business presentations. Awarded Most Improved Employee 2022."
  },
  {
    company: "Freelance",
    role: "Freelance Graphic Designer",
    location: "Remote, Global",
    period: "Jan 2019 – Present",
    description: "Built a global client base with a 90% satisfaction rate. Delivered 50+ logos and 800+ marketing materials, achieving a 40% client referral boost through targeted social media graphics and website design."
  }
];

const tools = [
  { name: "Photoshop", slug: "adobephotoshop" },
  { name: "Figma", slug: "figma" },
  { name: "After Effects", slug: "adobeaftereffects" },
  { name: "Illustrator", slug: "adobeillustrator" },
  { name: "Premiere Pro", slug: "adobepremierepro" },
  { name: "ChatGPT", slug: "openai" },
  { name: "Midjourney", slug: "midjourney" },
  { name: "Cinema 4D", slug: "maxon" },
  { name: "Blender", slug: "blender" },
  { name: "Stable Diffusion", slug: "stabilityai" }
];

export default function Experience() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050505] flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 pt-32 pb-20 overflow-x-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Local video — faster load from assets */}
          <video
            src="/experience-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Original streaming source — uncomment to compare
          <iframe
            allow="fullscreen"
            allowFullScreen
            height="100%"
            src="https://streamable.com/e/1t3aob?muted=1&nocontrols=1&autoplay=1"
            width="100%"
            style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden', objectFit: 'cover' }}
          />
          */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505] z-10 lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
      </div>

      {/* Left Content: Hero Text & Marquee */}
      <div className="relative z-20 w-full lg:w-1/2 space-y-12 mb-12 lg:mb-0">
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]"
          >
            A Creative <span className="text-white/40 font-loader italic">Problem-Solver</span> <br />
            Driven by Strategy & Impact.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed"
          >
            A creative problem-solver adept at developing strategic design solutions that overcome marketing challenges and enhance brand recognition in competitive markets — helping businesses achieve significant growth through captivating visuals and dynamic motion graphics.
          </motion.p>
        </div>

        {/* Tools Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden py-10"
        >
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-6 whitespace-nowrap px-4"
          >
            {[...tools, ...tools].map((tool, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 px-6 py-3 glass-pill rounded-full border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors group min-w-max"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tool.slug}/ffffff`}
                  alt={tool.name}
                  className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-white/40 group-hover:text-white font-mono text-xs uppercase tracking-widest transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Email Input (Reference Image Style) */}
        <div className="relative max-w-md">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="email-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleEmailSubmit}
                className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 pl-6 backdrop-blur-md"
              >
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="bg-transparent border-none outline-none text-white w-full text-sm"
                />
                <button type="submit" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-white/90 transition-all whitespace-nowrap">
                  Get in touch
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="email-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 rounded-full py-3 px-6 backdrop-blur-md text-white"
              >
                <CheckCircle2 size={20} className="text-green-400" />
                <span className="text-sm font-medium">Thanks! We'll be in touch.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Content: Scrollable Experience Boxes */}
      <div className="relative z-20 w-full lg:w-[45%] lg:h-[70vh] lg:overflow-y-auto lg:pr-4 custom-scrollbar">
        <div className="space-y-6 py-4">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 space-y-4 hover:border-white/20 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-white/80 transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-[#2563eb] font-medium">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-sm">{exp.period}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{exp.location}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {exp.description}
              </p>
              <div className="pt-4 flex justify-end">
                <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
