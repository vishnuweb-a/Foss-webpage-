import { useEffect, useRef, useState } from 'react'
import type { TerminalLine } from '@/data/content'

const TYPE_MS = 34
const LINE_PAUSE_MS = 260
const CHECK_PAUSE_MS = 190

interface TerminalSequenceProps {
  lines: TerminalLine[]
  onComplete?: () => void
}

/**
 * A terminal that runs itself.
 *
 * Commands type character by character because that is how a command is
 * actually entered; output arrives whole because that is how output actually
 * arrives. The distinction is the point — it reads as a session, not an effect
 * (FOSS.prd §7).
 */
export function TerminalSequence({ lines, onComplete }: TerminalSequenceProps) {
  const [revealed, setRevealed] = useState<TerminalLine[]>([])
  const [typing, setTyping] = useState('')
  const [done, setDone] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(lines)
      setDone(true)
      completeRef.current?.()
      return
    }

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)))

    const run = async () => {
      for (const line of lines) {
        if (cancelled) return

        if (line.kind === 'prompt') {
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return
            setTyping(line.text.slice(0, i))
            await wait(TYPE_MS)
          }
          if (cancelled) return
          setTyping('')
          setRevealed((prev) => [...prev, line])
          await wait(LINE_PAUSE_MS)
        } else {
          setRevealed((prev) => [...prev, line])
          await wait(line.kind === 'check' ? CHECK_PAUSE_MS : LINE_PAUSE_MS)
        }
      }

      if (cancelled) return
      setDone(true)
      completeRef.current?.()
    }

    void run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [lines])

  return (
    <div className="border-rule bg-surface/70 border">
      {/* Chrome names the session rather than imitating an OS window. */}
      <div className="border-rule text-ink-faint flex items-center gap-2 border-b px-3 py-2 font-mono text-label">
        <span className="flex gap-1" aria-hidden="true">
          <span className="bg-rule-bright h-1.5 w-1.5" />
          <span className="bg-rule-bright h-1.5 w-1.5" />
          <span className="bg-rule-bright h-1.5 w-1.5" />
        </span>
        <span className="tracking-label">~/foss</span>
      </div>

      <div
        className="min-h-[19rem] px-4 py-4 font-mono text-body leading-[1.85] sm:min-h-[21rem] sm:px-6"
        aria-live="polite"
      >
        {revealed.map((line, i) => (
          <Line key={i} line={line} />
        ))}

        {!done && (
          <p className="text-ink">
            <span className="text-accent" aria-hidden="true">
              ${' '}
            </span>
            {typing}
            <Cursor />
          </p>
        )}
      </div>
    </div>
  )
}

function Line({ line }: { line: TerminalLine }) {
  switch (line.kind) {
    case 'prompt':
      return (
        <p className="text-ink">
          <span className="text-accent" aria-hidden="true">
            ${' '}
          </span>
          {line.text}
        </p>
      )
    case 'response':
      return <p className="text-ink-dim">{line.text}</p>
    case 'status':
      return <p className="text-ink-dim mt-3">{line.text}</p>
    case 'check':
      return (
        <p className="text-ink">
          <span className="text-accent" aria-hidden="true">
            ✓{' '}
          </span>
          {line.text}
        </p>
      )
  }
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="bg-accent ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-blink"
    />
  )
}
