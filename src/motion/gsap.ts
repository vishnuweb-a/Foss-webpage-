import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/** Shared motion language. Scenes pick from these rather than inventing easings. */
export const EASE = {
  /** Entrances and reveals. */
  out: 'expo.out',
  /** Transformations where the midpoint should feel decisive. */
  inOut: 'power4.inOut',
} as const

export { gsap, ScrollTrigger }
