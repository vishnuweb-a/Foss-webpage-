import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { beyondClassroom, classroom, realWorld } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 05 — Classroom → Real World.
 *
 * The transformation is structural, not cosmetic: the classroom chain
 * terminates, and the replacement closes back on itself. A dead end becoming a
 * loop is the whole argument of the section, so the motion carries it
 * (rules.prd §15).
 */
export function RealWorldScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      // The transformation has already happened: show the loop, not the dead end.
      gsap.set('[data-classroom]', { autoAlpha: 0 })
      gsap.set('[data-realworld]', { autoAlpha: 1 })
      gsap.set('[data-gain]', { autoAlpha: 1 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    tl.to('[data-classroom]', { autoAlpha: 0, yPercent: -8, ease: 'none' }, 0.26)
    tl.fromTo(
      '[data-realworld]',
      { autoAlpha: 0, yPercent: 8 },
      { autoAlpha: 1, yPercent: 0, ease: 'none' },
      0.32,
    )
    tl.fromTo(
      '[data-gain]',
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, stagger: 0.05, ease: 'none' },
      0.66,
    )
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-between stage-x py-[7svh]">
        <h2 className="text-ink max-w-[24ch] text-title font-display font-bold tracking-tight">
          {beyondClassroom.title}
        </h2>

        {/* Both chains occupy the same space; one replaces the other. */}
        <div className="relative flex-1">
          <Chain
            marker="data-classroom"
            heading={classroom.heading}
            stages={[...classroom.stages]}
            terminal="ENDS HERE"
            tone="dormant"
          />
          <Chain
            marker="data-realworld"
            heading={realWorld.heading}
            stages={[...realWorld.stages]}
            terminal="↻ BACK TO LEARN"
            tone="accent"
            hidden
          />
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {beyondClassroom.gains.map((g) => (
            <li
              key={g}
              data-gain
              className="text-ink-faint font-mono text-label tracking-label opacity-0"
            >
              {g}
            </li>
          ))}
        </ul>
      </div>
    </Scene>
  )
}

function Chain({
  marker,
  heading,
  stages,
  terminal,
  tone,
  hidden = false,
}: {
  marker: string
  heading: string
  stages: string[]
  terminal: string
  tone: 'dormant' | 'accent'
  hidden?: boolean
}) {
  const accent = tone === 'accent'

  return (
    <div
      {...{ [marker]: '' }}
      className={`absolute inset-0 flex flex-col justify-center ${hidden ? 'opacity-0' : ''}`}
    >
      <p
        className={`font-mono text-label tracking-label ${accent ? 'text-accent' : 'text-ink-faint'}`}
      >
        {heading}
      </p>

      <ol className="mt-5 flex flex-col gap-1">
        {stages.map((stage) => (
          <li key={stage} className="flex items-baseline gap-4">
            <span
              className={`h-px w-8 shrink-0 translate-y-[-0.3em] ${accent ? 'bg-accent-deep' : 'bg-rule'}`}
              aria-hidden="true"
            />
            <span
              className={`font-display text-title font-bold leading-[1.12] tracking-tight ${
                accent ? 'text-ink' : 'text-ink-dim'
              }`}
            >
              {stage}
            </span>
          </li>
        ))}
      </ol>

      <p
        className={`mt-4 pl-12 font-mono text-label tracking-label ${
          accent ? 'text-accent' : 'text-ink-faint'
        }`}
      >
        {terminal}
      </p>
    </div>
  )
}
