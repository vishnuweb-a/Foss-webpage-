import { useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { computeLayout, neighboursOf } from '@/three/layout'

/**
 * sRGB equivalents of the design tokens in styles/index.css.
 *
 * WebGL cannot read the OKLCH custom properties, so these are declared once
 * here and nowhere else in the 3D layer.
 */
const C = {
  accent: new THREE.Color('#2fd76c'),
  accentDeep: new THREE.Color('#1c8c47'),
  rule: new THREE.Color('#34363d'),
  dormant: new THREE.Color('#5f7a90'),
}

interface UniverseProps {
  /** Mutated by GSAP, never React state — scrolling must not re-render. */
  progressRef: RefObject<number>
  activeId: string | null
  onSelect: (id: string | null) => void
  /** Freezes the render loop when the scene is off screen. */
  running: boolean
}

export default function TechnologyUniverse({
  progressRef,
  activeId,
  onSelect,
  running,
}: UniverseProps) {
  const isCoarse =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches

  return (
    <Canvas
      // Never renders while the scene is off screen (FOSS.prd §28).
      frameloop={running ? 'always' : 'never'}
      dpr={isCoarse ? 1 : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 16], fov: 42 }}
      // The canvas is decorative duplication of the labelled list below it.
      aria-hidden="true"
    >
      <Constellation
        progressRef={progressRef}
        activeId={activeId}
        onSelect={onSelect}
      />
    </Canvas>
  )
}

function Constellation({
  progressRef,
  activeId,
  onSelect,
}: Omit<UniverseProps, 'running'>) {
  const { nodes, links } = useMemo(() => computeLayout(), [])
  const byId = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes],
  )
  const neighbours = useMemo(
    () => (activeId ? neighboursOf(activeId) : null),
    [activeId],
  )

  const group = useRef<THREE.Group>(null)
  const camera = useThree((s) => s.camera)
  const pointer = useThree((s) => s.pointer)

  const nodeMats = useRef<(THREE.MeshBasicMaterial | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Every edge in one buffer — one draw call for the whole network. */
  const baseGeometry = useMemo(() => {
    const pos = new Float32Array(links.length * 6)
    links.forEach((l, i) => {
      const a = byId.get(l.source)!
      const b = byId.get(l.target)!
      pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [links, byId])

  /* A second, shorter buffer holding only the selected node's relationships. */
  const litGeometry = useMemo(() => {
    if (!activeId) return null
    const related = links.filter(
      (l) => l.source === activeId || l.target === activeId,
    )
    if (related.length === 0) return null
    const pos = new Float32Array(related.length * 6)
    related.forEach((l, i) => {
      const a = byId.get(l.source)!
      const b = byId.get(l.target)!
      pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [activeId, links, byId])

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1)

    if (group.current) {
      // Orientation comes from scroll and cursor only. Left alone, it is still.
      group.current.rotation.y = -0.5 + p * 1.0 + pointer.x * 0.16
      group.current.rotation.x = pointer.y * -0.1
    }

    // Framed so the outermost nodes stay inside the viewport for the whole
    // dolly. Perspective FOV is vertical, so a portrait phone sees a much
    // narrower slice horizontally — without this the ecosystem is cropped off
    // both edges on mobile.
    const aspect = (camera as THREE.PerspectiveCamera).aspect || 1
    const widen = THREE.MathUtils.clamp(1.35 / aspect, 1, 2.2)
    camera.position.z = THREE.MathUtils.lerp(19, 14, p) * widen
    camera.lookAt(0, 0, 0)

    // The ecosystem wakes as you move through it: each node crosses its own
    // threshold, so the network assembles rather than simply appearing.
    nodes.forEach((n, i) => {
      const mat = nodeMats.current[i]
      const awake = p > (i / nodes.length) * 0.75
      const isActive = n.id === activeId
      const isNeighbour = neighbours?.has(n.id) ?? false

      if (mat) {
        mat.color.copy(
          isActive
            ? C.accent
            : isNeighbour
              ? C.accentDeep
              : awake
                ? C.dormant
                : C.rule,
        )
        mat.opacity = isActive ? 1 : awake ? 0.9 : 0.35
      }

      const label = labelRefs.current[i]
      if (label) {
        label.style.opacity = isActive ? '1' : awake ? '0.62' : '0.12'
        label.style.color = isActive ? '#2fd76c' : ''
      }
    })
  })

  return (
    <group ref={group}>
      <lineSegments geometry={baseGeometry}>
        <lineBasicMaterial color={C.rule} transparent opacity={0.55} />
      </lineSegments>

      {litGeometry && (
        <lineSegments geometry={litGeometry}>
          <lineBasicMaterial color={C.accent} transparent opacity={0.9} />
        </lineSegments>
      )}

      {nodes.map((n, i) => (
        <mesh
          key={n.id}
          position={[n.x, n.y, n.z]}
          scale={0.16 + n.weight * 0.075}
          onPointerOver={(e) => {
            e.stopPropagation()
            onSelect(n.id)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = ''
          }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(n.id)
          }}
        >
          {/* Wireframe polyhedra, not spheres: this should read as a diagram
              suspended in space, not as decorative 3D objects. */}
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            ref={(m) => {
              nodeMats.current[i] = m
            }}
            wireframe
            transparent
          />

          <Html
            center
            // Labels must never intercept the raycast that drives selection.
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            // Deliberately no distanceFactor: labels hold a constant screen
            // size so they stay legible from the back of a room and on a
            // phone, where the camera sits much further back. Depth is carried
            // by opacity instead.
          >
            <div
              ref={(el) => {
                labelRefs.current[i] = el
              }}
              className="text-ink-dim font-mono text-[0.7rem] whitespace-nowrap"
              // Clear of the wireframe rather than sitting across it.
              style={{ transform: 'translateY(3.9em)' }}
            >
              {n.label}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  )
}
