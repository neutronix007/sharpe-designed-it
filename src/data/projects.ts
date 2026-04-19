// ── Shared project data ───────────────────────────────────────────────────────
// Single source of truth used by both Projects.tsx and Slideshow.tsx.
// To add / edit a project, change it here and both sections update automatically.

export const YT_EMBED =
  "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&mute=1&controls=0&loop=1&playlist=sjDxL0-elBE&modestbranding=1";
export const YT_MODAL =
  "https://www.youtube.com/embed/sjDxL0-elBE?si=4RnOgqYO4vxJBpAi&autoplay=1&controls=1";

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;        // poster / card background (path from /public or absolute URL)
  videoEmbed: string;   // local: "/file.mp4" | YouTube embed URL | "": image-only
  videoModal: string;   // YouTube URL for modal (HD). Blank = reuse videoEmbed
  user: string;
  description: string;
  behance: string;
}

export const projects: Project[] = [
  // ── Row 1 (full-width hero) ────────────────────────────────────────
  {
    id: 1,
    title: "Google Real Estate Expo — Zeme Inc",
    category: "Motion Design",
    image: "https://img.youtube.com/vi/sjDxL0-elBE/maxresdefault.jpg",
    videoEmbed: YT_EMBED,
    videoModal: YT_MODAL,
    user: "@sharpe.motion",
    description:
      "Motion graphics and video production for the Google Real Estate Expo and NY Real Estate Expo. High-impact content driving measurable audience growth and a 15% follower increase across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
  // ── Row 2 (2/3 + 1/3) ─────────────────────────────────────────────
  {
    id: 2,
    title: "Social Media Posts for Beda Consult",
    category: "Social Media Design",
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
    image: "/Social media designs for vintage travel consult.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.content",
    description:
      "A curated set of social media graphics for a vintage-themed travel consulting brand. The visuals blend nostalgic aesthetic cues with modern digital layout to communicate wanderlust and trust, maintaining a consistent brand voice across multiple platforms.",
    behance: "https://www.behance.net/gallery/187052353/Social-Media-Designs-for-Vintage-Travel-Consult",
  },
  // ── Row 3 (1/3 + 2/3) ─────────────────────────────────────────────
  {
    id: 4,
    title: "Social Media Designs for NOS POS",
    category: "Social Media Design",
    image: "/Social media designsfor NOS.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.nos",
    description:
      "A focused social media design package for NOS-POS, translating their brand into scroll-stopping digital content. Adaptable across post formats while maintaining visual consistency, built to support the brand's online communication goals.",
    behance: "https://www.behance.net/gallery/172884727/Social-Media-Designs-For-NOS-POS-1",
  },
  {
    id: 5,
    title: "UTA Music App — Logo Design & Brand Identity",
    category: "UI Design & Brand Identity",
    image: "/Cover image brand guidelines.jpg",
    videoEmbed: "/uta music app.mp4",
    videoModal: "",
    user: "@sharpe.uta",
    description:
      "Logo design and full brand identity system for UTA, a music streaming app. Crafted a distinctive visual language — wordmark, iconography, colour system, and UI guidelines — that bridges music culture with a clean, modern digital product experience.",
    behance: "https://www.behance.net/gallery/182086685/Uta-Music-App-Logo-Design-and-Brand-Identity",
  },
  // ── Row 4 (2/3 + 1/3) ─────────────────────────────────────────────
  {
    id: 6,
    title: "Sharpe Designed.It Brand Identity",
    category: "Brand Identity",
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
    image: "/pony decor thumbnail.jpg",
    videoEmbed: "",
    videoModal: "",
    user: "@sharpe.brand",
    description:
      "Full logo design and brand identity system for Pony Decor, an interior décor brand. Developed a refined visual language — custom wordmark, colour palette, and brand guidelines — that captures the brand's elegance and positions it confidently in the luxury home décor market.",
    behance: "https://www.behance.net/gallery/176240365/Pony-Decor-Logo-Design-and-Brand-Identity",
  },
  // ── Row 5 (full-width hero) ────────────────────────────────────────
  {
    id: 8,
    title: "New York Real Estate Expo — Zeme Inc",
    category: "Motion Graphics",
    image: "",
    videoEmbed: "/Real Estate Expo Oct 2024 with Sound V3.mp4",
    videoModal: "",
    user: "@sharpe.zeme",
    description:
      "High-impact product video and motion graphics produced for Zeme Inc's October Real Estate Expo. Full end-to-end production — script to screen — delivering broadcast-quality visuals that drove measurable engagement at the event and across social platforms.",
    behance: "https://www.behance.net/cliffordsharpe",
  },
];
