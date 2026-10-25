import { useRef } from 'react'
import { about, hero, heroCallouts, links } from '@/content'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { Plate } from './Plate'

/**
 * Calibre plate: the exploded gearbox fills the right two-thirds, half drawn and half lit.
 * Desktop: the section is taller than the viewport; while its stage is pinned, scroll moves
 * the seam up the plate until the whole assembly is lit. Phones: the plate and its caption
 * stand down (the gearbox has its own spread in Projects) and the name, intro and links
 * fill the first screen, set low like the desktop copy.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref)
  return (
    <section id="about" ref={ref} className="hero relative h-[185svh] max-md:h-auto">
      <div className="sticky top-0 h-svh overflow-hidden max-md:static max-md:flex max-md:h-auto max-md:min-h-svh max-md:flex-col max-md:justify-end max-md:overflow-visible max-md:px-[clamp(1rem,6vw,5.5rem)] max-md:pt-24 max-md:pb-[12svh]">
        <Plate
          plate={hero.plate}
          alt={hero.alt}
          priority
          className="hero-plate max-md:hidden"
          callouts={heroCallouts}
        />
        {/* Spec caption: bottom right, under the plate's lit half */}
        <p className="absolute right-[clamp(1rem,6vw,5.5rem)] bottom-[clamp(2rem,9vh,5rem)] w-60 border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-graphite max-md:hidden">
          <span className="block font-medium text-ink">{hero.caption}</span>
          {hero.fact}
        </p>
        <div className="absolute bottom-[clamp(2rem,9vh,5rem)] left-[clamp(1rem,6vw,5.5rem)] max-w-[35rem] max-md:static">
          <h1 className="mb-5 text-[clamp(3.25rem,8.6vw,7.25rem)] leading-[0.9] max-md:text-[clamp(3.25rem,19vw,5rem)] font-light tracking-[-0.035em] text-ink md:mb-8">
            Navy
            <br />
            Robson
          </h1>
          <p className="mb-5 max-w-[34em] text-[clamp(0.9375rem,1.3vw,1.1875rem)] leading-relaxed text-ink-soft md:mb-7">{about}</p>
          <ul className="flex gap-8 text-[0.9375rem]">
            <li><a className="link" href={links.upwork}>Upwork</a></li>
            <li><a className="link" href={links.github}>GitHub</a></li>
            <li><a className="link" href={links.linkedin}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
