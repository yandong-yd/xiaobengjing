<template>
  <div class="page">
    <h1 class="page-title">创业难题 · 提前预演</h1>
    <p class="page-desc mb-8">资金、家庭、兼职、技能、心态、证照 — 网站帮你想在前面</p>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="cat in challengeCategories"
        :key="cat.id"
        type="button"
        class="px-3 py-1.5 rounded-full text-sm border transition-colors inline-flex items-center gap-1"
        :class="filter === cat.id ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-400'"
        @click="filter = cat.id"
      >
        <AppIcon :name="cat.icon" size="xs" /> {{ cat.label }}
      </button>
      <button
        type="button"
        class="px-3 py-1.5 rounded-full text-sm border transition-colors"
        :class="filter === '' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-400'"
        @click="filter = ''"
      >全部</button>
    </div>

    <div class="space-y-6">
      <article
        v-for="c in filtered"
        :key="c.id"
        class="card p-6"
      >
        <h2 class="text-lg font-bold text-stone-900 mb-2">{{ c.title }}</h2>
        <p class="text-sm text-stone-600 bg-stone-50 border-l-2 border-accent-600 rounded-r-md px-3 py-2 mb-4"><span class="font-medium text-stone-900">问题：</span>{{ c.problem }}</p>
        <ul class="space-y-2 mb-4">
          <li v-for="(a, i) in c.advice" :key="i" class="text-sm text-stone-600 flex gap-2">
            <span class="text-accent-600 shrink-0">✓</span>{{ a }}
          </li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <router-link
            v-for="link in c.links"
            :key="link.to"
            :to="link.to"
            class="badge-neutral hover:border-stone-400 hover:text-accent-700 px-3 py-1"
          >
            {{ link.label }} →
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { challenges, challengeCategories } from '../data/challenges.js'
import AppIcon from '../components/ui/AppIcon.vue'

const filter = ref('')
const filtered = computed(() =>
  filter.value ? challenges.filter((c) => c.category === filter.value) : challenges
)
</script>
