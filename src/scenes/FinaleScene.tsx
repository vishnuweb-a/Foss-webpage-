import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { brand, finale, studentCoordinator } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 12 — Final.
 *
 * Three statements in the same optical position, replacing one another. The
 * line break in "DON'T JUST / CONSUME / TECHNOLOGY." is the one specified in
 * rules.prd §08, and CONSUME is struck through at the turn — the negation is
 * the message, so it happens on screen rather than being described.
 */
export function FinaleScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      // Only the arrival is shown. Revealing all three stacked layers at once
      // would leave them overlapping and unreadable.
      gsap.set('[data-statement], [data-turn]', { autoAlpha: 0 })
      gsap.set('[data-welcome], [data-support], [data-cta], [data-coordinator]', {
        autoAlpha: 1,
        y: 0,
      })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    // The strike lands before the statement leaves — cause, then consequence.
    tl.to('[data-strike]', { scaleX: 1, ease: 'none', duration: 0.1 }, 0.16)
    tl.to('[data-statement]', { autoAlpha: 0, yPercent: -12, ease: 'none' }, 0.3)

    tl.fromTo(
      '[data-turn]',
      { autoAlpha: 0, yPercent: 16 },
      { autoAlpha: 1, yPercent: 0, ease: 'none' },
      0.34,
    )
    tl.to('[data-turn]', { autoAlpha: 0, yPercent: -12, ease: 'none' }, 0.54)

    tl.fromTo(
      '[data-welcome]',
      { autoAlpha: 0, yPercent: 16 },
      { autoAlpha: 1, yPercent: 0, ease: 'none' },
      0.58,
    )
    tl.fromTo(
      '[data-support]',
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, ease: 'none' },
      0.72,
    )
    tl.fromTo(
      '[data-cta]',
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'none' },
      0.84,
    )
    tl.fromTo(
      '[data-coordinator]',
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, ease: 'none' },
      0.9,
    )
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="relative flex h-full w-full items-center stage-x py-[7svh]">
        <div className="relative w-full">
          <h2
            data-statement
            className="text-ink text-hero font-display font-bold leading-[0.86] tracking-display"
          >
            <span className="block">{finale.line1}</span>
            <span className="relative inline-block">
              {finale.line2}
              <span
                data-strike
                className="bg-accent absolute left-0 top-1/2 h-[0.06em] w-full origin-left scale-x-0"
                aria-hidden="true"
              />
            </span>
            <span className="block">{finale.line3}</span>
          </h2>

          <p
            data-turn
            className="text-accent absolute inset-x-0 top-0 text-hero font-display font-bold leading-[0.86] tracking-display opacity-0"
          >
            {finale.turn}
          </p>

          <div data-welcome className="absolute inset-x-0 top-0 opacity-0">
            {/* Wordmark slot. A logo asset replaces this without touching layout. */}
            {brand.logoSrc ? (
              <img src={brand.logoSrc} alt={brand.wordmark} className="h-[1em]" />
            ) : (
              <h2 className="text-ink text-hero font-display font-bold leading-[0.86] tracking-display">
                {finale.welcome}
              </h2>
            )}

            <p
              data-support
              className="text-ink-dim mt-8 text-lead opacity-0"
            >
              {finale.support}
            </p>
            <p
              data-cta
              className="text-accent mt-3 font-mono text-label tracking-label opacity-0"
            >
              {finale.cta}
            </p>

            {/* Lands last, inside the arrival — a closing credit, not a footer. */}
            <div data-coordinator className="mt-[5svh] opacity-0">
              <p className="text-ink-faint font-mono text-label tracking-label">
                {studentCoordinator.label}
              </p>
              <p className="text-ink mt-2 font-display text-title font-bold leading-none tracking-tight">
                {studentCoordinator.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}
