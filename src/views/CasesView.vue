<template>
  <div class="page">
    <div class="mb-8">
      <h1 class="page-title">成功案例库</h1>
      <p class="page-desc">共 {{ cases.length }} 个真实故事 · 当前显示 {{ filteredCases.length }} 个</p>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 p-5 mb-8">
      <div class="grid sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-stone-600 mb-1.5">城市</label>
          <select v-model="filters.city" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-400">
            <option value="">全部城市</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-600 mb-1.5">月利润</label>
          <select v-model="filters.profit" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-400">
            <option value="">不限</option>
            <option value="5000">5000元以上</option>
            <option value="8000">8000元以上</option>
            <option value="10000">10000元以上</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-stone-600 mb-1.5">标签</label>
          <select v-model="filters.tag" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-400">
            <option value="">全部</option>
            <option v-for="tag in caseTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <CaseCard v-for="c in filteredCases" :key="c.id" :case-item="c" />
    </div>

    <div v-if="!filteredCases.length" class="text-center py-20 text-stone-400">
      <AppIcon name="search" size="xl" class="mx-auto mb-3 text-stone-300" />
      <p>没有匹配的案例</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import CaseCard from '../components/CaseCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { cases, cities } from '../data/mock.js'

const filters = reactive({ city: '', profit: '', tag: '' })

const caseTags = computed(() => [...new Set(cases.flatMap((c) => c.tags))].sort())

const filteredCases = computed(() =>
  cases.filter((c) => {
    if (filters.city && c.city !== filters.city) return false
    if (filters.profit && c.monthly_profit < Number(filters.profit)) return false
    if (filters.tag && !c.tags.includes(filters.tag)) return false
    return true
  })
)
</script>
