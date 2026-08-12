import { useEffect } from 'react'
import { ScrollTrigger } from '@/motion/gsap'
import { SceneNavProvider } from '@/navigation/SceneNav'
import { ProgressRail } from '@/components/ProgressRail'
import { scenes } from '@/scenes/registry'

export default function App() {
  /* Variable fonts change metrics after first paint, which invalidates every
     scroll measurement taken before they land. */
  useEffect(() => {
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SceneNavProvider scenes={scenes}>
      <a
        href={`#${scenes[0].id}`}
        className="sr-only-spine focus:not-sr-only-spine focus:bg-surface focus:text-ink focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <ProgressRail />

      <main>
        {scenes.map((def, i) => (
          <def.Component key={def.id} def={def} index={i} />
        ))}
      </main>
    </SceneNavProvider>
  )
}
