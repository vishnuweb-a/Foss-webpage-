import { useEffect } from 'react'
import { AboutSection } from '@/components/AboutSection'
import { CodeOfConductPage } from '@/components/CodeOfConductPage'
import { CommunitySection } from '@/components/CommunitySection'
import { EventsSection } from '@/components/EventsSection'
import { HeroSection } from '@/components/HeroSection'
import { JoinSection } from '@/components/JoinSection'
import { ProblemSection } from '@/components/ProblemSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

const pageTitles: Record<string, string> = {
  '/': 'FOSS Club · SRM University Delhi-NCR',
  '/about': 'About · FOSS Club',
  '/events': 'Events & Activities · FOSS Club',
  '/community': 'Community · FOSS Club',
  '/code-of-conduct': 'Code of Conduct · FOSS Club',
}

function CurrentPage({ path }: { path: string }) {
  if (path === '/about') return <><AboutSection /><ProblemSection /></>
  if (path === '/events') return <EventsSection />
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
