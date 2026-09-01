import { useEffect } from 'react'
import { AboutSection } from '@/components/AboutSection'
import { BuildathonDetailsPage } from '@/components/BuildathonDetailsPage'
import { CodeOfConductPage } from '@/components/CodeOfConductPage'
import { CommunitySection } from '@/components/CommunitySection'
import { EventsSection } from '@/components/EventsSection'
import { FourDaysOfAIPage } from '@/components/FourDaysOfAIPage'
import { HeroSection } from '@/components/HeroSection'
import { InaugurationGallery } from '@/components/InaugurationGallery'
import { JoinSection } from '@/components/JoinSection'
import { JourneyExperience } from '@/components/JourneyExperience'
import { ProblemSection } from '@/components/ProblemSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

const pageTitles: Record<string, string> = {
  '/': 'FOSS Club · SRM University Delhi-NCR',
  '/about': 'About · FOSS Club',
  '/events': 'Events & Activities · FOSS Club',
  '/events/four-days-of-ai': 'Four Days of AI · FOSS Club',
  '/events/four-days-of-ai/buildathon': 'Buildathon Details · Four Days of AI',
  '/community': 'Community · FOSS Club',
  '/code-of-conduct': 'Code of Conduct · FOSS Club',
  '/journey': 'Our Journey · FOSS Club',
}

function CurrentPage({ path }: { path: string }) {
  if (path === '/about') return <><AboutSection /><ProblemSection /><InaugurationGallery /></>
  if (path === '/events') return <EventsSection />
  if (path === '/events/four-days-of-ai') return <FourDaysOfAIPage />
  if (path === '/events/four-days-of-ai/buildathon') return <BuildathonDetailsPage />
  if (path === '/community') return <><CommunitySection /><JoinSection /></>
  if (path === '/code-of-conduct') return <CodeOfConductPage />
  return <HeroSection />
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    document.title = pageTitles[path] ?? pageTitles['/']
    window.scrollTo(0, 0)
  }, [path])

  /* The journey is a full-screen presentation, so it renders outside the site
     shell entirely — the fixed header would otherwise sit over every scene. */
  if (path === '/journey') return <JourneyExperience />

  return (
    <div className={`site-shell page-${path === '/' ? 'home' : path.slice(1)}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <CurrentPage path={path} />
      </main>
      <SiteFooter />
    </div>
  )
}
