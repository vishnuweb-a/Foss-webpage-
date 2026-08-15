import { brand } from '@/data/content'
import { DoodleArrow } from '@/components/DoodleIcon'

export function HeroSection() {
  return (
    <section className="hero section" id="home">
      <div className="hero-doodle hero-doodle--star" aria-hidden="true">✦</div>
      <div className="hero-doodle hero-doodle--spark" aria-hidden="true">✷</div>
      <div className="hero-copy">
        <span className="tape-label">A student-led open-source community</span>
        <h1>
          Your ideas deserve<br />
          to be built <span className="circled-word">in the open</span>.
        </h1>
        <p>
          Learn the tools. Build real projects. Make your first contribution.
          Grow with students who are figuring it out alongside you.
        </p>
        <div className="hero-actions">
          <a className="sketch-button" href="#join">Join the community <span>→</span></a>
          <a className="plain-link" href="#about">See what we do <span>↓</span></a>
        </div>
        <div className="hero-note">
          <DoodleArrow />
          <span>You don’t need to be an expert.<br />You only need to be curious.</span>
        </div>
      </div>

      <div className="hero-poster" aria-label="FOSS Club journey poster">
        <span className="poster-pin poster-pin--left" />
        <span className="poster-pin poster-pin--right" />
        <img src={brand.logo} alt="" />
        <p className="poster-kicker">WELCOME TO</p>
        <p className="poster-title">FOSS CLUB</p>
        <div className="poster-code">
          <span><b>$</b> whoami</span>
          <span>future_contributor</span>
          <span><b>$</b> ./start-journey.sh</span>
          <span className="poster-success">✓ community found</span>
        </div>
        <span className="poster-caption">learn · build · contribute · grow</span>
      </div>
    </section>
  )
}
