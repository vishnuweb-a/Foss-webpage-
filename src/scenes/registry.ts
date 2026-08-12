import type { SceneDefinition } from '@/scenes/types'
import { OpeningScene } from '@/scenes/OpeningScene'
import { WhatIsFossScene } from '@/scenes/WhatIsFossScene'
import { MindsetScene } from '@/scenes/MindsetScene'
import { TechnologyScene } from '@/scenes/TechnologyScene'
import { RealWorldScene } from '@/scenes/RealWorldScene'
import { ResponsibleScene } from '@/scenes/ResponsibleScene'
import { ContributionScene } from '@/scenes/ContributionScene'
import { ClubJourneyScene } from '@/scenes/ClubJourneyScene'
import { LearningModelScene } from '@/scenes/LearningModelScene'
import { OutcomesScene } from '@/scenes/OutcomesScene'
import { JourneyScene } from '@/scenes/JourneyScene'
import { FinaleScene } from '@/scenes/FinaleScene'

/**
 * The single source of truth for the experience.
 *
 * Order here defines scroll order, rail order, keyboard order, and ordinals.
 * Because ordinals are derived rather than authored, the rail can never drift
 * out of sync with the content — which is exactly how FOSS.prd §24 ended up
 * listing eleven entries for twelve sections.
 */
const sequence = [
  { id: 'opening', label: 'INTRO', length: 2, Component: OpeningScene },
  { id: 'what-is-foss', label: 'FOSS', length: 3, Component: WhatIsFossScene },
  { id: 'mindset', label: 'MINDSET', length: 3.5, Component: MindsetScene },
  { id: 'technology', label: 'TECHNOLOGY', length: 4, Component: TechnologyScene },
  { id: 'real-world', label: 'REAL WORLD', length: 3, Component: RealWorldScene },
  { id: 'responsibility', label: 'RESPONSIBILITY', length: 3.5, Component: ResponsibleScene },
  { id: 'contribution', label: 'CONTRIBUTION', length: 4, Component: ContributionScene },
  { id: 'club-journey', label: 'CLUB', length: 3.5, Component: ClubJourneyScene },
  { id: 'learning-model', label: 'LEARNING', length: 3, Component: LearningModelScene },
  { id: 'outcomes', label: 'OUTCOMES', length: 3, Component: OutcomesScene },
  { id: 'journey', label: 'JOURNEY', length: 3.5, Component: JourneyScene },
  { id: 'finale', label: 'WELCOME', length: 3.5, Component: FinaleScene },
] satisfies Omit<SceneDefinition, 'ordinal'>[]

export const scenes: SceneDefinition[] = sequence.map((scene, i) => ({
  ...scene,
  ordinal: String(i + 1).padStart(2, '0'),
}))
