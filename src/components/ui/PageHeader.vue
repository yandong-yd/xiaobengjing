<template>
  <header class="mb-5" :class="center ? 'text-center' : ''">
    <p v-if="eyebrow" class="text-xs font-medium text-brand-600 mb-1">{{ eyebrow }}</p>
    <h1 class="page-title">{{ title }}</h1>
    <p v-if="description" class="page-desc" :class="center ? 'mx-auto max-w-xl' : ''">{{ description }}</p>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  center: { type: Boolean, default: false },
})
</script>
