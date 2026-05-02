'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

interface TocItem {
  id: string
  text: string
  depth: number
}

export function TocSidebar({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    document.querySelectorAll('h2, h3').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (items.length === 0) return null

  return (
    <aside className={styles.tocSidebar} aria-label="Table of contents">
      <div className={styles.tocLabel}>ON THIS PAGE</div>
      <nav className={styles.tocNav}>
        {items.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              styles.tocLink,
              item.depth === 3 ? styles.tocDepth3 : '',
              active === item.id ? styles.tocActive : '',
            ].filter(Boolean).join(' ')}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
