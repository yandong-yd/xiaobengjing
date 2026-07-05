<template>
  <div class="page">
    <div class="mb-10">
      <h1 class="page-title">新手指南</h1>
      <p class="page-desc">从选址到盈利，摆摊创业必读手册</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="article in guideArticles"
        :key="article.id"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1.5"
        :class="activeId === article.id ? 'bg-brand-500 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-brand-300'"
        @click="activeId = article.id"
      >
        <AppIcon :name="article.icon" size="xs" /> {{ article.title }}
      </button>
    </div>

    <article v-if="activeArticle" class="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 mb-10">
      <h2 class="text-2xl font-bold text-stone-800 mb-2 inline-flex items-center gap-2">
        <AppIcon :name="activeArticle.icon" size="md" class="text-brand-600" />
        {{ activeArticle.title }}
      </h2>
      <p class="text-stone-500 mb-6">{{ activeArticle.summary }}</p>
      <div v-for="section in activeArticle.content" :key="section.heading" class="mb-6 last:mb-0">
        <h3 class="font-semibold text-stone-800 mb-3">{{ section.heading }}</h3>
        <ul class="space-y-2">
          <li v-for="item in section.items" :key="item" class="flex gap-2 text-stone-600 text-sm">
            <span class="text-brand-500 shrink-0">✓</span>{{ item }}
          </li>
        </ul>
      </div>
    </article>

    <section class="mb-10">
      <h2 class="text-xl font-bold text-stone-800 mb-4">常见问题</h2>
      <FaqSection />
    </section>

    <div class="bg-gradient-to-r from-brand-500 to-orange-600 rounded-2xl p-8 text-white text-center">
      <h3 class="text-xl font-bold mb-2">准备好了？让投资顾问帮你选项目</h3>
      <p class="text-brand-100 text-sm mb-4">输入预算，3 秒生成专属方案</p>
      <router-link to="/ai" class="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-brand-600 font-semibold rounded-full hover:bg-brand-50">
        <AppIcon name="robot" size="sm" /> 开始咨询
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from '../components/ui/AppIcon.vue'
import FaqSection from '../components/FaqSection.vue'
import { guideArticles } from '../data/guides.js'

const activeId = ref(guideArticles[0]?.id)
const activeArticle = computed(() => guideArticles.find((a) => a.id === activeId.value))
</script>
