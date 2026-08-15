import { brand } from '@/data/content'
import { DoodleArrow } from '@/components/DoodleIcon'
import { links } from '@/data/siteContent'

export function HeroSection() {
  return (
    <section className="hero section" id="home">
      <div className="hero-doodle hero-doodle--star" aria-hidden="true">✦</div>
      <div className="hero-doodle hero-doodle--spark" aria-hidden="true">✷</div>
      <div className="hero-copy">
        <span className="tape-label">A student-led open-source community</span>
        <h1>
          <span className="hero-line">Your ideas deserve to be</span>
          <span className="hero-line">built <span className="circled-word">in the open</span>.</span>
        </h1>
        <p>
          Learn the tools. Build real projects. Make your first contribution.
          Grow with students who are figuring it out alongside you.
        </p>
        <div className="hero-actions">
          <a className="sketch-button" href={links.whatsapp} target="_blank" rel="noreferrer">
            Join the community <span>↗</span>
          </a>
          <a className="plain-link" href="/about">See what we do <span>→</span></a>
        </div>
        <div className="hero-note">
          <DoodleArrow />
          <span>You don’t need to be an expert.<br />You only need to be curious.</span>
        </div>
      </div>

      <div className="hero-poster" aria-label="Welcome to FOSS Club">
        <span className="poster-orbit poster-orbit--one" aria-hidden="true" />
        <span className="poster-orbit poster-orbit--two" aria-hidden="true" />
        <div className="poster-logo-wrap"><img src={brand.logo} alt="" /></div>
        <p className="poster-kicker">WELCOME TO</p>
        <p className="poster-title">FOSS CLUB<span aria-hidden="true">_</span></p>
        <p className="poster-intro">A place to turn curiosity into contribution.</p>
        <div className="poster-code">
          <span><b>01</b> learn the foundations</span>
          <span><b>02</b> build something real</span>
          <span><b>03</b> contribute in public</span>
          <span className="poster-success"><b>04</b> grow together <i>●</i></span>
        </div>
        <span className="poster-caption">OPEN SOURCE STARTS WITH YOU →</span>
      </div>
    </section>
  )
}
