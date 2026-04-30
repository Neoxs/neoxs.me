import { useState } from 'react'

interface ComponentItem { id: string; name: string; package: string }
interface ComponentSidebarProps { items: ComponentItem[]; activeId?: string; onSelect: (id: string) => void }

export function ComponentSidebar({ items, activeId, onSelect }: ComponentSidebarProps) {
  const [query, setQuery] = useState('')

  const groups = items
    .filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
    .reduce<Record<string, ComponentItem[]>>((acc, item) => {
      acc[item.package] ??= []
      acc[item.package].push(item)
      return acc
    }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-surface)', borderRight: '0.5px solid var(--color-border)' }}>
      <div style={{ padding: 'var(--space-10)', borderBottom: '0.5px solid var(--color-border)' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search..."
          style={{ width: '100%', background: 'var(--color-elevated)', border: '0.5px solid var(--color-border-2)', color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-10)', padding: 'var(--space-6) var(--space-9)', borderRadius: 'var(--radius-sm)', outline: 'none' }}
        />
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {Object.entries(groups).map(([pkg, pkgItems]) => (
          <div key={pkg}>
            <div style={{ padding: 'var(--space-7) var(--space-12)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-7)', color: 'var(--color-text-3)', letterSpacing: '2px', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
              {pkg}
            </div>
            {pkgItems.map(item => (
              <button key={item.id} onClick={() => onSelect(item.id)} style={{
                display:     'block', width: '100%', textAlign: 'left',
                padding:     'var(--space-7) var(--space-14)', background: item.id === activeId ? 'var(--color-teal-dim)' : 'none',
                border:      'none', borderBottom: '0.5px solid var(--color-border)',
                fontFamily:  'var(--font-mono)', fontSize: 'var(--text-10)',
                color:       item.id === activeId ? 'var(--color-teal)' : 'var(--color-text-3)',
                cursor:      'pointer', transition: 'all 0.1s',
              }}>
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}