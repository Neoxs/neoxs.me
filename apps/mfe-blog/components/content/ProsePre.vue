<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
}>()

const isMermaid = computed(() => props.language === 'mermaid')
const mermaidSvg = ref('')
const mermaidId = `mermaid-${Math.random().toString(36).slice(2, 9)}`

const copied = ref(false)

async function copy() {
  if (!props.code) return
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

onMounted(async () => {
  if (!isMermaid.value || !props.code) return
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#1D9E75',
      primaryBorderColor: '#0a3020',
      primaryTextColor: '#e8e8e8',
      background: '#111111',
      mainBkg: '#111111',
      nodeBorder: '#0a3020',
      clusterBkg: '#161616',
      titleColor: '#e8e8e8',
      edgeLabelBackground: '#161616',
      lineColor: '#444441',
      textColor: '#e8e8e8',
      fontFamily: 'SF Mono, Fira Code, monospace',
      fontSize: '13px',
    },
  })
  try {
    const { svg } = await mermaid.render(mermaidId, props.code)
    mermaidSvg.value = svg
  } catch (e) {
    console.error('[mermaid]', e)
  }
})
</script>

<template>
  <!-- Mermaid diagram -->
  <div v-if="isMermaid" class="mermaid-wrapper">
    <div class="mermaid-label">diagram</div>
    <ClientOnly>
      <div v-if="mermaidSvg" v-html="mermaidSvg" class="mermaid-svg" />
      <div v-else class="mermaid-loading">rendering…</div>
    </ClientOnly>
  </div>

  <!-- Standard code block.
       Nuxt Content passes <code>…</code> as the slot — we own the <pre> wrapper
       so white-space, padding, and overflow are fully under our control. -->
  <div v-else class="prose-pre">
    <div class="pre-header">
      <span class="lang-badge">{{ language ?? 'code' }}</span>
      <span v-if="filename" class="filename">{{ filename }}</span>
      <button class="copy-btn" @click="copy">
        {{ copied ? 'copied!' : 'copy' }}
      </button>
    </div>
    <pre class="code-body"><slot /></pre>
  </div>
</template>

<style scoped>
/* ── Code block wrapper ──────────────────────────── */
.prose-pre {
  margin: var(--space-20) 0;
  border: 0.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  overflow: hidden;
}

/* ── Header bar ──────────────────────────────────── */
.pre-header {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-6) var(--space-14);
  border-bottom: 0.5px solid var(--color-border);
  background: var(--color-elevated);
}

.lang-badge {
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-teal);
  letter-spacing: 0.5px;
}

.filename {
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-text-3);
  margin-left: auto;
}

.copy-btn {
  margin-left: auto;
  background: none;
  border: 0.5px solid var(--color-border-2);
  color: var(--color-text-3);
  font-family: var(--font-mono);
  font-size: var(--text-9);
  padding: var(--space-2) var(--space-8);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.copy-btn:hover {
  color: var(--color-teal);
  border-color: var(--color-teal-border);
}

/* ── Code body ───────────────────────────────────── */
.code-body {
  margin: 0;
  padding: var(--space-16);
  overflow-x: auto;
  background: transparent;
  font-family: var(--font-mono);
  font-size: var(--text-12);
  line-height: 1.7;
  /* Preserve newlines inside token text nodes */
  white-space: pre;
}

/* <code> comes from the slot — reset globals.css .prose code overrides */
.code-body :deep(code) {
  font-family: inherit;
  font-size: inherit;
  background: transparent !important;
  padding: 0 !important;
  color: inherit !important;
  border-radius: 0 !important;
}

/* Each Shiki .line span must be block so lines stack vertically */
.code-body :deep(.line) {
  display: block;
  min-height: 1rem;
}

/* Shiki CSS-variable mode: each token span carries --shiki-default
   instead of a direct color value. Wire it to color here. */
.code-body :deep(span) {
  color: var(--shiki-default, inherit) !important;
}

/* ── Mermaid diagram ─────────────────────────────── */
.mermaid-wrapper {
  margin: var(--space-20) 0;
  border: 0.5px solid var(--color-teal-border);
  border-radius: var(--radius-sm);
  background: var(--color-elevated);
  overflow: hidden;
}

.mermaid-label {
  padding: var(--space-6) var(--space-14);
  border-bottom: 0.5px solid var(--color-teal-border);
  font-family: var(--font-mono);
  font-size: var(--text-9);
  color: var(--color-teal);
  letter-spacing: 0.5px;
  background: rgba(29, 158, 117, 0.04);
}

.mermaid-svg {
  padding: var(--space-24);
  display: flex;
  justify-content: center;
  overflow-x: auto;
}

.mermaid-svg :deep(svg) {
  max-width: 100%;
}

.mermaid-loading {
  padding: var(--space-24);
  font-family: var(--font-mono);
  font-size: var(--text-11);
  color: var(--color-text-3);
}
</style>
