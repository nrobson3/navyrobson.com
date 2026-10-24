import { useEffect, useState } from 'react'
import { chapters } from '@/content'

/**
 * The fixed bar: wordmark left, the six chapters right. Phones get a Contents button that
 * opens the same six chapters as a full-screen index, set like a catalogue's contents page.
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
      <nav aria-label="Chapters" className="hidden gap-7 md:flex">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="transition-colors hover:text-ink">{c.nav}</a>
        ))}
      </nav>
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
        </nav>
      )}
    </header>
  )
}
