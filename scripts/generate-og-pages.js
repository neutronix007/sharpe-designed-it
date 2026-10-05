import { readFileSync, writeFileSync } from "fs";
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
    image: "https://cliffordsharpe.com/og-projects.jpeg",
    url: "https://cliffordsharpe.com/projects",
  },
  {
    file: "experience.html",
    title: "Experience | Clifford Sharpe",
    description: "My design career spanning Zeme Inc, Beda Consult, Onyin Technologies, and global freelance — delivering measurable results through motion and brand design.",
    image: "https://cliffordsharpe.com/og-experience.jpeg",
    url: "https://cliffordsharpe.com/experience",
  },
  {
    file: "archive.html",
    title: "Archive | Clifford Sharpe",
    description: "Every project by Clifford Sharpe — motion graphics, brand identities, social media design, and more. Browse and filter by discipline.",
    image: "https://cliffordsharpe.com/og-projects.jpeg",
    url: "https://cliffordsharpe.com/archive",
  },
  {
    file: "ai-agency.html",
    title: "The Agency | Clifford Sharpe — We Build Killer Landing Pages",
    description: "High-converting landing pages and digital experiences built for brands that mean business.",
    image: "https://cliffordsharpe.com/og-agency.jpeg",
    url: "https://cliffordsharpe.com/ai-agency",
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

for (const page of pages) {
  const html = swap(base, page);
  writeFileSync(`${distDir}/${page.file}`, html, "utf-8");
  console.log(`✓ Generated dist/${page.file}`);
}

console.log("OG pages generated successfully.");
