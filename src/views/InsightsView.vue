<template>
  <div class="page">
    <h1 class="page-title mb-2">创业心得</h1>
    <p class="page-desc mb-8">过来人真实分享 — 抓本质，不灌鸡汤</p>

    <div class="space-y-6">
      <article
        v-for="item in insights"
        :key="item.id"
        class="bg-white rounded-2xl border border-stone-200 p-6"
      >
        <p class="text-xs text-brand-600 font-medium mb-1">{{ item.author }}</p>
        <h2 class="text-xl font-bold text-stone-800 mb-2">{{ item.title }}</h2>
        <p class="text-stone-600 italic mb-4">「{{ item.excerpt }}」</p>
        <div class="space-y-2">
          <p v-for="(p, i) in item.body" :key="i" class="text-sm text-stone-600 leading-relaxed">{{ p }}</p>
        </div>
        <div class="flex flex-wrap gap-2 mt-4">
          <span v-for="tag in item.tags" :key="tag" class="text-xs px-2 py-0.5 bg-stone-100 rounded-full text-stone-600"># {{ tag }}</span>
        </div>
      </article>
    </div>

    <div class="mt-12 text-center">
      <router-link to="/cases" class="text-brand-600 hover:underline">更多数字案例故事 →</router-link>
    </div>
  </div>
</template>

<script setup>
import { insights } from '../data/insights.js'
</script>
