import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Linkedin, Github, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 w-full z-[60] px-8 py-6 flex justify-between items-center"
      >
        <Link to="/" className="flex items-center gap-2.5 text-xl font-display font-bold tracking-tighter z-[70]">
          <img src="/logo.jpg" alt="Sharpe" className="w-8 h-8 rounded-full object-cover" />
          Sharpe<span className="text-white/40">.Designed.It</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <Link to="/ai-agency" className="text-white font-bold tracking-widest uppercase text-[10px] border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-all">Agency</Link>
          <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link to="/experience" className="hover:text-white transition-colors">Experience</Link>
          {/* <a href="#" className="hover:text-white transition-colors">About</a> */}
          
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/neutronix007/PortfolioProjects" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/clifford-sharpe/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="https://www.behance.net/cliffordsharpe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors opacity-60 hover:opacity-100">
              <img src="https://cdn.simpleicons.org/behance/ffffff" alt="Behance" className="w-[18px] h-[18px]" />
            </a>
            <a href="https://cal.com/clifford-sharpe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Calendar size={18} /></a>
          </div>

          <button 
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-2 glass-pill rounded-full text-white hover:bg-white/20 transition-all"
          >
            Let's Talk
          </button>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-[70] text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <ContactForm onClose={() => setIsContactOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <Link to="/ai-agency" onClick={() => setIsOpen(false)} className="text-3xl font-display font-bold hover:text-white/60 transition-colors">Agency</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className="text-3xl font-display font-bold hover:text-white/60 transition-colors">Projects</Link>
            <Link to="/experience" onClick={() => setIsOpen(false)} className="text-3xl font-display font-bold hover:text-white/60 transition-colors">Experience</Link>
            {/* <a href="#" onClick={() => setIsOpen(false)} className="text-3xl font-display font-bold hover:text-white/60 transition-colors">About</a> */}
            <button 
              onClick={() => {
                setIsOpen(false);
                setIsContactOpen(true);
              }}
              className="px-8 py-3 glass-pill rounded-full text-xl font-bold"
            >
              Let's Talk
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
