/**
 * All narrative copy for the experience.
 *
 * Components import from here and never inline strings, so the club can revise
 * wording without touching component logic (FOSS.prd §32).
 *
 * Voice rules (rules.prd §23, §24): direct, technical, curious. No marketing
 * abstractions. No invented statistics, counts, dates, or endorsements — if a
 * fact was not supplied in the PRD, it does not appear here.
 */

export const brand = {
  /** Wordmark only for now; a logo asset will replace this slot later. */
  wordmark: 'FOSS',
  logoSrc: null as string | null,
} as const

/* ─── 01 Opening ─────────────────────────────────────────────────────────── */

export type TerminalLine =
  | { kind: 'prompt'; text: string }
  | { kind: 'response'; text: string }
  | { kind: 'status'; text: string }
  | { kind: 'check'; text: string }

export const terminalSequence: TerminalLine[] = [
  { kind: 'prompt', text: 'whoami' },
  { kind: 'response', text: 'future_developer' },
  { kind: 'prompt', text: './start-journey.sh' },
  { kind: 'status', text: 'Initializing FOSS...' },
  { kind: 'check', text: 'Open Source' },
  { kind: 'check', text: 'Collaboration' },
  { kind: 'check', text: 'Innovation' },
  { kind: 'check', text: 'Contribution' },
  { kind: 'status', text: 'Journey initialized.' },
]

export const opening = {
  title: 'WELCOME TO FOSS',
  support: "Don't just use technology. Be part of it.",
  cue: 'STARTING JOURNEY',
} as const

/* ─── 02 What Is FOSS ────────────────────────────────────────────────────── */

export interface FreedomStage {
  id: string
  label: string
  body: string
}

export const freedoms: FreedomStage[] = [
  {
    id: 'use',
    label: 'USE',
    body: 'Explore software created and shared by the community.',
  },
  {
    id: 'study',
    label: 'STUDY',
    body: 'Open the source. Understand how the software actually works.',
  },
  {
    id: 'modify',
    label: 'MODIFY',
    body: 'Adapt and improve it for what you need it to do.',
  },
  {
    id: 'share',
    label: 'SHARE',
    body: 'Pass on the knowledge, the improvements, and the software.',
  },
  {
    id: 'contribute',
    label: 'CONTRIBUTE',
    body: 'Give your improvements back to the people who will use them next.',
  },
]

export const whatIsFoss = {
  title: 'WHAT IS FOSS?',
  standfirst: 'Five things you are allowed to do. That is the whole idea.',
} as const

/* ─── 03 The FOSS Mindset ────────────────────────────────────────────────── */

export interface MindsetStage {
  id: string
  label: string
  body: string
}

export const mindsetStages: MindsetStage[] = [
  { id: 'consumer', label: 'CONSUMER', body: 'You install it. It works. You move on.' },
  { id: 'explorer', label: 'EXPLORER', body: 'You open the repository and read how it works.' },
  { id: 'builder', label: 'BUILDER', body: 'You use it to make something of your own.' },
  { id: 'collaborator', label: 'COLLABORATOR', body: 'You build alongside other people.' },
  { id: 'contributor', label: 'CONTRIBUTOR', body: 'Your change ships to everyone using it.' },
  { id: 'creator', label: 'OPEN-SOURCE CREATOR', body: 'You start the thing others build on.' },
]

export const mindset = {
  premise: 'FOSS IS NOT JUST ABOUT SOFTWARE.',
  turn: "IT'S ABOUT A MINDSET.",
} as const

/* ─── 04 Technology Universe ─────────────────────────────────────────────── */

export const universe = {
  title: 'YOUR TECHNOLOGY UNIVERSE',
  standfirst: 'Every one of these is open. Every one of these is yours to open.',
  hint: 'Select a node',
} as const

/* ─── 05 Classroom → Real World ──────────────────────────────────────────── */

export const classroom = {
  heading: 'CLASSROOM',
  stages: ['LEARN', 'ASSIGNMENT', 'EXAM'],
} as const

export const realWorld = {
  heading: 'REAL WORLD',
  stages: ['LEARN', 'BUILD', 'COLLABORATE', 'DEPLOY', 'CONTRIBUTE'],
} as const

export const beyondClassroom = {
  title: 'Move beyond classroom learning.',
  gains: [
    'Practical skills',
    'Teamwork',
    'Problem solving',
    'Version control',
    'Project experience',
    'Industry workflows',
  ],
} as const

/* ─── 06 Responsible Open Source ─────────────────────────────────────────── */

export const responsible = {
  title: "DON'T BUILD EVERYTHING FROM SCRATCH.",
  turn: "Someone may have already solved the problem you're trying to solve.",
  flow: ['PROBLEM', 'SEARCH', 'DISCOVER', 'UNDERSTAND', 'CUSTOMIZE', 'BUILD'],
  principles: [
    'Read the documentation',
    'Understand the project',
    'Check the license',
    'Respect project rules',
    'Customize responsibly',
    'Give appropriate credit',
    'Understand your dependencies',
  ],
  close: 'Use open source. Learn from it. Respect it.',
} as const

/* ─── 07 Contribution ────────────────────────────────────────────────────── */

export interface LadderRung {
  id: string
  label: string
  body: string
}

export const ladder: LadderRung[] = [
  { id: 'use', label: 'USE', body: 'Run it. Depend on it. Notice what breaks.' },
  { id: 'understand', label: 'UNDERSTAND', body: 'Read the code and the issues.' },
  { id: 'report', label: 'REPORT', body: 'File a clear bug report. This is a real contribution.' },
  { id: 'document', label: 'DOCUMENT', body: 'Fix the typo. Clarify the README. Improve an example.' },
  { id: 'discuss', label: 'DISCUSS', body: 'Answer a question. Reproduce someone else’s bug.' },
  { id: 'code', label: 'CODE', body: 'Take a good-first-issue and open a pull request.' },
  { id: 'contribute', label: 'CONTRIBUTE', body: 'Your name is in the history of the project.' },
]

export const contribution = {
  title: "YOU DON'T HAVE TO BE AN EXPERT TO CONTRIBUTE.",
  close: 'Your first contribution can start small.',
} as const

/* ─── 08 Club Journey ────────────────────────────────────────────────────── */

export interface Phase {
  id: string
  index: string
  label: string
  body: string
  items: string[]
}

export const phases: Phase[] = [
  {
    id: 'explore',
    index: '01',
    label: 'EXPLORE',
    body: 'Learn the fundamentals and the tools everything else is built on.',
    items: ['FOSS fundamentals', 'Git', 'GitHub', 'Linux', 'Developer tools'],
  },
  {
    id: 'build',
    index: '02',
    label: 'BUILD',
    body: 'Turn what you learned into things that actually run.',
    items: ['Mini projects', 'Web', 'AI experiments', 'APIs', 'Cloud', 'Automation'],
  },
  {
    id: 'collaborate',
    index: '03',
    label: 'COLLABORATE',
    body: 'Work the way real teams work.',
    items: ['Team projects', 'Issues', 'Pull requests', 'Code review', 'Hackathons'],
  },
  {
    id: 'contribute',
    index: '04',
    label: 'CONTRIBUTE',
    body: 'Step into the real open-source ecosystem.',
    items: [
      'Beginner-friendly repos',
      'Find an issue',
      'Submit a PR',
      'Join communities',
      'Build a portfolio',
    ],
  },
]

export const clubJourney = { title: 'OUR JOURNEY TOGETHER' } as const

/* ─── 09 Learning Model ──────────────────────────────────────────────────── */

/** Weights are the club's stated emphasis from FOSS.prd §15, not measurements. */
export const learningModel = {
  title: 'HOW WE LEARN',
  note: 'Emphasis, not a syllabus.',
  bands: [
    { id: 'learn', label: 'LEARN', weight: 20, body: 'Understand the technology.' },
    { id: 'explore', label: 'EXPLORE', weight: 30, body: 'Experiment. Break things.' },
    { id: 'build', label: 'BUILD', weight: 40, body: 'Create real projects.' },
    { id: 'contribute', label: 'CONTRIBUTE', weight: 10, body: 'Give back.' },
  ],
} as const

/* ─── 10 Outcomes ────────────────────────────────────────────────────────── */

export interface Outcome {
  id: string
  label: string
  body: string
}

export const outcomes: Outcome[] = [
  { id: 'skills', label: 'SKILLS', body: 'Technical and problem-solving.' },
  { id: 'projects', label: 'PROJECTS', body: 'Real things you built.' },
  { id: 'github', label: 'GITHUB', body: 'A profile with history behind it.' },
  { id: 'contributions', label: 'CONTRIBUTIONS', body: 'Real open-source activity.' },
  { id: 'portfolio', label: 'PORTFOLIO', body: 'Evidence of practical work.' },
  { id: 'community', label: 'COMMUNITY', body: 'Peers and developers who know you.' },
  { id: 'experience', label: 'EXPERIENCE', body: 'Industry-relevant workflows.' },
]

export const outcomesMeta = {
  title: 'WHAT WILL YOU WALK AWAY WITH?',
  close: 'Your experience becomes your portfolio.',
} as const

/* ─── 11 The FOSS Journey ────────────────────────────────────────────────── */

export const journeySteps = [
  'CURIOUS',
  'LEARN',
  'EXPLORE',
  'BUILD',
  'COLLABORATE',
  'CONTRIBUTE',
  'LEAD',
] as const

export const journeyMeta = {
  from: 'From learning technology',
  to: 'to shaping technology.',
} as const

/* ─── 12 Final ───────────────────────────────────────────────────────────── */

export const finale = {
  line1: "DON'T JUST",
  line2: 'CONSUME',
  line3: 'TECHNOLOGY.',
  turn: 'SHAPE IT.',
  welcome: 'WELCOME TO FOSS',
  support: 'Learn. Build. Collaborate. Contribute.',
  cta: 'Your first contribution could start today.',
} as const
