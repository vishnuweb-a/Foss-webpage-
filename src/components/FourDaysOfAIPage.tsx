import { fourDaysOfAIWinners } from '@/data/siteContent'
import bhawnaSpeakerPhoto from '@/assets/bhawna-chauhan-speaker.jpg'

const speaker = {
  name: 'Bhawna Chauhan',
  role: 'DevRel Engineer & creative all-rounder at Superplane',
  bio: 'Bhawna builds developer-focused products, explains complex technology in a practical way and helps developers succeed with the tools they use. She is also building NobiRobotics as one of the founder and has worked across AI, developer tooling, open source and community programs.',
  highlights: ['MLH Fellow', 'GitHub Campus Expert', '20+ hackathon wins', 'MLH Top 50 Hacker'],
  linkedin: 'https://www.linkedin.com/in/pixawna/',
}

export function FourDaysOfAIPage() {
  return (
    <section className="ai-event-page section">
      <a className="event-back-link" href="/events">← Back to Events & Activities</a>

      <header className="ai-event-hero ai-event-hero--winners">
        <div className="ai-event-title">
          <span className="section-number">Four Days of AI · Event highlights</span>
          <h1>Four Days<br />of <span className="marker-underline">AI.</span></h1>
          <p>Meet the speaker who guided the program and the student builders whose projects stood out.</p>
          <div className="ai-event-actions">
            <a className="sketch-button" href="#winners">
              View winners <span>↓</span>
            </a>
            <span>Celebrating learning, building, and visible proof of work</span>
          </div>
        </div>
      </header>

      <section className="ai-speaker">
        <div className="ai-speaker-intro">
          <span className="section-number">Meet your speaker</span>
          <img
            className="speaker-photo"
            src={bhawnaSpeakerPhoto}
            alt="Bhawna Chauhan, speaker for Four Days of AI"
          />
          <p>Learn from someone whose own journey began with hackathons and open source.</p>
        </div>
        <div className="ai-speaker-profile">
          <span>Speaker · Four Days of AI</span>
          <h2>{speaker.name}</h2>
          <strong>{speaker.role}</strong>
          <p>{speaker.bio}</p>
          <div className="speaker-highlights">
            {speaker.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
          </div>
          <a className="plain-link" href={speaker.linkedin} target="_blank" rel="noreferrer">
            View LinkedIn profile <span>↗</span>
          </a>
        </div>
      </section>

      <section className="ai-winners" id="winners">
        <header className="ai-section-heading ai-section-heading--split">
          <div>
            <span className="section-number">Four Days of AI · Top 6 winners</span>
            <h2>Six projects.<br />One big first <span className="marker-underline">step.</span></h2>
          </div>
          <p>
            These students took their ideas all the way to a public project. Explore
            their repositories and live builds below.
          </p>
        </header>
        <div className="ai-winner-grid">
          {fourDaysOfAIWinners.map((winner) => (
            <article className={`ai-winner-card ai-winner-card--${winner.rank}`} key={winner.name}>
              <div className="ai-winner-rank"><span>Top</span><strong>0{winner.rank}</strong></div>
              <span className="ai-winner-score">{winner.score}/10</span>
              <p className="ai-winner-project">{winner.project}</p>
              <h3>{winner.name}</h3>
              <p className="ai-winner-programme">{winner.programme}</p>
              <div className="ai-winner-links" aria-label={`${winner.name}'s project links`}>
                <a href={winner.githubUrl} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
                {winner.liveUrl && <a href={winner.liveUrl} target="_blank" rel="noreferrer">Live project <span>↗</span></a>}
                {winner.videoUrl && <a href={winner.videoUrl} target="_blank" rel="noreferrer">Video <span>↗</span></a>}
              </div>
            </article>
          ))}
        </div>
        <p className="ai-winners-note">Selected from submitted Four Days of AI buildathon projects. Project links are shared exactly as submitted by the participants.</p>
      </section>
    </section>
  )
}
