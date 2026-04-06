'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { getPostBySlug, posts } from '@/lib/posts'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = getPostBySlug(slug)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.post-content > *', {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        })
      }, contentRef)

      return () => ctx.revert()
    }
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">ARTICLE NOT FOUND</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="px-4 py-2 bg-primary text-white font-bold brutalist-border">
            ← BACK TO BLOG
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.status === 'completed')
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/blog" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">FP</span>
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">FINANCIAL PROTECTION ADVOCATE</div>
              <div className="text-xs text-muted-foreground">Blog Articles</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/blog" className="px-3 py-1.5 bg-secondary text-foreground text-xs font-bold brutalist-border brutalist-hover transition-all">
              ALL ARTICLES
            </Link>
            <Link href="/" className="px-3 py-1.5 bg-primary text-white text-xs font-bold brutalist-border brutalist-hover transition-all">
              DASHBOARD
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-bold px-2 py-1 ${
                post.stage === 'Awareness' ? 'bg-blue-500/20 text-blue-400' :
                post.stage === 'Consideration' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {post.stage.toUpperCase()} STAGE
              </span>
              <span className="text-xs text-muted-foreground">{post.volume} search volume</span>
              {post.wordCount > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{post.wordCount.toLocaleString()} words</span>
                </>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-4">{post.excerpt}</p>
            <div className="flex items-center gap-4 mt-6 text-sm">
              <div className="px-3 py-1 bg-primary text-white font-bold">{post.provider}</div>
              {post.publishDate && (
                <div className="text-muted-foreground">
                  Published {new Date(post.publishDate).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="post-content prose prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-foreground
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground prose-strong:font-bold
            prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-accent
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-muted-foreground
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-secondary prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:border-2 prose-th:border-foreground
            prose-td:p-3 prose-td:border-2 prose-td:border-foreground
            prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
            prose-hr:border-foreground prose-hr:border-t-2
          ">
            <ReactMarkdown
              components={{
                // Custom styling for specific elements
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary bg-secondary/50 py-4 px-6 my-6">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8 brutalist-border">
                    <table className="w-full border-collapse">{children}</table>
                  </div>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 my-6 text-muted-foreground">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 my-6 text-muted-foreground">{children}</ol>
                ),
                hr: ({ }) => (
                  <hr className="border-t-2 border-foreground my-12" />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-primary text-white brutalist-border">
            <h3 className="text-xl font-black mb-2">Ready to Compare Your Options?</h3>
            <p className="mb-4 opacity-90">
              As an IC Philippines licensed agent, I can help you compare health insurance options across 10+ providers — with no pressure to buy.
            </p>
            <div className="font-bold text-lg">
              DM me "PROTECT" on Facebook or Instagram for a free consultation.
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 pb-12 bg-secondary/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black mb-6 pt-12">RELATED ARTICLES</h2>
            <div className="grid gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}
                  className="block bg-card p-4 brutalist-border brutalist-shadow brutalist-hover transition-all group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 ${
                      relatedPost.stage === 'Awareness' ? 'bg-blue-500/20 text-blue-400' :
                      relatedPost.stage === 'Consideration' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {relatedPost.stage.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <div className="text-xs text-muted-foreground mt-1">{relatedPost.keyword}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-foreground py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">FINANCIAL PROTECTION ADVOCATE</span>
            <span className="text-primary">|</span>
            <span className="text-accent">IC PH LICENSED</span>
          </div>
          <Link href="/blog" className="text-primary hover:underline">
            ALL ARTICLES →
          </Link>
        </div>
      </footer>
    </div>
  )
}
