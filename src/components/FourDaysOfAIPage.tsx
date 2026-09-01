import { DoodleIcon } from '@/components/DoodleIcon'
import { events } from '@/data/siteContent'
import bhawnaSpeakerPhoto from '@/assets/bhawna-chauhan-speaker.jpg'

const studentBenefits = [
  ['Live guided learning', 'Understand AI concepts and tools through practical, beginner-first sessions.'],
  ['A project you built', 'Move from an idea to a working AI-powered project you can demonstrate.'],
  ['Mentor support', 'Get help during ideation, building, debugging, and project completion.'],
  ['GitHub experience', 'Learn how to work with Git, GitHub, repositories, and collaborative workflows.'],
  ['Team collaboration', 'Build alongside other learners and experience how technical teams work together.'],
  ['Submission confidence', 'Learn how to finish and submit a clear, working buildathon project.'],
]

const speaker = {
  name: 'Bhawna Chauhan',
  role: 'DevRel Engineer & creative all-rounder at Superplane',
  bio: 'Bhawna builds developer-focused products, explains complex technology in a practical way and helps developers succeed with the tools they use. She is also building NobiRobotics as one of the founder and has worked across AI, developer tooling, open source and community programs.',
  highlights: ['MLH Fellow', 'GitHub Campus Expert', '20+ hackathon wins', 'MLH Top 50 Hacker'],
  linkedin: 'https://www.linkedin.com/in/pixawna/',
}

export function FourDaysOfAIPage() {
  const event = events.find((item) => item.title === 'Four Days of AI')
  if (!event) return null

  return (
    <section className="ai-event-page section">
      <a className="event-back-link" href="/events">← Back to Events & Activities</a>

      <header className="ai-event-hero">
        <div className="ai-event-title">
          <span className="section-number">Free AI program · Beginner friendly</span>
          <h1>Four Days<br />of <span className="marker-underline">AI.</span></h1>
          <p>{event.description}</p>
          <div className="ai-event-actions">
            <a className="sketch-button" href={event.buildathonPath}>
              View buildathon details <span>→</span>
            </a>
            <span>No registration fee · No prior AI experience required</span>
          </div>
        </div>

        <aside className="ai-event-date-card">
          <DoodleIcon name="learn" />
          <span>Save the date</span>
          <strong>{event.date}</strong>
          {event.dateNote && <p>{event.dateNote}</p>}
          <div><b>04</b><small>days from learning to winner announcements</small></div>
        </aside>
      </header>

      <div className="ai-event-quick-facts" aria-label="Event highlights">
        <div><span>₹0</span><p><b>Completely free</b>No application or participation fee</p></div>
        <div><span>Hybrid</span><p><b>Program format</b>In-person, online, and independent building</p></div>
        <div><span>01</span><p><b>Beginner buildathon</b>Guided from idea to working project</p></div>
        <div><span>04</span><p><b>Focused days</b>Learn, build, finish, and celebrate</p></div>
      </div>

      <section className="ai-benefits">
        <header className="ai-section-heading">
          <span className="section-number">What students will get</span>
          <h2>Leave with more than notes.</h2>
          <p>Every part of the program is designed to help a beginner produce visible, practical work.</p>
        </header>
        <div className="ai-benefit-grid">
          {studentBenefits.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

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

      <section className="ai-program">
        <header className="ai-section-heading ai-section-heading--split">
          <div>
            <span className="section-number">The complete program</span>
            <h2>Four days.<br />One working project.</h2>
          </div>
          <p>Each day builds on the previous one, so you are never expected to arrive knowing everything.</p>
        </header>
        <div className="ai-program-grid">
          {event.schedule.map((day) => (
            <article key={day.day}>
              <span>{day.day}</span>
              <h3>{day.title}</h3>
              <ul>{day.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-buildathon">
        <div>
          <span className="section-number">A buildathon made for beginners</span>
          <h2>You won’t be left alone with a blank screen.</h2>
        </div>
        <div className="ai-buildathon-steps">
          <p><b>01 · Pick a problem</b>Start with a clear, useful idea that can be built within the program.</p>
          <p><b>02 · Plan the smallest version</b>Mentors help you reduce the idea to something achievable and demonstrable.</p>
          <p><b>03 · Build with support</b>Use guided checkpoints, office hours, and technical help when you get stuck.</p>
          <p><b>04 · Submit what you made</b>Finish your working project and submit it before the building period closes.</p>
        </div>
      </section>

      <section className="ai-apply-panel">
        <div>
          <span className="section-number">Who should apply?</span>
          <h2>Curious is enough.</h2>
          <p>
            This program is for SRM students and other interested learners who want to
            understand AI by actually making something. You do not need prior AI,
            hackathon, or open-source experience.
          </p>
        </div>
        <div className="ai-apply-cta">
          <strong>Completely free to join</strong>
          <p>The final schedule and joining instructions will be shared with selected participants.</p>
          <a className="sketch-button" href={event.ctaUrl} target="_blank" rel="noreferrer">
            Apply here <span>↗</span>
          </a>
        </div>
      </section>
    </section>
  )
}
