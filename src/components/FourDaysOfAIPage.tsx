import { DoodleIcon } from '@/components/DoodleIcon'
import { events } from '@/data/siteContent'

const studentBenefits = [
  ['Live guided learning', 'Understand AI concepts and tools through practical, beginner-first sessions.'],
  ['A project you built', 'Move from an idea to a working AI-powered project you can demonstrate.'],
  ['Mentor support', 'Get help during ideation, building, debugging, and pitch preparation.'],
  ['GitHub experience', 'Learn how to work with Git, GitHub, repositories, and collaborative workflows.'],
  ['Team collaboration', 'Build alongside other learners and experience how technical teams work together.'],
  ['Demo-day confidence', 'Practice presenting your problem, solution, product decisions, and working demo.'],
]

export function FourDaysOfAIPage() {
  const event = events.find((item) => item.title === 'Four Days of AI')
  if (!event) return null

  return (
    <section className="ai-event-page section">
      <a className="event-back-link" href="/events">← Back to Events & Activities</a>

      <header className="ai-event-hero">
        <div className="ai-event-title">
          <span className="section-number">Free online AI program · Beginner friendly</span>
          <h1>Four Days<br />of <span className="marker-underline">AI.</span></h1>
          <p>{event.description}</p>
          <div className="ai-event-actions">
            <a className="sketch-button" href={event.ctaUrl} target="_blank" rel="noreferrer">
              Apply for free <span>↗</span>
            </a>
            <span>No registration fee · No prior AI experience required</span>
          </div>
        </div>

        <aside className="ai-event-date-card">
          <DoodleIcon name="learn" />
          <span>Date update</span>
          <strong>{event.date}</strong>
          <p>{event.dateNote}</p>
          <div><b>04</b><small>days from learning to pitching</small></div>
        </aside>
      </header>

      <div className="ai-event-quick-facts" aria-label="Event highlights">
        <div><span>₹0</span><p><b>Completely free</b>No application or participation fee</p></div>
        <div><span>100%</span><p><b>Online</b>Join from wherever you are</p></div>
        <div><span>01</span><p><b>Beginner buildathon</b>Guided from idea to working project</p></div>
        <div><span>04</span><p><b>Focused days</b>Learn, build, pitch, and grow</p></div>
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
          <p><b>04 · Pitch what you made</b>Show the problem, your approach, the working project, and what you learned.</p>
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
