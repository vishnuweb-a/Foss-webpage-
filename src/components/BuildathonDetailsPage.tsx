import { DoodleIcon } from '@/components/DoodleIcon'
import { events } from '@/data/siteContent'

const roadmap = [
  {
    step: '01',
    time: '1 September · 9:00 PM',
    title: 'Buildathon opens',
    copy: 'Choose a useful problem, define the smallest version of your idea, and start building during the online support session.',
  },
  {
    step: '02',
    time: '1–2 September',
    title: 'Build your project',
    copy: 'Turn the idea into a working AI-powered project. Keep the scope focused, test the core experience, and document your work on GitHub.',
  },
  {
    step: '03',
    time: '2 September · 9:00 PM',
    title: 'Submissions close',
    copy: 'Submit your project before the deadline. Late submissions cannot be included in completion rewards or winner selection.',
  },
  {
    step: '04',
    time: '4 September · 7:30 PM',
    title: 'Winners announced',
    copy: 'Join the online closing ceremony to celebrate every completed project and meet the buildathon winners.',
  },
]

const submissionChecklist = [
  'Project name and the problem you chose to solve',
  'A short explanation of your AI-powered solution',
  'A public GitHub repository with a useful README',
  'A working demo, demo video, or clear product screenshots',
  'Participant details and a short note about what you learned',
]

const judgingCriteria = [
  ['Problem & usefulness', 'Is the problem clear, relevant, and worth solving?'],
  ['Working execution', 'Does the core experience work and demonstrate the idea?'],
  ['Use of AI', 'Is AI used meaningfully and responsibly in the solution?'],
  ['Technical clarity', 'Is the repository understandable, organized, and documented?'],
  ['Learning & originality', 'Does the project show thoughtful decisions and visible learning?'],
]

const rules = [
  'Build and submit the project within the official buildathon window.',
  'Submit original work and clearly credit APIs, libraries, datasets, templates, and other external resources.',
  'Keep a public GitHub repository available for review.',
  'Do not submit harmful, discriminatory, deceptive, or privacy-invasive projects.',
  'Use AI responsibly and never include private information or credentials in your repository.',
  'Follow the FOSS Club Code of Conduct throughout the program.',
]

const faqs = [
  ['Is the buildathon free?', 'Yes. There is no registration or participation fee.'],
  ['Do I need prior AI or hackathon experience?', 'No. The buildathon is beginner friendly and follows the guided learning sessions in Four Days of AI.'],
  ['When is the core building window?', 'It begins at 9:00 PM on 1 September 2026 and ends at 9:00 PM on 2 September 2026.'],
  ['What counts as completion?', 'Complete the required submission with an accessible GitHub repository and enough demo material for reviewers to understand your working project.'],
  ['When will winners be announced?', 'Winners will be announced during the online closing ceremony at 7:30 PM on 4 September 2026.'],
]

export function BuildathonDetailsPage() {
  const event = events.find((item) => item.title === 'Four Days of AI')
  if (!event) return null

  return (
    <section className="buildathon-page section">
      <a className="event-back-link" href={event.detailPath}>← Back to Four Days of AI</a>

      <header className="buildathon-hero">
        <div className="buildathon-hero-copy">
          <span className="section-number">Four Days of AI · Beginner-friendly buildathon</span>
          <h1>Build something<br /><span className="marker-underline">real</span> in 24 hours.</h1>
          <p>
            Take one useful idea from problem to working AI-powered project. The buildathon
            gives beginners a clear window, practical support, and a reason to finally ship.
          </p>
          <div className="ai-event-actions">
            <a className="sketch-button" href="#buildathon-roadmap">See how it works <span>↓</span></a>
            <span>Completely free · Built for first-time participants</span>
          </div>
        </div>

        <aside className="buildathon-window-card" aria-label="Core buildathon timing">
          <DoodleIcon name="build" />
          <span>Core building window</span>
          <time dateTime="2026-09-01T21:00:00+05:30">1 Sep · 9:00 PM</time>
          <b>to</b>
          <time dateTime="2026-09-02T21:00:00+05:30">2 Sep · 9:00 PM</time>
          <div><strong>24</strong><small>focused hours to build and submit</small></div>
        </aside>
      </header>

      <div className="buildathon-facts" aria-label="Buildathon highlights">
        <div><strong>₹0</strong><span><b>Completely free</b>No participation fee</span></div>
        <div><strong>24h</strong><span><b>Focused build window</b>9 PM to 9 PM</span></div>
        <div><strong>GitHub</strong><span><b>Build in the open</b>Document your working project</span></div>
        <div><strong>All</strong><span><b>Completion rewards</b>Certificate + GitHub stickers</span></div>
      </div>

      <section className="buildathon-intro buildathon-section">
        <header className="buildathon-section-heading">
          <span className="section-number">What is the buildathon?</span>
          <h2>A small idea.<br />A working outcome.</h2>
        </header>
        <div>
          <p>
            This is the hands-on part of Four Days of AI. You will use what you learned
            about Git, GitHub, AI foundations, and AI agents to build a practical project
            that another person can understand and try.
          </p>
          <p>
            The goal is not to build the biggest product. It is to choose a focused problem,
            complete a useful first version, document it clearly, and submit it on time.
          </p>
        </div>
      </section>

      <section className="buildathon-section" id="buildathon-roadmap">
        <header className="buildathon-section-heading buildathon-section-heading--center">
          <span className="section-number">End-to-end roadmap</span>
          <h2>From kickoff to celebration.</h2>
          <p>The core building window ends on 2 September. Review happens next, followed by the winner announcement on 4 September.</p>
        </header>
        <div className="buildathon-roadmap-grid">
          {roadmap.map((item) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <time>{item.time}</time>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="buildathon-prizes buildathon-section">
        <div className="buildathon-prizes-heading">
          <span className="section-number">Rewards & opportunities</span>
          <h2>Finish proud.<br />Move forward.</h2>
          <p>Every completed project matters, and the strongest builds unlock the next stage.</p>
        </div>
        <div className="buildathon-prize-list">
          <article>
            <span>For everyone who completes</span>
            <h3>Certificate + amazing GitHub stickers</h3>
            <p>Participants who complete the buildathon and submit a valid project receive a completion certificate and GitHub stickers.</p>
          </article>
          <article>
            <span>For the winners</span>
            <h3>Direct entry to the upcoming hackathon</h3>
            <p>Winning projects receive direct entry to the upcoming hackathon and the opportunity to keep building at the next level.</p>
          </article>
        </div>
      </section>

      <section className="buildathon-details-grid buildathon-section">
        <article>
          <span className="section-number">What to submit</span>
          <h2>Make your work review-ready.</h2>
          <ul className="buildathon-checklist">
            {submissionChecklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="buildathon-note">The final submission form and instructions will be shared with registered participants.</p>
        </article>
        <article>
          <span className="section-number">How projects are reviewed</span>
          <h2>Clear thinking beats extra features.</h2>
          <div className="buildathon-criteria">
            {judgingCriteria.map(([title, copy], index) => (
              <div key={title}><span>0{index + 1}</span><p><b>{title}</b>{copy}</p></div>
            ))}
          </div>
        </article>
      </section>

      <section className="buildathon-rules buildathon-section">
        <header className="buildathon-section-heading">
          <span className="section-number">Participation rules</span>
          <h2>Build openly.<br />Build responsibly.</h2>
          <p>These simple rules keep the experience fair, safe, and useful for everyone.</p>
        </header>
        <ol>
          {rules.map((rule, index) => <li key={rule}><span>0{index + 1}</span>{rule}</li>)}
        </ol>
      </section>

      <section className="buildathon-faq buildathon-section">
        <header className="buildathon-section-heading">
          <span className="section-number">Frequently asked questions</span>
          <h2>Before you start.</h2>
        </header>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="buildathon-cta">
        <div>
          <span className="section-number">Ready to build?</span>
          <h2>Your first version is enough.</h2>
          <p>Join Four Days of AI, learn the foundations, and use the buildathon to turn that learning into something real.</p>
        </div>
        <div>
          <a className="sketch-button" href={event.ctaUrl} target="_blank" rel="noreferrer">Apply for free <span>↗</span></a>
          <a className="plain-link" href={event.detailPath}>View the full event program <span>→</span></a>
        </div>
      </section>
    </section>
  )
}
