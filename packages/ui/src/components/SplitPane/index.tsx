import { useState, useCallback, type ReactNode } from 'react'

interface SplitPaneProps { left: ReactNode; right: ReactNode; defaultSplit?: number }

export function SplitPane({ left, right, defaultSplit = 50 }: SplitPaneProps) {
  const [split, setSplit] = useState(defaultSplit)
  const [dragging, setDragging] = useState(false)

  const onMouseDown = useCallback(() => setDragging(true), [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    setSplit(Math.min(80, Math.max(20, pct)))
  }, [dragging])

  const onMouseUp = useCallback(() => setDragging(false), [])

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ display: 'flex', height: '100%', userSelect: dragging ? 'none' : 'auto' }}
    >
      <div style={{ width: `${split}%`, overflow: 'auto' }}>{left}</div>
      <div
        onMouseDown={onMouseDown}
        style={{ width: '3px', background: dragging ? 'var(--color-teal)' : 'var(--color-border)', cursor: 'col-resize', flexShrink: 0, transition: 'background 0.15s' }}
      />
      <div style={{ flex: 1, overflow: 'auto' }}>{right}</div>
    </div>
  )
}