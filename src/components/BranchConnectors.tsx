import { useLayoutEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
}

/**
 * Draws the connective tissue between stages as a Git-style branch.
 *
 * Points are measured from the live DOM rather than assumed from the layout, so
 * the same component draws a diagonal staircase on a wide screen and a vertical
 * trunk on a phone without any breakpoint-specific path maths.
 *
 * The component measures its own parent and finds anchors within it. Taking the
 * container as a prop looked tidier but could not work: React attaches a
 * parent's ref only after its children have committed, so a child layout effect
 * reading that ref always saw null.
 */
export function BranchConnectors({
  /** How far along the run the branch has been travelled, 0–1. */
  progress,
}: {
  progress: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const litRef = useRef<SVGPathElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const container = svgRef.current?.parentElement
    if (!container) return

    const measure = () => {
      const box = container.getBoundingClientRect()
      const anchors = Array.from(
        container.querySelectorAll<HTMLElement>('[data-anchor]'),
      )
      setSize({ w: box.width, h: box.height })
      setPoints(
        anchors.map((el) => {
          const r = el.getBoundingClientRect()
          return {
            x: r.left - box.left + r.width / 2,
            y: r.top - box.top + r.height / 2,
          }
        }),
      )
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    // Font swap changes label metrics, which moves the anchors.
    void document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  const d = buildPath(points)

  /* The lit portion is a dash-offset reveal on a clone of the same path, so the
     travelled route and the route ahead can never disagree. */
  useLayoutEffect(() => {
    const lit = litRef.current
    if (!lit || !d) return
    const len = lit.getTotalLength()
    lit.style.strokeDasharray = `${len}`
    lit.style.strokeDashoffset = `${len * (1 - Math.max(0, Math.min(1, progress)))}`
  }, [d, progress])

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={size.w > 0 ? `0 0 ${size.w} ${size.h}` : undefined}
      fill="none"
      aria-hidden="true"
    >
      {d && (
        <>
          <path d={d} className="stroke-rule" strokeWidth={1} />
          <path ref={litRef} d={d} className="stroke-accent" strokeWidth={1.5} />
        </>
      )}
    </svg>
  )
}

/**
 * A branch, not a spline: leave each node horizontally, arrive at the next
 * horizontally, and take the height change in the middle — the shape a commit
 * graph actually draws.
 */
function buildPath(points: Point[]): string {
  if (points.length < 2) return ''

  return points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = points[i - 1]
    const dx = (p.x - prev.x) * 0.5
    const dy = (p.y - prev.y) * 0.5
    // Vertical stacks (mobile) curve through Y; horizontal runs curve through X.
    return Math.abs(p.x - prev.x) > Math.abs(p.y - prev.y)
      ? `${acc} C ${prev.x + dx} ${prev.y}, ${p.x - dx} ${p.y}, ${p.x} ${p.y}`
      : `${acc} C ${prev.x} ${prev.y + dy}, ${p.x} ${p.y - dy}, ${p.x} ${p.y}`
  }, '')
}
