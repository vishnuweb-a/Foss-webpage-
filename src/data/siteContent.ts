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
  format: string
  audience: string
  description: string
  participation: string[]
  schedule: { day: string; title: string; items: string[] }[]
  tracks: string[]
  outcomes: string[]
  icon: JourneyStep['icon']
  tone: JourneyStep['tone']
}

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events & Activities', href: '/events' },
  { label: 'Community', href: '/community' },
] as const

export const links = {
  whatsapp: 'https://chat.whatsapp.com/JBZ3Vw2w34DEmwyL9NU6qT',
  instagram: 'https://instagram.com/srmuniversitydelhincrsnp',
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
    category: 'Online AI bootcamp + 24-hour buildathon',
    title: 'Three Days of AI',
    date: 'August 21–23, 2026',
    format: 'Completely online · Beginner friendly',
    audience: 'Open to SRM students and other interested learners',
    description: 'Learn the foundations of AI, explore modern developer tools, form a team, and build an AI-powered project with mentor guidance.',
    participation: ['150–300 registrations', '75–150 active participants', 'Teams of 2–4', '20–40 expected submissions'],
    schedule: [
      {
        day: 'Day 01',
        title: 'AI Foundations',
        items: ['FOSS, Git and GitHub', 'AI, machine learning and generative AI', 'Responsible and ethical AI', 'Tools, platforms and Q&A'],
      },
      {
        day: 'Day 02',
        title: 'Building with AI',
        items: ['APIs and AI models', 'AI agents and automation', 'GitHub Copilot and assisted development', 'Ideation, team formation and buildathon kickoff'],
      },
      {
        day: 'Day 03',
        title: 'Buildathon & Demo Day',
        items: ['Mentor office hours', 'Project checkpoint and final submission', 'Project presentations and judging', 'Feedback, winners and next steps'],
      },
    ],
    tracks: ['Education', 'Healthcare & Well-being', 'Accessibility', 'Sustainability', 'Productivity', 'Campus Life', 'Open Innovation'],
    outcomes: ['Build a practical AI project', 'Learn collaborative development', 'Receive mentor feedback', 'Present a working submission'],
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
    participation: ['100–150 participants', 'Teams of 2–4', '25–40 participating teams', 'Mentors, judges and student volunteers'],
    schedule: [
      {
        day: 'Day 01',
        title: 'Opening & Kick-off',
        items: ['Registration and opening ceremony', 'FOSS and HackAI introduction', 'Problem statements, tracks and rules', 'Team formation, validation and hackathon start'],
      },
      {
        day: 'Day 02',
        title: 'Building & Mentorship',
        items: ['Full project-building day', 'Technical, product and design mentorship', 'GitHub and deployment support', 'Progress checkpoints and project feedback'],
      },
      {
        day: 'Day 03',
        title: 'Submission & Demo Day',
        items: ['Final development and submission', 'Technical screening', 'Project demonstrations and jury evaluation', 'Awards, certificates and closing ceremony'],
      },
    ],
    tracks: ['Education', 'Smart Cities', 'Social Impact', 'Sustainability', 'Healthcare', 'Developer Productivity', 'Open Innovation'],
    outcomes: ['Build a practical AI solution', 'Collaborate across disciplines', 'Learn from mentors and professionals', 'Showcase work to faculty and judges'],
    icon: 'grow',
    tone: 'orange',
  },
]

export const facultyCoordinators = ['Dr. Mani Devi', 'Dr. Priyanka Maan'] as const
