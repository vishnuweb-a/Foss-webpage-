import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/index.css'

/*
  Flag the journey route before React renders anything.

  It cannot wait for an effect. Scene mounts its ScrollTriggers in a layout
  effect, and child layout effects run before the parent's — so ScrollTrigger
  would read the club site's `scroll-behavior: smooth` off :root, then write it
  back inline after every refresh. Native smooth scrolling fights GSAP's
  ScrollToPlugin, leaving keyboard navigation animated twice and overshooting.
  Setting the flag here means the computed value is already `auto` the first
  time GSAP looks at it.
*/
if (window.location.pathname.replace(/\/$/, '') === '/journey') {
  document.documentElement.dataset.journey = 'true'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
