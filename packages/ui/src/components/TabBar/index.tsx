interface Tab { id: string; label: string }
interface TabBarProps { tabs: Tab[]; activeId: string; onSelect: (id: string) => void }

export function TabBar({ tabs, activeId, onSelect }: TabBarProps) {
  return (
    <div style={{ display: 'flex', borderBottom: '0.5px solid var(--color-border)', background: 'var(--color-elevated)' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          style={{
            background:    tab.id === activeId ? 'var(--color-teal-dim)' : 'none',
            border:        'none',
            borderRight:   '0.5px solid var(--color-border)',
            borderBottom:  tab.id === activeId ? '1px solid var(--color-teal)' : '1px solid transparent',
            padding:       'var(--space-8) var(--space-16)',
            fontFamily:    'var(--font-mono)',
            fontSize:      'var(--text-10)',
            color:         tab.id === activeId ? 'var(--color-teal)' : 'var(--color-text-3)',
            cursor:        'pointer',
            transition:    'all 0.15s',
            whiteSpace:    'nowrap',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}