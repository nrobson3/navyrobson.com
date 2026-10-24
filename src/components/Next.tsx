import { links, next } from '@/content'
import { ChapterTitle } from './ChapterTitle'

/**
 * Chapter 6 and the close: where I'm going, then the three ways to reach me set large,
 * so the last screen is an action rather than a footer.
 */
export function Next() {
  const contact = [
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'Upwork', href: links.upwork },
    { label: 'GitHub', href: links.github },
  ]
  return (
    <section id="next" aria-labelledby="next-title">
      <ChapterTitle id="next-title" title="What's next" intro={next.intro} />
      <div className="grid gap-y-10 px-[clamp(1rem,6vw,5.5rem)] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)]">
        <div className="space-y-5 md:col-span-6 md:col-start-7">
          {next.body.map((t) => (
            <p key={t} className="max-w-[34em] text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-ink-soft">
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="flex min-h-[70svh] flex-col justify-end px-[clamp(1rem,6vw,5.5rem)] pt-[10svh] pb-10">
        <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-light text-ink-soft">{next.closing}</p>
        <ul className="mt-6 border-t border-rule">
          {contact.map((c) => (
            <li key={c.label} className="border-b border-rule">
              <a
                href={c.href}
                className="block py-[clamp(0.75rem,2vh,1.25rem)] text-[clamp(2.5rem,7vw,6rem)] leading-none font-light tracking-[-0.035em] text-ink transition-colors hover:text-ink-soft"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-[0.8125rem] text-graphite">
          © 2026 Navy Robson. Every model, render and drawing on this site is my own Fusion 360 work.
        </p>
      </div>
    </section>
  )
}
