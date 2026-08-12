import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { responsible } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 06 — Use Open Source Responsibly.
 *
 * Text-forward and quiet on purpose. This is the section with an obligation in
 * it, and dressing an obligation in motion would undercut it — the principles
 * simply arrive and stay (rules.prd §16, visual silence).
 */
export function ResponsibleScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-claim]', { autoAlpha: 0 })
      gsap.set('[data-turn], [data-step], [data-principle], [data-close]', {
        autoAlpha: 1,
        x: 0,
      })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    tl.to('[data-claim]', { autoAlpha: 0, yPercent: -20, ease: 'none' }, 0.16)
    tl.fromTo(
      '[data-turn]',
      { autoAlpha: 0, yPercent: 20 },
      { autoAlpha: 1, yPercent: 0, ease: 'none' },
      0.2,
    )
    tl.fromTo('[data-step]', { autoAlpha: 0.2 }, { autoAlpha: 1, stagger: 0.06, ease: 'none' }, 0.4)
    tl.fromTo(
      '[data-principle]',
      { autoAlpha: 0, x: -8 },
      { autoAlpha: 1, x: 0, stagger: 0.05, ease: 'none' },
      0.58,
    )
    tl.fromTo('[data-close]', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none' }, 0.88)
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-between stage-x py-[7svh]">
        <div className="relative min-h-[4.6em]">
          <h2
            data-claim
            className="text-ink max-w-[17ch] text-display font-display font-bold leading-[0.94] tracking-display"
          >
            {responsible.title}
          </h2>
          <p
            data-turn
            className="text-ink-dim absolute inset-x-0 top-0 max-w-[30ch] text-title font-display font-bold leading-[1.1] tracking-tight opacity-0"
          >
            {responsible.turn}
          </p>
        </div>

        {/* The pipeline, set as one continuous mono line rather than six boxes. */}
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {responsible.flow.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              {i > 0 && (
                <span className="bg-rule h-px w-6" aria-hidden="true" />
              )}
              <span
                data-step
                className="text-ink font-mono text-label tracking-label"
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <ul className="columns-1 gap-x-12 sm:columns-2 lg:columns-3">
          {responsible.principles.map((p) => (
            <li
              key={p}
              data-principle
              className="text-ink-dim mb-3 break-inside-avoid text-lead opacity-0"
            >
              <span className="text-accent-deep mr-3 font-mono text-label">—</span>
              {p}
            </li>
          ))}
        </ul>

        <p
          data-close
          className="text-accent font-mono text-label tracking-label opacity-0"
        >
          {responsible.close}
        </p>
      </div>
    </Scene>
  )
}
