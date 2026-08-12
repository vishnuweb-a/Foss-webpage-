import { motion } from 'framer-motion'
import { useSceneNav } from '@/navigation/SceneNav'

/**
 * Section navigation, drawn as a commit spine rather than a list of links.
 *
 * The metaphor is deliberate (rules.prd §07): scenes you have passed are filled
 * like landed commits, the current scene is the checked-out ref, and what lies
 * ahead is unwritten. Labels stay silent until needed so the rail does not
 * compete with the stage (rules.prd §16).
 */
export function ProgressRail() {
  const { scenes, activeIndex, goToScene } = useSceneNav()

  return (
    <nav
      aria-label="Sections"
      className="fixed right-[max(1rem,2vw)] top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-1">
        {scenes.map((scene, i) => {
          const isActive = i === activeIndex
          const isPassed = i < activeIndex

          return (
            <li key={scene.id}>
              <button
                type="button"
                onClick={() => goToScene(i)}
                aria-current={isActive ? 'step' : undefined}
                className="group flex w-full items-center justify-end gap-3 py-1 text-right"
              >
                <span
                  className={`font-mono text-label tracking-label whitespace-nowrap transition-opacity duration-300 ${
                    isActive
                      ? 'text-accent opacity-100'
                      : 'text-ink-faint opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }`}
                >
                  {scene.label}
                </span>

                <span
                  className={`font-mono text-label tabular-nums transition-colors duration-300 ${
                    isActive
                      ? 'text-accent'
                      : isPassed
                        ? 'text-accent-deep'
                        : 'text-ink-faint group-hover:text-ink-dim'
                  }`}
                >
                  {scene.ordinal}
                </span>

                {/* The spine node. Filled once landed, ringed while checked out. */}
                <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                  <span
                    className={`h-1.5 w-1.5 transition-colors duration-300 ${
                      isActive
                        ? 'bg-accent'
                        : isPassed
                          ? 'bg-accent-deep'
                          : 'bg-rule group-hover:bg-rule-bright'
                    }`}
                  />
                  {isActive && (
                    <motion.span
                      layoutId="rail-head"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="border-accent absolute inset-0 border"
                    />
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
