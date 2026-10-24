import { useRef } from 'react'
import { about, hero, heroCallouts, links } from '@/content'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { Plate } from './Plate'

/**
 * Calibre plate: the exploded gearbox fills the right two-thirds, half drawn and half lit.
 * Desktop: the section is taller than the viewport; while its stage is pinned, scroll moves
 * the seam up the plate until the whole assembly is lit. Phones: no pin and no overlay; the
 * plate, its caption and the copy flow in order, so nothing can collide on a short screen,
 * and the seam follows the hero's flow out of the viewport instead.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useScrollProgress(ref)
  return (
    <section id="about" ref={ref} className="hero relative h-[185svh] max-md:h-auto">
      <div className="sticky top-0 h-svh overflow-hidden max-md:static max-md:flex max-md:h-auto max-md:flex-col max-md:overflow-visible max-md:px-[clamp(1rem,6vw,5.5rem)] max-md:pt-16 max-md:pb-20">
        <Plate
          plate={hero.plate}
          alt={hero.alt}
          priority
          className="hero-plate"
          callouts={heroCallouts}
        />
        {/* Spec caption: bottom right on desktop; on phones a right-aligned line pair under the plate */}
        <p className="absolute right-[clamp(1rem,6vw,5.5rem)] bottom-[clamp(2rem,9vh,5rem)] w-60 border-t border-rule pt-3 text-[0.8125rem] leading-relaxed text-graphite max-md:static max-md:-mt-6 max-md:w-auto max-md:border-t-0 max-md:pt-0 max-md:text-right max-md:text-[0.75rem]">
          <span className="block font-medium text-ink">{hero.caption}</span>
          <span className="max-md:hidden">{hero.fact}</span>
          <span className="whitespace-nowrap md:hidden">{hero.factShort}</span>
        </p>
        <div className="absolute bottom-[clamp(2rem,9vh,5rem)] left-[clamp(1rem,6vw,5.5rem)] max-w-[35rem] max-md:static max-md:mt-10">
          <h1 className="mb-5 text-[clamp(3.25rem,8.6vw,7.25rem)] leading-[0.9] font-light tracking-[-0.035em] text-ink md:mb-8">
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
