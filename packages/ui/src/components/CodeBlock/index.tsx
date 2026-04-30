import { useState } from 'react'

interface CodeBlockProps { language: string; code: string }

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ border: '0.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', margin: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 12px', background: 'var(--color-elevated)', borderBottom: '0.5px solid var(--color-border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--color-text-3)', background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', padding: '2px 7px', borderRadius: 'var(--radius-sm)', letterSpacing: '1px' }}>
          {language}
        </span>
        <button onClick={copy} style={{ background: 'none', border: '0.5px solid var(--color-border-2)', color: copied ? 'var(--color-teal)' : 'var(--color-text-3)', fontFamily: 'var(--font-mono)', fontSize: '8px', padding: '3px 8px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </div>
      <pre style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-2)', lineHeight: 1.8, overflowX: 'auto', background: 'var(--color-elevated)', margin: 0 }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}