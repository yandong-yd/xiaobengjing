<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-8">
      <p class="text-sm text-amber-700 font-medium mb-2 inline-flex items-center gap-1"><AppIcon name="handshake" size="xs" /> 专题</p>
      <h1 class="text-3xl font-bold text-stone-800">加盟品牌库 & 避坑指南</h1>
      <p class="text-stone-500 mt-2 max-w-2xl">
        公开信息整理，帮你搞懂「怎么选、怎么验、哪些坑别踩」。签约前务必自行核实，本站不构成投资建议。
      </p>
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1"
        :class="activeTab === tab.id ? 'bg-brand-500 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-brand-300'"
        @click="activeTab = tab.id"
      >
        <AppIcon :name="tab.icon" size="xs" /> {{ tab.label }}
      </button>
    </div>

    <!-- 怎么选 -->
    <section v-if="activeTab === 'choose'" class="space-y-6">
      <div v-for="block in franchiseHowToChoose" :key="block.title" class="bg-white rounded-2xl border border-stone-200 p-6">
        <h2 class="text-lg font-bold text-stone-800 mb-4">{{ block.title }}</h2>
        <ul class="space-y-2">
          <li v-for="item in block.items" :key="item" class="flex gap-2 text-stone-600 text-sm">
            <span class="text-brand-500 shrink-0">✓</span>{{ item }}
          </li>
        </ul>
      </div>
      <div class="bg-violet-50 rounded-2xl border border-violet-200 p-6">
        <h3 class="font-bold text-violet-900 mb-2">小本摆摊 vs 品牌加盟</h3>
        <p class="text-sm text-violet-800 leading-relaxed">
          预算 5000 以内、想先试水的，优先跟摊学或自营，别碰加盟费。加盟适合：有 10 万+ 预算、接受标准化、本地点位优质、且能核实备案与真实加盟店盈利的人。很多「摆摊级」项目（淀粉肠、柠檬茶）根本不需要加盟——料包培训就够。
        </p>
      </div>
    </section>

    <!-- 怎么验证 -->
    <section v-if="activeTab === 'verify'" class="space-y-6">
      <div class="bg-amber-50 rounded-2xl border border-amber-200 p-5 text-sm text-amber-900">
        <strong>核心法律依据：</strong>特许人须具备「两店一年」（至少 2 家直营店经营满 1 年）并完成商务部商业特许经营备案，否则不具备合法特许资质。
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div
          v-for="step in franchiseVerifySteps"
          :key="step.step"
          class="bg-white rounded-2xl border border-stone-200 p-5"
        >
          <div class="flex items-start gap-3">
            <span class="w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold flex items-center justify-center shrink-0">{{ step.step }}</span>
            <div>
              <h3 class="font-bold text-stone-800">{{ step.title }}</h3>
              <p class="text-sm text-stone-500 mt-1">{{ step.desc }}</p>
              <a
                v-if="step.link"
                :href="step.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block mt-2 text-xs text-brand-600 hover:underline"
              >
                打开官方查询 →
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-stone-200 p-6">
        <h3 class="font-bold text-stone-800 mb-3">反向背调话术（可直接用）</h3>
        <ul class="space-y-2 text-sm text-stone-600">
          <li>「您这家店开了多久？日均流水大概多少？」（别问「赚多少」，问流水更真实）</li>
          <li>「总部管不管选址？供货价会不会涨？」</li>
          <li>「有没有后悔加盟？退出要赔多少？」</li>
          <li>「能不能给我另一家不在名单上的店地址？」（拒绝 = 红旗）</li>
        </ul>
      </div>
    </section>

    <!-- 品牌库 -->
    <section v-if="activeTab === 'brands'">
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="t in tierFilters"
          :key="t.id"
          class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          :class="tierFilter === t.id ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600'"
          @click="tierFilter = t.id"
        >
          {{ t.label }}
        </button>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <router-link
          v-for="f in filteredFranchises"
          :key="f.id"
          :to="`/franchise/${f.id}`"
          class="bg-white rounded-2xl border border-stone-200 p-5 hover:border-brand-300 hover:shadow-md transition-all block"
        >
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-bold text-stone-800">{{ f.name }}</h3>
            <span class="text-xs px-2 py-0.5 rounded-full shrink-0" :class="franchiseTiers[f.tier]?.class">
              {{ f.tier_label }}
            </span>
          </div>
          <p class="text-xs text-stone-500 mb-2">{{ f.category }} · {{ f.sub }}</p>
          <p class="text-sm text-stone-600 line-clamp-2 mb-3">{{ f.suitable }}</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-2 py-1 bg-stone-100 rounded-lg text-stone-600">
              投资 {{ formatInvest(f.invest_min, f.invest_max) }}
            </span>
            <span class="px-2 py-1 bg-stone-100 rounded-lg text-stone-600">
              摆摊适配 {{ f.stall_fit }}
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 避坑 -->
    <section v-if="activeTab === 'traps'" class="space-y-6">
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="flag in franchiseRedFlags" :key="flag.title" class="bg-white rounded-2xl border border-red-100 p-5">
          <AppIcon :name="flag.icon" size="lg" class="text-red-500 mb-2" />
          <h3 class="font-bold text-stone-800 mb-1">{{ flag.title }}</h3>
          <p class="text-sm text-stone-600">{{ flag.desc }}</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-stone-200 p-6">
        <h3 class="font-bold text-stone-800 mb-4">合同必看条款</h3>
        <ul class="space-y-2 text-sm text-stone-600">
          <li><strong>冷静期：</strong>签约后一定期限内可单方解约，写进合同才有效</li>
          <li><strong>供货价：</strong>是否强制从总部进货？价格是否锁定上限？</li>
          <li><strong>区域保护：</strong>多少米内不开第二家？口头承诺无效</li>
          <li><strong>退出机制：</strong>合同期内不做了，设备、库存、违约金怎么算</li>
          <li><strong>知识产权：</strong>商标授权范围、到期后能否继续用店招</li>
        </ul>
      </div>
      <div class="bg-red-50 rounded-2xl border border-red-200 p-6">
        <h3 class="font-bold text-red-900 mb-2">遇到这些情况，直接走</h3>
        <p class="text-sm text-red-800">
          查不到备案 · 不愿给随机加盟商电话 · 逼你当天签 · 口头承诺不入合同 · 设备比市价贵 · 宣称「保底月入 X 万」· 样板店明显请人排队
        </p>
      </div>
    </section>

    <div class="mt-12 bg-gradient-to-r from-brand-500 to-orange-600 rounded-2xl p-8 text-white text-center">
      <h3 class="text-xl font-bold mb-2">预算有限？先看自营摆摊项目</h3>
      <p class="text-brand-100 text-sm mb-4">1000 元也能起步，不用交加盟费</p>
      <router-link to="/projects" class="inline-block px-6 py-2.5 bg-white text-brand-600 font-semibold rounded-full hover:bg-brand-50">
        浏览项目库 →
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from '../components/ui/AppIcon.vue'
import {
  franchises,
  franchiseHowToChoose,
  franchiseVerifySteps,
  franchiseRedFlags,
  franchiseTiers,
  formatInvest,
} from '../data/franchises.js'

const activeTab = ref('choose')
const tierFilter = ref('all')

const tabs = [
  { id: 'choose', icon: 'target', label: '怎么选加盟' },
  { id: 'verify', icon: 'search', label: '怎么验证靠谱' },
  { id: 'brands', icon: 'store', label: '品牌库' },
  { id: 'traps', icon: 'alert', label: '避坑指南' },
]

const tierFilters = [
  { id: 'all', label: '全部' },
  { id: 'established', label: '行业老牌' },
  { id: 'verified_chain', label: '连锁验证' },
  { id: 'caution', label: '需谨慎' },
  { id: 'trap', label: '高风险' },
]

const filteredFranchises = computed(() =>
  tierFilter.value === 'all' ? franchises : franchises.filter((f) => f.tier === tierFilter.value)
)
</script>
