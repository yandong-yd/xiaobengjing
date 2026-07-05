<template>
  <img
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    loading="lazy"
    @error="onError"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { getFallbackCover } from '../../data/media.js'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  poolKey: { type: String, default: 'market' },
})

const fallback = getFallbackCover(props.poolKey)
const currentSrc = ref(props.src || fallback)

watch(
  () => props.src,
  (value) => {
    currentSrc.value = value || getFallbackCover(props.poolKey)
  },
)

function onError() {
  const next = getFallbackCover(props.poolKey)
  if (currentSrc.value !== next) currentSrc.value = next
}
</script>
