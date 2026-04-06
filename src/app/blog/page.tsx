'use client'

import Link from 'next/link'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { posts } from '@/lib/posts'

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-card', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const completedPosts = posts.filter(p => p.status === 'completed')
  const pendingPosts = posts.filter(p => p.status === 'pending')

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">FP</span>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">FINANCIAL PROTECTION ADVOCATE</div>
              <div className="text-xs text-muted-foreground">Blog Articles</div>
            </div>
          </Link>
          <Link href="/" className="px-3 py-1.5 bg-secondary text-foreground text-xs font-bold brutalist-border brutalist-hover transition-all">
            ← BACK TO DASHBOARD
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4">
            <span className="text-primary">HEALTH INSURANCE</span><br />
            <span className="text-accent">GUIDES</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert guides for self-employed Filipinos, freelancers, and OFW families navigating health insurance in the Philippines.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-primary text-white text-sm font-bold">
            {completedPosts.length} ARTICLES PUBLISHED
          </div>
          <div className="px-4 py-2 bg-secondary text-foreground text-sm font-bold brutalist-border">
            {pendingPosts.length} COMING SOON
          </div>
        </div>
      </section>

      {/* Published Articles */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-black mb-6 pb-2 border-b-2 border-foreground">
            PUBLISHED ARTICLES
          </h2>
          <div className="space-y-4">
            {completedPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`} 
                className="blog-card block bg-card p-6 brutalist-border brutalist-shadow brutalist-hover transition-all group">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 ${
                        post.stage === 'Awareness' ? 'bg-blue-500/20 text-blue-400' :
                        post.stage === 'Consideration' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {post.stage.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.volume} search volume</span>
                    </div>
                    <h3 className="text-lg font-black group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>{post.wordCount.toLocaleString()} words</span>
                      <span>•</span>
                      <span>{post.provider}</span>
                      {post.publishDate && (
                        <>
                          <span>•</span>
                          <span>{new Date(post.publishDate).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-primary text-white text-xs font-bold whitespace-nowrap">
                    READ ARTICLE →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-black mb-6 pb-2 border-b-2 border-foreground">
            COMING SOON
          </h2>
          <div className="space-y-3">
            {pendingPosts.map((post) => (
              <div key={post.id} className="bg-muted/50 p-4 brutalist-border opacity-60">
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
                <h3 className="font-bold text-sm">{post.title}</h3>
                <div className="text-xs text-muted-foreground mt-1">{post.keyword}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">FINANCIAL PROTECTION ADVOCATE</span>
            <span className="text-primary">|</span>
            <span className="text-accent">IC PH LICENSED</span>
          </div>
          <div className="text-muted-foreground">
            <span className="text-primary">{completedPosts.length}</span>/{posts.length} ARTICLES
          </div>
        </div>
      </footer>
    </div>
  )
}
