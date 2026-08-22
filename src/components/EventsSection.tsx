import { DoodleIcon } from '@/components/DoodleIcon'
import { events } from '@/data/siteContent'

export function EventsSection() {
  return (
    <section className="events section" id="events">
      <header className="section-heading section-heading--split">
        <div>
          <span className="section-number">02 · Events & activities</span>
          <h2>Two launches.<br /><span className="marker-underline">One builder journey.</span></h2>
        </div>
        <p>
          Start online with the fundamentals, ship your first AI project, then come
          together on campus for a three-day hackathon.
        </p>
      </header>

      <div className="event-list">
        {events.map((event, index) => (
          <article className={`event-card event-card--${event.tone}`} key={event.title}>
            <header className="event-card-header">
              <div className="event-identity">
                <span className="event-index">0{index + 1}</span>
                <DoodleIcon name={event.icon} size="small" />
                <div>
                  <span className="event-category">{event.category}</span>
                  <h3>{event.title}</h3>
                </div>
              </div>
              <div className="event-date">
                <span>{event.dateNote ? 'Date update' : 'Save the date'}</span>
                <strong>{event.date}</strong>
                {event.dateNote && <small>{event.dateNote}</small>}
              </div>
            </header>

            <div className="event-overview">
              <p className="event-description">{event.description}</p>
              <dl className="event-facts">
                <div><dt>Format</dt><dd>{event.format}</dd></div>
                <div><dt>Who can join</dt><dd>{event.audience}</dd></div>
              </dl>
            </div>

            {event.detailPath ? (
              <footer className="event-footer event-footer--preview">
                <p>Explore the complete four-day schedule, everything students will receive, how the beginner-friendly buildathon works, and how to apply.</p>
                <a className="sketch-button" href={event.detailPath}>
                  View full program <span>→</span>
                </a>
              </footer>
            ) : (
              <>
                <div className="event-schedule">
                  <div className="event-subheading"><span>Program</span><b>{event.schedule.length} days from learning to demo</b></div>
                  <div className={`schedule-grid ${event.schedule.length === 4 ? 'schedule-grid--four' : ''}`}>
                    {event.schedule.map((day) => (
                      <section key={day.day}>
                        <span>{day.day}</span>
                        <h4>{day.title}</h4>
                        <ul>{day.items.map((item) => <li key={item}>{item}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                </div>

                <div className="event-gains">
                  <div className="event-subheading"><span>What you’ll gain</span></div>
                  <ul className="event-outcomes">{event.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                </div>

                <footer className="event-footer">
                  <p>Registration details and participant handbooks will be shared with the community.</p>
                  {event.ctaUrl ? (
                    <a className="sketch-button" href={event.ctaUrl} target="_blank" rel="noreferrer" aria-label={`Apply for ${event.title}`}>
                      {event.ctaLabel} <span>↗</span>
                    </a>
                  ) : (
                    <button className="sketch-button event-cta-disabled" type="button" disabled>
                      {event.ctaLabel}
                    </button>
                  )}
                </footer>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
