import { useEffect, type RefObject } from 'react'

/**
 * Publishes two scroll progresses of `ref` as CSS variables on the element, from one rAF
 * loop and without re-rendering React:
 *   --p  pinned progress: 0 when its top reaches the viewport top, 1 when its bottom
 *        reaches the viewport bottom (0 throughout when it is no taller than the viewport)
 *   --f  flow progress: 0 when its top enters at the viewport bottom, 1 when its bottom
 *        leaves at the viewport top
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const travel = r.height - vh
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0
      const f = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      el.style.setProperty('--p', p.toFixed(4))
      el.style.setProperty('--f', f.toFixed(4))
    }
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [ref])
}
