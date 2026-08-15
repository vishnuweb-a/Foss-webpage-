type IconName = 'learn' | 'build' | 'contribute' | 'grow' | 'compass' | 'idea' | 'network' | 'rocket'

type DoodleIconProps = {
  name: IconName
  size?: 'small' | 'large'
}

export function DoodleIcon({ name, size = 'large' }: DoodleIconProps) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <span className={`doodle-icon doodle-icon--${size}`} aria-hidden="true">
      <svg viewBox="0 0 64 64">
        {name === 'learn' && <>
          <path {...common} d="M10 17h17c4 0 6 2 6 6v27c-2-3-5-4-9-4H10z" />
          <path {...common} d="M54 17H37c-4 0-6 2-6 6v27c2-3 5-4 9-4h14zM16 25h10M16 31h8M39 25h10M39 31h8" />
          <path {...common} d="M31 10v5M22 12l3 4M40 12l-3 4" />
        </>}
        {name === 'build' && <>
          <rect {...common} x="10" y="14" width="44" height="34" rx="3" />
          <path {...common} d="M10 22h44M18 18h.1M23 18h.1M28 18h.1M25 31l-6 5 6 5M39 31l6 5-6 5M35 28l-6 16M22 54h20" />
        </>}
        {name === 'contribute' && <>
          <circle {...common} cx="17" cy="19" r="6" /><circle {...common} cx="47" cy="19" r="6" /><circle {...common} cx="32" cy="47" r="6" />
          <path {...common} d="M22 22l7 18M42 22l-7 18M23 19h18" />
          <path {...common} d="M29 15l3 4-3 4M25 39l7 8 7-8" />
        </>}
        {name === 'grow' && <>
          <path {...common} d="M14 49c12-2 20-10 24-22 3 9 7 15 13 19M17 48c4 1 7 3 9 7M38 27l-4-9 9 4 7-12 4 16-9 5z" />
          <path {...common} d="M31 35l-8-4M28 40l-10 1M44 13l-1-6M51 17l6-3" />
        </>}
        {name === 'compass' && <>
          <circle {...common} cx="32" cy="33" r="21" /><path {...common} d="M39 24l-5 13-10 6 5-14zM32 6v6M32 54v5M6 33h5M53 33h5" />
        </>}
        {name === 'idea' && <>
          <path {...common} d="M20 29c0-8 5-15 13-15s14 6 14 14c0 6-3 9-7 13-2 2-2 4-2 6H27c0-3 0-5-3-8-3-3-4-6-4-10zM27 52h11M29 57h7" />
          <path {...common} d="M33 6V2M12 14l-4-4M53 14l4-4M14 32H7M53 32h7" />
        </>}
        {name === 'network' && <>
          <circle {...common} cx="13" cy="33" r="6" /><circle {...common} cx="51" cy="17" r="6" /><circle {...common} cx="51" cy="49" r="6" /><circle {...common} cx="32" cy="33" r="6" />
          <path {...common} d="M19 33h7M37 29l9-8M37 37l9 8" />
        </>}
        {name === 'rocket' && <>
          <path {...common} d="M25 40c-6 1-10 4-13 10 6 1 10 0 14-3M39 39c0 6-2 10-7 14-3-5-3-9-1-14M23 36C27 20 38 10 52 8c-1 15-8 26-22 33z" />
          <circle {...common} cx="40" cy="22" r="5" /><path {...common} d="M20 45l-7 7M24 49l-4 7" />
        </>}
      </svg>
    </span>
  )
}

export function DoodleArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg className={vertical ? 'doodle-arrow doodle-arrow--vertical' : 'doodle-arrow'} viewBox="0 0 72 24" aria-hidden="true">
      <path d="M3 13c17-3 39-4 62-1M57 5l9 7-9 8" />
    </svg>
  )
}
