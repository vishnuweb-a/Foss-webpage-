import { useCallback, useState } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { outcomes, outcomesMeta } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 10 — What You Walk Away With.
 *
 * Set as one block of words rather than a list of items, so it reads as a
 * masthead and not as seven more cards. Scroll brightens each term in turn;
 * hovering one surfaces its line for anyone reading without a presenter
 * (FOSS.prd §30 leaves the detail to the person speaking).
 */
export function OutcomesScene({ def, index }: SceneProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-outcome]', { color: 'var(--color-ink)' })
      gsap.set('[data-close]', { autoAlpha: 1, y: 0 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    outcomes.forEach((_, i) => {
      tl.to(
        `[data-outcome="${i}"]`,
        { color: 'var(--color-ink)', ease: 'none', duration: 0.08 },
        0.12 + (i / outcomes.length) * 0.66,
      )
    })

    tl.fromTo(
      '[data-close]',
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, ease: 'none' },
      0.86,
    )
  }, [])

  const active = outcomes.find((o) => o.id === hovered) ?? null

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-between stage-x py-[7svh]">
        <h2 className="text-ink-faint max-w-[30ch] font-mono text-label tracking-label">
          {outcomesMeta.title}
        </h2>

        <div>
          <p className="max-w-[22ch] text-display font-display font-bold leading-[1.02] tracking-display sm:max-w-[26ch]">
            {outcomes.map((o, i) => (
              <span key={o.id}>
                <button
                  type="button"
                  data-outcome={i}
                  onMouseEnter={() => setHovered(o.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(o.id)}
                  onBlur={() => setHovered(null)}
                  className="text-ink-faint hover:text-accent focus-visible:text-accent transition-colors duration-200"
                >
                  {o.label}
                </button>
                {i < outcomes.length - 1 && (
                  <span className="text-rule-bright" aria-hidden="true">
                    {' · '}
                  </span>
                )}
              </span>
            ))}
          </p>

          <p
            aria-live="polite"
            className="text-ink-dim mt-8 min-h-[1.6em] text-lead"
          >
            {active?.body ?? ''}
          </p>
        </div>

        <p
          data-close
          className="text-accent text-title font-display font-bold tracking-tight opacity-0"
        >
          {outcomesMeta.close}
        </p>
      </div>
    </Scene>
  )
}
