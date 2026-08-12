import { useCallback, useRef, useState } from 'react'
import { Scene, type SceneBuild } from '@/components/Scene'
import { BranchConnectors } from '@/components/BranchConnectors'
import { freedoms, whatIsFoss } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 02 — What Is FOSS?
 *
 * Five permissions drawn as one branch you travel along, because they are
 * sequential rather than parallel. rules.prd §05 sketches this composition
 * explicitly as the alternative to five cards.
 */
export function WhatIsFossScene({ def, index }: SceneProps) {
  const [active, setActive] = useState(0)
  const [travelled, setTravelled] = useState(0)
  /** Where the scroll left us, so hover can hand control back on exit. */
  const scrollIndexRef = useRef(0)

  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      setTravelled(1)
      setActive(freedoms.length - 1)
      return
    }

    // A dummy tween gives the scrub something continuous to drive the branch
    // reveal with, while the stage callbacks below switch the written detail.
    tl.to(
      { v: 0 },
      {
        v: 1,
        ease: 'none',
        duration: 1,
        onUpdate() {
          setTravelled(this.targets()[0].v as number)
        },
      },
      0,
    )

    freedoms.forEach((_, i) => {
      tl.call(
        () => {
          scrollIndexRef.current = i
          setActive(i)
        },
        undefined,
        (i / freedoms.length) * 0.92,
      )
    })
  }, [])

  const current = freedoms[active]

  return (
    <Scene def={def} index={index} build={build}>
      <div className="flex h-full w-full flex-col justify-between stage-x py-[7svh]">
        <header className="max-w-[52ch]">
          <h2 className="text-title font-display font-bold tracking-tight">
            {whatIsFoss.title}
          </h2>
          <p className="text-ink-faint mt-3 font-mono text-label tracking-label">
            {whatIsFoss.standfirst}
          </p>
        </header>

        {/* The branch. Anchors are measured, so the staircase can restack freely. */}
        <div className="relative my-[4svh] flex-1">
          <BranchConnectors progress={travelled} />

          <ol className="relative flex h-full flex-col justify-center gap-4 md:flex-row md:items-stretch md:justify-between md:gap-2">
            {freedoms.map((stage, i) => {
              const isActive = i === active
              const isPassed = i < active

              return (
                <li
                  key={stage.id}
                  className="flex md:flex-1 md:flex-col md:justify-center"
                  // The staircase: each stage sits lower than the last.
                  style={{ ['--step' as string]: `${i * 6}svh` }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onMouseLeave={() => setActive(scrollIndexRef.current)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-describedby={isActive ? 'freedom-detail' : undefined}
                    className="group flex items-center gap-4 text-left md:mt-[var(--step)] md:flex-col md:items-start md:gap-2"
                  >
                    <span
                      data-anchor
                      className={`h-2 w-2 shrink-0 transition-colors duration-500 ${
                        isActive
                          ? 'bg-accent'
                          : isPassed
                            ? 'bg-accent-deep'
                            : 'bg-rule-bright'
                      }`}
                    />
                    <span className="flex flex-col">
                      <span
                        className={`font-mono text-label tabular-nums transition-colors duration-500 ${
                          isActive || isPassed ? 'text-accent' : 'text-ink-faint'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-title font-bold leading-none tracking-tight transition-colors duration-500 ${
                          isActive
                            ? 'text-ink'
                            : isPassed
                              ? 'text-ink-dim'
                              : 'text-ink-faint group-hover:text-ink-dim'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* One detail slot, held still. Moving the text with the cursor would
            make five stages feel like five cards again. */}
        <p
          id="freedom-detail"
          aria-live="polite"
          className="text-ink-dim min-h-[3.5em] max-w-[46ch] text-lead"
        >
          <span className="text-accent font-mono text-label tracking-label">
            {current.label}
          </span>
          <span className="mt-2 block">{current.body}</span>
        </p>
      </div>
    </Scene>
  )
}
