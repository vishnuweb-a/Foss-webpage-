import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/motion/gsap'
import { useSceneNav } from '@/navigation/SceneNav'
import type { SceneDefinition } from '@/scenes/types'

export interface SceneBuild {
  /** Scrubbed across the scene's scroll length. Empty under reduced motion. */
  tl: gsap.core.Timeline
  /** The pinned stage element. GSAP selectors are already scoped to it. */
  root: HTMLElement
  reduced: boolean
}

interface SceneStageProps {
  def: SceneDefinition
  index: number
  /** Declares the scene's scrubbed timeline. Selectors are scoped to the stage. */
  build?: (ctx: SceneBuild) => void
  children: ReactNode
}

/**
 * The stage every scene sits on.
 *
 * Pinning is CSS `position: sticky`, not ScrollTrigger's `pin`. Sticky stays on
 * the compositor and injects no pin-spacer wrappers, so layout stays predictable
 * and scrubbing stays smooth on projector-class hardware. GSAP's only job here
 * is to map scroll distance onto the scene's timeline.
 */
export function Scene({ def, index, build, children }: SceneStageProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const { reportActive } = useSceneNav()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return

    // Exactly one scene is active at a time: the one whose band spans mid-viewport.
    const activeTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) reportActive(index)
      },
    })

    // Reduced motion is resolved once, here, rather than in every scene.
    const mm = gsap.matchMedia()
    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        full: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean; full: boolean }

        const tl = gsap.timeline(
          reduced
            ? { paused: true }
            : {
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.5,
                },
              },
        )

        build?.({ tl, root: stage, reduced })

        // Motion may carry emphasis, never information. With motion reduced we
        // jump to the resolved end state so nothing stays hidden (FOSS.prd §29).
        if (reduced) tl.progress(1)
      },
      stage,
    )

    return () => {
      activeTrigger.kill()
      mm.revert()
    }
  }, [build, index, reportActive])

  return (
    <section
      ref={sectionRef}
      id={def.id}
      aria-label={`${def.ordinal} — ${def.label}`}
      style={{ height: `${def.length * 100}svh` }}
    >
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden">
        {children}
      </div>
    </section>
  )
}
