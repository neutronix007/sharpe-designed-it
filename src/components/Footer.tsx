import { motion } from "motion/react";
import { Linkedin, ArrowUp, Github, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] pt-20 pb-12 px-8 md:px-20 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="space-y-6 max-w-md">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter">
            Sharpe<span className="text-white/40">.Designed.It</span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed">
            Pushing the boundaries of digital storytelling through high-end motion graphics and visual identities. Based in the digital frontier.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <a href="https://github.com/neutronix007/PortfolioProjects" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/clifford-sharpe/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://www.behance.net/cliffordsharpe" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <img src="https://cdn.simpleicons.org/behance/ffffff" alt="Behance" className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://ca.pinterest.com/sharpedesignedit/sharpedesignedit/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <img src="https://cdn.simpleicons.org/pinterest/ffffff" alt="Pinterest" className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://linktr.ee/sharpe_designedit" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <img src="https://cdn.simpleicons.org/linktree/ffffff" alt="Linktree" className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/20">Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-white/60 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/experience" className="text-white/60 hover:text-white transition-colors">Experience</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/20">Contact</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="mailto:clifford.sharpe007@gmail.com" className="text-white/60 hover:text-white transition-colors">clifford.sharpe007@gmail.com</a></li>
              <li>
                <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                  <Calendar size={13} />Book a Call
                </a>
              </li>
              <li><a href="https://linktr.ee/sharpe_designedit" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">All Links</a></li>
            </ul>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/20 font-medium">
        <div>© Sharpe.Designed.It 2026. All Rights Reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
