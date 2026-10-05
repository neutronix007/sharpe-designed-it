import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Projects from "./Projects";
import Experience from "./Experience";
import SEO from "./SEO";

const seoConfig = {
  "/": {
    title: "Clifford Sharpe | Motion & Visual Identity Designer",
    description: "Hi, I'm Clifford — Graphic & Motion Designer crafting high-end visual identities and motion graphics that drive brand growth and audience engagement.",
    image: "/og-home.jpeg",
    path: "/",
  },
  "/projects": {
    title: "Projects | Clifford Sharpe",
    description: "A curated collection of my most impactful work — motion design, brand identity, and social media across Google Real Estate Expo, UTA Music App, Pony Decor, and more.",
    image: "/og-projects.jpeg",
    path: "/projects",
  },
  "/experience": {
    title: "Experience | Clifford Sharpe",
    description: "My design career spanning Zeme Inc, Beda Consult, Onyin Technologies, and global freelance — delivering measurable results through motion and brand design.",
    image: "/og-experience.jpeg",
    path: "/experience",
  },
};

export default function HomePage() {
  const location = useLocation();
  const seo = seoConfig[location.pathname as keyof typeof seoConfig] ?? seoConfig["/"];

  return (
    <>
      <SEO {...seo} />
      <Hero />
      {/* scroll-mt-20 offsets the fixed navbar (≈80px) when scrollIntoView is called */}
      <div id="projects" className="scroll-mt-20">
        <Projects />
      </div>
      <div id="experience" className="scroll-mt-20">
        <Experience />
      </div>
    </>
  );
}
