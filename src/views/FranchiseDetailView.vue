<template>
  <div v-if="franchise" class="page-narrow pb-10">
    <router-link to="/franchise" class="page-back">← 返回加盟专题</router-link>

    <div class="flex flex-wrap items-start gap-2 mb-1">
      <h1 class="page-title text-2xl">{{ franchise.name }}</h1>
      <span class="badge" :class="franchiseTiers[franchise.tier]?.class">{{ franchise.tier_label }}</span>
    </div>
    <p class="page-desc mb-4">{{ franchise.category }} · {{ franchise.sub }}</p>

    <div class="panel-amber text-xs text-amber-900 mb-5 inline-flex items-start gap-2 w-full">
      <AppIcon name="alert" size="sm" class="shrink-0 mt-0.5" />
      <span>以下信息来自公开资料整理，加盟政策随时变化。签约前请通过官方渠道核实，并完成商务部备案查询。</span>
    </div>

    <div class="grid sm:grid-cols-2 gap-3 mb-5">
      <div class="stat-card">
        <p class="stat-label">预估投资</p>
        <p class="stat-value">{{ formatInvest(franchise.invest_min, franchise.invest_max) }}</p>
        <p class="text-[11px] text-stone-400 mt-0.5">加盟费：{{ franchise.franchise_fee }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">摆摊/档口适配度</p>
        <p class="stat-value">{{ franchise.stall_fit }}</p>
        <p class="text-[11px] text-stone-400 mt-0.5">高=接近小吃档；低=更偏门店</p>
      </div>
    </div>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="sparkles" tag="span">加盟落地 · 问题预演</IconLabel></h2>
      <p class="text-xs text-stone-500 mb-3">从选择到签约到开业，提前问自己这些问题</p>
      <div class="grid md:grid-cols-2 gap-3 mb-4">
        <div v-for="phase in franchiseJourneySteps" :key="phase.phase" class="bg-stone-50 rounded-lg p-3">
          <p class="text-sm font-medium text-stone-800 mb-1.5">{{ phase.phase }}</p>
          <ul class="space-y-1">
            <li v-for="(item, i) in phase.items" :key="i" class="text-xs text-stone-600 flex gap-1.5">
              <span class="text-stone-400 shrink-0">□</span>{{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="detail-section-warn mb-0">
        <p class="text-sm font-medium text-stone-800 mb-1.5">警惕信号</p>
        <ul class="space-y-1">
          <li v-for="(s, i) in franchiseTrapSignals" :key="i" class="text-xs text-stone-600">· {{ s }}</li>
        </ul>
      </div>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title">适合谁</h2>
      <p class="text-sm text-stone-600">{{ franchise.suitable }}</p>
      <p v-if="franchise.note" class="text-xs text-stone-500 mt-2 italic">{{ franchise.note }}</p>
    </section>

    <div class="grid md:grid-cols-2 gap-3 mb-4">
      <section class="detail-section">
        <h3 class="text-sm font-semibold text-stone-800 mb-2">优点</h3>
        <ul class="space-y-1">
          <li v-for="item in franchise.pros" :key="item" class="text-sm text-stone-600 flex gap-2">
            <span class="text-green-600 shrink-0">+</span>{{ item }}
          </li>
        </ul>
      </section>
      <section class="detail-section-warn mb-0">
        <h3 class="text-sm font-semibold text-stone-800 mb-2">缺点 / 风险</h3>
        <ul class="space-y-1">
          <li v-for="item in franchise.cons" :key="item" class="text-sm text-stone-600 flex gap-2">
            <span class="text-red-400 shrink-0">−</span>{{ item }}
          </li>
        </ul>
      </section>
    </div>

    <section class="detail-section">
      <h2 class="detail-section-title">核实建议</h2>
      <p class="text-sm text-stone-600">{{ franchise.verify_tips }}</p>
    </section>

    <section v-if="franchise.tier === 'trap' || franchise.tier === 'caution'" class="detail-section-warn">
      <h2 class="detail-section-title">特别提醒</h2>
      <p class="text-sm text-stone-600">此类项目务必完成反向背调，优先排除「快招」套路。可参考本站避坑清单。</p>
      <router-link to="/franchise" class="inline-block mt-2 text-xs text-brand-600 font-medium hover:underline">查看完整避坑指南 →</router-link>
    </section>

    <div class="flex flex-wrap gap-2 pt-2">
      <router-link to="/franchise" class="btn-primary btn-pill px-5 py-2">返回品牌库</router-link>
      <router-link to="/projects" class="btn-ghost btn-pill px-5 py-2">看自营摆摊项目</router-link>
    </div>
  </div>

  <div v-else class="page-narrow py-16 text-center text-stone-400">
    <p class="text-sm">未找到该品牌</p>
    <router-link to="/franchise" class="text-brand-600 text-sm mt-2 inline-block">返回加盟专题</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getFranchiseById, franchiseTiers, formatInvest } from '../data/franchises.js'
import { franchiseJourneySteps, franchiseTrapSignals } from '../data/franchiseRehearsal.js'
import AppIcon from '../components/ui/AppIcon.vue'
import IconLabel from '../components/ui/IconLabel.vue'

const route = useRoute()
const franchise = computed(() => getFranchiseById(route.params.id))
</script>
