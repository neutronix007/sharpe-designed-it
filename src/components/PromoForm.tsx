import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

interface PromoFormProps {
  onClose: () => void;
}

export default function PromoForm({ onClose }: PromoFormProps) {
  const [state, handleSubmit] = useForm("xdayaoyz");

  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onClose]);

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
        {!state.succeeded ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">48-Hour Website</h2>
              <p className="text-white/40 text-sm">
                Tell us your vision. We'll build it in 48 hours.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Hidden field to track 48hr offer */}
              <input type="hidden" name="_subject" value="🚀 48-HOUR OFFER — New Inquiry" />
              <input type="hidden" name="source" value="48-hour-promo-banner" />

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
                <ValidationError field="name" prefix="Name" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">
                  Your Project Idea
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="What kind of website do you need? (landing page, portfolio, etc.)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
                <ValidationError field="message" prefix="Message" errors={state.errors} className="text-red-400 text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full py-4 glass-pill rounded-xl font-bold flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {state.submitting ? "Sending…" : "Submit 48-Hour Inquiry"}
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
              className="w-20 h-20 bg-[#00ff00]/10 rounded-full flex items-center justify-center mx-auto"
            >
              <div className="text-4xl">🚀</div>
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold">We're On It!</h2>
              <p className="text-white/40">
                We received your 48-hour inquiry. We'll contact you within 2 hours to confirm.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
