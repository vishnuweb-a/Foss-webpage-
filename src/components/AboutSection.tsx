import { DoodleArrow, DoodleIcon } from '@/components/DoodleIcon'
import { journeySteps } from '@/data/siteContent'

export function AboutSection() {
  return (
    <section className="about section" id="about">
      <header className="section-heading section-heading--center">
        <span className="section-number">01 · About the club</span>
        <h2>What is <span className="marker-underline">FOSS Club?</span></h2>
        <p>
          A community where students move from consuming technology to understanding,
          building, and improving it together.
        </p>
      </header>

      <div className="journey-board">
        {journeySteps.map((step, index) => (
          <div className="journey-item" key={step.title}>
            <article className={`sketch-card sketch-card--${step.tone}`}>
              <span className="card-number">{step.number}</span>
              <DoodleIcon name={step.icon} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.details}</small>
            </article>
            {index < journeySteps.length - 1 && <DoodleArrow />}
          </div>
        ))}
      </div>

      <blockquote className="ribbon-quote">
        “You don’t need to be an expert to join. You just need to be curious enough to start.”
      </blockquote>

      <div className="foss-explainer">
        <div>
          <span className="scribble-label">FOSS = Free and Open Source Software</span>
          <h3>Open code. Open learning.<br />Open possibilities.</h3>
        </div>
        <div className="freedoms">
          {['Use it', 'Study it', 'Improve it', 'Share it'].map((freedom, index) => (
            <span key={freedom}><b>0{index + 1}</b>{freedom}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
