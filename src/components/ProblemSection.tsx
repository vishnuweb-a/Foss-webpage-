import { DoodleArrow, DoodleIcon } from '@/components/DoodleIcon'
import { problems } from '@/data/siteContent'

export function ProblemSection() {
  return (
    <section className="problem section" aria-labelledby="problem-title">
      <header className="section-heading section-heading--center">
        <span className="section-number">Why the club exists</span>
        <h2 id="problem-title">The Problem We’re Solving</h2>
        <p>Talent is everywhere. The right starting point isn’t.</p>
      </header>

      <div className="problem-board">
        <div className="problem-callout">Many students want to explore open source, but often struggle with:</div>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <div className="problem-item" key={problem.question}>
              <article className={`problem-card sketch-card--${problem.tone}`}>
                <DoodleIcon name={problem.icon} size="small" />
                <h3>{problem.question}</h3>
                <p>{problem.description}</p>
              </article>
              {index < problems.length - 1 && <DoodleArrow />}
            </div>
          ))}
        </div>
        <div className="solution-path">
          <span>Confusion</span><b>→</b><span>Guidance</span><b>→</b><span>Contribution</span><b>→</b><span>Opportunity</span>
        </div>
        <p className="board-caption">That’s where FOSS Club comes in.</p>
      </div>
    </section>
  )
}
