import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-lg glass-card p-8 rounded-3xl relative overflow-hidden min-h-[500px] flex flex-col justify-center"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
      >
        <X size={24} />
      </button>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">Let's Talk</h2>
              <p className="text-white/40 text-sm">Have a project in mind? Let's build something amazing together.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Email</label>
                <input 
                  required
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button type="submit" className="w-full py-4 glass-pill rounded-xl font-bold flex items-center justify-center gap-2 group">
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">Message Sent!</h2>
              <p className="text-white/40">Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
