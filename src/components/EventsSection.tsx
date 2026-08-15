import { DoodleIcon } from '@/components/DoodleIcon'
import { events } from '@/data/siteContent'

export function EventsSection() {
  return (
    <section className="events section" id="events">
      <header className="section-heading section-heading--split">
        <div>
          <span className="section-number">02 · Events & activities</span>
          <h2>Learn by doing,<br /><span className="marker-underline">together.</span></h2>
        </div>
        <p>Practical sessions designed to turn curiosity into confidence, one small win at a time.</p>
      </header>

      <div className="event-list">
        {events.map((event, index) => (
          <article className={`event-card event-card--${event.tone}`} key={event.title}>
            <span className="event-index">0{index + 1}</span>
            <DoodleIcon name={event.icon} size="small" />
            <div className="event-main">
              <span className="event-category">{event.category}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
            <div className="event-takeaway"><b>You’ll leave with</b><span>{event.takeaway}</span></div>
            <a href="#join" aria-label={`Register interest in ${event.title}`}>I’m interested <span>↗</span></a>
          </article>
        ))}
      </div>
    </section>
  )
}
