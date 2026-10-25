import { useEffect, useState } from 'react'
import { experience as x } from '@/content'
import { ChapterTitle } from './ChapterTitle'

const HOLD_MS = 7000

/**
 * Chapter 4: one role, set like a spec sheet. Dates and figures on the left, what the
 * work is on the right, and the client's own words as the chapter's largest type.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <ChapterTitle id="experience-title" title="Experience" intro={x.intro} />
      <div className="grid gap-y-12 px-[clamp(1rem,6vw,5.5rem)] pb-[9svh] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)]">
        <div className="md:col-span-4">
          <h3 className="text-[clamp(1.75rem,2.8vw,2.625rem)] leading-[1.05] font-light tracking-[-0.02em]">{x.role}</h3>
          <p className="mt-2 text-ink-soft">
            {x.org}, {x.dates}
          </p>
          <dl className="mt-10 border-t border-rule text-[0.9375rem]">
            {x.stats.map((s) => (
              <div key={s.term} className="grid grid-cols-[minmax(8rem,45%)_1fr] gap-4 border-b border-rule py-3">
                <dt className="text-graphite">{s.term}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="max-w-[34em] text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-ink-soft">{x.summary}</p>
          <Testimonials />
        </div>
      </div>
    </section>
  )
}

/**
 * The clients' own words, one review at a time, crossfading every few seconds with its
 * source line and link. Every slide sits in the same grid cell, so the block holds the
 * height of the longest review and nothing below it jumps. Hovering or focusing it pauses
 * the rotation; with reduced motion it never advances on its own.
 */
function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % x.testimonials.length), HOLD_MS)
    return () => window.clearTimeout(t)
  }, [active, paused])

  return (
    <div
      className="mt-[clamp(3rem,8vh,6rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <div className="grid">
        {x.testimonials.map((t, i) => (
          <div key={t.quote} className="testimonial [grid-area:1/1]" data-active={i === active} aria-hidden={i !== active}>
            <figure>
              <blockquote className="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.15] font-light tracking-[-0.02em] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-[0.9375rem] text-graphite">{t.source}</figcaption>
            </figure>
            <a className="link mt-10 inline-block text-[0.9375rem]" href={t.link.href} tabIndex={i === active ? 0 : -1}>
              {t.link.label}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-5 text-[0.8125rem] text-graphite" role="group" aria-label="Client reviews">
        {x.testimonials.map((t, i) => (
          <button
            key={t.quote}
            type="button"
            className={`border-t pt-2 transition-colors hover:text-ink ${i === active ? 'border-accent text-ink' : 'border-rule'}`}
            aria-label={`Review ${i + 1} of ${x.testimonials.length}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          >
            {String(i + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  )
}
