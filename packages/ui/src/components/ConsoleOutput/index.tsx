import { useRef, useEffect } from 'react'

export type ConsoleLevel = 'log' | 'warn' | 'error' | 'info'
export interface ConsoleLine { level: ConsoleLevel; message: string; timestamp?: string }

const levelColors: Record<ConsoleLevel, string> = {
  log:   'var(--color-text-3)',
  info:  'var(--color-teal)',
  warn:  'var(--color-amber)',
  error: 'var(--color-red)',
}

interface ConsoleOutputProps { lines: ConsoleLine[]; onClear?: () => void }

export function ConsoleOutput({ lines, onClear }: ConsoleOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-elevated)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', background: 'var(--color-surface)', borderBottom: '0.5px solid var(--color-border)', flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', letterSpacing: '2px' }}>CONSOLE</span>
        {onClear && (
          <button onClick={onClear} style={{ background: 'none', border: '0.5px solid var(--color-border-2)', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '2px 8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
            clear
          </button>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', lineHeight: 2.1, color: levelColors[line.level] }}>
            {line.timestamp && <span style={{ color: 'var(--color-text-3)', marginRight: '8px' }}>{line.timestamp}</span>}
            &gt; {line.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}