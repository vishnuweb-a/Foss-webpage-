import { useEffect } from 'react'
import { DoodleIcon } from '@/components/DoodleIcon'
import { brand } from '@/data/content'
import { events, links } from '@/data/siteContent'
import inauguration01 from '@/assets/journey/inauguration-01.jpg'
import inauguration02 from '@/assets/journey/inauguration-02.jpg'
import inauguration03 from '@/assets/journey/inauguration-03.jpg'
import inauguration04 from '@/assets/journey/inauguration-04.jpg'
import inauguration05 from '@/assets/journey/inauguration-05.jpg'
import inauguration06 from '@/assets/journey/inauguration-06.jpg'

const inaugurationPhotos = [
  { src: inauguration03, alt: 'Students and faculty gathered for the FOSS Club inauguration ceremony', size: 'wide' },
  { src: inauguration05, alt: 'A student speaker presenting during the FOSS Club inauguration', size: 'portrait' },
  { src: inauguration06, alt: 'Students attending the FOSS Club launch presentation', size: 'wide' },
  { src: inauguration02, alt: 'Faculty member addressing the FOSS Club inauguration ceremony', size: 'standard' },
  { src: inauguration01, alt: 'A plant presented during the FOSS Club inauguration ceremony', size: 'standard' },
  { src: inauguration04, alt: 'Faculty members speaking during the FOSS Club inauguration ceremony', size: 'standard' },
] as const

const fourDays = events.find((event) => event.title === 'Four Days of AI')
const hackAI = events.find((event) => event.title === 'HackAI by SRM')

const journeyMilestones = [
  {
    phase: 'Chapter 01 · The beginning',
    date: '13 August 2026',
    title: 'FOSS Club Inauguration',
    copy: 'The day the idea became a community. Students and faculty came together to open a space for learning, building, contributing, and growing in public.',
    status: 'We started here',
    icon: 'contribute' as const,
    tone: 'yellow',
  },
  {
    phase: 'Chapter 02 · Learn together',
    date: fourDays?.date ?? '1st to 4th September 2026',
    title: fourDays?.title ?? 'Four Days of AI',
    copy: 'A completely free, beginner-friendly program that takes students from AI foundations to a completed project and an online winner announcement.',
    status: 'Applications open',
    href: fourDays?.detailPath,
    icon: 'learn' as const,
    tone: 'blue',
  },
  {
    phase: 'Chapter 03 · Build together',
    date: hackAI?.date ?? '25–27 September 2026',
    title: hackAI?.title ?? 'HackAI by SRM',
    copy: 'A campus hackathon for multidisciplinary teams to solve real problems, build practical AI projects, and learn with mentors beside them.',
    status: 'Planned next',
    href: '/events',
    icon: 'build' as const,
    tone: 'orange',
  },
  {
    phase: 'The next wave · Keep contributing',
    date: 'The journey continues',
    title: 'Open-source community cycles',
    copy: 'Workshops, contribution sprints, project showcases, and student-led learning will keep turning first steps into visible proof of work.',
    status: 'More chapters ahead',
    href: '/community',
    icon: 'grow' as const,
    tone: 'green',
  },
]

export function JourneyExperience() {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.journey = 'true'
    return () => {
      delete root.dataset.journey
      delete root.dataset.presenting
    }
  }, [])

  return (
    <div className="club-journey">
      <a className="club-journey-skip" href="#journey-story">Skip to the journey</a>

      <header className="club-journey-nav">
        <a className="club-journey-brand" href="/" aria-label="FOSS Club home">
          <img src={brand.logo} alt={brand.logoAlt} />
          <span><strong>FOSS Club</strong><small>Our journey · SRM University Delhi-NCR</small></span>
        </a>
        <nav aria-label="Journey navigation">
          <a href="#our-beginning">Our beginning</a>
          <a href="#whats-next">What’s next</a>
          <a className="club-journey-home" href="/">Back home <span>↗</span></a>
        </nav>
      </header>

      <main id="journey-story">
        <section className="club-journey-hero">
          <a className="journey-back-home" href="/">← Back to the main home page</a>

          <div className="journey-hero-copy">
            <span className="journey-eyebrow">Our story is just getting started</span>
            <h1>From one room<br />to an <em>open-source</em><br />movement.</h1>
            <p>
              FOSS Club began with a simple belief: students grow faster when they
              learn together, build in public, and help one another contribute.
            </p>
            <a href="#our-beginning" className="journey-scroll-link">Follow the journey <span>↓</span></a>
          </div>

          <div className="journey-hero-postcard" aria-label="The first milestone">
            <span>Chapter 01</span>
            <DoodleIcon name="contribute" />
            <strong>13·08·2026</strong>
            <p>The day FOSS Club opened its doors.</p>
            <small>SRM University Delhi-NCR, Sonepat</small>
          </div>

          <svg className="journey-hero-wave" viewBox="0 0 1440 250" preserveAspectRatio="none" aria-hidden="true">
            <path d="M-20 155 C170 35 300 245 500 130 S820 20 1010 145 S1260 250 1470 90" />
            <path className="journey-hero-wave-shadow" d="M-20 180 C170 60 300 270 500 155 S820 45 1010 170 S1260 275 1470 115" />
          </svg>
        </section>

        <section className="journey-beginning" id="our-beginning">
          <header className="journey-section-heading">
            <span>13 August 2026 · Where it began</span>
            <h2>A room full of curious people.<br /><em>One shared beginning.</em></h2>
            <p>
              The inauguration brought students, faculty, and builders together to
              introduce the club, the problem we want to solve, and the journey ahead.
            </p>
          </header>

          <div className="journey-photo-river">
            {inaugurationPhotos.map((photo, index) => (
              <figure className={`journey-photo journey-photo--${photo.size}`} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading={index > 1 ? 'lazy' : 'eager'} />
                <figcaption><span>0{index + 1}</span>{index === 0 && 'The room where our story began'}</figcaption>
              </figure>
            ))}
          </div>

          <blockquote>
            “We did not launch a club just to host events. We launched a place where
            students can find their starting point and keep moving forward together”
          </blockquote>
        </section>

        <section className="journey-next" id="whats-next">
          <header className="journey-section-heading journey-section-heading--dark">
            <span>What comes after the launch?</span>
            <h2>The next chapters<br />move in <em>waves.</em></h2>
            <p>Each milestone takes us from curiosity to learning, from learning to building, and from building to contribution.</p>
          </header>

          <div className="journey-wave-timeline">
            <svg viewBox="0 0 1000 1500" preserveAspectRatio="none" aria-hidden="true">
              <path d="M500 0 C900 155 900 285 500 390 C100 495 100 650 500 755 C900 860 900 1015 500 1120 C100 1225 100 1370 500 1500" />
            </svg>

            {journeyMilestones.map((milestone, index) => (
              <article className={`journey-milestone journey-milestone--${milestone.tone}`} key={milestone.title}>
                <div className="journey-milestone-marker"><span>0{index + 1}</span></div>
                <div className="journey-milestone-card">
                  <div className="journey-milestone-icon"><DoodleIcon name={milestone.icon} /></div>
                  <span className="journey-milestone-phase">{milestone.phase}</span>
                  <time>{milestone.date}</time>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.copy}</p>
                  <footer>
                    <span>{milestone.status}</span>
                    {milestone.href && <a href={milestone.href}>Explore <span>↗</span></a>}
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-finale">
          <span>One launch. Many beginnings.</span>
          <h2>The story will be written<br />by everyone who <em>joins in.</em></h2>
          <div className="journey-finale-actions">
            <a href={links.whatsapp} target="_blank" rel="noreferrer">Join the community <span>↗</span></a>
            <a href="/events">See upcoming events <span>→</span></a>
          </div>
        </section>
      </main>

      <footer className="club-journey-footer">
        <div><img src={brand.logo} alt="" /><strong>FOSS Club</strong></div>
        <p>Learn · Build · Contribute · Grow</p>
        <a href="/">SRM University Delhi-NCR, Sonepat</a>
      </footer>
    </div>
  )
}
