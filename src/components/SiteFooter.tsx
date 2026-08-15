import { brand } from '@/data/content'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><img src={brand.logo} alt="" /><strong>FOSS Club</strong></div>
      <p>SRM University Delhi-NCR, Sonepat</p>
      <a href="#home">Back to top ↑</a>
    </footer>
  )
}
