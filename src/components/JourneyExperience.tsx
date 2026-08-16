import { useEffect } from 'react'
import { ScrollTrigger } from '@/motion/gsap'
import { SceneNavProvider } from '@/navigation/SceneNav'
import { ProgressRail } from '@/components/ProgressRail'
import { scenes } from '@/scenes/registry'

/**
 * The twelve-scene interactive journey, served at `/journey`.
 *
 * It deliberately renders outside the club site's shell — no SiteHeader, no
 * SiteFooter — because it is a full-screen presentation, and the site's fixed
 * header would sit on top of every pinned scene.
 *
 * The `data-journey` flag on the document element is what scopes the dark
 * design system in styles/index.css to this route. Without it the club site's
 * paper background, grain overlay and smooth scrolling would all apply here —
 * and smooth scrolling in particular fights GSAP's scroll control.
 */
export function JourneyExperience() {
  /* main.tsx sets `data-journey` before React renders — see the note there for
     why an effect is too late for GSAP. It is set again here so the flag
     survives a remount: StrictMode runs mount → cleanup → mount, and without
     this the cleanup below would strip the flag for good, silently unstyling
     the whole route. */
  useEffect(() => {
    const root = document.documentElement
    root.dataset.journey = 'true'
    return () => {
      delete root.dataset.journey
      delete root.dataset.presenting
    }
  }, [])

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
