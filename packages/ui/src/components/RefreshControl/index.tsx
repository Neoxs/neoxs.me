import { useEffect, useState } from 'react'

interface RefreshControlProps { interval?: number; onRefresh: () => void }

export function RefreshControl({ interval = 30, onRefresh }: RefreshControlProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds(s => {
        if (s + 1 >= interval) { onRefresh(); return 0 }
        return s + 1
      })
    }, 1000)
    return () => clearInterval(tick)
  }, [interval, onRefresh])

  const remaining = interval - seconds

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: 'var(--color-elevated)', border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--color-text-3)' }}>
        Next refresh in {remaining}s
      </span>
      <button
        onClick={() => { onRefresh(); setSeconds(0) }}
        style={{ background: 'none', border: '0.5px solid var(--color-border-2)', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: '4px 10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
      >
        ↻ refresh
      </button>
    </div>
  )
}