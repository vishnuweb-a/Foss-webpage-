let cached: boolean | null = null

/** WebGL is not guaranteed on lecture-hall machines; the scene must survive it. */
export function hasWebGL(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    cached = Boolean(
      canvas.getContext('webgl2') ?? canvas.getContext('webgl'),
    )
  } catch {
    cached = false
  }
  return cached
}
