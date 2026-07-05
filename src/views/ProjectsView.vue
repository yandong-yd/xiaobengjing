<template>
  <div class="page">
    <PageHeader :title="pageTitle" :description="pageSubtitle" />

    <div class="flex flex-wrap items-center gap-2 mb-4">
      <button
        type="button"
        class="text-xs px-2.5 py-1 rounded-full font-medium border transition-colors inline-flex items-center gap-1"
        :class="showFavoritesOnly ? 'bg-stone-900 text-white border-stone-900' : 'btn-pill-inactive'"
        @click="toggleFavoritesOnly"
      >
        ★ 我的收藏
        <span v-if="favorites.count" class="opacity-80">({{ favorites.count }})</span>
      </button>
    </div>

    <div v-if="!route.query.mode" class="flex flex-wrap gap-1.5 mb-4">
      <router-link
        v-for="m in workModeFilters"
        :key="m.id"
        :to="m.to"
        class="text-xs px-2.5 py-1 rounded-full font-medium border transition-colors inline-flex items-center gap-1"
        :class="route.query.mode === m.id ? 'btn-pill-active' : 'btn-pill-inactive'"
      >
        <AppIcon :name="m.icon" size="xs" class="inline" /> {{ m.label }}
      </router-link>
    </div>

    <div class="panel-violet mb-4">
      <h2 class="font-semibold text-violet-900 text-sm mb-0.5"><IconLabel icon="target" tag="span">按你的情况筛选</IconLabel></h2>
      <p class="text-[11px] text-violet-700 mb-3">年龄、性别、出摊人数、家人能否帮忙</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <div>
          <label class="label text-violet-800">年龄</label>
          <select v-model="filters.age" class="select">
            <option value="">不限</option>
            <option v-for="a in ageGroups" :key="a.id" :value="a.id">{{ a.label }}</option>
          </select>
        </div>
        <div>
          <label class="label text-violet-800">职业/身份</label>
          <select v-model="filters.occupation" class="select">
            <option value="">不限</option>
            <option v-for="o in occupations" :key="o.id" :value="o.id">{{ o.label }}</option>
          </select>
        </div>
        <div>
          <label class="label text-violet-800">性格</label>
          <select v-model="filters.personality" class="select">
            <option value="">不限</option>
            <option v-for="p in personalities" :key="p.id" :value="p.id">{{ p.label }}</option>
          </select>
        </div>
        <div>
          <label class="label text-violet-800">残疾等级</label>
          <select v-model="filters.disability" class="select">
            <option v-for="d in disabilityLevels" :key="d.id" :value="d.id">{{ d.label }}</option>
          </select>
        </div>
      </div>
      <details class="group">
        <summary class="text-xs font-medium text-violet-800 cursor-pointer list-none flex items-center gap-1">
          更多条件（性别 · 人数 · 家庭 · 证照）
          <span class="text-violet-400 group-open:rotate-180 transition-transform text-[10px]">▼</span>
        </summary>
        <div class="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <ProfileExtraFields v-model="profileExtra" hint-family="负担重优先选手工、周末市集" />
        </div>
      </details>
    </div>

    <div class="panel mb-5 space-y-3">
      <input
        v-model="filters.keyword"
        type="search"
        placeholder="搜索项目名称、标签..."
        class="input"
      />
      <div class="flex flex-wrap items-center justify-between gap-2">
        <label class="label mb-0">行业品类</label>
        <router-link to="/categories" class="text-xs text-brand-600 hover:underline">查看全部品类 →</router-link>
      </div>
      <div class="grid sm:grid-cols-2 gap-2">
        <div>
          <select v-model="filters.sector" class="select" @change="onSectorChange">
            <option value="">全部大类</option>
            <option v-for="s in zhaoShangSectors" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
        </div>
        <div>
          <select v-model="filters.sub" class="select" :disabled="!filters.sector" @change="syncQuery">
            <option value="">全部细类</option>
            <option v-for="sub in sectorSubs" :key="sub.id" :value="sub.id">{{ sub.label }}</option>
          </select>
        </div>
      </div>
      <details v-if="!filters.sector || filters.sector === 'food'" class="group">
        <summary class="text-xs font-medium text-stone-500 cursor-pointer list-none flex items-center gap-1">
          餐饮细类快捷筛选
          <span class="text-stone-400 group-open:rotate-180 transition-transform text-[10px]">▼</span>
        </summary>
        <div class="flex flex-wrap gap-1.5 mt-2">
          <button
            type="button"
            class="text-xs px-2.5 py-1 rounded-full font-medium border transition-colors"
            :class="!filters.fiftyEight ? 'btn-pill-active' : 'btn-pill-inactive'"
            @click="setFiftyEight('')"
          >
            全部餐饮
          </button>
          <button
            v-for="cat in fiftyEightCategories"
            :key="cat.id"
            type="button"
            class="text-xs px-2.5 py-1 rounded-full font-medium border transition-colors"
            :class="filters.fiftyEight === cat.id ? 'btn-pill-active' : 'btn-pill-inactive'"
            @click="setFiftyEight(cat.id)"
          >
            {{ cat.label }}
          </button>
        </div>
      </details>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div>
          <label class="label">预算上限</label>
          <select v-model="filters.budget" class="select">
            <option value="">不限</option>
            <option value="1000">1000元以内</option>
            <option value="2000">2000元以内</option>
            <option value="5000">5000元以内</option>
            <option value="10000">10000元以内</option>
          </select>
        </div>
        <div>
          <label class="label">类型</label>
          <select v-model="filters.category" class="select">
            <option value="">全部</option>
            <option v-for="cat in projectCategories" :key="cat.name" :value="cat.name">{{ cat.name }}</option>
          </select>
        </div>
        <div>
          <label class="label">难度</label>
          <select v-model="filters.difficulty" class="select">
            <option value="">全部</option>
            <option value="简单">简单</option>
            <option value="中等">中等</option>
            <option value="困难">困难</option>
          </select>
        </div>
        <div>
          <label class="label">排序</label>
          <select v-model="filters.sort" class="select">
            <option value="default">默认</option>
            <option value="cost-asc">成本从低到高</option>
            <option value="income-desc">收入从高到低</option>
          </select>
        </div>
      </div>

      <div v-if="hasAnyFilter" class="flex flex-wrap items-center gap-2 text-xs">
        <span class="text-stone-500">当前筛选</span>
        <button class="text-brand-600 hover:underline" @click="resetFilters">清除全部</button>
      </div>
    </div>

    <div v-if="filteredProjects.length" class="grid-cards">
      <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
    </div>
    <div v-else class="text-center py-12 text-stone-400">
      <AppIcon name="search" size="xl" class="mx-auto mb-2 text-stone-300" />
      <p class="text-sm">{{ showFavoritesOnly ? '还没有收藏项目，点卡片右上角 ☆ 收藏' : '没有匹配的项目，试试放宽条件' }}</p>
      <button v-if="showFavoritesOnly" class="mt-3 text-sm text-brand-600 hover:underline" @click="toggleFavoritesOnly">查看全部项目</button>
      <button v-else class="mt-3 text-sm text-brand-600 hover:underline" @click="resetFilters">清除筛选</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import PageHeader from '../components/ui/PageHeader.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import IconLabel from '../components/ui/IconLabel.vue'
import ProfileExtraFields from '../components/ProfileExtraFields.vue'
import { projects, searchProjects, matchCreatorProfile } from '../data/mock.js'
import { useFavoritesStore } from '../stores/favorites.js'
import {
  ageGroups,
  occupations,
  personalities,
  disabilityLevels,
} from '../data/creatorMatch.js'
import { categories as allCategories } from '../data/categories.js'
import {
  zhaoShangSectors,
  fiftyEightCategories,
  filterByFiftyEightGroup,
  filterByZhaoShangSector,
  filterByZhaoShangSub,
  getZhaoShangSector,
} from '../data/zhaoShang58.js'
import { filterByWorkMode } from '../data/projectWorkMode.js'

const projectCategories = allCategories.filter((c) => !c.isFranchise && !c.isWorkMode)

const workModeFilters = [
  { id: 'stall', label: '出摊/线下', icon: 'store', to: { path: '/projects', query: { mode: 'stall' } } },
  { id: 'parttime', label: '兼职', icon: 'clock', to: '/part-time' },
  { id: 'remote', label: '居家', icon: 'home', to: '/remote' },
  { id: 'freelance', label: '自由职业', icon: 'briefcase', to: { path: '/remote', query: { tab: 'freelance' } } },
]

const pageTitle = computed(() => {
  if (route.query.mode === 'stall') return '出摊 / 线下项目'
  return '个人创业项目库'
})

const pageSubtitle = computed(() => {
  const base = `共 ${projects.length} 个项目 · 当前显示 ${filteredProjects.value.length} 个`
  if (route.query.mode === 'stall') return `${base} · 市集、夜市、社区定点等`
  return `${base} · 摆摊只是形式之一，含兼职与居家`
})

const route = useRoute()
const router = useRouter()
const favorites = useFavoritesStore()
const showFavoritesOnly = ref(route.query.fav === '1')

function toggleFavoritesOnly() {
  showFavoritesOnly.value = !showFavoritesOnly.value
  const query = { ...route.query }
  if (showFavoritesOnly.value) query.fav = '1'
  else delete query.fav
  router.replace({ query })
}

const profileExtra = reactive({
  gender: '',
  teamMode: '',
  familyMember: '',
  familyBurden: '',
  health: '',
  businessLicense: '',
  healthCert: '',
  languageLevel: '',
  languageCount: '',
})

const filters = reactive({
  keyword: '',
  budget: '',
  category: '',
  difficulty: '',
  sort: 'default',
  budgetMin: null,
  budgetMax: null,
  fiftyEight: '',
  sector: '',
  sub: '',
  age: '',
  occupation: '',
  personality: '',
  disability: 'none',
})

const sectorSubs = computed(() => {
  if (!filters.sector) return []
  return getZhaoShangSector(filters.sector)?.subs || []
})

const hasAnyFilter = computed(() =>
  showFavoritesOnly.value ||
  filters.keyword || filters.budget || filters.category || filters.difficulty ||
  filters.fiftyEight || filters.sector || filters.sub ||
  filters.age || filters.occupation || filters.personality ||
  (filters.disability && filters.disability !== 'none') ||
  profileExtra.familyBurden || profileExtra.health || profileExtra.businessLicense ||
  profileExtra.healthCert || profileExtra.languageLevel || profileExtra.languageCount ||
  profileExtra.gender || profileExtra.teamMode || profileExtra.familyMember
)

const profileFilters = computed(() => ({
  age: filters.age,
  occupation: filters.occupation,
  personality: filters.personality,
  disability: filters.disability,
  familyBurden: profileExtra.familyBurden,
  health: profileExtra.health,
  businessLicense: profileExtra.businessLicense,
  healthCert: profileExtra.healthCert,
  languageLevel: profileExtra.languageLevel,
  languageCount: profileExtra.languageCount,
  gender: profileExtra.gender,
  teamMode: profileExtra.teamMode,
  familyMember: profileExtra.familyMember,
}))

const filteredProjects = computed(() => {
  let list = [...projects]

  if (filters.keyword) list = searchProjects(list, filters.keyword)
  if (filters.budget) list = list.filter((p) => p.cost_min <= Number(filters.budget))
  if (filters.category) list = list.filter((p) => p.category === filters.category)
  if (filters.sector) list = filterByZhaoShangSector(list, filters.sector)
  if (filters.sub) list = filterByZhaoShangSub(list, filters.sub)
  if (filters.fiftyEight) list = filterByFiftyEightGroup(list, filters.fiftyEight)
  if (filters.difficulty) list = list.filter((p) => p.difficulty === filters.difficulty)
  if (route.query.tag) list = list.filter((p) => p.tags.includes(route.query.tag))
  if (route.query.mode) list = filterByWorkMode(list, route.query.mode)

  const min = Number(route.query.budgetMin ?? filters.budgetMin ?? 0)
  const max = Number(route.query.budgetMax ?? filters.budgetMax ?? 999999)
  if (route.query.budgetMin || route.query.budgetMax) {
    list = list.filter((p) => p.cost_min >= min && p.cost_min <= max)
  }

  list = list.filter((p) => matchCreatorProfile(p, profileFilters.value))

  if (showFavoritesOnly.value) {
    list = list.filter((p) => favorites.has(p.id))
  }

  if (filters.sort === 'cost-asc') list.sort((a, b) => a.cost_min - b.cost_min)
  if (filters.sort === 'income-desc') list.sort((a, b) => b.income_max - a.income_max)

  return list
})

function onSectorChange() {
  filters.sub = ''
  filters.fiftyEight = ''
  syncQuery()
}

function syncQuery() {
  const query = { ...route.query }
  if (filters.sector) query.sector = filters.sector
  else delete query.sector
  if (filters.sub) query.sub = filters.sub
  else delete query.sub
  if (filters.fiftyEight) query.foodCat = filters.fiftyEight
  else delete query.foodCat
  router.replace({ query })
}

function setFiftyEight(id) {
  filters.fiftyEight = id
  if (id) filters.sector = 'food'
  syncQuery()
}

function resetFilters() {
  showFavoritesOnly.value = false
  Object.assign(filters, {
    keyword: '', budget: '', category: '', difficulty: '', sort: 'default',
    budgetMin: null, budgetMax: null, fiftyEight: '', sector: '', sub: '',
    age: '', occupation: '', personality: '', disability: 'none',
  })
  Object.assign(profileExtra, {
    gender: '', teamMode: '', familyMember: '',
    familyBurden: '', health: '', businessLicense: '', healthCert: '', languageLevel: '', languageCount: '',
  })
  router.replace({ query: {} })
}

watch(() => route.query, (q) => {
  showFavoritesOnly.value = q.fav === '1'
  if (q.category) filters.category = q.category
  if (q.sector) filters.sector = q.sector
  if (q.sub) filters.sub = q.sub
  if (q.foodCat) filters.fiftyEight = q.foodCat
  else if (q.f58) filters.fiftyEight = q.f58
  if (q.age) filters.age = q.age
  if (q.occupation) filters.occupation = q.occupation
  if (q.personality) filters.personality = q.personality
  if (q.disability) filters.disability = q.disability
}, { immediate: true })
</script>
