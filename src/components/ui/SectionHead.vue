<template>
  <div class="section-head">
    <div class="min-w-0">
      <h2 class="section-title">{{ title }}</h2>
      <p v-if="description" class="section-desc">{{ description }}</p>
    </div>
    <router-link v-if="to" :to="to" class="link-more">{{ actionLabel }} →</router-link>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  to: { type: [String, Object], default: '' },
  actionLabel: { type: String, default: '查看全部' },
})
</script>
