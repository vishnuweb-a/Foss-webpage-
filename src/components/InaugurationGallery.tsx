import inauguration01 from '@/assets/journey/inauguration-01.jpg'
import inauguration02 from '@/assets/journey/inauguration-02.jpg'
import inauguration03 from '@/assets/journey/inauguration-03.jpg'
import inauguration05 from '@/assets/journey/inauguration-05.jpg'

const photos = [
  { src: inauguration03, alt: 'Students and faculty gathered at the FOSS Club inauguration' },
  { src: inauguration05, alt: 'A student presenting during the FOSS Club inauguration' },
  { src: inauguration02, alt: 'Faculty members speaking at the FOSS Club inauguration' },
  { src: inauguration01, alt: 'A plant presented during the FOSS Club inauguration ceremony' },
]

export function InaugurationGallery() {
  return (
    <section className="inauguration-gallery section" aria-labelledby="inauguration-gallery-title">
      <header className="section-heading section-heading--split">
        <div>
          <span className="section-number">13 August 2026 · Our first chapter</span>
          <h2 id="inauguration-gallery-title">The day the idea<br /><span className="marker-underline">became a community.</span></h2>
        </div>
        <p>A few photographs from the FOSS Club inauguration at SRM University Delhi-NCR, Sonepat.</p>
      </header>

      <div className="inauguration-photo-grid">
        {photos.map((photo, index) => (
          <figure key={photo.src}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption><span>0{index + 1}</span>Inauguration diary</figcaption>
          </figure>
        ))}
      </div>

      <a className="inauguration-gallery-link" href="/journey">See the complete FOSS Club journey <span>→</span></a>
    </section>
  )
}
