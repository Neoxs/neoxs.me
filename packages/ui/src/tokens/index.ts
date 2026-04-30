export const tokens = {
  color: {
    teal: {
      500: '#1D9E75',
      600: '#0f6e56',
      950: '#0a2018',
    },
    zinc: {
      100: '#e8e8e8',
      500: '#888780',
      700: '#444441',
      800: '#1e1e1e',
      850: '#161616',
      900: '#111111',
      950: '#0a0a0a',
    },
    red:   { 400: '#f87171', 900: '#1c0a0a', border: '#7f1d1d' },
    amber: { 400: '#fbbf24', 900: '#1a0f00', border: '#78350f' },
  },
  radius: {
    none: '0',
    sm:   '2px',
    md:   '4px',
    lg:   '8px',
    full: '9999px',
  },
  spacing: {
    1: '4px',  2: '8px',   3: '12px',
    4: '16px', 5: '20px',  6: '24px',
    8: '32px', 12: '48px', 16: '64px',
  },
  font: {
    mono:  "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
    serif: "'Georgia', serif",
  },
} as const