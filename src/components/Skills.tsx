import { skills, skillsIntro } from '@/content'
import { ChapterTitle } from './ChapterTitle'

/**
 * Chapter 3: a spec sheet you can check. Each group is a ruled table; every row names a
 * skill, says what I do with it, and links to where it shows on this page.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <ChapterTitle id="skills-title" title="Skills and qualifications" intro={skillsIntro} />
      <div className="px-[clamp(1rem,6vw,5.5rem)] pb-[9svh]">
        {skills.map((g) => (
          <div key={g.title} className="grid gap-y-4 border-t border-rule pt-6 pb-[clamp(2.5rem,6vh,4rem)] md:grid-cols-12 md:gap-x-[clamp(1.5rem,3vw,3rem)]">
            <h3 className="text-[1.375rem] font-light tracking-[-0.01em] md:col-span-3">{g.title}</h3>
            <dl className="md:col-span-9">
              {g.rows.map((r) => (
                <div
                  key={r.name}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-4 first:pt-0 md:grid-cols-[minmax(11rem,1fr)_2fr_minmax(9rem,1fr)]"
                >
                  <dt className="text-ink">{r.name}</dt>
                  <dd className="leading-relaxed text-ink-soft">{r.detail}</dd>
                  <dd className="flex flex-wrap items-start gap-x-4 gap-y-1 text-[0.875rem] md:justify-end">
                    {r.proof.map((p) => (
                      <a key={p.label} className="link" href={p.href}>
                        {p.label}
                      </a>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  )
}
