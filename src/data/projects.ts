// ── Shared project data ───────────────────────────────────────────────────────
// Single source of truth used by Projects.tsx, Slideshow.tsx, and Archive.tsx.
// To add / edit a project, change it here and all sections update automatically.
//
// featured: true  → appears in the Hero Slideshow + homepage Projects grid
// featured: false → Archive page only
// tags[]          → drives the Archive filter pills (can be multiple)
//
// Array order controls Archive display order.
// Projects.tsx uses byId() so the homepage grid is unaffected by reordering.

export const YT_EMBED =
  "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&mute=1&controls=0&loop=1&playlist=sjDxL0-elBE&modestbranding=1";
export const YT_MODAL =
  "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&controls=1";

export interface Project {
  id: number;
  title: string;
  category: string;
  tags: string[];       // filter keys used by Archive page — can be multiple
  featured: boolean;    // true = shows in Hero Slideshow; false = Archive only
  image: string;        // poster / card background (path from /public or absolute URL)
  videoEmbed: string;   // local: "/file.mp4" | YouTube embed URL | "": image-only
  videoModal: string;   // YouTube URL for modal (HD). Blank = reuse videoEmbed
  user: string;
  description: string;
  behance: string;
}

export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Featured — shown in Hero Slideshow + homepage Projects grid (byId in Projects.tsx)
  // Array order here controls Archive display order for these entries.
  // Motion Graphics filter order: id 1 → id 8 → id 5 (UTA 3rd) → archive-only
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Google Real Estate Expo — Zeme Inc",
    category: "Motion Design",
    tags: ["Motion Graphics"],
    featured: true,
    image: "https://img.youtube.com/vi/sjDxL0-elBE/maxresdefault.jpg",
    videoEmbed: YT_EMBED,
    videoModal: YT_MODAL,
    user: "@sharpe.motion",
    description:
      "Motion graphics and video production for the Google Real Estate Expo and NY Real Estate Expo. High-impact content driving measurable audience growth and a 15% follower increase across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 2,
    title: "Social Media Posts for Beda Consult",
    category: "Social Media Design",
    tags: ["Social Media"],
    featured: true,
    image: "/Social media posts for beda consult.jpg",
    videoEmbed: "/Social media posts for beda consult.mp4",
    videoModal: "",
    user: "@sharpe.design",
    description:
      "A series of professional social media assets created for Beda Consult's digital presence. The designs balance corporate credibility with visual clarity to drive engagement, reinforcing brand identity and communicating services effectively across platforms.",
    behance: "https://www.behance.net/gallery/194743025/Social-Media-Posts-for-Beda-Consult",
  },
  {
    id: 3,
    title: "Social Media Designs for Vintage Travel Consult",
    category: "Social Media Design",
    tags: ["Social Media"],
    featured: true,
    image: "/Social media designs for vintage travel consult.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.content",
    description:
      "A curated set of social media graphics for a vintage-themed travel consulting brand. The visuals blend nostalgic aesthetic cues with modern digital layout to communicate wanderlust and trust, maintaining a consistent brand voice across multiple platforms.",
    behance: "https://www.behance.net/gallery/187052353/Social-Media-Designs-for-Vintage-Travel-Consult",
  },
  {
    id: 4,
    title: "Social Media Designs for NOS POS",
    category: "Social Media Design",
    tags: ["Social Media"],
    featured: true,
    image: "/Social media designsfor NOS.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.nos",
    description:
      "A focused social media design package for NOS-POS, translating their brand into scroll-stopping digital content. Adaptable across post formats while maintaining visual consistency, built to support the brand's online communication goals.",
    behance: "https://www.behance.net/gallery/172884727/Social-Media-Designs-For-NOS-POS-1",
  },
  // id 8 placed here so Motion Graphics filter shows: 1 → 8 → 5 (UTA third)
  {
    id: 8,
    title: "New York Real Estate Expo — Zeme Inc",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: true,
    image: "",
    videoEmbed: "/Real Estate Expo Oct 2024 with Sound V3.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "High-impact product video and motion graphics produced for Zeme Inc's October Real Estate Expo. Full end-to-end production — script to screen — delivering broadcast-quality visuals that drove measurable engagement at the event and across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 6,
    title: "Sharpe Designed.It Brand Identity",
    category: "Brand Identity",
    tags: ["Brand Identity"],
    featured: true,
    image: "/sharpe designed it square cover image.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.brand",
    description:
      "The brand identity suite for Sharpe Designed.It — encompassing logo design and full visual identity development. A direct expression of the studio's philosophy and aesthetic standards, anchoring its professional presence across all touchpoints.",
    behance: "https://www.behance.net/gallery/174283517/Sharpe-DesignedIt-Logo-Design-and-Brand-Identity",
  },
  {
    id: 7,
    title: "Pony Decor — Logo Design & Brand Identity",
    category: "Brand Identity",
    tags: ["Brand Identity"],
    featured: true,
    image: "/pony decor thumbnail.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.brand",
    description:
      "Full logo design and brand identity system for Pony Decor, an interior décor brand. Developed a refined visual language — custom wordmark, colour palette, and brand guidelines — that captures the brand's elegance and positions it confidently in the luxury home décor market.",
    behance: "https://www.behance.net/gallery/176240365/Pony-Decor-Logo-Design-and-Brand-Identity",
  },
  // UTA — cross-discipline: appears in Motion Graphics (3rd), Brand Identity, Social Media, UI Design
  {
    id: 5,
    title: "UTA Music App — Logo Design & Brand Identity",
    category: "UI Design & Brand Identity",
    tags: ["Motion Graphics", "Brand Identity", "Social Media", "UI Design"],
    featured: true,
    image: "/Cover image brand guidelines.jpg",
    videoEmbed: "/uta music app.mp4",
    videoModal: "",
    user: "@sharpe.uta",
    description:
      "Logo design and full brand identity system for UTA, a music streaming app. Crafted a distinctive visual language — wordmark, iconography, colour system, and UI guidelines — that bridges music culture with a clean, modern digital product experience.",
    behance: "https://www.behance.net/gallery/182086685/Uta-Music-App-Logo-Design-and-Brand-Identity",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Archive only — not shown in Hero Slideshow
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Zeme — Loading Screen 1",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-1 (1).mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 15,
    title: "Zeme — Loading Screen 2",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-2.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 16,
    title: "Zeme — Loading Screen 3",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-3.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 17,
    title: "Zeme — Loading Screen 4",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-4.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 18,
    title: "Zeme — Loading Screen 5",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-6.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 19,
    title: "Zeme — Loading Screen 6",
    category: "Loading Animation",
    tags: ["Loading Animation"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-6 (1).mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "Custom loading animation for the Zeme real estate platform website. A smooth micro-animation designed to keep users visually engaged during page transitions, aligned with Zeme's brand motion language.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 10,
    title: "Zeme Homepage — Product Animations",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: false,
    image: "",
    videoEmbed: "/Scene-9.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "A series of product and explainer animations produced for the Zeme website homepage. Each clip communicates a core platform feature with clarity and visual impact — translating complex functionality into compelling, digestible motion.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 11,
    title: "Zeme App — Booking via Chat",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: false,
    image: "",
    videoEmbed: "/motion graphic project 7.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "A chat UI motion animation demonstrating how property showings can be booked through the Zeme app — told through a live conversation between an agent and a renter. Designed to make the booking flow feel intuitive and frictionless.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 12,
    title: "Zeme App — Renter Interface Walkthrough",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: false,
    image: "",
    videoEmbed: "/motion graphics project 5.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "A motion graphics animation walking through the Zeme platform experience from a renter's perspective. Highlights the interface's key touchpoints and ease of use, helping prospective users immediately understand the product's value.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 13,
    title: "Zeme — Agent Platform Tutorial",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: false,
    image: "",
    videoEmbed: "/motion graphics project 6.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "A motion graphics tutorial guiding real estate agents through the Zeme platform — breaking down core tools, workflows, and features through dynamic, engaging animation that makes onboarding clear and compelling.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  {
    id: 14,
    title: "Zeme App — Search & Apply",
    category: "Motion Graphics",
    tags: ["Motion Graphics"],
    featured: false,
    image: "",
    videoEmbed: "/motion graphic project 3.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "A vertical-format motion graphics video demonstrating how users can search for property listings and apply instantly through the Zeme app — designed to highlight the platform's speed and simplicity in a mobile-native format.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
];

// ── Convenience exports ────────────────────────────────────────────────────────
// featuredProjects → Hero Slideshow only (featured: true)
// projects         → full list for Archive page
export const featuredProjects = projects.filter((p) => p.featured);
