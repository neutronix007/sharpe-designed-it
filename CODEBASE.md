# Sharpe.Designed.It — Codebase Reference

> Quick-reference guide for making any change to the portfolio without re-reading every file from scratch.
> Last updated: April 2026

---

## 1. Live URLs & Accounts

| Thing | Value |
|---|---|
| **Live site** | https://sharpe-designed-it.vercel.app |
| **GitHub repo** | https://github.com/neutronix007/sharpe-designed-it.git |
| **Vercel project** | Auto-deploys on every push to `main` |
| **Formspree form ID** | `xdayaoyz` — emails land at clifford.sharpe007@gmail.com |
| **Formspree dashboard** | https://formspree.io/forms/xdayaoyz |
| **Microsoft Clarity** | Project ID `wc0wylt0ik` — https://clarity.microsoft.com |
| **Cal.com booking** | https://cal.com/clifford-sharpe |
| **Linktree** | https://linktr.ee/sharpe_designedit |

---

## 2. Tech Stack

| Layer | Library / Tool |
|---|---|
| UI framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (JIT, no config file) |
| Animations | Framer Motion (`motion/react`) + GSAP 3 |
| Routing | React Router DOM v7 |
| SEO/meta tags | `react-helmet-async` |
| Contact forms | `@formspree/react` |
| Analytics | Microsoft Clarity (script tag in `index.html`) |
| Deployment | Vercel (git push → live in ~60s) |

---

## 3. Project Structure

```
sharpe.designed.it studio/
├── index.html                  ← Global HTML shell, OG tags for home, Clarity script
├── vercel.json                 ← SPA routing + per-route OG HTML file mapping
├── package.json                ← Build script runs generate-og-pages.js after Vite
├── CODEBASE.md                 ← This file
│
├── public/                     ← Static assets served at root URL
│   ├── logo.jpg                ← Navbar + favicon source
│   ├── 32x32.png               ← Browser tab favicon
│   ├── og-home.jpeg            ← Social preview — home (1200×630)
│   ├── og-projects.jpeg        ← Social preview — projects (1200×630)
│   ├── og-experience.jpeg      ← Social preview — experience (1200×630)
│   ├── og-agency.jpeg          ← Social preview — agency (1200×630)
│   ├── home-page-video.mp4     ← Hero section background video
│   ├── experience-video.mp4    ← Experience section background video
│   ├── kinetic-forge-video.mp4 ← Agency hero video
│   ├── sharpe-designed-it.mp4  ← Agency card 02 (portfolio project)
│   ├── ocean odyssey.mp4       ← Agency card 01
│   ├── uta music app.mp4       ← Projects card 5 (UTA)
│   ├── Social media posts for beda consult.mp4  ← Projects card 2
│   ├── Real Estate Expo Oct 2024 with Sound V3.mp4 ← Projects card 8
│   ├── Cover image brand guidelines.jpg    ← UTA card poster
│   ├── Social media posts for beda consult.jpg
│   ├── Social media designs for vintage travel consult.jpg
│   ├── Social media designsfor NOS.jpg
│   ├── sharpe designed it square cover image.jpg
│   └── pony decor thumbnail.jpg
│
├── scripts/
│   └── generate-og-pages.js    ← Post-build: creates projects.html, experience.html, ai-agency.html
│
└── src/
    ├── main.tsx                ← React root, mounts <App />
    ├── App.tsx                 ← Router, loading screen, glow, scroll logic, route definitions
    ├── index.css               ← Global styles, font imports, custom classes (glass-card, glass-pill, etc.)
    │
    └── components/
        ├── HomePage.tsx        ← Single-page wrapper: Hero + Projects + Experience stacked
        ├── Hero.tsx            ← Home hero section + showreel modal
        ├── Projects.tsx        ← Masonry project grid + quick-view modal
        ├── Experience.tsx      ← CV cards + tools marquee + email form
        ├── AIAgency.tsx        ← Separate Agency page (code-split, lazy-loaded)
        ├── Navbar.tsx          ← Fixed top nav, scroll-to-section, contact modal trigger
        ├── Footer.tsx          ← Links, socials, scroll-to-top
        ├── ContactForm.tsx     ← "Let's Talk" modal — Formspree wired up
        ├── SEO.tsx             ← react-helmet-async wrapper (used by HomePage + AIAgency)
        ├── LoadingScreen.tsx   ← Full-screen intro animation on first load
        ├── CustomCursor.tsx    ← Custom cursor (desktop/pointer:fine only)
        └── Slideshow.tsx       ← Rotating image card in the Hero section
```

---

## 4. Routing

All routes are defined in `src/App.tsx` inside `<Routes>`.

| URL | Renders | Notes |
|---|---|---|
| `/` | `<HomePage />` | Hero + Projects + Experience |
| `/home` | Redirect → `/` | Handles social share URL that used /home |
| `/projects` | `<HomePage />` | Same page, auto-scrolls to `#projects` section |
| `/experience` | `<HomePage />` | Same page, auto-scrolls to `#experience` section |
| `/ai-agency` | `<AIAgency />` | Separate page, code-split chunk |

**How the scroll-to-section works (App.tsx):**
```
1. Route change fires
2. If pathname is /projects or /experience → DON'T reset scroll to top
3. After isLoading becomes false → setTimeout 300ms → scrollIntoView({behavior:'smooth'})
4. The target divs have id="projects" / id="experience" + scroll-mt-20 (80px offset for navbar)
```

**Vercel routing (`vercel.json`):**
```json
/projects   → projects.html    (pre-rendered with projects OG tags)
/experience → experience.html  (pre-rendered with experience OG tags)
/ai-agency  → ai-agency.html   (pre-rendered with agency OG tags)
/*          → index.html       (catch-all SPA fallback)
```

---

## 5. Component Quick-Reference

### `App.tsx`
- Defines all routes
- Manages `isLoading` state (passed to loading screen)
- Runs the post-load scroll-to-section logic
- Hosts the mouse-parallax background glow (desktop only)
- Hides `<Navbar>` and `<Footer>` when on `/ai-agency`
- **To add a new route:** add `<Route path="/new" element={<NewComponent />} />` here

### `HomePage.tsx`
- Renders Hero + Projects + Experience in sequence
- Reads `location.pathname` to serve the correct `<SEO>` tags per URL
- Wraps Projects and Experience in `<div id="projects/experience" className="scroll-mt-20">`
- **To change per-page SEO copy:** edit the `seoConfig` object at the top of this file

### `Hero.tsx`
- Full-screen landing section
- Background video: `/public/home-page-video.mp4` (fades in on `onCanPlay` or after 2s fallback)
- Showreel button opens YouTube embed modal (`sjDxL0-elBE`)
- 3D tilt effect on the Slideshow card via GSAP
- **To change showreel video:** find `YT_MODAL` / iframe `src` near bottom of file

### `Slideshow.tsx`
- Shows 4 rotating project image slides inside the Hero
- Each slide has an image, category label, and project title
- **To add/change slides:** edit the `slides` array at the top of `Slideshow.tsx`

### `Projects.tsx`
**Project data array** (lines ~11–104): each object has:
```ts
{
  id: number
  title: string
  category: string
  image: string          // path from /public or absolute URL — used as card bg + video poster
  videoEmbed: string     // local: "/file.mp4"  |  YouTube: full embed URL  |  "": none
  videoModal: string     // YouTube URL for modal (HD version) — blank uses videoEmbed
  user: string           // @handle shown in modal
  description: string
  behance: string        // Behance link in modal
}
```

**Card layout (masonry grid):**
```
Row 1: full-width hero     → projects[0]  (Google Real Estate Expo)
Row 2: 2/3 + 1/3          → projects[1] + projects[2]
Row 3: 1/3 + 2/3          → projects[3] + projects[4]
Row 4: 2/3 + 1/3          → projects[5] + projects[6]
Row 5: full-width hero     → projects[7]  (NY Real Estate Expo)
```

**LazyVideo component** (defined inside Projects.tsx):
- Local `.mp4` cards use `<LazyVideo>` instead of `<video>` directly
- Video `src` is only set once the card is within 300px of the viewport
- Prevents all videos loading at page load — big perf win

**Modal behaviour:**
- Projects with `videoEmbed` or `videoModal` → video modal (flex-col, full 16:9 width)
- Image-only projects → side-by-side modal (image left, text right)

### `Experience.tsx`
- Left column: heading, tools marquee, email form
- Right column: scrollable experience cards
- Background video: `/public/experience-video.mp4`
- **To add a job:** push a new object into the `experiences` array (lines ~6–35)
- **To add a tool:** push `{ name: "...", slug: "simpleicons-slug" }` into the `tools` array
- Email form uses `useForm("xdayaoyz")` from `@formspree/react` — sends to Clifford's Gmail

### `AIAgency.tsx`
- Completely separate page — NOT part of the single-page scroll
- **Code-split:** loaded as its own JS chunk only when user navigates to `/ai-agency`
- Has its own navbar (inline back-arrow), footer, testimonials carousel
- Hero video: `/public/kinetic-forge-video.mp4`
- Scroll-down indicator at bottom of hero (animated green chevron)
- `PROJECTS` array (lines ~6–55): 6 digital artifact cards (3×2 grid)
- `TESTIMONIALS` array (lines ~57–88): auto-advances every 5s
- **To add a project card:** push to `PROJECTS` array; the 3×2 grid auto-reflows

### `Navbar.tsx`
- Fixed, `z-60`, always visible (except on `/ai-agency`)
- **Projects / Experience links** call `goToSection(id)`:
  - If `#projects` / `#experience` is already in the DOM → `scrollIntoView()`
  - If not (user is on Agency page) → `navigate("/projects")` and App.tsx scrolls after load
- **To add a nav link:** duplicate a `<button onClick={() => goToSection("id")}>` entry (desktop + mobile menu)
- **To add a social icon:** add an `<a>` with `<img src="https://cdn.simpleicons.org/{slug}/ffffff">` in both the desktop icon row and the mobile social row

### `ContactForm.tsx`
- Modal triggered by "Let's Talk" button in Navbar
- Uses `useForm("xdayaoyz")` from `@formspree/react`
- Fields: `name`, `email`, `message` + hidden `_subject` + hidden `source`
- Shows inline `<ValidationError>` on field errors
- Button disabled + "Sending…" text while submitting
- Auto-closes 2.5s after `state.succeeded`

### `SEO.tsx`
- Thin wrapper around `react-helmet-async`'s `<Helmet>`
- `BASE_URL` = `"https://sharpe-designed-it.vercel.app"` — **update this if you get a custom domain**
- Used by: `HomePage.tsx` (all home routes) and `AIAgency.tsx`
- Props: `title`, `description`, `image` (path or absolute URL), `path`

### `Footer.tsx`
- Social links: GitHub, LinkedIn, Behance, Pinterest, Linktree
- Navigation links: Home, Projects, Experience (React Router `<Link>`)
- Contact: email + cal.com + "All Links" (Linktree)
- Scroll-to-top button (bottom right)
- **Note:** Footer links to `/projects` and `/experience` use `<Link>` (router nav + App.tsx scroll)

### `LoadingScreen.tsx`
- Shown on first page load, triggers `onComplete` callback when done
- `App.tsx` sets `isLoading = false` on completion, fading in the site

### `CustomCursor.tsx`
- Only renders on devices where `(pointer: fine)` is true (desktop/mouse)
- Returns `null` on touch/mobile — no cursor shown there

---

## 6. OG / Social Preview System

**The problem:** LinkedIn, WhatsApp, etc. don't execute JavaScript, so `react-helmet-async` tags are invisible to them. They always see whatever is in the raw HTML file.

**The solution:** A post-build script generates dedicated HTML files per route with OG tags baked in as static strings.

**How it works:**
```
npm run build
  └─ vite build                        → dist/index.html (home OG tags)
  └─ node scripts/generate-og-pages.js → dist/projects.html
                                         dist/experience.html
                                         dist/ai-agency.html
```

`scripts/generate-og-pages.js`:
- Reads `dist/index.html`
- For each route, replaces `<title>`, all `og:*` and `twitter:*` meta tags with route-specific values
- Writes the modified HTML as a new file in `dist/`

`vercel.json` routes each URL to its dedicated HTML file:
```
/projects   → /projects.html
/experience → /experience.html
/ai-agency  → /ai-agency.html
/* (catch-all) → /index.html
```

**To update OG copy or images:**
1. Edit the `pages` array in `scripts/generate-og-pages.js`
2. Replace the image file in `/public/` (keep filenames: `og-home.jpeg`, `og-projects.jpeg`, `og-experience.jpeg`, `og-agency.jpeg`)
3. `git push` → Vercel rebuilds and regenerates the HTML files

**OG image spec:** 1200 × 630 px JPEG

---

## 7. Forms — Formspree

**Form ID:** `xdayaoyz`
**Dashboard:** https://formspree.io/forms/xdayaoyz
**Delivers to:** clifford.sharpe007@gmail.com

Two forms use it:

| Form | File | Fields sent |
|---|---|---|
| "Let's Talk" contact modal | `ContactForm.tsx` | `name`, `email`, `message`, `_subject`, `source` |
| Experience "Get in touch" bar | `Experience.tsx` | `email`, `_subject`, `source`, `message` (hidden) |

Both use `useForm("xdayaoyz")` from `@formspree/react`. The `_subject` field sets the Gmail subject line. The `source` field tells you which form the submission came from.

**To change the destination email:** log in to Formspree dashboard → form settings → notification email.

---

## 8. Analytics — Microsoft Clarity

**Project ID:** `wc0wylt0ik`
**Script location:** `index.html` `<head>` (last block before `</head>`)
**Dashboard:** https://clarity.microsoft.com

Tracks: session recordings, heatmaps, click maps, scroll depth, rage clicks, dead clicks. Data appears in the Clarity dashboard within a few hours of deployment. No config needed in the React code.

---

## 9. Public Assets — What Each File Is

| File | Used in |
|---|---|
| `logo.jpg` | Navbar brand logo (circle, 32×32px rendered) |
| `32x32.png` | Browser tab favicon + Apple touch icon |
| `og-home.jpeg` | Social preview for `/` (1200×630) |
| `og-projects.jpeg` | Social preview for `/projects` |
| `og-experience.jpeg` | Social preview for `/experience` |
| `og-agency.jpeg` | Social preview for `/ai-agency` |
| `home-page-video.mp4` | Hero section full-bleed background |
| `experience-video.mp4` | Experience section full-bleed background |
| `kinetic-forge-video.mp4` | Agency hero section video |
| `sharpe-designed-it.mp4` | Agency card 02 (SHARPE.PORTFOLIO) |
| `ocean odyssey.mp4` | Agency card 01 (OCEAN.ODYSSEY) |
| `uta music app.mp4` | Projects card 5 — UTA (LazyVideo) |
| `Social media posts for beda consult.mp4` | Projects card 2 — Beda (LazyVideo) |
| `Real Estate Expo Oct 2024 with Sound V3.mp4` | Projects card 8 — NY Real Estate (LazyVideo) |
| `Cover image brand guidelines.jpg` | Projects card 5 poster (UTA) |
| `Social media posts for beda consult.jpg` | Projects card 2 poster |
| `Social media designs for vintage travel consult.jpg` | Projects card 3 image |
| `Social media designsfor NOS.jpg` | Projects card 4 image |
| `sharpe designed it square cover image.jpg` | Projects card 6 image |
| `pony decor thumbnail.jpg` | Projects card 7 image |

---

## 10. Common Changes — Quick Instructions

### Add a new project card
1. Open `src/components/Projects.tsx`
2. Push a new object into the `projects` array (follow the existing shape)
3. Add your media file to `/public/`
4. Decide which row it goes in — update the grid JSX at the bottom of the component
5. If it's a local `.mp4`, use `videoEmbed: "/filename.mp4"` — `LazyVideo` handles it automatically

### Remove a project card
1. Delete the object from the `projects` array in `Projects.tsx`
2. Update the grid row that referenced it

### Change a project's title, description, or Behance link
Edit the matching object in the `projects` array in `Projects.tsx`.

### Change the showreel video
In `Hero.tsx`, find the `<iframe src="https://www.youtube.com/embed/...">` inside the showreel modal and replace the YouTube video ID.

### Update the home page slideshow images
Open `src/components/Slideshow.tsx` and edit the `slides` array at the top. Each slide needs `image` (path from /public), `category`, and `title`.

### Add/edit a work experience entry
Open `src/components/Experience.tsx` and edit the `experiences` array (lines ~6–35).

### Add a tool to the marquee
Open `src/components/Experience.tsx`, find the `tools` array, and add `{ name: "Tool Name", slug: "simpleicons-slug" }`. Find the slug at https://simpleicons.org.

### Add a new social icon to the navbar
In `src/components/Navbar.tsx`:
1. Desktop: add an `<a>` with `<img src="https://cdn.simpleicons.org/{slug}/ffffff">` inside the icon `<div className="flex items-center gap-4">`
2. Mobile: add the same inside `<div className="flex items-center gap-6 opacity-60">`

### Add a Linktree / social link to the footer
Open `src/components/Footer.tsx` and add an `<a>` in the `<div className="flex items-center gap-5 flex-wrap">`.

### Change the contact form destination email
Log into https://formspree.io/forms/xdayaoyz → Settings → Notification email. No code change needed.

### Update OG social preview images
1. Replace the relevant file in `/public/` (keep the exact filename)
2. Filenames: `og-home.jpeg`, `og-projects.jpeg`, `og-experience.jpeg`, `og-agency.jpeg`
3. Push to GitHub — Vercel rebuild regenerates the static HTML files with the new images

### Switch to a custom domain
1. Add the domain in Vercel dashboard
2. In `src/components/SEO.tsx`, update `BASE_URL` to your new domain
3. In `scripts/generate-og-pages.js`, update the absolute image URLs in the `pages` array
4. In `index.html`, update all `og:image` and `twitter:image` URLs
5. Push to rebuild

### Change the Agency page scroll-down indicator colour
In `src/components/AIAgency.tsx`, search for `#00ff00` near the scroll indicator block (bottom of the hero section). Replace with any colour.

### Add a new page entirely
1. Create `src/components/NewPage.tsx`
2. Import it in `src/App.tsx` (use `React.lazy()` for code splitting)
3. Add `<Route path="/new-page" element={<NewPage />} />` in the `<Routes>` block
4. Add the nav link in `Navbar.tsx`
5. If it needs its own OG preview: add it to the `pages` array in `scripts/generate-og-pages.js` and add a matching rewrite in `vercel.json`

---

## 11. Build & Deploy

```bash
# Install deps
npm install

# Development server (localhost:3000)
npm run dev

# Production build + generate OG HTML files
npm run build

# Preview production build locally
npm run preview

# Type-check (no emit)
npm run lint
```

**Deployment is automatic:** every `git push origin main` triggers a Vercel rebuild. The build script (`vite build && node scripts/generate-og-pages.js`) runs on Vercel — OG HTML files are generated fresh every deploy.

**Branch:** `main` is the production branch.

---

## 12. Known Quirks & Notes

- **`motion/react` not `framer-motion`** — the package is `motion` (v12), imported as `motion/react`. Don't confuse with the older `framer-motion` import path.
- **Tailwind v4** — no `tailwind.config.js`. All customisation is in `src/index.css` using `@theme` and CSS custom properties.
- **`glass-card` / `glass-pill`** — custom utility classes defined in `src/index.css`. Used throughout for the frosted-glass look.
- **Video filenames have spaces** — public asset filenames like `uta music app.mp4` have spaces. In JSX they're referenced with `"/uta music app.mp4"` (quoted strings). Don't rename them without updating all references.
- **Agency page is code-split** — `AIAgency.tsx` is loaded via `React.lazy()`. It only downloads when the user navigates to `/ai-agency`. Changes to it don't affect the main bundle size.
- **`scroll-mt-20`** — the `#projects` and `#experience` wrapper divs in `HomePage.tsx` use this Tailwind class. It adds 80px scroll-margin-top so the fixed navbar doesn't overlap content when `scrollIntoView` is called.
- **Formspree free tier** — 50 submissions/month. Upgrade at formspree.io if volume grows.
- **Clarity data lag** — new sessions appear in the Clarity dashboard with a ~2 hour delay. The script fires immediately but aggregation takes time.
