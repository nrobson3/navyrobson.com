import { beyond, beyondIntro } from '@/content'
import { ChapterTitle } from './ChapterTitle'

/**
 * Chapter 5: three entries between full-width rules. The name is set large on the left
 * so the chapter reads as a short index of everything outside client work.
 */
export function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title">
      <ChapterTitle id="beyond-title" title="Beyond the work" intro={beyondIntro} />
      <div className="px-[clamp(1rem,6vw,5.5rem)] pb-[9svh]">
        {beyond.map((b) => (
          <article
            key={b.id}
            aria-labelledby={`beyond-${b.id}`}
            className="grid gap-y-6 border-t border-rule py-[clamp(2.5rem,7vh,4.5rem)] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)]"
          >
            <div className="md:col-span-5">
              <h3 id={`beyond-${b.id}`} className="text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-light tracking-[-0.03em]">
                {b.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] text-graphite">{b.role}</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-[34em] leading-relaxed text-ink-soft">{b.text}</p>
              <dl className="mt-7 text-[0.9375rem]">
                {b.facts.map((f) => (
                  <div key={f.term} className="grid grid-cols-[minmax(9rem,40%)_1fr] gap-4 border-b border-rule py-3 first:border-t">
                    <dt className="text-graphite">{f.term}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              {b.link && (
                <a className="link mt-7 inline-block text-[0.9375rem]" href={b.link.href}>
                  {b.link.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
