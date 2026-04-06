'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

// Data
const contentData = {
  brand: {
    name: "Financial Protection Advocate",
    agent: "Marky Tantongco",
    handle: "@markytanky",
    license: "IC Philippines Licensed Non-Life Insurance Agent"
  },
  providers: [
    { name: "Pacific Cross", role: "Primary provider for detailed reviews", status: "active" },
    { name: "MediCard", role: "HMO comparison reference", status: "active" },
    { name: "PhilCare", role: "Network size comparison", status: "active" },
    { name: "Etiqa", role: "Guaranteed renewability example", status: "active" },
    { name: "ValuCare", role: "Mid-tier pricing option", status: "active" },
    { name: "Oona Insurance", role: "Digital-first alternative", status: "active" },
    { name: "IMS Wellthcare", role: "Wellness-focused coverage", status: "active" },
    { name: "iCare", role: "Budget-conscious option", status: "active" },
    { name: "Cocolife", role: "Life + health bundling", status: "active" },
    { name: "Keystone", role: "Broker/aggregator platform", status: "active" }
  ],
  clusterPosts: [
    { id: 1, title: "Pacific Cross FlexiShield Review", keyword: "Pacific Cross health insurance review", stage: "Consideration", status: "completed", volume: "880/mo", slug: "pacific-cross-flexishield-review" },
    { id: 2, title: "HMO vs Insurance Comparison", keyword: "HMO vs health insurance Philippines", stage: "Consideration", status: "completed", volume: "1,900/mo", slug: "hmo-vs-health-insurance-philippines" },
    { id: 3, title: "Pre-Existing Conditions Guide", keyword: "health insurance pre-existing conditions", stage: "Decision", status: "completed", volume: "1,200/mo", slug: "pre-existing-conditions-health-insurance-guide" },
    { id: 4, title: "7 Signs You Need Insurance", keyword: "health insurance Philippines", stage: "Awareness", status: "pending", volume: "2,400/mo" },
    { id: 5, title: "Health Insurance Cost Calculator", keyword: "health insurance cost Philippines", stage: "Decision", status: "pending", volume: "3,100/mo" },
    { id: 6, title: "OFW Family Health Insurance", keyword: "health insurance for OFW families", stage: "Consideration", status: "pending", volume: "590/mo" },
    { id: 7, title: "How to Buy Health Insurance", keyword: "how to apply for health insurance", stage: "Decision", status: "pending", volume: "720/mo" },
    { id: 8, title: "Losing Company HMO Guide", keyword: "company HMO vs personal insurance", stage: "Awareness", status: "pending", volume: "880/mo" }
  ],
  painPoints: [
    { quote: "My premium jumped 50% after I filed a claim", title: "Premium Loading" },
    { quote: "My pre-existing condition isn't covered", title: "Pre-Existing Conditions" },
    { quote: "HMOs get expensive as I age", title: "Age-Based Pricing" },
    { quote: "I don't know the difference between HMO and insurance", title: "Confusion" },
    { quote: "I can't find a doctor in their network", title: "Network Access" },
    { quote: "The claims process is slow", title: "Claims Delays" },
    { quote: "I lost my company HMO", title: "Employment Gap" }
  ],
  semanticTerms: [
    "pre-existing condition", "premium loading", "Letter of Authorization",
    "annual benefit limit", "cashless hospitalization", "health card Philippines",
    "non-life insurance IC Philippines", "HMO accredited hospitals",
    "guaranteed renewability", "reimbursement claim process"
  ]
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const providersRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initial load animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.2')
      .from('.provider-item', {
        x: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.1')
      
      setIsLoaded(true)
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground noise-overlay">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">FP</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-tight">FINANCIAL PROTECTION ADVOCATE</div>
              <div className="text-xs text-muted-foreground">SEO Content Engine v1.0</div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/blog" className="px-3 py-1.5 bg-accent text-background text-xs font-bold brutalist-border brutalist-hover transition-all">
              BLOG
            </Link>
            <a href="https://github.com/marktantongco/financial-protection-advocate-seo" target="_blank" rel="noopener noreferrer" 
              className="px-3 py-1.5 bg-secondary text-foreground text-xs font-bold brutalist-border brutalist-hover transition-all">
              GITHUB
            </a>
            <a href="https://www.notion.so/3245ac674b2780e9a52cea36d416c82c" target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 bg-primary text-white text-xs font-bold brutalist-border brutalist-hover transition-all">
              NOTION
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="hero-title text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4">
            <span className="text-primary">SEO</span> CONTENT<br />
            <span className="text-accent">ENGINE</span>
          </div>
          <div className="hero-subtitle text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Pacific Cross / Non-Life Insurance / HMO Philippines — 
            <span className="text-foreground font-bold"> GEO + AI Search Optimization</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card bg-card p-4 brutalist-border brutalist-shadow"
            onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
            <div className="text-3xl sm:text-4xl font-black text-primary">3</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Posts Completed</div>
            <div className="mt-2 h-1 bg-muted">
              <div className="h-full bg-primary" style={{ width: '37.5%' }}></div>
            </div>
          </div>
          <div className="stat-card bg-card p-4 brutalist-border brutalist-shadow"
            onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
            <div className="text-3xl sm:text-4xl font-black text-accent">8</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Cluster Posts</div>
            <div className="mt-2 text-xs text-muted-foreground">Buyer Journey Mapped</div>
          </div>
          <div className="stat-card bg-card p-4 brutalist-border brutalist-shadow"
            onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
            <div className="text-3xl sm:text-4xl font-black text-foreground">10</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Providers</div>
            <div className="mt-2 text-xs text-muted-foreground">Full Coverage</div>
          </div>
          <div className="stat-card bg-card p-4 brutalist-border brutalist-shadow"
            onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
            <div className="text-3xl sm:text-4xl font-black text-warning">15</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Semantic Terms</div>
            <div className="mt-2 text-xs text-muted-foreground">Content Seeded</div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-4 pb-4 sticky top-[61px] z-40 bg-background">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-2">
          {['overview', 'providers', 'posts', 'pain-points', 'terms'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-white brutalist-border' 
                  : 'bg-secondary text-foreground brutalist-border brutalist-hover'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <main className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Brand Info */}
              <div className="bg-card p-6 brutalist-border brutalist-shadow">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-black mb-2">{contentData.brand.name}</h2>
                    <div className="text-sm text-muted-foreground">{contentData.brand.agent} {contentData.brand.handle}</div>
                    <div className="text-xs text-accent mt-1">{contentData.brand.license}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-primary text-white text-xs font-bold">IC PH COMPLIANT</div>
                    <div className="px-3 py-1 bg-accent text-background text-xs font-bold">LICENSED AGENT</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-card p-6 brutalist-border brutalist-shadow">
                <h3 className="text-lg font-black mb-4">PRODUCTION PROGRESS</h3>
                <div className="space-y-3">
                  {contentData.clusterPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                        post.status === 'completed' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold">{post.title}</div>
                        <div className="text-xs text-muted-foreground">{post.keyword}</div>
                      </div>
                      <div className={`px-2 py-1 text-xs font-bold ${
                        post.status === 'completed' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                      }`}>
                        {post.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/blog" className="bg-card p-6 brutalist-border brutalist-shadow brutalist-hover transition-all block group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent text-background flex items-center justify-center text-2xl">📖</div>
                    <div>
                      <div className="text-lg font-black group-hover:text-primary transition-colors">BLOG</div>
                      <div className="text-xs text-muted-foreground">Published articles</div>
                    </div>
                  </div>
                </Link>
                <a href="https://github.com/marktantongco/financial-protection-advocate-seo" target="_blank" rel="noopener noreferrer"
                  className="bg-card p-6 brutalist-border brutalist-shadow brutalist-hover transition-all block group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center text-2xl">⟨⟩</div>
                    <div>
                      <div className="text-lg font-black group-hover:text-primary transition-colors">GITHUB REPOSITORY</div>
                      <div className="text-xs text-muted-foreground">Source files, templates</div>
                    </div>
                  </div>
                </a>
                <a href="https://www.notion.so/3245ac674b2780e9a52cea36d416c82c" target="_blank" rel="noopener noreferrer"
                  className="bg-card p-6 brutalist-border brutalist-shadow brutalist-hover transition-all block group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white flex items-center justify-center text-2xl">N</div>
                    <div>
                      <div className="text-lg font-black group-hover:text-primary transition-colors">NOTION DATABASE</div>
                      <div className="text-xs text-muted-foreground">Production tracking</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Providers Tab */}
          {activeTab === 'providers' && (
            <div ref={providersRef} className="animate-in fade-in duration-300">
              <div className="bg-card brutalist-border brutalist-shadow overflow-hidden">
                <div className="p-4 bg-secondary border-b-2 border-foreground">
                  <h3 className="text-lg font-black">PROVIDERS COVERED</h3>
                </div>
                <div className="divide-y-2 divide-border">
                  {contentData.providers.map((provider, index) => (
                    <div key={provider.name} className="provider-item p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors">
                      <div className="w-10 h-10 bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{provider.name}</div>
                        <div className="text-xs text-muted-foreground">{provider.role}</div>
                      </div>
                      <div className="px-2 py-1 bg-accent text-background text-xs font-bold">
                        {provider.status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div ref={postsRef} className="animate-in fade-in duration-300">
              <div className="space-y-4">
                {/* Stage Legend */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold brutalist-border border-blue-500">
                    🟦 AWARENESS
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold brutalist-border border-yellow-500">
                    🟨 CONSIDERATION
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold brutalist-border border-green-500">
                    🟩 DECISION
                  </div>
                </div>

                {contentData.clusterPosts.map((post) => (
                  <div key={post.id} 
                    className={`bg-card p-4 brutalist-border brutalist-shadow transition-all ${
                      post.status === 'completed' ? 'border-l-4 border-l-primary' : ''
                    }`}
                    onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 ${
                            post.stage === 'Awareness' ? 'bg-blue-500/20 text-blue-400' :
                            post.stage === 'Consideration' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {post.stage.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.volume}</span>
                        </div>
                        <div className="font-bold text-lg">{post.title}</div>
                        <div className="text-xs text-accent">{post.keyword}</div>
                      </div>
                      <div className={`px-3 py-1 text-xs font-bold ${
                        post.status === 'completed' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {post.status === 'completed' ? '✓ DONE' : 'PENDING'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pain Points Tab */}
          {activeTab === 'pain-points' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-card brutalist-border brutalist-shadow">
                <div className="p-4 bg-primary text-white">
                  <h3 className="text-lg font-black">🎯 CORE BUYER PAIN POINTS</h3>
                  <div className="text-xs opacity-80">Research-Based Consumer Insights</div>
                </div>
                <div className="divide-y-2 divide-border">
                  {contentData.painPoints.map((pain, index) => (
                    <div key={index} className="p-4 hover:bg-secondary/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-accent text-background flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-accent mb-1">{pain.title}</div>
                          <div className="text-sm italic text-muted-foreground">&ldquo;{pain.quote}&rdquo;</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Terms Tab */}
          {activeTab === 'terms' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-card brutalist-border brutalist-shadow p-6">
                <h3 className="text-lg font-black mb-4">📊 SEMANTIC SEED TERMS</h3>
                <div className="flex flex-wrap gap-2">
                  {contentData.semanticTerms.map((term, index) => (
                    <div key={index} 
                      className="px-3 py-1.5 bg-secondary text-foreground text-xs font-bold brutalist-border brutalist-hover transition-all cursor-default"
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                      }}>
                      {term}
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted text-xs text-muted-foreground">
                  <strong className="text-foreground">USAGE:</strong> Each term should appear 2-4 times per 2,000-word article. 
                  Avoid keyword stuffing. Natural placement in body copy.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">FINANCIAL PROTECTION ADVOCATE</span>
            <span className="text-primary">|</span>
            <span className="text-accent">IC PH LICENSED</span>
          </div>
          <div className="text-muted-foreground">
            <span className="text-primary">3</span>/8 POSTS • <span className="text-accent">37.5%</span> COMPLETE
          </div>
        </div>
      </footer>
    </div>
  )
}
