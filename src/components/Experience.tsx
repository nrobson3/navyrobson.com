import { experience as x } from '@/content'
import { ChapterTitle } from './ChapterTitle'

/**
 * Chapter 4: one role, set like a spec sheet. Dates and figures on the left, what the
 * work is on the right, and the client's own words as the chapter's largest type.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <ChapterTitle id="experience-title" title="Experience" intro={x.intro} />
      <div className="grid gap-y-12 px-[clamp(1rem,6vw,5.5rem)] pb-[16svh] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)]">
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
          <figure className="mt-[clamp(3rem,8vh,6rem)]">
            <blockquote className="text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.15] font-light tracking-[-0.02em] text-ink">
              “{x.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[0.9375rem] text-graphite">{x.quoteSource}</figcaption>
          </figure>
          <a className="link mt-10 inline-block text-[0.9375rem]" href={x.link.href}>
            {x.link.label}
          </a>
        </div>
      </div>
    </section>
  )
}
