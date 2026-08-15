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
  description: string
  takeaway: string
  icon: JourneyStep['icon']
  tone: JourneyStep['tone']
}

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
] as const

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
    category: 'Start here',
    title: 'Open Source 101',
    description: 'A friendly introduction to FOSS, licenses, communities, and contributor culture.',
    takeaway: 'Leave knowing what open source is and where you fit in.',
    icon: 'learn',
    tone: 'blue',
  },
  {
    category: 'Hands-on workshop',
    title: 'Git & GitHub Lab',
    description: 'Learn branches, commits, issues, pull requests, and reviews by doing them together.',
    takeaway: 'Leave with a repository and a practical workflow.',
    icon: 'build',
    tone: 'green',
  },
  {
    category: 'Contribution day',
    title: 'First PR Sprint',
    description: 'Choose a welcoming repository, understand an issue, and submit a useful change.',
    takeaway: 'Leave with your first genuine open-source contribution.',
    icon: 'contribute',
    tone: 'purple',
  },
  {
    category: 'Build together',
    title: 'Project & Hack Nights',
    description: 'Form a team around a real problem, prototype openly, and learn through collaboration.',
    takeaway: 'Leave with momentum, teammates, and something you built.',
    icon: 'grow',
    tone: 'orange',
  },
]

export const facultyCoordinators = ['Dr. Mani Devi', 'Dr. Priyanka Maan'] as const
