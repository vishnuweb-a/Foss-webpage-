import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { clubJourney, phases } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 08 — Our Journey Together.
 *
 * Four phases along one rule. Columns are separated by whitespace and tick
 * marks only — no borders, no fills, nothing that would turn a roadmap into a
 * row of cards (rules.prd §03).
 */
export function ClubJourneyScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-track]', { scaleX: 1 })
      gsap.set('[data-tick]', { backgroundColor: 'var(--color-accent)' })
      gsap.set('[data-index]', { color: 'var(--color-accent)' })
      gsap.set('[data-label]', { color: 'var(--color-ink)' })
      gsap.set('[data-detail]', { autoAlpha: 1, y: 0 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    tl.to('[data-track]', { scaleX: 1, ease: 'none', duration: 0.82 }, 0.1)

    phases.forEach((_, i) => {
      const at = 0.12 + (i / phases.length) * 0.76
      tl.to(`[data-phase="${i}"] [data-tick]`, {
        backgroundColor: 'var(--color-accent)',
        ease: 'none',
        duration: 0.05,
      }, at)
      tl.to(`[data-phase="${i}"] [data-index]`, {
        color: 'var(--color-accent)',
        ease: 'none',
        duration: 0.05,
      }, at)
      tl.to(`[data-phase="${i}"] [data-label]`, {
        color: 'var(--color-ink)',
        ease: 'none',
        duration: 0.05,
      }, at)
      tl.fromTo(
        `[data-phase="${i}"] [data-detail]`,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, ease: 'none', duration: 0.1 },
        at + 0.02,
      )
    })
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-center stage-x py-[7svh]">
        <h2 className="text-ink text-title font-display font-bold tracking-tight">
          {clubJourney.title}
        </h2>

        <div className="relative mt-[7svh]">
          {/* One rule runs the full width; the phases are stations on it. */}
          <div className="bg-rule relative h-px w-full">
            <div
              data-track
              className="bg-accent-deep absolute inset-0 origin-left scale-x-0"
            />
          </div>

          <ol className="grid gap-x-10 gap-y-10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, i) => (
              <li key={phase.id} data-phase={i} className="relative">
                <span
                  data-tick
                  className="bg-rule-bright absolute -top-6 left-0 h-3 w-px"
                  aria-hidden="true"
                />

                <p
                  data-index
                  className="text-ink-faint font-mono text-label tabular-nums tracking-label"
                >
                  {phase.index}
                </p>

                <h3
                  data-label
                  // Sized to sit inside a quarter-width column: text-title
                  // overflows into the neighbouring phase at desktop widths.
                  className="text-ink-faint mt-2 font-display text-[clamp(1.35rem,2.2vw,2.25rem)] font-bold leading-none tracking-tight"
                >
                  {phase.label}
                </h3>

                <div data-detail className="opacity-0">
                  <p className="text-ink-dim mt-4 max-w-[34ch] text-body">
                    {phase.body}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-ink-faint font-mono text-label"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  )
}
