type LogLevel = 'info' | 'warn' | 'error'
interface LogLine { time: string; level: LogLevel; message: string }

const levelColors: Record<LogLevel, string> = {
  info:  'var(--color-teal)',
  warn:  'var(--color-amber)',
  error: 'var(--color-red)',
}

interface LogViewerProps { lines: LogLine[]; podName?: string; onTail?: () => void }

export function LogViewer({ lines, podName, onTail }: LogViewerProps) {
  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-6) var(--space-12)', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', color: 'var(--color-text-3)', letterSpacing: '2px' }}>
          LOGS{podName ? ` · ${podName}` : ''}
        </span>
        {onTail && (
          <button onClick={onTail} style={{ background: 'none', border: '0.5px solid var(--color-border-2)', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-8)', padding: 'var(--space-3) var(--space-8)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
            tail -f
          </button>
        )}
      </div>
      <div style={{ padding: 'var(--space-10) var(--space-12)', maxHeight: '200px', overflowY: 'auto', background: 'var(--color-elevated)' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-9)', lineHeight: 2.2, color: 'var(--color-text-3)' }}>
            [{line.time}]{' '}
            <span style={{ color: levelColors[line.level] }}>{line.level.toUpperCase()}</span>{' '}
            {line.message}
          </div>
        ))}
      </div>
    </div>
  )
}