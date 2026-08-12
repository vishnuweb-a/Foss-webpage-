import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { gsap } from '@/motion/gsap'
import type { SceneDefinition } from '@/scenes/types'

interface SceneNavValue {
  scenes: SceneDefinition[]
  activeIndex: number
  isPresenting: boolean
  /** Called by each Scene when it becomes the pinned scene. */
  reportActive: (index: number) => void
  goToScene: (index: number) => void
}

const SceneNavContext = createContext<SceneNavValue | null>(null)

export function useSceneNav(): SceneNavValue {
  const ctx = useContext(SceneNavContext)
  if (!ctx) throw new Error('useSceneNav must be used within <SceneNavProvider>')
  return ctx
}

/** Ignore navigation keys while the user is typing or using a modifier chord. */
function shouldIgnoreKey(e: KeyboardEvent): boolean {
  if (e.metaKey || e.ctrlKey || e.altKey) return true
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    (el as HTMLElement).isContentEditable
  )
}

export function SceneNavProvider({
  scenes,
  children,
}: {
  scenes: SceneDefinition[]
  children: ReactNode
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPresenting, setIsPresenting] = useState(false)

  /** Guards the active index against stale reports mid-programmatic-scroll. */
  const navigatingRef = useRef(false)

  const reportActive = useCallback((index: number) => {
    if (navigatingRef.current) return
    setActiveIndex(index)
  }, [])

  const goToScene = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(scenes.length - 1, index))
      const target = document.getElementById(scenes[clamped].id)
      if (!target) return

      navigatingRef.current = true
      setActiveIndex(clamped)

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      gsap.to(window, {
        // Land just inside the scene so its pinned stage is fully engaged.
        scrollTo: { y: target.offsetTop + 2, autoKill: false },
        duration: reduced ? 0 : 0.9,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: () => {
          navigatingRef.current = false
        },
      })
    },
    [scenes],
  )

  /* Presentation mode (FOSS.prd §31): hides ambient chrome and goes fullscreen.
     Keying it off the document element lets CSS respond without prop drilling. */
  useEffect(() => {
    document.documentElement.dataset.presenting = isPresenting ? 'true' : 'false'
  }, [isPresenting])

  const togglePresenting = useCallback(() => {
    setIsPresenting((was) => {
      const next = !was
      // Fullscreen must be requested inside the keypress gesture.
      if (next && !document.fullscreenElement) {
        void document.documentElement.requestFullscreen?.().catch(() => {})
      } else if (!next && document.fullscreenElement) {
        void document.exitFullscreen?.().catch(() => {})
      }
      return next
    })
  }, [])

  /* Leaving fullscreen by Escape must not desync presentation state. */
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsPresenting(false)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (shouldIgnoreKey(e)) return

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          goToScene(activeIndex + 1)
          break
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          goToScene(activeIndex - 1)
          break
        case 'Home':
          e.preventDefault()
          goToScene(0)
          break
        case 'End':
          e.preventDefault()
          goToScene(scenes.length - 1)
          break
        case 'p':
        case 'P':
          e.preventDefault()
          togglePresenting()
          break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, goToScene, scenes.length, togglePresenting])

  const value = useMemo(
    () => ({ scenes, activeIndex, isPresenting, reportActive, goToScene }),
    [scenes, activeIndex, isPresenting, reportActive, goToScene],
  )

  return <SceneNavContext.Provider value={value}>{children}</SceneNavContext.Provider>
}
