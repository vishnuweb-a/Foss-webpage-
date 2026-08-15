import { AboutSection } from '@/components/AboutSection'
import { CommunitySection } from '@/components/CommunitySection'
import { EventsSection } from '@/components/EventsSection'
import { HeroSection } from '@/components/HeroSection'
import { JoinSection } from '@/components/JoinSection'
import { ProblemSection } from '@/components/ProblemSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProblemSection />
        <EventsSection />
        <CommunitySection />
        <JoinSection />
      </main>
      <SiteFooter />
    </div>
  )
}
