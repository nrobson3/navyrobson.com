/**
 * The full-stop title card that opens every chapter: a whole viewport holding only the
 * heading and one line, so each chapter starts on a hard cut rather than running on.
 */
export function ChapterTitle({ id, title, intro }: { id: string; title: string; intro: string }) {
  return (
    <header className="flex min-h-svh flex-col justify-end border-t border-rule px-[clamp(1rem,6vw,5.5rem)] pb-[14svh]">
      <h2 id={id} className="text-[clamp(3.25rem,11vw,10rem)] leading-[0.85] font-light tracking-[-0.045em]">
        {title}
      </h2>
      <p className="mt-8 max-w-[30em] text-[clamp(1rem,1.3vw,1.1875rem)] leading-relaxed text-ink-soft">{intro}</p>
    </header>
  )
}
