import { facultyCoordinators } from '@/data/siteContent'

export function CodeOfConductPage() {
  return (
    <section className="conduct-page section">
      <header className="conduct-page-header">
        <span className="section-number">FOSS Club · Community policy</span>
        <h1>Code of <span className="marker-underline">Conduct.</span></h1>
        <p>A shared standard for learning, building, and contributing safely together.</p>
      </header>

      <article className="conduct-document">
        <section className="conduct-summary">
          <span>TL;DR</span>
          <h2>Be kind. Be respectful. Help everyone belong.</h2>
          <p>
            FOSS Club is committed to creating a safe, welcoming, and inclusive space for
            builders. Harassment, hate speech, doxxing, unwelcome sexual attention, sustained
            disruption, and sharing private information without consent are not allowed.
            Reports will be reviewed carefully and confidentially.
          </p>
        </section>

        <section className="conduct-section">
          <span>01</span>
          <div>
            <h2>Introduction</h2>
            <p>
              FOSS Club is a community for students learning, building, and collaborating
              together. We welcome people of all backgrounds and experience levels. This Code
              explains the behaviour expected so everyone can participate safely and productively.
            </p>
          </div>
        </section>

        <section className="conduct-section">
          <span>02</span>
          <div>
            <h2>How to participate</h2>
            <ul className="conduct-list conduct-list--positive">
              <li><strong>Be respectful.</strong> Critique ideas, not people. Avoid personal attacks, insults, and slurs.</li>
              <li><strong>Be inclusive.</strong> Use welcoming language and make room for beginners and quieter voices.</li>
              <li><strong>Be constructive.</strong> Offer actionable feedback, share helpful resources, and accept corrections gracefully.</li>
              <li><strong>Protect privacy.</strong> Never share another person’s private data, messages, or credentials without permission.</li>
              <li><strong>Respect open source.</strong> Follow licences, credit contributors, and respect project and community rules.</li>
            </ul>
          </div>
        </section>

        <section className="conduct-section">
          <span>03</span>
          <div>
            <h2>Unacceptable behaviour</h2>
            <p>The following behaviours are prohibited in FOSS Club spaces and activities:</p>
            <ul className="conduct-list conduct-list--negative">
              <li>Harassment, intimidation, threats, discrimination, or hate speech.</li>
              <li>Unwelcome sexual advances, comments, imagery, or contact.</li>
              <li>Doxxing or publishing another person’s private information without consent.</li>
              <li>Sustained disruption of events, talks, meetings, chats, or collaboration spaces.</li>
              <li>Impersonation, fraud, plagiarism, or attempts to gain unauthorised access.</li>
              <li>Encouraging, defending, or promoting any of the behaviours above.</li>
            </ul>
          </div>
        </section>

        <section className="conduct-section">
          <span>04</span>
          <div>
            <h2>Reporting incidents</h2>
            <p>
              If you experience or witness unacceptable behaviour, report it as soon as you
              safely can. You may speak privately with an event organiser or either faculty
              coordinator. Reports will be handled discreetly and shared only with the people
              needed to respond.
            </p>
            <div className="conduct-coordinators">
              <span>Faculty Coordinators</span>
              <p>{facultyCoordinators.join(' · ')}</p>
            </div>
          </div>
        </section>

        <section className="conduct-section">
          <span>05</span>
          <div>
            <h2>Consequences</h2>
            <p>Depending on the severity and context, organisers and faculty coordinators may:</p>
            <ul className="conduct-list">
              <li>Give a private or verbal warning and request that the behaviour stop.</li>
              <li>Remove someone temporarily or permanently from an activity, channel, event, or the community.</li>
              <li>Refer a serious matter to university, venue, platform, or appropriate authorities when required.</li>
            </ul>
          </div>
        </section>

        <section className="conduct-section">
          <span>06</span>
          <div>
            <h2>Acknowledgement</h2>
            <p>
              By participating in FOSS Club events, projects, or channels, you agree to follow
              this Code of Conduct. Our goal is a constructive and respectful environment where
              every student can learn, collaborate, and contribute.
            </p>
          </div>
        </section>

        <section className="conduct-contact">
          <div>
            <span className="section-number">Questions, concerns, or incident reports</span>
            <h2>Contact the faculty coordinators.</h2>
          </div>
          <div>
            <strong>Faculty Coordinators</strong>
            {facultyCoordinators.map((name) => <p key={name}>{name}</p>)}
          </div>
        </section>
      </article>
    </section>
  )
}
