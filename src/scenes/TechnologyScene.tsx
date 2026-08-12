import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from '@/motion/gsap'
import { Scene, type SceneBuild } from '@/components/Scene'
import { ConstellationFallback } from '@/components/ConstellationFallback'
import { universe } from '@/data/content'
import { techNodes } from '@/data/technologies'
import { hasWebGL } from '@/three/webgl'
import type { SceneProps } from '@/scenes/types'

/* three.js is the heaviest asset in the build and is needed by exactly one
   scene, so it is never in the critical path for the opening (FOSS.prd §28). */
const TechnologyUniverse = lazy(() => import('@/three/TechnologyUniverse'))

/**
 * 04 — Your Technology Universe.
 *
 * The one scene where 3D is the argument rather than the atmosphere: these
 * technologies are worth showing as a connected system, and a system is the one
 * thing a grid of cards cannot show (rules.prd §03, §13).
 */
export function TechnologyScene({ def, index }: SceneProps) {
  const progressRef = useRef(0)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const webgl = hasWebGL()

  /* Mount the canvas once the scene is near, then keep it — but let it render
     only while it is actually on screen. */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: '25% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const build = useCallback(({ tl, reduced }: SceneBuild) => {
    if (reduced) {
      progressRef.current = 1
      gsap.set('[data-chrome]', { autoAlpha: 1 })
      return
    }
    // GSAP mutates the ref directly; the 3D layer reads it inside its own
    // frame loop, so scrolling triggers zero React renders.
    tl.to(progressRef, { current: 1, ease: 'none', duration: 1 }, 0)
    tl.fromTo('[data-chrome]', { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none' }, 0.04)
  }, [])

  const selected = techNodes.find((n) => n.id === activeId) ?? null

  return (
    <Scene def={def} index={index} build={build}>
      <div ref={stageRef} className="relative h-full w-full">
        <div className="absolute inset-0">
          {webgl ? (
            mounted && (
              <Suspense fallback={<LoadingEnvironment />}>
                <TechnologyUniverse
                  progressRef={progressRef}
                  activeId={activeId}
                  onSelect={setActiveId}
                  running={visible}
                />
              </Suspense>
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center p-[8svh]">
              <ConstellationFallback activeId={activeId} />
            </div>
          )}
        </div>

        <div
          data-chrome
          className="pointer-events-none relative flex h-full flex-col justify-between stage-x py-[7svh]"
        >
          <header className="max-w-[40ch]">
            <h2 className="text-title font-display font-bold tracking-tight">
              {universe.title}
            </h2>
            <p className="text-ink-faint mt-3 max-w-[38ch] font-mono text-label tracking-label">
              {universe.standfirst}
            </p>
          </header>

          <div className="pointer-events-auto">
            {/* Held detail slot, matching the grammar established in scene 02. */}
            <p aria-live="polite" className="min-h-[3.6em] max-w-[44ch]">
              <span className="text-accent font-mono text-label tracking-label">
                {selected ? selected.label : universe.hint}
              </span>
              {selected && (
                <span className="text-ink-dim mt-2 block text-lead">
                  {selected.body}
                </span>
              )}
            </p>

            {/* The real interface. Keyboard-navigable, screen-reader legible,
                and the only selector that exists when WebGL does not. */}
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {techNodes.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(n.id)}
                    onFocus={() => setActiveId(n.id)}
                    onClick={() => setActiveId(n.id)}
                    aria-pressed={activeId === n.id}
                    className={`font-mono text-label tracking-label transition-colors duration-300 ${
                      activeId === n.id
                        ? 'text-accent'
                        : 'text-ink-faint hover:text-ink-dim'
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Scene>
  )
}

function LoadingEnvironment() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-ink-faint font-mono text-label tracking-label">
        INITIALIZING ENVIRONMENT
      </p>
    </div>
  )
}
