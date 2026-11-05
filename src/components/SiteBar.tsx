import { useEffect, useState } from 'react'
import { chapters, links } from '@/content'

const profiles = [
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'GitHub', href: links.github },
  { label: 'Upwork', href: links.upwork },
]

/**
 * The fixed bar: wordmark left, the six chapters and then the three profiles right. Phones get
 * a Contents button that opens the same chapters as a full-screen index, set like a catalogue's
 * contents page, with the profiles listed under it.
 */
export function SiteBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-bar fixed inset-x-0 top-0 z-10 flex items-baseline justify-between px-[clamp(1rem,6vw,5.5rem)] pt-7 pb-10 text-sm text-graphite">
      <a href="#about" className="font-medium text-ink">Navy Robson</a>
      <div className="hidden items-baseline gap-7 md:flex">
        <nav aria-label="Chapters" className="flex gap-7">
          {chapters.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="transition-colors hover:text-ink">{c.nav}</a>
          ))}
        </nav>
        {/* the profiles sit apart from the chapters, in ink, so they read as ways out; below
            1024 px the bar has no room, and the hero and the close carry them instead */}
        <ul aria-label="Profiles" className="hidden gap-5 border-l border-rule pl-7 text-ink lg:flex">
          {profiles.map((l) => (
            <li key={l.label}><a className="link" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="text-ink md:hidden"
        aria-expanded={open}
        aria-controls="contents"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Contents'}
      </button>
      {open && (
        <nav
          id="contents"
          aria-label="Chapters"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 bg-ground px-[clamp(1rem,6vw,5.5rem)] pt-6 md:hidden"
        >
          <ul className="border-t border-rule">
            {chapters.map((c) => (
              <li key={c.id} className="border-b border-rule">
                <a
                  href={`#${c.id}`}
                  onClick={(e) => {
                    // the open index locks page scroll, so close it first and glide once
                    // the lock is released; a plain anchor jump would fire while still locked
                    e.preventDefault()
                    setOpen(false)
                    requestAnimationFrame(() =>
                      requestAnimationFrame(() => {
                        document.getElementById(c.id)?.scrollIntoView()
                        history.pushState(null, '', `#${c.id}`)
                      }),
                    )
                  }}
                  className="block py-4 text-[2rem] leading-none font-light tracking-[-0.02em] text-ink"
                >
                  {c.nav}
                </a>
              </li>
            ))}
          </ul>
          <ul aria-label="Profiles" className="mt-8 flex gap-8 text-[0.9375rem] text-ink">
            {profiles.map((l) => (
              <li key={l.label}><a className="link" href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
