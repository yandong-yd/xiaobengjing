<template>
  <svg
    :width="px"
    :height="px"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="shrink-0"
    :aria-label="label"
    role="img"
  >
    <rect width="32" height="32" rx="6" fill="#1f2328" />
    <path d="M7 24V12c0-1.1.9-2 2-2h5.5v16H9c-1.1 0-2-.9-2-2z" fill="#fff" />
    <path d="M25 24V12c0-1.1-.9-2-2-2H17.5v16H23c1.1 0 2-.9 2-2z" fill="#fff" fill-opacity="0.9" />
    <path d="M16 10v16" stroke="#8c959f" stroke-width="1.2" stroke-linecap="round" />
    <path d="M16 5.5 19.5 9H18v4.5h-4V9h-1.5L16 5.5z" fill="#fff" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'md' },
  label: { type: String, default: '小本经' },
})

const px = computed(() => ({ sm: 24, md: 28, lg: 32 }[props.size] ?? 28))
</script>
