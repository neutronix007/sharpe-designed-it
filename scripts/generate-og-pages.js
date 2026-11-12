import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

const base = readFileSync(`${distDir}/index.html`, "utf-8");

const pages = [
  {
    file: "projects.html",
    title: "Projects | Clifford Sharpe",
    description: "Motion graphics, brand identities, and social media campaigns — a curated selection of Clifford Sharpe's design work.",
    image: "https://cliffordsharpe.com/og/projects.jpg",
    url: "https://cliffordsharpe.com/projects",
  },
  {
    file: "experience.html",
    title: "Experience | Clifford Sharpe",
    description: "My design career spanning Zeme Inc, Beda Consult, Onyin Technologies, and global freelance — delivering measurable results through motion and brand design.",
    image: "https://cliffordsharpe.com/og/experience.jpg",
    url: "https://cliffordsharpe.com/experience",
  },
  {
    file: "archive.html",
    title: "Archive | Clifford Sharpe",
    description: "Every project by Clifford Sharpe — motion graphics, brand identities, social media design, and more. Browse and filter by discipline.",
    image: "https://cliffordsharpe.com/og/projects.jpg",
    url: "https://cliffordsharpe.com/archive",
  },
  {
    file: "agency.html",
    title: "The Agency | Clifford Sharpe — We Build Killer Landing Pages",
    description: "High-converting landing pages and digital experiences built for brands that mean business.",
    image: "https://cliffordsharpe.com/og/agency.jpg",
    url: "https://cliffordsharpe.com/agency",
  },
  {
    file: "promo.html",
    title: "2-Day Website Promo | Sharpe Designed It — GH₵1,200",
    description: "Your business website in 2 days for GH₵1,200. 3 pages that work on any phone or computer, your own web address free for the first year, WhatsApp and Google Maps.",
    image: "https://cliffordsharpe.com/og/agency.jpg",
    url: "https://cliffordsharpe.com/promo",
  },
];

function swap(html, page) {
  return html
    // <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    // og:title
    .replace(
      /<meta property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title"        content="${page.title}" />`
    )
    // og:description
    .replace(
      /<meta property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${page.description}" />`
    )
    // og:url
    .replace(
      /<meta property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url"         content="${page.url}" />`
    )
    // og:image
    .replace(
      /<meta property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image"       content="${page.image}" />`
    )
    // twitter:title
    .replace(
      /<meta name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title"        content="${page.title}" />`
    )
    // twitter:description
    .replace(
      /<meta name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${page.description}" />`
    )
    // twitter:image
    .replace(
      /<meta name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image"       content="${page.image}" />`
    )
    // meta description
    .replace(
      /<meta name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${page.description}" />`
    );
}

// ── /promo: show something on the first paint, and fetch its code in parallel ──
// Ad visitors are mostly on Ghana mobile data. Without this they stare at a black screen until the
// main script AND the promo script have downloaded one after the other. This gives them the headline
// and price straight away (React replaces it with the real page), and starts both downloads at once.
const manifestPath = `${distDir}/.vite/manifest.json`;
function promoPreloads() {
  if (!existsSync(manifestPath)) return "";
  const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
  const files = new Set();
  const walk = (key) => {
    const entry = manifest[key];
    if (!entry || files.has(entry.file)) return;
    files.add(entry.file);
    (entry.imports || []).forEach(walk);
  };
  walk("src/components/Promo.tsx");
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`).join("\n    ");
}

const PROMO_QUICK_LOOK = `<div style="min-height:100vh;background:#000;color:#fff;font-family:'Space Mono',ui-monospace,monospace">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid rgba(255,255,255,.05);font-size:11px;font-weight:700;letter-spacing:.4em"><span>THE<span style="color:#00ff00">.</span>AGENCY</span><span style="font-size:10px;letter-spacing:.2em;color:#00ff00;border:1px solid rgba(0,255,0,.3);padding:8px 16px;text-transform:uppercase">Request</span></div>
      <div style="margin:24px 20px 0;padding:56px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:28px">
        <div style="font-size:10px;font-weight:700;letter-spacing:.5em;color:#00ff00;text-transform:uppercase">2-Day Website Promo</div>
        <h1 style="margin:0;font-family:Syncopate,'Space Grotesk',system-ui,sans-serif;font-weight:700;text-transform:uppercase;line-height:1.15;font-size:clamp(24px,7.5vw,52px);max-width:56rem">Your business website in 2 days</h1>
        <div style="font-family:'Space Grotesk',system-ui,sans-serif;font-weight:700;font-size:clamp(48px,12vw,72px);color:#00ff00">GH₵1,200</div>
        <div style="font-size:11px;letter-spacing:.25em;color:rgba(255,255,255,.4);text-transform:uppercase;margin-top:-24px">Usually <s>GH₵2,700</s></div>
      </div>
    </div>`;

function promoExtras(html) {
  return html
    .replace("</head>", `    ${promoPreloads()}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${PROMO_QUICK_LOOK}</div>`);
}

for (const page of pages) {
  let html = swap(base, page);
  if (page.file === "promo.html") html = promoExtras(html);
  writeFileSync(`${distDir}/${page.file}`, html, "utf-8");
  console.log(`✓ Generated dist/${page.file}`);
}

// The build manifest is only needed here; don't publish it with the site
rmSync(`${distDir}/.vite`, { recursive: true, force: true });

console.log("OG pages generated successfully.");
