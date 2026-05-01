<template>
  <div>
    <BlogNavbar />
    <NuxtPage />
  </div>
</template>

<style>
/* Reset code inside code blocks so Shiki colors take over */
.prose pre code,
.prose .prose-pre code {
  background: none !important;
  padding: 0 !important;
  color: inherit !important;
  font-size: inherit !important;
  border-radius: 0 !important;
}
</style>
