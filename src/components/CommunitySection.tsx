import { facultyCoordinators } from '@/data/siteContent'

const communitySpaces = [
  ['Announcements', 'Know about workshops, opportunities, and club updates.'],
  ['Build together', 'Find teammates for projects, hackathons, and experiments.'],
  ['Contribution help', 'Ask about issues, pull requests, Git, or getting unstuck.'],
]

export function CommunitySection() {
  return (
    <section className="community section" id="community">
      <div className="community-intro">
        <span className="section-number">03 · Community</span>
        <h2>Open source is<br />a <span className="circled-word">team sport.</span></h2>
        <p>
          Find people to learn with, projects to join, and a place to ask the
          questions you thought were too small. Every contributor starts somewhere.
        </p>
        <div className="faculty-note">
          <span>Faculty coordinators</span>
          {facultyCoordinators.map((name) => <strong key={name}>{name}</strong>)}
        </div>
      </div>

      <div className="community-notebook">
        <span className="notebook-tape" />
        <p className="notebook-title">Inside the community</p>
        {communitySpaces.map(([title, description], index) => (
          <div className="notebook-row" key={title}>
            <span>0{index + 1}</span>
            <div><strong>{title}</strong><p>{description}</p></div>
            <b aria-hidden="true">→</b>
          </div>
        ))}
        <p className="notebook-note">Community handles will be added here once they are shared.</p>
      </div>
    </section>
  )
}
