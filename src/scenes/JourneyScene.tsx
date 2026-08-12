import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { journeyMeta, journeySteps } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 11 — The FOSS Journey.
 *
 * The climax, so the escalation is literal: each step is set larger than the
 * one before it, from a whispered CURIOUS to a full-height LEAD. Type size is
 * doing the emotional work here, which is the point of treating typography as
 * a primary element rather than a label (rules.prd §08).
 */
export function JourneyScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-step]', { autoAlpha: 1, x: 0 })
      gsap.set('[data-coda]', { autoAlpha: 1 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    journeySteps.forEach((_, i) => {
      const at = 0.06 + (i / journeySteps.length) * 0.72
      tl.fromTo(
        `[data-step="${i}"]`,
        { autoAlpha: 0, x: -18 },
        { autoAlpha: 1, x: 0, ease: 'none', duration: 0.1 },
        at,
      )
    })

    tl.fromTo(
      '[data-coda]',
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'none' },
      0.84,
    )
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-center stage-x py-[6svh]">
        <ol className="flex flex-col justify-center">
          {journeySteps.map((step, i) => {
            // Scale ramps across the run; the last step is the loudest thing
            // in the entire experience.
            const t = i / (journeySteps.length - 1)
            const isLast = i === journeySteps.length - 1

            return (
              <li
                key={step}
                data-step={i}
                className="flex items-baseline gap-5 opacity-0"
              >
                <span className="text-ink-faint shrink-0 font-mono text-label tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-display font-bold leading-[1.04] tracking-display ${
                    isLast ? 'text-accent' : 'text-ink'
                  }`}
                  style={{
                    fontSize: `clamp(${1.1 + t * 1.6}rem, ${0.6 + t * 3.4}vw + ${0.8 + t * 0.9}rem, ${2.2 + t * 6.4}rem)`,
                  }}
                >
                  {step}
                </span>
              </li>
            )
          })}
        </ol>

        <p
          data-coda
          className="text-ink-dim mt-[5svh] max-w-[36ch] text-lead opacity-0"
        >
          {journeyMeta.from}{' '}
          <span className="text-ink font-bold">{journeyMeta.to}</span>
        </p>
      </div>
    </Scene>
  )
}
