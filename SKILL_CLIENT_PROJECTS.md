# The Agency — Client Project Skill

**Purpose:** Repeatable, streamlined workflow for building landing pages & websites for clients.

**Time estimate:** 30 mins setup + development time + 15 mins handoff

---

## **Phase 1: Client Intake (Before you start)**

### Client Information Checklist
- [ ] **Client name & company** (for repo naming)
- [ ] **Project deadline**
- [ ] **Budget & payment terms**
- [ ] **Domain:** Do they have one? (or will you buy it?)
  - If they have one: Ask for registrar access details
  - If not: You buy it via Namecheap (~$12/year)
- [ ] **Brand assets:** Logo, colors, messaging
- [ ] **Content:** Copy, images, videos ready?
- [ ] **Target audience:** Who are they selling to?
- [ ] **Main goal:** Convert leads? Show portfolio? Drive sales?

### Pricing Model (Pick one)
- **One-time fee:** $2,500-5,000 (design + build)
- **With monthly support:** $2,500 + $150-300/mo
- **Client owns domain:** They buy/manage
- **You own domain:** They pay $49-99/mo (recurring revenue)

---

## **Phase 2: Project Setup**

### Step 1: Create GitHub Repository

```bash
# Clone this template repo or create new one
cd your-projects-folder
git clone https://github.com/neutronix007/sharpe-designed-it.git [client-name]-landing
cd [client-name]-landing

# Update package.json
# Change name to: client-name-landing
# Update description with client info

# Create new GitHub repo at github.com/new
# Name: [client-name]-landing
# Description: Landing page for [Client Name]
# Make it PRIVATE

# Push to new repo
git remote set-url origin https://github.com/yourusername/[client-name]-landing.git
git push -u origin main
```

### Step 2: Create Vercel Project

1. Go to **vercel.com/new**
2. Import the GitHub repo you just created
3. **Project settings:**
   - Framework: Vite
   - Root directory: `/`
   - Environment variables: None needed (for now)
4. **Deploy**
5. Copy the deployment URL (e.g., `client-name-landing.vercel.app`)

### Step 3: Configure Domain

**Option A: Client has domain (recommended)**
- [ ] Ask client to add CNAME record at their registrar:
  - **Name:** `@` (or `www`)
  - **Value:** `cname.vercel-dns.com`
- [ ] Add domain to Vercel project (Settings → Domains)
- [ ] Wait 15-30 mins for SSL to provision

**Option B: You buy domain**
- [ ] Buy domain on Namecheap (~$12/year)
- [ ] Point nameservers to Vercel's DNS or add CNAME
- [ ] Add to Vercel project
- [ ] Client reimburses you ($12) or you charge monthly fee

---

## **Phase 3: Development**

### Project Structure (Already set up in template)
```
src/
├── components/
│   ├── Hero.tsx          (Top section)
│   ├── Features.tsx      (What you do/offer)
│   ├── Projects.tsx      (Portfolio/case studies)
│   ├── Testimonials.tsx  (Social proof)
│   ├── CTA.tsx          (Call to action)
│   ├── ContactForm.tsx   (Lead capture)
│   └── Footer.tsx
├── App.tsx
└── index.css
```

### Customization Checklist
- [ ] **Update colors** in `src/index.css` (primary, secondary, accent)
- [ ] **Update copy** (headlines, descriptions, CTAs)
- [ ] **Add images/videos** to `public/` folder
- [ ] **Update logo** (replace `public/logo.jpg`)
- [ ] **Update contactForm email** in `ContactForm.tsx` (Formspree ID)
- [ ] **Update SEO metadata** (title, description, og:image)
- [ ] **Remove unused sections** (projects, testimonials if not needed)

### Development Workflow
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Make changes, test locally
# Commit regularly
git add .
git commit -m "Update hero section copy"

# Push to GitHub
git push origin main

# Vercel auto-deploys! ✅
```

### Testing Checklist
- [ ] **Mobile responsive:** Test on phone
- [ ] **Forms work:** Submit test message, check email
- [ ] **Links work:** All buttons point to correct places
- [ ] **Images load:** All photos/videos display
- [ ] **Speed:** Page loads in <3 seconds
- [ ] **Accessibility:** Text readable, contrast good

---

## **Phase 4: Launch & Handoff**

### Pre-Launch Checklist
- [ ] **Domain points correctly** (test in browser)
- [ ] **SSL certificate active** (green lock icon)
- [ ] **All content finalized** (no typos, correct info)
- [ ] **Contact form working** (test submission)
- [ ] **Analytics set up** (Google Analytics ID in code, if desired)
- [ ] **Meta tags correct** (title, description match brand)

### Client Handoff (What they need to know)
Create a simple handoff document:

```
Your Landing Page is Live! 🎉

📍 Live URL: [their-domain.com]
📊 GitHub: [repo link] (optional - they may not need it)
📧 Contact emails go to: [their email]

What to do next:
1. Test the form - send yourself a message
2. Share with team/investors
3. Add analytics (optional)
4. Drive traffic to it!

Support: If anything breaks, contact me

Monthly maintenance (if applicable):
- Keep content updated
- Monitor performance
- Security updates (auto-handled by Vercel)
```

### Payment & Handoff
- [ ] **Invoice sent**
- [ ] **Payment received**
- [ ] **Transfer domain control** (if you bought it)
- [ ] **GitHub access** (make them collaborator if they want code access)
- [ ] **Vercel project shared** (optional - you can manage updates)

---

## **Phase 5: Maintenance (Ongoing)**

### Monthly Tasks
- [ ] Check site loads correctly
- [ ] Respond to contact form submissions
- [ ] Update content if requested

### Support Packages (Optional)
- **Basic:** $50/mo - Email support, small tweaks
- **Standard:** $150/mo - Monthly updates, analytics review
- **Premium:** $300/mo - Weekly check-ins, new features, full support

---

## **Quick Troubleshooting**

| Issue | Fix |
|-------|-----|
| Domain shows "not secure" | Wait 30 mins for SSL cert, or check DNS config |
| Contact form not working | Verify Formspree ID in ContactForm.tsx |
| Images don't load | Check path in `public/` folder |
| Site slow | Optimize images, check Vercel analytics |
| Can't access GitHub | Make sure you added them as collaborator |

---

## **Cost Breakdown (Per Client)**

| Item | Cost | Notes |
|------|------|-------|
| Domain (if you buy) | $12/year | Or client buys their own |
| Vercel hosting | FREE | Free tier handles most sites |
| GitHub private repo | FREE | Included |
| Your design + build | $2,500-5,000 | Your main revenue |
| Monthly support (optional) | $50-300/mo | Recurring revenue |

**Total cost to you:** ~$0 (unless you buy domain)
**Total revenue:** $2,500-5,000+ per project

---

## **Project Checklist Summary**

```
[ ] Phase 1: Get client requirements & info
[ ] Phase 2: Set up GitHub → Vercel → Domain
[ ] Phase 3: Customize template & build
[ ] Phase 4: Test & launch
[ ] Phase 5: Handoff & payment
[ ] Phase 6: Maintain (if retainer agreed)
```

---

## **Key Lessons Learned**

✅ **What works:**
- Path-based routing (no subdomain complexity)
- Separate Vercel project per client (clean, scalable)
- Formspree for contact forms (simple, reliable)
- Client owns domain or you charge recurring fee (win-win)

❌ **What doesn't:**
- Shared subdomains on one app (DNS hell)
- Manual DNS management (tedious, error-prone)
- Hosting with cPanel (unnecessary if using Vercel)

---

## **Next Steps for New Client**

1. Fill out **client intake checklist** above
2. Create **GitHub repo** from template
3. Deploy to **Vercel** (auto-connected)
4. Point **domain** (CNAME or nameservers)
5. **Customize** template with their branding
6. **Test** everything
7. **Launch** & get paid! 💰

---

**Version:** 1.0 | **Last updated:** 2026-10-05

