import { useMemo } from 'react'
import { computeLayout } from '@/three/layout'

/**
 * The ecosystem without WebGL.
 *
 * Same force layout, flattened and drawn as SVG. The narrative point — that
 * these technologies are one connected system — survives intact, which is the
 * requirement; only the depth is lost.
 */
export function ConstellationFallback({ activeId }: { activeId: string | null }) {
  const { nodes, links } = useMemo(() => computeLayout(), [])
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  return (
    <svg
      viewBox="-9 -9 18 18"
      className="h-full w-full"
      aria-hidden="true"
      fill="none"
    >
      {links.map((l, i) => {
        const a = byId.get(l.source)!
        const b = byId.get(l.target)!
        const lit = l.source === activeId || l.target === activeId
        return (
          <line
            key={i}
            x1={a.x}
            y1={-a.y}
            x2={b.x}
            y2={-b.y}
            className={lit ? 'stroke-accent' : 'stroke-rule'}
            strokeWidth={lit ? 0.05 : 0.03}
          />
        )
      })}
      {nodes.map((n) => (
        <rect
          key={n.id}
          x={n.x - 0.11}
          y={-n.y - 0.11}
          width={0.22}
          height={0.22}
          className={n.id === activeId ? 'fill-accent' : 'fill-dormant'}
        />
      ))}
    </svg>
  )
}
