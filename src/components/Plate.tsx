import type { CSSProperties } from 'react'
import type { Callout } from '@/content'

type Props = {
  plate: string
  alt: string
  className?: string
  /** load eagerly (the hero) instead of lazily */
  priority?: boolean
  callouts?: Callout[]
}

/**
 * One calibre plate: the hidden-line drawing above a moving seam, the lit render below it.
 * Both images come from the same Fusion camera, so they register pixel for pixel.
 * The parent sets --s (0 = all lit, 1 = all drawing) from scroll; CSS derives the seam and
 * draws each dimension callout once the seam has passed its tip.
 */
export function Plate({ plate, alt, className = '', priority = false, callouts = [] }: Props) {
  const loading = priority ? 'eager' : 'lazy'
  const base = `/plates/${plate}`
  return (
    <figure className={`plate aspect-[3/4] ${className}`}>
      <img
        src={`${base}/render.webp`}
        alt={alt}
        width={1080}
        height={1440}
        loading={loading}
        fetchPriority={priority ? 'high' : 'auto'}
        className="plate-render absolute inset-0 h-full w-full"
      />
      <img
        src={`${base}/line.webp`}
        alt=""
        aria-hidden="true"
        width={1080}
        height={1440}
        loading={loading}
        className="plate-line absolute inset-0 h-full w-full"
      />
      <span aria-hidden="true" className="plate-seam absolute inset-x-[12%] h-px" />
      {callouts.map((c) => (
        <span
          key={c.label}
          aria-hidden="true"
          className={`callout callout-${c.side}`}
          style={{ '--x': c.x, '--y': c.y } as CSSProperties}
        >
          <span className="callout-dot" />
          <span className="callout-line" />
          <span className="callout-label">{c.label}</span>
        </span>
      ))}
    </figure>
  )
}
