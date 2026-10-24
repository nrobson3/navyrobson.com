import { useRef } from 'react'
import { callouts, projects, projectsIntro, type Project } from '@/content'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { ChapterTitle } from './ChapterTitle'
import { Plate } from './Plate'

/** Chapter 2: an intertitle, then one spread per object. */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <ChapterTitle id="projects-title" title="Projects" intro={projectsIntro} />
      {projects.map((p, i) => (
        <Spread key={p.id} project={p} flip={i % 2 === 1} />
      ))}
    </section>
  )
}

/**
 * One object: its plate pins on one side while the label sits beside it; the seam drops
 * from all-drawing to all-lit across the pin. Sides alternate so no two spreads share an anchor.
 */
function Spread({ project: p, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref)
  return (
    <article
      ref={ref}
      id={`project-${p.id}`}
      aria-labelledby={`${p.id}-name`}
      className={`spread grid px-[clamp(1rem,6vw,5.5rem)] md:h-[160svh] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)] ${flip ? 'spread-flip' : ''}`}
    >
      <div className="spread-stage md:sticky md:top-0 md:col-span-7 md:flex md:h-svh md:items-center">
        <Plate
          plate={p.id}
          alt={p.alt}
          // leaders run into the open gap between plate and label, never toward the page edge
          callouts={callouts[p.id].map((c) => ({ ...c, side: flip ? 'left' : 'right' }))}
          className="spread-plate mx-auto w-full max-w-[34rem] md:h-[88svh] md:w-auto md:max-w-none"
        />
      </div>
      <div className="spread-label pb-[12svh] md:col-span-4 md:flex md:h-svh md:flex-col md:justify-center md:pb-0">
        <h3 id={`${p.id}-name`} className="text-[clamp(1.75rem,2.8vw,2.625rem)] leading-[1.05] font-light tracking-[-0.02em] text-ink">
          {p.name}
        </h3>
        <p className="mt-5 max-w-[30em] leading-relaxed text-ink-soft">{p.summary}</p>
        <dl className="mt-8 border-t border-rule text-[0.9375rem]">
          <Row term="Made for" value={p.made} />
          {p.specs.map((s) => (
            <Row key={s.term} term={s.term} value={s.value} />
          ))}
        </dl>
        {p.links && (
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem]">
            {p.links.map((l) => (
              <a key={l.href} className="link" href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(9rem,40%)_1fr] gap-4 border-b border-rule py-3">
      <dt className="text-graphite">{term}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  )
}
