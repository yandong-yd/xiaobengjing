<template>
  <section class="mb-5">
    <div class="section-head mb-3">
      <div>
        <h2 class="section-title inline-flex items-center gap-1.5">
          <AppIcon name="map" size="sm" class="text-brand-600" />
          从 0 到盈利 · 完整闭环
        </h2>
        <p class="section-desc">进货、设备、车子、加盟培训、办证、第一周怎么干</p>
      </div>
    </div>

    <div class="bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg p-4 text-white mb-4">
      <p class="text-brand-100 text-xs mb-1">全链路一句话</p>
      <p class="font-medium leading-relaxed">{{ playbook.loop_summary }}</p>
    </div>

    <div class="grid sm:grid-cols-3 gap-2 mb-4">
      <div class="panel p-3">
        <p class="text-xs text-brand-600 font-medium mb-1 inline-flex items-center gap-1"><AppIcon name="cart" size="xs" /> 上游进货</p>
        <p class="text-sm text-stone-600">{{ playbook.profit_loop?.upstream }}</p>
      </div>
      <div class="panel p-3">
        <p class="text-xs text-brand-600 font-medium mb-1 inline-flex items-center gap-1"><AppIcon name="tag" size="xs" /> 怎么卖</p>
        <p class="text-sm text-stone-600">{{ playbook.profit_loop?.sell }}</p>
      </div>
      <div class="panel p-3">
        <p class="text-xs text-brand-600 font-medium mb-1 inline-flex items-center gap-1"><AppIcon name="refresh" size="xs" /> 怎么留住</p>
        <p class="text-sm text-stone-600">{{ playbook.profit_loop?.retention }}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 mb-4 border-b border-stone-200 pb-3">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1"
        :class="activeTab === tab.id ? 'bg-brand-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'"
        @click="activeTab = tab.id"
      >
        <AppIcon :name="tab.icon" size="xs" /> {{ tab.label }}
      </button>
    </div>

    <div v-show="activeTab === 'roadmap'" class="space-y-3">
      <div v-for="(phase, i) in playbook.roadmap" :key="i" class="panel">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">{{ i + 1 }}</span>
          <h3 class="text-sm font-semibold text-stone-800">{{ phase.phase }}</h3>
          <span v-if="phase.budget" class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">预算 {{ phase.budget }}</span>
        </div>
        <ul class="space-y-1.5">
          <li v-for="(task, j) in phase.tasks" :key="j" class="text-sm text-stone-600 flex gap-2">
            <span class="text-brand-500">→</span>{{ task }}
          </li>
        </ul>
      </div>
    </div>

    <div v-show="activeTab === 'supply'" class="space-y-4">
      <div>
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="tools" tag="span">设备去哪买</IconLabel></h3>
        <div class="space-y-2">
          <div v-for="(eq, i) in playbook.equipment" :key="i" class="panel p-3">
            <div class="flex flex-wrap justify-between gap-2 mb-2">
              <span class="font-medium text-stone-800">{{ eq.item }}</span>
              <span class="text-sm text-green-700 font-medium">{{ eq.budget }}</span>
            </div>
            <p class="text-xs text-stone-500 mb-1">渠道：{{ (eq.channels || []).join(' · ') }}</p>
            <p v-if="eq.note" class="text-xs text-amber-700 inline-flex items-start gap-1"><AppIcon name="lightbulb" size="xs" class="mt-0.5 shrink-0" /> {{ eq.note }}</p>
          </div>
        </div>
      </div>
      <div v-if="playbook.ingredients?.length">
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="leaf" tag="span">原料/耗材进货</IconLabel></h3>
        <div class="space-y-2">
          <div v-for="(ing, i) in playbook.ingredients" :key="i" class="panel p-3">
            <div class="flex flex-wrap justify-between gap-2 mb-1">
              <span class="font-medium text-stone-800">{{ ing.item }}</span>
              <span class="text-sm text-stone-500">{{ ing.budget }}</span>
            </div>
            <p class="text-xs text-stone-500">渠道：{{ (ing.channels || []).join(' · ') }} · {{ ing.frequency }}</p>
            <p v-if="ing.note" class="text-xs text-amber-700 mt-1">{{ ing.note }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="activeTab === 'vehicle'" class="space-y-3">
      <p class="text-sm text-stone-600">
        是否需要车/摊：<strong>{{ playbook.vehicle?.needed ? '需要' : '不一定，看点位' }}</strong>
      </p>
      <div v-for="(v, i) in playbook.vehicle?.types" :key="i" class="panel p-3">
        <div class="flex justify-between mb-1">
          <span class="font-medium">{{ v.name }}</span>
          <span class="text-green-700 text-sm">{{ v.budget }}</span>
        </div>
        <p class="text-xs text-stone-500">去哪买/谈：{{ v.buy_at }}</p>
        <p v-if="v.note" class="text-xs text-stone-600 mt-1">{{ v.note }}</p>
      </div>
      <div v-if="playbook.vehicle?.stall" class="panel p-3 border-l-4 border-l-brand-400">
        <p class="text-sm font-medium text-stone-800 mb-1 inline-flex items-center gap-1"><AppIcon name="pin" size="xs" /> 摊位怎么谈</p>
        <p class="text-sm text-stone-600">{{ playbook.vehicle.stall.how }}</p>
        <p class="text-xs text-stone-500 mt-1">费用参考：{{ playbook.vehicle.stall.cost }}</p>
        <p v-if="playbook.vehicle.stall.note" class="text-xs text-stone-500 mt-0.5">{{ playbook.vehicle.stall.note }}</p>
      </div>
    </div>

    <div v-show="activeTab === 'train'" class="space-y-4">
      <div class="panel">
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="store" tag="span">有没有加盟？</IconLabel></h3>
        <p class="text-sm mb-3">
          {{ playbook.franchise?.exists ? '有，但小本建议谨慎：' : '本项目一般不需要加盟。' }}
        </p>
        <div v-if="playbook.franchise?.options?.length" class="space-y-3 mb-4">
          <div v-for="(f, i) in playbook.franchise.options" :key="i" class="bg-stone-50 rounded-lg p-3 text-sm">
            <p class="font-medium">{{ f.brand }} <span class="text-stone-500">（{{ f.fee }}）</span></p>
            <p class="text-stone-600 text-xs mt-1">含：{{ f.includes }}</p>
            <p class="text-amber-700 text-xs mt-1">评价：{{ f.verdict }}</p>
          </div>
        </div>
        <p class="text-sm text-brand-700 font-medium">{{ playbook.franchise?.recommendation }}</p>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="academic" tag="span">怎么学手艺</IconLabel></h3>
        <div class="space-y-2">
          <div v-for="(t, i) in playbook.training" :key="i" class="panel p-3">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="font-medium text-stone-800">{{ t.method }}</span>
              <span v-if="t.verdict === '最推荐' || t.verdict === '必做' || t.verdict === '推荐'" class="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{{ t.verdict }}</span>
            </div>
            <p class="text-xs text-stone-500">{{ t.cost }} · {{ t.duration }} · {{ t.how_to_find }}</p>
            <p v-if="t.verdict && t.verdict !== '最推荐'" class="text-xs text-stone-600 mt-1">{{ t.verdict }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="activeTab === 'execute'" class="space-y-4">
      <div v-if="playbook.licenses?.length">
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="clipboard" tag="span">办证顺序（小白照着办）</IconLabel></h3>
        <div class="space-y-2">
          <div v-for="lic in sortedLicenses" :key="lic.name" class="flex gap-3 panel p-3 text-sm">
            <span class="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{{ lic.order }}</span>
            <div>
              <p class="font-medium text-stone-800">{{ lic.name }}</p>
              <p class="text-stone-500 text-xs">{{ lic.where }} · {{ lic.cost }} · 约{{ lic.time }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="calendar" tag="span">第一周干什么</IconLabel></h3>
        <div class="space-y-2">
          <div v-for="(d, i) in playbook.week1_plan" :key="i" class="flex gap-3 panel p-3 text-sm">
            <span class="font-medium text-brand-600 shrink-0 w-16">{{ d.day }}</span>
            <span class="text-stone-600">{{ d.task }}</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="clock" tag="span">出摊一天怎么过</IconLabel></h3>
        <div class="grid sm:grid-cols-2 gap-2">
          <div v-for="(items, key) in flowLabels" :key="key" class="panel p-3">
            <p class="text-xs font-medium text-brand-600 mb-2">{{ items.label }}</p>
            <ul class="space-y-1">
              <li v-for="(item, j) in playbook.daily_flow?.[key]" :key="j" class="text-xs text-stone-600">· {{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-stone-800 mb-2"><IconLabel icon="check" tag="span">出摊前检查清单</IconLabel></h3>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="(item, i) in playbook.opening_checklist" :key="i" class="badge-neutral px-2.5 py-1 inline-flex items-center gap-1">
            <AppIcon name="check" size="xs" /> {{ item }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'
import IconLabel from './ui/IconLabel.vue'

const props = defineProps({
  playbook: { type: Object, required: true },
})

const activeTab = ref('roadmap')

const tabs = [
  { id: 'roadmap', icon: 'route', label: '路线' },
  { id: 'supply', icon: 'cart', label: '进货设备' },
  { id: 'vehicle', icon: 'truck', label: '车子摊位' },
  { id: 'train', icon: 'academic', label: '加盟培训' },
  { id: 'execute', icon: 'check', label: '办证执行' },
]

const flowLabels = {
  prep: { label: '出摊前' },
  open: { label: '开摊' },
  peak: { label: '高峰' },
  close: { label: '收摊' },
}

const sortedLicenses = computed(() =>
  [...(props.playbook.licenses || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
)
</script>
