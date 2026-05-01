<script setup lang="ts">
const progress = ref(0)

function update() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

onMounted(() => window.addEventListener('scroll', update, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', update))
</script>

<template>
  <div class="track" aria-hidden="true">
    <div class="bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped>
.track {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 100;
  background: var(--color-border);
}

.bar {
  height: 100%;
  background: var(--color-teal);
  transition: width 0.08s linear;
}
</style>
