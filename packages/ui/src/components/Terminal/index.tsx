'use client'

import { useState, useEffect } from 'react'

interface TerminalLine { prompt?: boolean; text: string; dim?: boolean }
interface TerminalProps { cwd?: string; lines: TerminalLine[]; animate?: boolean }

export function Terminal({ cwd = '~/yacine.dev ‹main› ✓', lines, animate = false }: TerminalProps) {
  const commandText = lines.find(l => l.prompt)?.text ?? ''
  const outputLines = lines.filter(l => !l.prompt)

  const [typed, setTyped]           = useState(animate ? '' : commandText)
  const [visibleOut, setVisibleOut] = useState(animate ? 0 : outputLines.length)
  const [cursorOn, setCursorOn]     = useState(true)
  const [doneTyping, setDoneTyping] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const command = lines.find(l => l.prompt)?.text ?? ''
    const outputs = lines.filter(l => !l.prompt)
    const start = setTimeout(() => {
      let i = 0
      const typer = setInterval(() => {
        i++
        setTyped(command.slice(0, i))
        if (i >= command.length) {
          clearInterval(typer)
          setDoneTyping(true)
          let shown = 0
          const reveal = setInterval(() => {
            shown++
            setVisibleOut(shown)
            if (shown >= outputs.length) clearInterval(reveal)
          }, 180)
        }
      }, 40)
      return () => clearInterval(typer)
    }, 500)
    return () => clearTimeout(start)
  }, [animate, lines])

  useEffect(() => {
    if (!animate || doneTyping) return
    const blink = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(blink)
  }, [animate, doneTyping])

  return (
    <div style={{
      background:   'var(--color-elevated)',
      border:       '0.5px solid var(--color-border)',
      borderLeft:   '2px solid var(--color-teal)',
      borderRadius: 'var(--radius-sm)',
      padding:      'var(--space-14) var(--space-16)',
    }}>
      <div style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      'var(--text-9)',
        color:         'var(--color-text-3)',
        letterSpacing: '1px',
        marginBottom:  'var(--space-10)',
      }}>{cwd}</div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', lineHeight: 2, color: 'var(--color-text)' }}>
        <span style={{ color: 'var(--color-teal)', marginRight: 'var(--space-6)' }}>$</span>
        {typed}
        {animate && !doneTyping && (
          <span style={{ opacity: cursorOn ? 1 : 0, color: 'var(--color-teal)' }}>▋</span>
        )}
      </div>

      {outputLines.slice(0, visibleOut).map((line, i) => (
        <div key={i} style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-10)',
          lineHeight: 2,
          color:      line.dim ? 'var(--color-text-2)' : 'var(--color-text)',
        }}>
          {line.prompt && (
            <span style={{ color: 'var(--color-teal)', marginRight: 'var(--space-6)' }}>$</span>
          )}
          {line.text}
        </div>
      ))}
    </div>
  )
}
