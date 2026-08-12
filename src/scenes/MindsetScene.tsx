import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { mindset, mindsetStages } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

const TRANSFORM_START = 0.3

/**
 * 03 — The FOSS Mindset.
 *
 * A typographic scene, deliberately unlike the branch that precedes it
 * (rules.prd §25). One identity occupies the stage at a time and is replaced,
 * because the claim is that you become something else — not that you collect
 * traits. The small rail underneath keeps the earlier identities visible, so
 * the change reads as history rather than substitution.
 */
export function MindsetScene({ def, index }: SceneProps) {
  const [stage, setStage] = useState(0)
  const scrollIndexRef = useRef(0)
  const prefersReduced = useReducedMotion()

  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      // Resolved state: the claim and the turn have already been made, and the
      // transformation is shown at its final identity.
      gsap.set('[data-premise], [data-turn]', { autoAlpha: 0 })
      gsap.set('[data-stage]', { autoAlpha: 1 })
      setStage(mindsetStages.length - 1)
      return
    }

    // Spine tween: fixes the timeline's total duration at 1 so every position
    // parameter below can be read as a fraction of the scene.
    tl.to({}, { duration: 1, ease: 'none' }, 0)

    tl.to('[data-premise]', { autoAlpha: 0, yPercent: -30, ease: 'none' }, 0.08)
    tl.fromTo(
      '[data-turn]',
      { autoAlpha: 0, yPercent: 40 },
      { autoAlpha: 1, yPercent: 0, ease: 'none' },
      0.12,
    )
    tl.to('[data-turn]', { autoAlpha: 0, yPercent: -30, ease: 'none' }, 0.24)
    tl.fromTo('[data-stage]', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none' }, 0.26)

    const span = 1 - TRANSFORM_START
    mindsetStages.forEach((_, i) => {
      tl.call(
        () => {
          scrollIndexRef.current = i
          setStage(i)
        },
        undefined,
        TRANSFORM_START + (i / mindsetStages.length) * span,
      )
    })
  }, [])

  const current = mindsetStages[stage]

  return (
    <Scene def={def} index={index} build={build}>
      <div className="relative h-full w-full stage-x py-[7svh]">
        {/* The claim, then the turn. Both occupy the same optical position. */}
        <div className="pointer-events-none absolute inset-x-gutter top-[16svh]">
          <p
            data-premise
            className="text-ink-dim max-w-[18ch] text-display font-display font-bold leading-[0.94] tracking-display"
          >
            {mindset.premise}
          </p>
          <p
            data-turn
            className="text-ink absolute inset-x-0 top-0 max-w-[16ch] text-display font-display font-bold leading-[0.94] tracking-display opacity-0"
          >
            {mindset.turn}
          </p>
        </div>

        <div
          data-stage
          className="flex h-full flex-col justify-between opacity-0"
        >
          <div aria-hidden="true" />

          <div>
            <p className="text-ink-faint font-mono text-label tabular-nums tracking-label">
              {String(stage + 1).padStart(2, '0')} / {String(mindsetStages.length).padStart(2, '0')}
            </p>

            {/* The mask must carry the display size itself: `em` here resolves
                against this element's own font-size, and on a default 16px
                wrapper the mask collapses to a sliver of the word. The word is
                sized to keep the longest label — OPEN-SOURCE CREATOR — on one
                line at every viewport. */}
            <div className="relative mt-3 h-[1.12em] overflow-hidden text-[clamp(1.5rem,5.2vw,4.75rem)]">
              <AnimatePresence initial={false}>
                <motion.h2
                  key={current.id}
                  initial={prefersReduced ? false : { y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={prefersReduced ? undefined : { y: '-100%' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-accent absolute inset-x-0 top-0 font-display font-bold leading-[1.06] tracking-display whitespace-nowrap"
                >
                  {current.label}
                </motion.h2>
              </AnimatePresence>
            </div>

            <p
              aria-live="polite"
              className="text-ink-dim mt-6 min-h-[2.6em] max-w-[42ch] text-lead"
            >
              {current.body}
            </p>
          </div>

          {/* History: where you have been stays legible. */}
          <ol className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {mindsetStages.map((s, i) => (
              <li
                key={s.id}
                aria-current={i === stage ? 'step' : undefined}
                className={`font-mono text-label tracking-label transition-colors duration-500 ${
                  i === stage
                    ? 'text-accent'
                    : i < stage
                      ? 'text-ink-dim'
                      : 'text-ink-faint'
                }`}
              >
                {s.label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Scene>
  )
}
