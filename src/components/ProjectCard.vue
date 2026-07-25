<template>
  <router-link :to="`/project/${project.id}`" class="group card-hover relative">
    <div class="aspect-[5/3] overflow-hidden bg-[#f6f8fa] relative">
      <CoverImage
        :src="project.image"
        :alt="project.image_alt || project.name"
        :pool-key="project.image_pool || 'market'"
        img-class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
      />
      <button
        type="button"
        class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/95 border border-[#d0d7de] flex items-center justify-center text-sm hover:border-[#1f2328] transition-colors"
        :class="favorited ? 'text-[#1f2328]' : 'text-[#8c959f]'"
        :aria-label="favorited ? '取消收藏' : '收藏'"
        @click.prevent.stop="favorites.toggle(project.id)"
      >
        {{ favorited ? '★' : '☆' }}
      </button>
    </div>
    <div class="card-body">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-semibold text-sm text-[#1f2328] group-hover:underline transition-colors line-clamp-1">
          {{ project.name }}
        </h3>
        <span class="badge-neutral shrink-0">{{ project.difficulty }}</span>
      </div>

      <div class="flex gap-3 text-xs text-[#656d76] mb-2">
        <span>成本 <strong class="text-[#1f2328] font-medium">{{ costRange }}</strong></span>
        <span>区间 <strong class="text-[#1f2328] font-medium">{{ incomeRange }}</strong></span>
      </div>

      <div v-if="visibleBadges.length" class="flex flex-wrap gap-1 mb-2">
        <span v-for="(b, i) in visibleBadges" :key="i" class="badge-neutral inline-flex items-center gap-1">
          <AppIcon v-if="b.icon" :name="b.icon" size="xs" />
          {{ b.text }}
        </span>
        <span v-if="extraBadgeCount > 0" class="badge-neutral">+{{ extraBadgeCount }}</span>
      </div>

      <div class="flex flex-wrap gap-1">
        <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="badge-neutral">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'
import CoverImage from './ui/CoverImage.vue'
import { formatCostRange, formatIncomeRange } from '../data/mock.js'
import { weatherLevelStyle } from '../data/projectRealism.js'
import { formatStaffRange } from '../data/projectStaffing.js'
import { workModeBadgeClass } from '../data/projectWorkMode.js'
import { useFavoritesStore } from '../stores/favorites.js'

const props = defineProps({
  project: { type: Object, required: true },
})

const favorites = useFavoritesStore()
const favorited = computed(() => favorites.has(props.project.id))

const costRange = computed(() => formatCostRange(props.project.cost_min, props.project.cost_max))
const incomeRange = computed(() => formatIncomeRange(props.project.income_min, props.project.income_max))

const allBadges = computed(() => {
  const p = props.project
  const list = []
  for (const wm of p.work_mode_labels?.slice(0, 1) || []) {
    list.push({ text: wm.short || wm.label, icon: wm.icon, class: workModeBadgeClass(wm.id) })
  }
  if (p.staffing) list.push({ text: formatStaffRange(p.staffing), icon: 'users', class: 'badge-neutral' })
  if (p.staffing?.couple_suitable) list.push({ text: '夫妻店', class: 'badge-neutral' })
  if (p.weather) list.push({ text: `天气${p.weather.level}`, class: weatherLevelStyle[p.weather.level] || 'badge-neutral' })
  if (p.category === '手工') list.push({ text: '手工', class: 'badge-neutral' })
  return list
})

const visibleBadges = computed(() => allBadges.value.slice(0, 3))
const extraBadgeCount = computed(() => Math.max(0, allBadges.value.length - 3))
</script>
