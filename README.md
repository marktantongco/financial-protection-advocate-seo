# Financial Protection Advocate — SEO Content Engine

> **A comprehensive SEO/GEO content strategy and PWA web application for a Philippines licensed non-life insurance agent.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Project Overview

**Financial Protection Advocate** is a complete SEO content engine designed for Marky Tantongco, an IC Philippines licensed non-life insurance agent. The project includes:

- **PWA Web Application** — Brutalist design with GSAP animations
- **Blog Engine** — 8 SEO-optimized cluster posts (3 completed)
- **JSON-LD Schemas** — FAQ, Article, Breadcrumb for rich snippets
- **Notion Integration** — Content production tracking
- **AI Search Optimization** — GEO (Generative Engine Optimization) for ChatGPT, Perplexity, Gemini

### Target Audience
- Self-employed Filipinos (25-50)
- Freelancers transitioning from corporate HMOs
- OFW families seeking coverage for dependents
- SME owners without group plans

### Providers Covered
Pacific Cross, MediCard, PhilCare, Etiqa, ValuCare, Oona Insurance, IMS Wellthcare, iCare, Cocolife, Keystone

---

## 📊 Content Progress

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Completed | 3 | 37.5% |
| ⏳ Pending | 5 | 62.5% |
| **Total** | **8** | **100%** |

### Completed Articles (5,200 words)

| # | Title | Keyword | Words | Stage |
|---|-------|---------|-------|-------|
| 1 | Pacific Cross FlexiShield Review | Pacific Cross health insurance review | 1,650 | Consideration |
| 2 | HMO vs Health Insurance Philippines | HMO vs health insurance Philippines | 1,850 | Consideration |
| 3 | Pre-Existing Conditions Guide | health insurance pre-existing conditions | 1,700 | Decision |

### Pending Articles

| # | Title | Keyword | Volume | Stage |
|---|-------|---------|--------|-------|
| 4 | 7 Signs You Need Insurance | health insurance Philippines | 2,400/mo | Awareness |
| 5 | Health Insurance Cost Philippines | health insurance cost Philippines | 3,100/mo | Decision |
| 6 | OFW Family Health Insurance | health insurance for OFW families | 590/mo | Consideration |
| 7 | How to Buy Health Insurance | how to apply for health insurance | 720/mo | Decision |
| 8 | Losing Company HMO Guide | company HMO vs personal insurance | 880/mo | Awareness |

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1 (App Router) |
| **Language** | TypeScript 5.0 |
| **Styling** | Tailwind CSS 4.0 |
| **Components** | shadcn/ui |
| **Animation** | GSAP 3.x |
| **Markdown** | react-markdown |
| **Database** | Prisma + SQLite |
| **PWA** | next-pwa |
| **AI SDK** | z-ai-web-dev-sdk |
| **Runtime** | Bun |

---

## 📁 Project Structure

```
financial-protection-advocate-seo/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard homepage
│   │   ├── layout.tsx            # Root layout with metadata
│   │   ├── globals.css           # Tailwind + brutalist styles
│   │   ├── api/route.ts          # API endpoints
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/page.tsx   # Individual blog post
│   ├── components/ui/            # shadcn/ui components
│   ├── lib/
│   │   ├── posts.ts              # Blog posts data
│   │   ├── schema-generator.ts   # JSON-LD utilities
│   │   └── utils.ts              # Helper functions
│   └── hooks/                    # React hooks
├── download/
│   ├── Mode_A_*.md               # Blog post markdown files
│   ├── Mode_D_*.md               # Topical authority blueprint
│   └── schemas/                  # JSON-LD schema files
├── scripts/
│   └── update-notion.ts          # Notion sync script
├── docs/
│   └── notion-setup-guide.md     # Notion setup instructions
├── templates/
│   ├── mode-a-blog-post.md       # Blog post template
│   ├── mode-e-schema.json        # JSON-LD schema templates
│   └── mode-f-social.md          # Social media templates
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment
└── worklog.md                    # Development log
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/marktantongco/financial-protection-advocate-seo.git
cd financial-protection-advocate-seo

# Install dependencies
bun install

# Run development server
bun run dev
```

### Environment Variables

Create a `.env` file:

```env
# Notion Integration (optional)
NOTION_API_KEY=your_notion_integration_secret

# AI Gateway (for AI features)
AI_GATEWAY_API_KEY=your_ai_gateway_key

# Database
DATABASE_URL="file:./dev.db"
```

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments, edge functions, and built-in analytics.

#### Deploy via CLI

```bash
# Install Vercel CLI
bun i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Deploy via GitHub Integration

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Enable automatic deployments on push to main branch

#### Environment Variables for Vercel

Set these in Vercel dashboard or via CLI:

```bash
vercel env add AI_GATEWAY_API_KEY
vercel env add NOTION_API_KEY
```

#### Vercel Configuration

The project includes `vercel.json` for optimal configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "devCommand": "bun run dev"
}
```

### Option 2: GitHub Pages

For static deployments, GitHub Pages is a free option.

#### Setup

1. Go to repository Settings > Pages
2. Select "GitHub Actions" as the source
3. The workflow in `.github/workflows/deploy.yml` will handle deployment

#### Manual Deployment

```bash
# Build static export
bun run build

# Export to static HTML
bun run export

# Deploy to gh-pages branch
git subtree push --prefix out origin gh-pages
```

### Option 3: Docker

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN bun run build

# Expose port
EXPOSE 3000

# Start server
CMD ["bun", "start"]
```

```bash
# Build image
docker build -t financial-protection-advocate .

# Run container
docker run -p 3000:3000 financial-protection-advocate
```

---

## 📝 Content Templates

### Mode A — Blog Post Template

Located at `/templates/mode-a-blog-post.md`

**Structure:**
1. Quick Answer (50-100 words)
2. Introduction (100-150 words)
3. H2 Sections (4-6 sections, 200-300 words each)
4. Comparison Tables
5. FAQ Section (5-7 questions)
6. CTA + Disclaimer

### Mode E — JSON-LD Schema Templates

Located at `/templates/mode-e-schema.json`

**Schema Types:**
- Article
- FAQPage
- BreadcrumbList
- Person (Author)
- LocalBusiness
- Service

---

## 🔍 SEO Features

### On-Page SEO
- ✅ Semantic HTML structure
- ✅ Meta descriptions (≤155 chars)
- ✅ Keyword optimization
- ✅ Internal linking strategy
- ✅ Image alt text

### Technical SEO
- ✅ JSON-LD structured data
- ✅ Open Graph tags
- ✅ Twitter Card meta
- ✅ Canonical URLs
- ✅ robots.txt
- ✅ XML sitemap (auto-generated)

### GEO (AI Search Optimization)
- ✅ Entity stacking (Financial Protection Advocate + IC Philippines + Provider names)
- ✅ Semantic term seeding (15 core terms)
- ✅ PAA (People Also Ask) optimization
- ✅ Direct answer formatting

---

## 📱 PWA Features

- ✅ Offline-capable
- ✅ Installable on mobile/desktop
- ✅ App manifest
- ✅ Service worker
- ✅ Theme color customization

---

## 🎨 Design System

### Brutalist Design Principles

- **Bold borders** — 2px solid black
- **High contrast** — Black/white/red accent
- **No rounded corners** — Sharp, geometric shapes
- **Monospace typography** — JetBrains Mono
- **Intentionally raw** — Exposed structure

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#ff3e00` | CTAs, highlights |
| Secondary | `#f4f4f5` | Backgrounds |
| Accent | `#3b82f6` | Links, badges |
| Warning | `#eab308` | Alerts |
| Foreground | `#0a0a0a` | Text |
| Background | `#fafafa` | Page background |

---

## 📊 Notion Integration

### Database Setup

See `/docs/notion-setup-guide.md` for full instructions.

### Required Properties

| Property | Type |
|----------|------|
| Name | Title |
| Status | Select (Pending/In Progress/Completed) |
| Stage | Select (Awareness/Consideration/Decision) |
| Word Count | Number |
| Publish Date | Date |
| Keyword | Text |
| Provider | Multi-select |
| Search Volume | Text |
| Slug | Text |

### Sync Script

```bash
NOTION_API_KEY=your_secret bun run scripts/update-notion.ts
```

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Live Site (Vercel)** | https://financial-protection-advocate.vercel.app |
| **GitHub** | https://github.com/marktantongco/financial-protection-advocate-seo |
| **Notion** | https://www.notion.so/3245ac674b2780e9a52cea36d416c82c |

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Deploy to GitHub Pages (`.github/workflows/deploy.yml`)

Triggers on:
- Push to `main` branch
- Manual workflow dispatch

Steps:
1. Checkout code
2. Setup Bun runtime
3. Install dependencies
4. Build application
5. Deploy to GitHub Pages

#### Vercel Integration

Automatic deployments when:
- Push to `main` → Production
- Pull requests → Preview

---

## 📈 Performance

### Lighthouse Scores (Target)

| Metric | Target | Current |
|--------|--------|---------|
| Performance | 90+ | 85 |
| Accessibility | 95+ | 92 |
| Best Practices | 95+ | 95 |
| SEO | 100 | 100 |

### Optimization Techniques

- ✅ Static generation where possible
- ✅ Image optimization with next/image
- ✅ Font optimization
- ✅ Code splitting
- ✅ Tree shaking
- ⏳ Edge functions for dynamic content

---

## 🧪 Testing

```bash
# Run linting
bun run lint

# Type checking
bun run type-check

# Build test
bun run build
```

---

## 📄 License

MIT License — feel free to use for your own projects.

---

## 👤 Author

**Marky Tantongco**
- IC Philippines Licensed Non-Life Insurance Agent
- 📸 Instagram: [@markytanky](https://instagram.com/markytanky)
- 💼 Brand: Financial Protection Advocate

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [GSAP](https://greensock.com/gsap/) — Animations
- [Vercel](https://vercel.com/) — Hosting platform
- [Bun](https://bun.sh/) — Fast JavaScript runtime

---

## 📋 Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js project setup
- [x] Tailwind CSS + brutalist design
- [x] shadcn/ui components
- [x] GSAP animations
- [x] Blog infrastructure

### Phase 2: Content ✅
- [x] Pacific Cross FlexiShield Review
- [x] HMO vs Health Insurance Guide
- [x] Pre-Existing Conditions Guide
- [ ] 5 remaining cluster posts

### Phase 3: SEO ✅
- [x] JSON-LD schema implementation
- [x] FAQ structured data
- [x] Meta optimization
- [x] Open Graph tags

### Phase 4: Deployment (In Progress)
- [x] Vercel deployment
- [x] GitHub Pages deployment
- [x] CI/CD pipeline
- [ ] Custom domain setup

### Phase 5: Growth (Planned)
- [ ] Notion content sync
- [ ] Analytics integration
- [ ] Search Console submission
- [ ] Content expansion

---

*Built with ❤️ for financial protection education in the Philippines.*
