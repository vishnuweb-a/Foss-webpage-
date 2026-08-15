import { brand } from '@/data/content'

export function JoinSection() {
  return (
    <section className="join section" id="join">
      <span className="join-star join-star--one" aria-hidden="true">✦</span>
      <span className="join-star join-star--two" aria-hidden="true">✷</span>
      <img src={brand.logo} alt="" />
      <span className="section-number">Ready when you are</span>
      <h2>Your first contribution<br />can start <span className="marker-underline">right here.</span></h2>
      <p>Join the FOSS Club and start learning, building, and contributing with students like you.</p>
      <a className="sketch-button" href="mailto:?subject=I%20want%20to%20join%20FOSS%20Club">Join Community <span>→</span></a>
      <small>Free to join · Beginner friendly · Curiosity required</small>
    </section>
  )
}
