import { links } from '@/data/siteContent'

const commitments = [
  {
    number: '01',
    title: 'Be welcoming',
    copy: 'Make space for beginners, ask before assuming, and help people participate at their own pace.',
  },
  {
    number: '02',
    title: 'Be respectful',
    copy: 'Disagree with ideas without attacking people. Give feedback that is specific, kind, and useful.',
  },
  {
    number: '03',
    title: 'Build openly',
    copy: 'Credit people for their work, respect licenses, document decisions, and share knowledge generously.',
  },
  {
    number: '04',
    title: 'Protect the community',
    copy: 'Speak up when something feels unsafe and respect the privacy of anyone who reports a concern.',
  },
]

export function CodeOfConductPage() {
  return (
    <section className="conduct-page section">
      <header className="conduct-hero">
        <span className="section-number">Community standard · v1.0</span>
        <h1>Build freely.<br /><span className="marker-underline">Belong fully.</span></h1>
        <p>
          FOSS Club is a learning community for everyone. This Code of Conduct explains
          the behaviour we expect wherever the club gathers—online, on campus, or at an event.
        </p>
      </header>

      <div className="conduct-grid">
        {commitments.map((item) => (
          <article key={item.title}>
            <span>{item.number}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="conduct-details">
        <article>
          <span className="section-number">What is not acceptable</span>
          <h2>Harassment has no place here.</h2>
          <p>
            Harassment, discrimination, intimidation, unwanted sexual attention, deliberate
            exclusion, doxxing, sustained disruption, or sharing someone’s private information
            without permission will not be tolerated.
          </p>
        </article>
        <article>
          <span className="section-number">If something happens</span>
          <h2>Tell us. We will listen.</h2>
          <p>
            Contact a faculty coordinator or message a club organiser privately. Reports will be
            handled with care and shared only with the people needed to respond. Organisers may
            warn, remove, or ban anyone whose behaviour puts the community at risk.
          </p>
          <a className="sketch-button" href={links.whatsapp} target="_blank" rel="noreferrer">
            Contact the community <span>↗</span>
          </a>
        </article>
      </div>
    </section>
  )
}
