<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="px"
    :height="px"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="inline-block shrink-0"
    :class="iconClass"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { normalizeIconPaths } from './icons.js'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md' },
  class: { type: String, default: '' },
})

const px = computed(() => ({ xs: 14, sm: 16, md: 20, lg: 24, xl: 32 }[props.size] ?? 20))
const paths = computed(() => normalizeIconPaths(props.name))
const iconClass = computed(() => props.class)
</script>
