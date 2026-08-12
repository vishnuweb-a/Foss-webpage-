import { useCallback } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { learningModel } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 09 — How We Learn.
 *
 * One proportional band, split by the club's stated emphasis. The figures come
 * from FOSS.prd §15 and are labelled as emphasis rather than measurement — they
 * are not presented as statistics, because there are none (rules.prd §22).
 *
 * Magnitude is carried by width and by opacity of the single accent, so the
 * scene stays inside the one-accent rule while still ranking four values.
 */
export function LearningModelScene({ def, index }: SceneProps) {
  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-bar]', { scaleY: 1 })
      gsap.set('[data-copy]', { autoAlpha: 1, y: 0 })
      return
    }
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    learningModel.bands.forEach((_, i) => {
      const at = 0.14 + (i / learningModel.bands.length) * 0.6
      tl.to(
        `[data-band="${i}"] [data-bar]`,
        { scaleY: 1, ease: 'none', duration: 0.14 },
        at,
      )
      tl.fromTo(
        `[data-band="${i}"] [data-copy]`,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, ease: 'none', duration: 0.12 },
        at + 0.03,
      )
    })
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-center stage-x py-[7svh]">
        <header className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-ink text-title font-display font-bold tracking-tight">
            {learningModel.title}
          </h2>
          <p className="text-ink-faint font-mono text-label tracking-label">
            {learningModel.note}
          </p>
        </header>

        {/*
          Wide: four segments of one continuous band, width carrying weight.
          Narrow: stacked rows, where the bar's own width carries the weight
          instead — four text columns at phone width were unreadable.
        */}
        <div className="mt-[7svh] flex w-full flex-col gap-6 md:flex-row md:gap-1">
          {learningModel.bands.map((band, i) => (
            <div
              key={band.id}
              data-band={i}
              className="flex flex-col md:[flex-basis:0] md:[flex-grow:var(--w)]"
              style={{ ['--w' as string]: band.weight }}
            >
              {/* A measured band, not a chart. Tall blocks of solid accent
                  turned this into the loudest scene in the experience for a
                  point that only needs proportion (rules.prd §04). */}
              <div className="h-[2.4svh] w-[calc(var(--w)*1%)] overflow-hidden md:h-[5svh] md:w-full">
                <div
                  data-bar
                  className="bg-accent h-full w-full origin-bottom scale-y-0"
                  // Rank without introducing a second colour.
                  style={{ opacity: 0.3 + (band.weight / 40) * 0.7 }}
                />
              </div>

              <div data-copy className="mt-3 opacity-0 md:mt-4">
                <p className="text-accent font-mono text-label tabular-nums tracking-label">
                  {band.weight}%
                </p>
                <h3 className="text-ink mt-1 font-display text-lead font-bold leading-none tracking-tight">
                  {band.label}
                </h3>
                <p className="text-ink-dim mt-2 max-w-[34ch] text-body md:max-w-[22ch]">
                  {band.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  )
}
