<script setup lang="ts">
defineProps<{
  label: string
  accent?: boolean
}>()
</script>

<template>
  <span :class="['tag', { accent }]">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: var(--text-9);
  letter-spacing: 0.5px;
  padding: var(--space-2) var(--space-8);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 0.5px solid var(--color-border);
  color: var(--color-text-3);
}

.tag.accent {
  background: var(--color-teal-dim);
  border-color: var(--color-teal-border);
  color: var(--color-teal);
}
</style>
