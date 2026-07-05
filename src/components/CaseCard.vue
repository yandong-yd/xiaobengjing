<template>
  <router-link :to="`/case/${caseItem.id}`" class="group card-hover">
    <div class="aspect-[5/3] overflow-hidden bg-stone-100">
      <CoverImage
        :src="caseItem.image"
        :alt="caseItem.image_alt || caseItem.title"
        :pool-key="caseItem.image_pool || 'market'"
        img-class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
      />
    </div>
    <div class="card-body">
      <h3 class="font-semibold text-sm text-stone-900 group-hover:text-accent-700 transition-colors mb-1.5 line-clamp-2 leading-snug">
        {{ caseItem.title }}
      </h3>

      <div class="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-stone-500 mb-1.5">
        <span class="inline-flex items-center gap-1">
          <AppIcon name="pin" size="xs" class="text-stone-400" />
          {{ caseItem.city }}
        </span>
        <span>投入 {{ caseItem.cost }} 元</span>
      </div>

      <p class="text-xs text-accent-700 font-semibold mb-2">
        月利润约 {{ caseItem.monthly_profit.toLocaleString() }} 元
      </p>

      <div class="flex flex-wrap gap-1">
        <span v-for="tag in caseItem.tags.slice(0, 3)" :key="tag" class="badge-neutral">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import AppIcon from './ui/AppIcon.vue'
import CoverImage from './ui/CoverImage.vue'

defineProps({
  caseItem: { type: Object, required: true },
})
</script>
