export type JourneyStep = {
  number: string
  title: string
  description: string
  details: string
  tone: 'blue' | 'green' | 'purple' | 'orange'
  icon: 'learn' | 'build' | 'contribute' | 'grow'
}

export type Problem = {
  question: string
  description: string
  icon: 'compass' | 'idea' | 'network' | 'rocket'
  tone: JourneyStep['tone']
}

export type ClubEvent = {
  category: string
  title: string
  date: string
  dateNote?: string
  format: string
  audience: string
  description: string
  schedule: { day: string; title: string; items: string[] }[]
  outcomes: string[]
  ctaLabel: string
  ctaUrl?: string
  detailPath?: string
  icon: JourneyStep['icon']
  tone: JourneyStep['tone']
}

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events & Activities', href: '/events' },
  { label: 'Community', href: '/community' },
  { label: 'Journey', href: '/journey' },
] as const

export const links = {
  whatsapp: 'https://chat.whatsapp.com/JBZ3Vw2w34DEmwyL9NU6qT',
  instagram: 'https://www.instagram.com/foss.srmuh?igsi=bHVlbmxxOHl6eGF4',
  linkedin: 'https://in.linkedin.com/school/srm-university-haryana/',
  codeOfConduct: '/code-of-conduct',
} as const

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Learn',
    description: 'Understand the foundations before chasing the trends.',
    details: 'Git, GitHub, AI, DevOps, cloud, and open-source fundamentals',
    tone: 'blue',
    icon: 'learn',
  },
  {
    number: '02',
    title: 'Build',
    description: 'Turn what you learn into projects that actually work.',
    details: 'Projects, hackathons, experiments, and real-world ideas',
    tone: 'green',
    icon: 'build',
  },
  {
    number: '03',
    title: 'Contribute',
    description: 'Collaborate in public and make your first contribution.',
    details: 'Issues, pull requests, code reviews, and open communities',
    tone: 'purple',
    icon: 'contribute',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'Build visible proof of work and unlock opportunities.',
    details: 'GitHub profile, mentors, internships, fellowships, and leadership',
    tone: 'orange',
    icon: 'grow',
  },
]

export const problems: Problem[] = [
  {
    question: 'Where do I start?',
    description: 'Too many tools, projects, and resources can feel overwhelming.',
    icon: 'compass',
    tone: 'blue',
  },
  {
    question: 'What should I build?',
    description: 'Students need real projects that become public proof of work.',
    icon: 'idea',
    tone: 'green',
  },
  {
    question: 'How do I contribute?',
    description: 'Finding the right project, issue, and workflow is not always obvious.',
    icon: 'network',
    tone: 'purple',
  },
  {
    question: 'What can this unlock?',
    description: 'Fellowships, internships, mentorship, communities, and open-source careers.',
    icon: 'rocket',
    tone: 'orange',
  },
]

export const events: ClubEvent[] = [
  {
    category: 'AI bootcamp + beginner-friendly buildathon',
    title: 'Four Days of AI',
    date: '1st to 4th September 2026',
    format: 'Hybrid · In-person, online, and independent building sessions',
    audience: 'Open to SRM students and other interested learners',
    description: 'Learn the foundations of AI, explore modern developer tools, form a team, and build an AI-powered project with mentor guidance.',
    schedule: [
      {
        day: 'Day 01',
        title: 'Tuesday, 1 September · In person',
        items: ['10:00 AM–12:00 PM · Session 01: Version Control with Git and GitHub (session + doubts)', '1:00–2:00 PM · Session 02: AI Foundations', '9:00–11:00 PM · Online doubt session via Google Meet'],
      },
      {
        day: 'Day 02',
        title: 'Wednesday, 2 September · Online',
        items: ['8:00–9:00 PM · Session 01: Build your first project using an AI agent (session + doubts)', '9:30–10:00 PM · Session 02: Buildathon kickoff'],
      },
      {
        day: 'Day 03',
        title: 'Thursday, 3 September · Building period',
        items: ['Work independently on your buildathon project', '9:30 PM · Building period ends'],
      },
      {
        day: 'Day 04',
        title: 'Friday, 4 September · Online',
        items: ['7:30 PM · Closing ceremony', 'Winner announcements'],
      },
    ],
    outcomes: ['Build a practical AI project', 'Learn collaborative development', 'Receive mentor feedback', 'Complete and submit a working project'],
    ctaLabel: 'Apply here',
    ctaUrl: 'https://forms.gle/TW9pS4X9vsPNYjYWA',
    detailPath: '/events/four-days-of-ai',
    icon: 'learn',
    tone: 'blue',
  },
  {
    category: 'In-person AI hackathon',
    title: 'HackAI by SRM',
    date: 'September 25–27, 2026',
    format: 'In person · Three-day hackathon',
    audience: 'Hosted at SRM University Delhi-NCR, Sonepat',
    description: 'Build practical AI solutions in multidisciplinary teams with technical, product, design, GitHub, and deployment support.',
    schedule: [],
    outcomes: [],
    ctaLabel: 'Stay tuned',
    icon: 'grow',
    tone: 'orange',
  },
]

export const facultyCoordinators = ['Dr. Mani Devi', 'Dr. Priyanka Maan'] as const
