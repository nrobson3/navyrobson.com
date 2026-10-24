import { useEffect } from 'react'
import { Beyond } from '@/components/Beyond'
import { Experience } from '@/components/Experience'
import { Hero } from '@/components/Hero'
import { Next } from '@/components/Next'
import { Projects } from '@/components/Projects'
import { SiteBar } from '@/components/SiteBar'
import { Skills } from '@/components/Skills'

export default function App() {
  // The page renders after the browser's own jump to a #chapter link, so redo the jump
  // once the sections exist; shared links like navyrobson.com/#projects then land right.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    // instant on load: a shared link should land, not glide down from the top
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <SiteBar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Beyond />
        <Next />
      </main>
    </>
  )
}
