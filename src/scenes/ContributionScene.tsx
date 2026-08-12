import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { contribution, ladder } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 07 — Contribution.
 *
 * Rungs are full-bleed rules rather than nodes on a branch, so this reads as a
 * different structure from the path in scene 02 (rules.prd §25).
 *
 * The list is reversed visually with `flex-col-reverse`: USE sits at the bottom
 * and the climb runs upward, while DOM order stays USE → CONTRIBUTE so the
 * reading order remains correct for assistive technology.
 */
export function ContributionScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-fill]', { scaleX: 1 })
      gsap.set('[data-label]', { color: 'var(--color-ink)' })
      gsap.set('[data-body]', { autoAlpha: 1 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    // `flex-col-reverse` puts DOM index 0 at the bottom, so lighting the rungs
    // in plain DOM order is what reads on screen as climbing upward.
    ladder.forEach((_, i) => {
      const at = 0.12 + (i / ladder.length) * 0.78

      tl.to(
        `[data-rung="${i}"] [data-fill]`,
        { scaleX: 1, ease: 'none', duration: 0.09 },
        at,
      )
      tl.to(
        `[data-rung="${i}"] [data-label]`,
        { color: 'var(--color-ink)', ease: 'none', duration: 0.09 },
        at,
      )
      tl.to(
        `[data-rung="${i}"] [data-body]`,
        { autoAlpha: 1, ease: 'none', duration: 0.09 },
        at,
      )
    })
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col stage-x py-[7svh]">
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-ink max-w-[20ch] text-title font-display font-bold leading-[1.06] tracking-tight">
            {contribution.title}
          </h2>
          <p className="text-accent font-mono text-label tracking-label">
            {contribution.close}
          </p>
        </header>

        <ol className="mt-[5svh] flex flex-1 flex-col-reverse justify-center">
          {ladder.map((rung, i) => (
            <li key={rung.id} data-rung={i} className="relative py-[0.9svh]">
              {/* The rung itself: a rule that fills as the climb reaches it. */}
              <div className="bg-rule relative h-px w-full">
                <div
                  data-fill
                  className="bg-accent absolute inset-0 origin-left scale-x-0"
                />
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 pt-2">
                <span className="flex items-baseline gap-4">
                  <span className="text-ink-faint font-mono text-label tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    data-label
                    className="text-ink-faint font-display text-title font-bold leading-none tracking-tight"
                  >
                    {rung.label}
                  </span>
                </span>

                <span
                  data-body
                  className="text-ink-dim max-w-[46ch] text-body opacity-0"
                >
                  {rung.body}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  )
}
