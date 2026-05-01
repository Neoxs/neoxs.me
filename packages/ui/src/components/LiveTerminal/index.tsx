'use client'

import { useState, useEffect, useRef } from 'react'

const SPINNER = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏']

export interface LiveLine {
  text:          string
  resolvedText?: string  // text to swap in after loading finishes
  dim?:          boolean
  success?:      boolean
  loading?:      boolean
  hold?:         number  // ms before next line (or ms to hold loading state)
}

export interface LiveScene {
  command:    string
  lines:      LiveLine[]
  holdAfter?: number  // ms to pause after last line before next scene
}

export interface LiveTerminalProps {
  cwd?:   string
  scenes: LiveScene[]
}

type RenderedLine = {
  text:     string
  dim?:     boolean
  success?: boolean
  loading?: boolean
}

export function LiveTerminal({ cwd = '~/neoxs.me ‹main› ✓', scenes }: LiveTerminalProps) {
  const [history, setHistory]         = useState<Array<{ command: string; lines: RenderedLine[] }>>([])
  const [activeCmd, setActiveCmd]     = useState('')
  const [activeLines, setActiveLines] = useState<RenderedLine[]>([])
  const [isTyping, setIsTyping]       = useState(false)
  const [spinFrame, setSpinFrame]     = useState(0)
  const [cursorOn, setCursorOn]       = useState(true)
  const alive                         = useRef(true)
  const scrollRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setSpinFrame(f => (f + 1) % SPINNER.length), 100)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history, activeLines, activeCmd])

  useEffect(() => {
    alive.current = true

    const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms))

    async function run() {
      while (alive.current) {
        setHistory([])
        setActiveCmd('')
        setActiveLines([])

        for (let si = 0; si < scenes.length; si++) {
          if (!alive.current) return
          const scene = scenes[si]

          setActiveCmd('')
          setActiveLines([])
          setIsTyping(true)

          for (let i = 1; i <= scene.command.length; i++) {
            if (!alive.current) return
            setActiveCmd(scene.command.slice(0, i))
            await delay(38)
          }

          setIsTyping(false)
          await delay(180)

          for (const line of scene.lines) {
            if (!alive.current) return

            if (line.loading) {
              setActiveLines(prev => [...prev, { text: line.text, dim: line.dim, loading: true }])
              await delay(line.hold ?? 1000)
              if (!alive.current) return
              setActiveLines(prev => {
                const next = [...prev]
                next[next.length - 1] = {
                  text:    line.resolvedText ?? line.text,
                  dim:     line.dim,
                  success: line.success,
                }
                return next
              })
            } else {
              await delay(line.hold ?? 140)
              if (!alive.current) return
              setActiveLines(prev => [...prev, { text: line.text, dim: line.dim, success: line.success }])
            }
          }

          await delay(scene.holdAfter ?? 1800)
          if (!alive.current) return

          if (si < scenes.length - 1) {
            const snapshot = {
              command: scene.command,
              lines:   scene.lines.map(l => ({
                text:    l.resolvedText ?? l.text,
                dim:     l.dim,
                success: l.success,
              })),
            }
            setHistory(prev => [...prev.slice(-1), snapshot])
            setActiveCmd('')
            setActiveLines([])
          }
        }
      }
    }

    run()
    return () => { alive.current = false }
  }, [scenes])

  const lineColor = (line: RenderedLine) => {
    if (line.success) return 'var(--color-teal)'
    if (line.dim)     return 'var(--color-text-2)'
    return 'var(--color-text)'
  }

  return (
    <div style={{
      background:   'var(--color-elevated)',
      border:       '0.5px solid var(--color-border)',
      borderLeft:   '2px solid var(--color-teal)',
      borderRadius: 'var(--radius-sm)',
      padding:      'var(--space-14) var(--space-16)',
      height:       '220px',
      display:      'flex',
      flexDirection:'column',
    }}>
      {/* Fixed CWD header */}
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-9)',
        color:         'var(--color-text-3)',
        letterSpacing: '1px',
        marginBottom:  'var(--space-12)',
        flexShrink:    0,
      }}>
        {cwd}
      </div>

      {/* Scrollable content — overflow hidden so no scrollbar, content pushes up */}
      <div ref={scrollRef} style={{ overflowY: 'hidden', flex: 1 }}>

        {/* Past scenes — dimmed */}
        {history.map((scene, i) => (
          <div key={i} style={{ opacity: 0.35, marginBottom: 'var(--space-8)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', lineHeight: 1.8, color: 'var(--color-text-3)' }}>
              <span style={{ marginRight: 'var(--space-6)' }}>$</span>{scene.command}
            </div>
            {scene.lines.slice(-2).map((line, j) => (
              <div key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', lineHeight: 1.8, color: 'var(--color-text-3)' }}>
                {line.text}
              </div>
            ))}
          </div>
        ))}

        {/* Active command */}
        {activeCmd && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', lineHeight: 1.8, color: 'var(--color-text)' }}>
            <span style={{ color: 'var(--color-teal)', marginRight: 'var(--space-6)' }}>$</span>
            {activeCmd}
            {isTyping && <span style={{ opacity: cursorOn ? 1 : 0, color: 'var(--color-teal)' }}>▋</span>}
          </div>
        )}

        {/* Active output lines */}
        {activeLines.map((line, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', lineHeight: 1.8, color: lineColor(line) }}>
            {line.loading
              ? <>{line.text} <span style={{ color: 'var(--color-teal)' }}>{SPINNER[spinFrame]}</span></>
              : line.text
            }
          </div>
        ))}

      </div>
    </div>
  )
}
