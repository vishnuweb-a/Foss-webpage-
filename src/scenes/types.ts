import type { ComponentType } from 'react'

export interface SceneDefinition {
  /** Stable id, also the scroll anchor target. */
  id: string
  /** Two-digit ordinal. Derived from registry order — never authored by hand. */
  ordinal: string
  /** Short rail label. Must read at projector distance. */
  label: string
  /**
   * Scroll length in viewport heights. The scene is pinned for this distance
   * and its timeline is scrubbed across it. 1 = a held frame with no scrub.
   */
  length: number
  Component: ComponentType<SceneProps>
}

/** Every scene receives its own definition and position. */
export interface SceneProps {
  def: SceneDefinition
  index: number
}
