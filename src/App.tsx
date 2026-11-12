import { lazy, Suspense, useState, useEffect, useRef, type ComponentType } from "react";
import { AnimatePresence, motion, useSpring, useMotionValue } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import { track } from "./pixel";

// Code-split every page, so the ad landing page (/promo) doesn't download the home page's code first.
// The home page hides behind its intro loader while its code arrives.
const HomePage = lazy(() => import("./components/HomePage"));
const Navbar   = lazy(() => import("./components/Navbar"));
const Footer   = lazy(() => import("./components/Footer"));
const AIAgency = lazy(() => import("./components/AIAgency"));
const Archive  = lazy(() => import("./components/Archive"));
const Promo    = lazy(() => import("./components/Promo"));

// main.tsx loads the promo page before the first render when someone lands on /promo, and passes it in
// here, so it renders straight away instead of flashing an empty screen while the code downloads.
function AppContent({ promoPage: PromoPage }: { promoPage?: ComponentType }) {
  const location = useLocation();
  // The ad landing page skips the intro loader so it opens fast on mobile data
  const isPromo = location.pathname === "/promo";
  const [isLoading, setIsLoading] = useState(!isPromo);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Auto-route to agency page if accessed via agency subdomain
  useEffect(() => {
    if (window.location.hostname === "agency.cliffordsharpe.com" && location.pathname === "/") {
      navigate("/agency", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Detect desktop (mouse) vs mobile (touch)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Meta Pixel: index.html sends the first PageView; send one for each in-app page change after that
  const firstPage = useRef(true);
  useEffect(() => {
    if (firstPage.current) { firstPage.current = false; return; }
    track("PageView");
  }, [location.pathname]);

  // Reset scroll on route change — skip for section-based routes (they scroll to a section instead)
  useEffect(() => {
    const sectionRoutes = ["/projects", "/experience", "/archive"];
    if (!sectionRoutes.includes(location.pathname)) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // After the loading screen finishes, scroll to the target section if the URL demands it
  useEffect(() => {
    if (isLoading) return;
    const sectionMap: Record<string, string> = {
      "/projects": "projects",
      "/experience": "experience",
    };
    const sectionId = sectionMap[location.pathname];
    if (!sectionId) return;
    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => clearTimeout(timer);
  }, [isLoading, location.pathname]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, mouseX, mouseY]);

  const isAIAgency = location.pathname === "/agency";
  const hideSiteChrome = isAIAgency || isPromo;

  return (
    <>
      <CustomCursor />

      {/* Micro-Parallax Background Glow — desktop only */}
      {isDesktop && (
        <motion.div
          className="fixed top-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"
          style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        />
      )}

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-out",
          visibility: isLoading ? "hidden" : "visible",
        }}
        className="relative z-10"
      >
        {!hideSiteChrome && <Suspense fallback={null}><Navbar /></Suspense>}

        <Routes>
          {/* Home — all three sections on one scrollable page */}
          <Route path="/" element={homePage} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/ai-agency" element={<Navigate to="/agency" replace />} />

          {/* These routes render the same full page and auto-scroll to the relevant section */}
          <Route path="/projects" element={homePage} />
          <Route path="/experience" element={homePage} />

          {/* Archive — full project library with filter pills */}
          <Route
            path="/archive"
            element={
              <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
                <Archive />
              </Suspense>
            }
          />

          {/* Agency — separate page, code-split */}
          <Route
            path="/agency"
            element={
              <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <AIAgency />
              </Suspense>
            }
          />

          {/* 48-hour promo — ad landing page, code-split */}
          <Route
            path="/promo"
            element={
              PromoPage ? (
                <PromoPage />
              ) : (
                <Suspense fallback={<div className="min-h-screen bg-black" />}>
                  <Promo />
                </Suspense>
              )
            }
          />
        </Routes>

        {!hideSiteChrome && <Suspense fallback={null}><Footer /></Suspense>}
      </div>
    </>
  );
}

const homePage = (
  <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
    <HomePage />
  </Suspense>
);

export default function App({ promoPage }: { promoPage?: ComponentType }) {
  return (
    <HelmetProvider>
      <Router>
        <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
          <AppContent promoPage={promoPage} />
        </main>
      </Router>
    </HelmetProvider>
  );
}
