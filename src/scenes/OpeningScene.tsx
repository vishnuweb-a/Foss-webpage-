import { useCallback, useEffect, useRef, useState } from 'react'
import { Scene, type SceneBuild } from '@/components/Scene'
import { TerminalSequence } from '@/components/TerminalSequence'
import { gsap } from '@/motion/gsap'
import { brand, facultyCoordinators, opening, terminalSequence } from '@/data/content'
import type { SceneProps } from '@/scenes/types'

/**
 * 01 — Opening.
 *
 * The session boots, then hands the stage to the headline. Nothing here is
 * ambient: the terminal types because a command is being run, and the title
 * arrives because the command finished (rules.prd §15).
 */
export function OpeningScene({ def, index }: SceneProps) {
  const [booted, setBooted] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  const handleComplete = useCallback(() => setBooted(true), [])

  useEffect(() => {
    if (!booted || !titleRef.current) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { autoAlpha: 1 })
      if (reduced) return

      gsap.from('[data-word]', {
        yPercent: 108,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.075,
      })
      gsap.from('[data-support]', {
        autoAlpha: 0,
        y: 14,
        duration: 0.8,
        delay: 0.42,
        ease: 'expo.out',
      })
    }, titleRef)

    return () => ctx.revert()
  }, [booted])

  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      gsap.set('[data-cue]', { autoAlpha: 1 })
      return
    }
    // The terminal recedes as the title advances — a handoff, not a fade.
    tl.to('[data-identity]', { yPercent: -14, autoAlpha: 0, ease: 'none' }, 0)
    tl.to('[data-terminal]', { yPercent: -14, autoAlpha: 0, ease: 'none' }, 0)
      .to('[data-title]', { yPercent: -8, ease: 'none' }, 0)
      .to('[data-cue]', { autoAlpha: 1, ease: 'none' }, 0.5)
      .to('[data-hint]', { autoAlpha: 0, ease: 'none' }, 0)
  }, [])

  return (
    <Scene def={def} index={index} build={build}>
      <div className="relative flex h-full w-full items-center stage-x">
        <div className="mx-auto w-full max-w-[112rem]">
          {/* Identity, established before the session boots. The mark sits
              directly on the page — no panel, no frame, no rule — and rides
              the existing terminal handoff out on scroll. */}
          <div
            data-identity
            className="mb-[5svh] flex items-center justify-between gap-6"
          >
            <img
              src={brand.logo}
              alt={brand.logoAlt}
              width={451}
              height={331}
              className="h-[clamp(3.5rem,7vw,8rem)] w-auto object-contain"
            />

            <div className="text-right">
              <p className="text-ink-faint font-mono text-label tracking-label">
                {facultyCoordinators.label}
              </p>
              {facultyCoordinators.names.map((name) => (
                <p
                  key={name}
                  className="text-ink mt-1.5 text-lead leading-[1.25]"
                >
                  {name}
                </p>
              ))}
            </div>
          </div>

          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            <div data-terminal className="lg:col-span-5 xl:col-span-4">
              <TerminalSequence lines={terminalSequence} onComplete={handleComplete} />
            </div>

            <div
              data-title
              ref={titleRef}
              className="lg:col-span-7 lg:col-start-6 xl:col-span-8 xl:col-start-5"
            >
              <h1
                data-reveal
                className="text-hero font-display font-bold tracking-display leading-[0.86] invisible"
              >
                {opening.title.split(' ').map((word) => (
                  <span key={word} className="block overflow-hidden">
                    <span data-word className="block">
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                data-reveal
                data-support
                className="text-ink-dim mt-8 max-w-[34ch] text-lead invisible"
              >
                {opening.support}
              </p>
            </div>
          </div>
        </div>

        {/* Presenter affordances: quiet, mono, and out of the composition. */}
        <div
          data-hint
          className="text-ink-faint absolute bottom-8 left-gutter font-mono text-label tracking-label"
        >
          SCROLL · ↑ ↓ · P TO PRESENT
        </div>

        <div
          data-cue
          className="text-accent absolute bottom-8 right-gutter font-mono text-label tracking-label opacity-0"
        >
          {opening.cue}
        </div>
      </div>
    </Scene>
  )
}
