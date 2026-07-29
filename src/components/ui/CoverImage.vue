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
import { ref, watch, computed } from 'vue'
import { getFallbackCover, resolveCoverUrl } from '../../data/media.js'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  poolKey: { type: String, default: 'market' },
})

const resolved = computed(() => resolveCoverUrl(props.src))
const fallback = computed(() => getFallbackCover(props.poolKey))
const currentSrc = ref(resolved.value || fallback.value)

watch(
  () => [props.src, props.poolKey],
  () => {
    currentSrc.value = resolveCoverUrl(props.src) || getFallbackCover(props.poolKey)
  },
)

function onError() {
  const next = getFallbackCover(props.poolKey)
  if (currentSrc.value !== next) currentSrc.value = next
}
</script>
