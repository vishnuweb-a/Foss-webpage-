import { brand } from '@/data/content'
import { links } from '@/data/siteContent'
import srmLogo from '@/assets/srm-university-sonepat.png'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-club">
        <img src={brand.logo} alt="" />
        <span><strong>FOSS Club</strong><small>Build in the open.</small></span>
      </div>

      <div className="footer-center">
        <nav className="footer-socials" aria-label="Social links">
          <a href={links.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </nav>
        <a className="conduct-link" href={links.codeOfConduct}>Code of Conduct</a>
      </div>

      <a className="footer-university" href="https://srmuniversity.ac.in/" target="_blank" rel="noreferrer">
        <img src={srmLogo} alt="SRM University Delhi-NCR, Sonepat" />
      </a>
    </footer>
  )
}
