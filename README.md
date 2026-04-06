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
- **Blog Engine** — 8 SEO-optimized cluster posts
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
├── financial-protection-advocate-seo/
│   └── docs/
│       ├── master-context.md     # Brand guidelines
│       └── semantic-content-map.md
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
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun i -g vercel

# Deploy
vercel --prod
```

### Environment Variables for Vercel

Set in Vercel dashboard or CLI:

```bash
vercel env add AI_GATEWAY_API_KEY
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
| **Live Site** | https://financial-protection-advocate.vercel.app |
| **GitHub** | https://github.com/marktantongco/financial-protection-advocate-seo |
| **Notion** | https://www.notion.so/3245ac674b2780e9a52cea36d416c82c |

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

---

*Built with ❤️ for financial protection education in the Philippines.*
