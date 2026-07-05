<template>
  <div v-if="caseItem" class="page-narrow pb-10">
    <router-link to="/cases" class="page-back">← 返回案例库</router-link>

    <div class="mb-5">
      <div class="detail-hero-img">
        <CoverImage
          :src="caseItem.image"
          :alt="caseItem.image_alt || caseItem.title"
          :pool-key="caseItem.image_pool || 'market'"
          img-class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-wrap gap-1.5 mb-2">
        <span v-for="tag in caseItem.tags" :key="tag" class="badge-brand">{{ tag }}</span>
      </div>
      <h1 class="page-title text-2xl mb-2">{{ caseItem.title }}</h1>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 mb-1">
        <span class="inline-flex items-center gap-1">
          <AppIcon name="pin" size="xs" class="text-stone-400" /> {{ caseItem.city }}
        </span>
        <span class="inline-flex items-center gap-1">
          <AppIcon name="money" size="xs" class="text-stone-400" /> 投入 {{ caseItem.cost.toLocaleString() }} 元
        </span>
        <span class="text-green-700 font-medium">稳定后月利润约 {{ caseItem.monthly_profit.toLocaleString() }} 元</span>
      </div>
      <p class="text-xs text-stone-400">案例收入多为稳定期或旺季，不代表第一天就能达到</p>
    </div>

    <div class="space-y-4">
      <section v-if="caseItem.tough_period" class="detail-section-accent">
        <h2 class="detail-section-title"><IconLabel icon="trend-down" tag="span">也有难的时候</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed">{{ caseItem.tough_period }}</p>
      </section>

      <section v-if="caseItem.key_phrase" class="detail-section">
        <h2 class="detail-section-title"><IconLabel icon="chat" tag="span">现场怎么说</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed italic">{{ caseItem.key_phrase }}</p>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title"><IconLabel icon="book" tag="span">故事背景</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed">{{ caseItem.story }}</p>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title"><IconLabel icon="rocket" tag="span">起步过程</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed">{{ caseItem.process }}</p>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title"><IconLabel icon="target" tag="span">关键决策</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed">{{ caseItem.decisions }}</p>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title"><IconLabel icon="money" tag="span">盈利方式</IconLabel></h2>
        <p class="text-sm text-stone-600 leading-relaxed">{{ caseItem.profit_model }}</p>
      </section>

      <section class="detail-section-brand">
        <h2 class="detail-section-title"><IconLabel icon="lightbulb" tag="span">总结经验</IconLabel></h2>
        <p class="text-sm text-brand-900 leading-relaxed">{{ caseItem.experience }}</p>
      </section>
    </div>

    <div class="text-center mt-8">
      <router-link to="/ai" class="btn-primary btn-pill px-6 py-2.5 inline-flex">
        <AppIcon name="robot" size="sm" /> 我也想要投资顾问定制方案
      </router-link>
    </div>
  </div>

  <div v-else class="page-narrow py-16 text-center text-stone-400">
    <AppIcon name="search" size="xl" class="mx-auto mb-3 text-stone-300" />
    <p class="text-sm">案例不存在</p>
    <router-link to="/cases" class="text-brand-600 text-sm mt-3 inline-block">返回案例库</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '../components/ui/AppIcon.vue'
import CoverImage from '../components/ui/CoverImage.vue'
import IconLabel from '../components/ui/IconLabel.vue'
import { getCaseById } from '../data/mock.js'

const route = useRoute()
const caseItem = computed(() => getCaseById(route.params.id))
</script>
