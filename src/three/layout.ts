import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from 'd3-force'
import { techLinks, techNodes, type TechNode } from '@/data/technologies'

export interface PositionedNode extends TechNode {
  x: number
  y: number
  z: number
}

export interface PositionedLink {
  source: string
  target: string
  relation: string
}

interface SimNode extends SimulationNodeDatum, TechNode {}

const RADIUS = 5.3
const DEPTH = 1.7

/**
 * Resolves the ecosystem into space using a force simulation.
 *
 * Run to completion synchronously rather than animated: the layout is the
 * ecosystem's structure, not a physics toy, and a settling jiggle on entry
 * would be motion with nothing to say (rules.prd §15).
 *
 * d3's default placement is a deterministic phyllotaxis spiral and no random
 * source is introduced here, so the same graph always resolves identically —
 * the composition can be art-directed rather than gambled on.
 */
export function computeLayout(): {
  nodes: PositionedNode[]
  links: PositionedLink[]
} {
  const nodes: SimNode[] = techNodes.map((n) => ({ ...n }))
  const links: SimulationLinkDatum<SimNode>[] = techLinks.map((l) => ({
    source: l.source,
    target: l.target,
  }))

  const sim = forceSimulation(nodes)
    .force(
      'link',
      forceLink<SimNode, SimulationLinkDatum<SimNode>>(links)
        .id((d) => d.id)
        .distance(3.1)
        .strength(0.55),
    )
    .force('charge', forceManyBody().strength(-260))
    .force('center', forceCenter(0, 0))
    .force('collide', forceCollide(1.15))
    .stop()

  sim.tick(320)

  // Normalise into a disc of known radius so camera framing is predictable.
  const extent = Math.max(
    ...nodes.map((n) => Math.hypot(n.x ?? 0, n.y ?? 0)),
    0.001,
  )
  const scale = RADIUS / extent

  return {
    nodes: nodes.map((n, i) => ({
      id: n.id,
      label: n.label,
      body: n.body,
      weight: n.weight,
      x: (n.x ?? 0) * scale,
      y: (n.y ?? 0) * scale,
      // Depth is assigned, not simulated: a fixed irrational stride spreads the
      // nodes across Z without clustering, and stays identical across reloads.
      z: (((i * 0.6180339887) % 1) - 0.5) * 2 * DEPTH,
    })),
    links: techLinks.map((l) => ({ ...l })),
  }
}

/** Adjacency for highlighting a node's immediate relationships. */
export function neighboursOf(id: string): Set<string> {
  const set = new Set<string>()
  for (const l of techLinks) {
    if (l.source === id) set.add(l.target)
    if (l.target === id) set.add(l.source)
  }
  return set
}
