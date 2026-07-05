<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="mb-8">
      <p class="text-sm text-brand-600 font-medium mb-2 inline-flex items-center gap-1">
        <AppIcon :name="modeConfig.icon" size="xs" /> {{ modeConfig.badge }}
      </p>
      <h1 class="text-3xl font-bold text-stone-800">{{ modeConfig.title }}</h1>
      <p class="text-stone-500 mt-2 max-w-2xl">{{ modeConfig.subtitle }}</p>
    </div>

    <div v-if="modeConfig.tips.length" class="bg-stone-50 rounded-2xl border border-stone-200 p-5 mb-8">
      <p class="font-bold text-stone-800 mb-2"><IconLabel icon="lightbulb" tag="span">适合谁</IconLabel></p>
      <ul class="text-sm text-stone-600 space-y-1">
        <li v-for="(tip, i) in modeConfig.tips" :key="i">· {{ tip }}</li>
      </ul>
    </div>

    <div v-if="showFreelanceTab" class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="activeTab === tab.id ? 'bg-brand-500 text-white' : 'bg-white border border-stone-200 text-stone-600'"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}（{{ tab.count }}）
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-stone-200 p-4 mb-8 flex flex-wrap gap-3 items-center">
      <input
        v-model="keyword"
        type="search"
        placeholder="搜索项目..."
        class="flex-1 min-w-[200px] px-4 py-2 border border-stone-200 rounded-xl text-sm"
      />
      <select v-model="sort" class="px-3 py-2 border border-stone-200 rounded-xl text-sm">
        <option value="default">默认</option>
        <option value="cost-asc">成本从低到高</option>
        <option value="income-desc">收入从高到低</option>
      </select>
      <p class="text-sm text-stone-500 w-full sm:w-auto">共 {{ displayProjects.length }} 个项目</p>
    </div>

    <div v-if="displayProjects.length" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <ProjectCard v-for="p in displayProjects" :key="p.id" :project="p" />
    </div>
    <div v-else class="text-center py-16 text-stone-400">
      <AppIcon name="search" size="xl" class="mx-auto mb-2 text-stone-300" />
      <p>没有匹配的项目</p>
    </div>

    <section v-if="crossModeProjects.length" class="mt-16">
      <h2 class="text-xl font-bold text-stone-800 mb-2">也适合{{ modeConfig.short }}的其他项目</h2>
      <p class="text-stone-500 text-sm mb-6">来自其他分类，同样可按{{ modeConfig.short }}方式做</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <ProjectCard v-for="p in crossModeProjects" :key="p.id" :project="p" />
      </div>
    </section>

    <div class="mt-12 flex flex-wrap gap-3">
      <router-link
        v-for="m in otherModes"
        :key="m.id"
        :to="m.route"
        class="text-sm px-4 py-2 rounded-full border border-stone-200 hover:border-brand-300 text-stone-600 inline-flex items-center gap-1"
      >
        <AppIcon :name="m.icon" size="xs" /> {{ m.label }} →
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import IconLabel from '../components/ui/IconLabel.vue'
import { projects, searchProjects } from '../data/mock.js'
import { workModes, filterByWorkMode } from '../data/projectWorkMode.js'

const route = useRoute()
const keyword = ref('')
const sort = ref('default')
const activeTab = ref(route.query.tab === 'freelance' ? 'freelance' : 'remote')

const modeId = computed(() => route.meta.workMode || 'parttime')

const modeConfigs = {
  parttime: {
    title: '兼职 / 副业项目',
    short: '兼职',
    badge: '主业之外也能做',
    icon: 'clock',
    subtitle: '周末、晚间、假期可启动的个人创业——不必辞职，先副业验证再决定是否 All in。摆摊只是形式之一，跑腿、家教、出摊、接单都算。',
    tips: [
      '在职白领、学生、宝妈想多一份收入',
      '时间碎片化，但每周能挤出固定时段',
      '希望先用低风险方式试创业方向',
    ],
    primaryCategories: ['兼职副业'],
    crossLimit: 9,
  },
  remote: {
    title: '居家办公 / 自由职业',
    short: '居家',
    badge: '不出摊，在家交付',
    icon: 'home',
    subtitle: '电脑、手机、技能即可起步——写作、设计、剪辑、电商、咨询等，地点自由、按单计酬。这里的「创业」不等于租门面，而是个人品牌与接单能力。',
    tips: [
      '想在家照顾家庭同时有收入',
      '有一技之长或可快速学会的技能',
      '偏好自由职业、讨厌坐班的人',
    ],
    primaryCategories: ['居家办公'],
    crossLimit: 9,
    showTabs: true,
  },
}

const modeConfig = computed(() => modeConfigs[modeId.value] || modeConfigs.parttime)
const showFreelanceTab = computed(() => modeId.value === 'remote' && modeConfig.value.showTabs)

const tabs = computed(() => [
  { id: 'remote', label: '居家办公', count: filterByWorkMode(projects, 'remote').length },
  { id: 'freelance', label: '自由职业', count: filterByWorkMode(projects, 'freelance').length },
])

const baseList = computed(() => {
  if (modeId.value === 'remote' && activeTab.value === 'freelance') {
    return filterByWorkMode(projects, 'freelance')
  }
  if (modeId.value === 'remote') {
    return projects.filter((p) => p.work_modes?.includes('remote') || p.category === '居家办公')
  }
  return projects.filter((p) =>
    p.category === '兼职副业' || (p.work_modes?.includes('parttime') && p.category !== '居家办公')
  )
})

const displayProjects = computed(() => {
  let list = baseList.value.filter((p) => modeConfig.value.primaryCategories.includes(p.category))
  if (keyword.value) list = searchProjects(list, keyword.value)
  if (sort.value === 'cost-asc') list = [...list].sort((a, b) => a.cost_min - b.cost_min)
  if (sort.value === 'income-desc') list = [...list].sort((a, b) => b.income_max - a.income_max)
  return list
})

const crossModeProjects = computed(() => {
  const shown = new Set(displayProjects.value.map((p) => p.id))
  let list = baseList.value.filter((p) => !shown.has(p.id) && !modeConfig.value.primaryCategories.includes(p.category))
  if (keyword.value) list = searchProjects(list, keyword.value)
  return list.slice(0, modeConfig.value.crossLimit)
})

const otherModes = computed(() =>
  workModes.filter((m) => {
    if (modeId.value === 'parttime') return m.id !== 'parttime'
    if (modeId.value === 'remote') return m.id !== 'remote' && m.id !== 'freelance'
    return true
  }).slice(0, 4)
)
</script>
