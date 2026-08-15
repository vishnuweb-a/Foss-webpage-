import { useState } from 'react'
import { brand, facultyCoordinators } from '@/data/content'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
]

const journey = [
  {
    number: '01',
    title: 'Learn',
    copy: 'Git, GitHub, AI, DevOps, cloud, and open-source fundamentals.',
    symbol: '</>',
  },
  {
    number: '02',
    title: 'Build',
    copy: 'Projects, hackathons, experiments, and real-world ideas.',
    symbol: '{ }',
  },
  {
    number: '03',
    title: 'Contribute',
    copy: 'Your first issue, collaboration, and pull request with a real community.',
    symbol: '↗',
  },
  {
    number: '04',
    title: 'Grow',
    copy: 'A public portfolio, mentors, internships, fellowships, and leadership.',
    symbol: '✦',
  },
]

const problems = [
  ['Where do I start?', 'Too many tools, projects, and resources can feel overwhelming.'],
  ['What should I build?', 'Move from tutorials to real projects that become proof of work.'],
  ['How do I contribute?', 'Learn the right project, issue, workflow, and people to approach.'],
  ['What can this unlock?', 'Discover fellowships, internships, mentorship, and open-source careers.'],
]

const events = [
  {
    type: 'Learn',
    title: 'Open Source 101',
    copy: 'A beginner-friendly introduction to FOSS, licenses, communities, and the contributor mindset.',
  },
  {
    type: 'Build',
    title: 'Git & GitHub Workshop',
    copy: 'Learn version control by doing: branches, commits, issues, pull requests, and code review.',
  },
  {
    type: 'Contribute',
    title: 'First Contribution Sprint',
    copy: 'Pick a welcoming repository, understand an issue, and ship a meaningful first contribution.',
  },
  {
    type: 'Create',
    title: 'Build Nights & Hackathons',
    copy: 'Team up around real problems, prototype openly, and turn classroom knowledge into working software.',
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand-link" href="#home" onClick={closeMenu} aria-label="FOSS Club home">
          <img src={brand.logo} alt={brand.logoAlt} />
          <span><strong>FOSS CLUB</strong><small>SRM University Delhi-NCR</small></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="button button-small" href="#join" onClick={closeMenu}>
            Join Community <ArrowIcon />
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section" id="home">
          <div className="hero-glow" aria-hidden="true" />
          <div className="eyebrow"><span /> Free & Open Source Software Club</div>
          <h1>Curious today.<br /><em>Contributor tomorrow.</em></h1>
          <p className="hero-copy">
            A student-led community for builders, contributors, and open-source enthusiasts.
            Learn the tools, build real projects, contribute in public, and grow together.
          </p>
          <div className="hero-actions">
            <a className="button" href="#join">Join the community <ArrowIcon /></a>
            <a className="text-link" href="#about">Explore the club <span>↓</span></a>
          </div>
          <div className="terminal-card" aria-label="A terminal welcoming a new contributor">
            <div className="terminal-bar"><i /><i /><i /><span>foss-club — community</span></div>
            <div className="terminal-body">
              <p><span className="prompt">$</span> whoami</p>
              <p className="response">future_contributor</p>
              <p><span className="prompt">$</span> ./start-journey.sh</p>
              <p className="success">✓ curiosity detected</p>
              <p className="success">✓ community found</p>
              <p className="success">✓ you belong here<span className="cursor" /></p>
            </div>
          </div>
          <div className="hero-footnote">You don’t need to be an expert to join. You just need to be curious enough to start.</div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-kicker">01 — About the club</div>
          <div className="section-heading">
            <h2>Learn in the open.<br />Build what matters.</h2>
            <p>
              FOSS means software whose source is open to use, study, improve, and share.
              Our club gives students the guidance, people, and practical space to take part in it.
            </p>
          </div>

          <div className="journey-grid">
            {journey.map((item) => (
              <article className="journey-card" key={item.title}>
                <div className="journey-top"><span>{item.number}</span><b>{item.symbol}</b></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="problem-block">
            <div className="problem-intro">
              <div className="section-kicker">The problem we’re solving</div>
              <h2>Talent is everywhere.<br />The right starting point isn’t.</h2>
              <p>We turn uncertainty into a practical path from first question to real opportunity.</p>
            </div>
            <div className="problem-list">
              {problems.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
            <div className="path-line">
              <span>Confusion</span><i>→</i><span>Guidance</span><i>→</i><span>Contribution</span><i>→</i><span>Opportunity</span>
            </div>
          </div>
        </section>

        <section className="section events-section" id="events">
          <div className="section-kicker">02 — Events</div>
          <div className="section-heading">
            <h2>Show up curious.<br />Leave with momentum.</h2>
            <p>Practical, welcoming sessions designed to help you move from learning alone to building together.</p>
          </div>
          <div className="events-grid">
            {events.map((event, index) => (
              <article className="event-card" key={event.title}>
                <div className="event-meta"><span>Planned activity</span><b>{event.type}</b></div>
                <div className="event-number">0{index + 1}</div>
                <h3>{event.title}</h3>
                <p>{event.copy}</p>
                <a href="#join">I’m interested <ArrowIcon /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section community-section" id="community">
          <div className="community-copy">
            <div className="section-kicker">03 — Community</div>
            <h2>Open source is a team sport.</h2>
            <p>
              Find people to learn with, projects to join, and a place to ask the questions
              you thought were too small. Every contributor starts somewhere.
            </p>
            <div className="coordinators">
              <span>{facultyCoordinators.label}</span>
              <p>{facultyCoordinators.names.join(' · ')}</p>
            </div>
          </div>
          <div className="community-links" aria-label="Community channels">
            <a href="#join"><span>01</span><strong>Announcements</strong><small>Events, workshops & opportunities</small><ArrowIcon /></a>
            <a href="#join"><span>02</span><strong>Build together</strong><small>Projects, teams & hackathons</small><ArrowIcon /></a>
            <a href="#join"><span>03</span><strong>Open-source help</strong><small>Issues, pull requests & guidance</small><ArrowIcon /></a>
          </div>
        </section>

        <section className="join-section" id="join">
          <img src={brand.logo} alt="" />
          <div className="section-kicker">Your first contribution begins here</div>
          <h2>Don’t just use technology.<br /><em>Be part of it.</em></h2>
          <p>Join the FOSS Club community and start learning, building, and contributing with us.</p>
          <a className="button button-light" href="mailto:?subject=I%20want%20to%20join%20FOSS%20Club">
            Join Community <ArrowIcon />
          </a>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><img src={brand.logo} alt="" /><span>FOSS CLUB</span></div>
        <p>Free & Open Source Software Club · SRM University Delhi-NCR, Sonepat</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}
