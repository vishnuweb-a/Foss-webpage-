import { useState } from 'react'
import { brand } from '@/data/content'
import { links, navigation } from '@/data/siteContent'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

  const closeMenu = () => setMenuOpen(false)
  const isCurrent = (href: string) => currentPath === href || (href !== '/' && currentPath.startsWith(`${href}/`))

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={closeMenu} aria-label="FOSS Club home">
        <img src={brand.logo} alt={brand.logoAlt} />
        <span><strong>FOSS Club</strong><small>SRM University Delhi-NCR</small></span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>

      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            aria-current={isCurrent(item.href) ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
        <a
          className="sketch-button sketch-button--nav"
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Join Community <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}
