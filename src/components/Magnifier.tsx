import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

/** Tuned by eye: enough to reveal letterforms, not so much that words break up. */
const SCALE = 2.3
/** Lower trails further behind the cursor. Enough to read as glass with weight. */
const FOLLOW = 0.22
const REST_SCALE = 0.82

interface MagnifierProps {
  children: ReactNode
  className?: string
  scale?: number
}

/**
 * A cursor-following optical lens over existing typography.
 *
 * The magnified copy is a `cloneNode` snapshot taken on pointer enter rather
 * than a second React render of `children`. That matters for integration: every
 * scene hangs its GSAP timelines off `data-*` selectors and BranchConnectors
 * measures `[data-anchor]`, so a duplicated subtree would be picked up by both
 * and quietly corrupt the animation and the connector geometry. The snapshot is
 * stripped of every `data-*` and `id` before it is inserted, so the copy is
 * invisible to selectors, to timelines and to the accessibility tree.
 *
 * Nothing here moves layout: the lens is absolutely positioned and the original
 * text is never touched.
 */
export function Magnifier({ children, className, scale = SCALE }: MagnifierProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const holderRef = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)

  const st = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    s: REST_SCALE,
    ts: REST_SCALE,
    radius: 0,
    active: false,
    reduced: false,
  })

  /* A lens is a pointer affordance. On touch there is no cursor to follow, so
     the whole thing stays out of the DOM rather than shipping dead markup. */
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  )

  const draw = useCallback(() => {
    const lens = lensRef.current
    const holder = holderRef.current
    if (!lens || !holder) return
    const s = st.current
    const r = s.radius

    lens.style.transform = `translate3d(${s.x - r}px, ${s.y - r}px, 0) scale(${s.s})`

    // Anchor the magnified content so the point under the cursor sits exactly
    // at the centre of the lens: translate(r - k*x) then scale(k), origin 0 0.
    holder.style.transform = `translate(${r - scale * s.x}px, ${r - scale * s.y}px) scale(${scale})`
  }, [scale])

  const tick = useCallback(() => {
    const s = st.current
    const follow = s.reduced ? 1 : FOLLOW
    const grow = s.reduced ? 1 : 0.18

    s.x += (s.tx - s.x) * follow
    s.y += (s.ty - s.y) * follow
    s.s += (s.ts - s.s) * grow
    draw()

    if (!s.active && Math.abs(s.s - s.ts) < 0.003) {
      frame.current = null
      return
    }
    frame.current = requestAnimationFrame(tick)
  }, [draw])

  const start = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(tick)
  }, [tick])

  /** Copy the live text, stripped of anything a selector could latch onto. */
  const snapshot = useCallback(() => {
    const src = sourceRef.current
    const holder = holderRef.current
    if (!src || !holder) return

    const clone = src.cloneNode(true) as HTMLElement
    const strip = (el: Element) => {
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith('data-')) el.removeAttribute(attr.name)
      }
      el.removeAttribute('id')
      for (const child of Array.from(el.children)) strip(child)
    }
    strip(clone)

    // Matching the source width keeps line breaks identical under the lens.
    holder.style.width = `${src.offsetWidth}px`
    holder.replaceChildren(clone)
  }, [])

  const setTarget = useCallback((e: React.PointerEvent, snap: boolean) => {
    const host = hostRef.current
    if (!host) return
    const box = host.getBoundingClientRect()
    const s = st.current
    s.tx = e.clientX - box.left
    s.ty = e.clientY - box.top
    if (snap) {
      s.x = s.tx
      s.y = s.ty
    }
  }, [])

  const onEnter = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled || e.pointerType !== 'mouse') return
      const lens = lensRef.current
      if (!lens) return
      st.current.radius = lens.offsetWidth / 2
      snapshot()
      setTarget(e, true)
      st.current.active = true
      st.current.ts = 1
      lens.style.opacity = '1'
      draw()
      start()
    },
    [draw, enabled, setTarget, snapshot, start],
  )

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!st.current.active) return
      setTarget(e, false)
    },
    [setTarget],
  )

  const dismiss = useCallback(() => {
    const s = st.current
    if (!s.active) return
    s.active = false
    s.ts = REST_SCALE
    if (lensRef.current) lensRef.current.style.opacity = '0'
    start()
  }, [start])

  useEffect(() => {
    if (!enabled) return
    st.current.reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    /* The snapshot is a still. Scrolling can animate the source underneath it,
       so the lens closes rather than showing a stale copy. */
    window.addEventListener('scroll', dismiss, { passive: true })
    return () => {
      window.removeEventListener('scroll', dismiss)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [dismiss, enabled])

  return (
    <div
      ref={hostRef}
      className={`relative ${className ?? ''}`}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={dismiss}
    >
      <div ref={sourceRef}>{children}</div>

      {enabled && (
        <div
          ref={lensRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[clamp(9rem,13vw,14rem)] w-[clamp(9rem,13vw,14rem)] overflow-hidden rounded-full opacity-0 transition-opacity duration-200 ease-out will-change-transform"
          style={{
            // Surface rather than void: a shade lighter than the page, so the
            // disc reads as a physical object resting on it. Held at 94% with a
            // heavier blur behind — enough bleed to feel like glass, not enough
            // for the unmagnified text to double up against the magnified copy.
            backgroundColor: 'color-mix(in oklab, var(--color-surface) 94%, transparent)',
            backdropFilter: 'blur(6px) saturate(108%)',
            WebkitBackdropFilter: 'blur(6px) saturate(108%)',
            boxShadow: [
              // Thin bright edge where the glass catches light.
              'inset 0 1px 0 0 rgba(255,255,255,0.10)',
              // Gentle falloff toward the rim, standing in for the optical
              // curve. Any heavier and the lens reads as a dark blob.
              'inset 0 -14px 26px -20px rgba(0,0,0,0.55)',
              // The lens sits above the page, restrained.
              '0 12px 36px -18px rgba(0,0,0,0.8)',
            ].join(', '),
          }}
        >
          <div
            ref={holderRef}
            className="absolute left-0 top-0 origin-top-left will-change-transform"
          />

          {/* Rim and highlight, drawn over the magnified content. */}
          <div className="border-rule-bright/55 pointer-events-none absolute inset-0 rounded-full border" />
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(120% 120% at 30% 20%, rgba(255,255,255,0.055), rgba(255,255,255,0) 48%)',
            }}
          />
        </div>
      )}
    </div>
  )
}
