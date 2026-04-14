import { useState, useEffect } from "react";
import { AnimatePresence, motion, useSpring, useMotionValue } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import AIAgency from "./components/AIAgency";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Detect desktop (mouse) vs mobile (touch) — only show glow on desktop
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, mouseX, mouseY]);

  const isAIAgency = location.pathname === "/ai-agency";

  return (
    <>
      <CustomCursor />

      {/* Micro-Parallax Background Glow — desktop only */}
      {isDesktop && (
        <motion.div
          className="fixed top-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
          visibility: isLoading ? "hidden" : "visible"
        }}
        className="relative z-10"
      >
        {!isAIAgency && <Navbar />}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/ai-agency" element={<AIAgency />} />
        </Routes>
        {!isAIAgency && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
          <AppContent />
        </main>
      </Router>
    </HelmetProvider>
  );
}
