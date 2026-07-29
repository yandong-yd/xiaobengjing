<template>
  <component :is="tag" class="inline-flex items-center gap-1.5">
    <AppIcon v-if="icon" :name="icon" :size="iconSize" class="text-[#656d76]" />
    <span><slot /></span>
  </component>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, default: '' },
  tag: { type: String, default: 'span' },
  iconSize: { type: String, default: 'sm' },
})
</script>
