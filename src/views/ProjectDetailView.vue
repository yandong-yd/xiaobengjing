<template>
  <div v-if="project" class="page-narrow pb-10">
    <router-link to="/projects" class="page-back">← 返回项目库</router-link>

    <div class="mb-5">
      <div class="detail-hero-img">
        <CoverImage
          :src="project.image"
          :alt="project.image_alt || project.name"
          :pool-key="project.image_pool || 'market'"
          img-class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-wrap items-center gap-1.5 mb-2">
        <span class="badge-brand">{{ project.category }}</span>
        <span
          v-for="wm in project.work_mode_labels"
          :key="wm.id"
          class="badge inline-flex items-center gap-1"
          :class="workModeBadgeClass(wm.id)"
        >
          <AppIcon :name="wm.icon" size="xs" /> {{ wm.label }}
        </span>
        <span class="badge-neutral">{{ project.difficulty }}</span>
      </div>
      <h1 class="page-title text-2xl mb-1">{{ project.name }}</h1>
      <p class="text-sm text-stone-600 leading-relaxed">{{ project.description }}</p>
      <div class="flex flex-wrap gap-1.5 mt-3">
        <router-link
          v-for="tag in project.tags"
          :key="tag"
          :to="{ path: '/projects', query: { tag } }"
          class="badge-neutral px-2.5 py-1 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 border border-transparent transition-colors"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <p class="stat-label">启动成本</p>
        <p class="stat-value">{{ costRange }}</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">日收入（区间）</p>
        <p class="stat-value text-green-700">{{ incomeRange }}</p>
        <p class="text-[11px] text-stone-400 mt-0.5">老手上限 · 新手通常更低</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">天气依赖</p>
        <span class="badge mt-0.5" :class="weatherClass">{{ project.weather?.level || '中' }}</span>
        <p class="text-[11px] text-stone-400 mt-1.5 line-clamp-2">{{ project.weather?.detail }}</p>
      </div>
      <router-link
        :to="{ path: '/calculator', query: { project: project.id } }"
        class="sm:col-span-3 panel-brand flex items-center justify-between gap-2 hover:bg-brand-100/80 transition-colors"
      >
        <span class="text-sm text-brand-800 inline-flex items-center gap-1">
          <AppIcon name="calculator" size="xs" /> 用账单计算器估算「{{ project.name }}」能不能做
        </span>
        <span class="text-brand-600 text-xs font-medium shrink-0">打开 →</span>
      </router-link>
    </div>

    <section v-if="project.realistic_note" class="detail-section-accent">
      <p class="text-xs font-medium text-stone-700 mb-1">真实预期（别被理想案例忽悠）</p>
      <p class="text-sm text-stone-600 leading-relaxed">{{ project.realistic_note }}</p>
    </section>

    <ProjectJourney :project="project" />
    <ProjectPlaybook v-if="project.playbook" :playbook="project.playbook" />
    <CreatorFitSection v-if="project.creator_fit" :fit="project.creator_fit" :staffing="project.staffing" />

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="users" tag="span">主打群体</IconLabel></h2>
      <p class="text-sm text-stone-600 leading-relaxed">{{ project.target_audience }}</p>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="chat" tag="span">常用话术（现场怎么说）</IconLabel></h2>
      <div class="space-y-2">
        <div v-for="(item, i) in project.talk_phrases" :key="i" class="bg-stone-50 rounded-lg p-3">
          <p class="text-xs text-brand-600 font-medium mb-0.5">{{ item.when }}</p>
          <p class="text-stone-800 text-sm">「{{ item.say }}」</p>
        </div>
      </div>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="chart" tag="span">成本结构</IconLabel></h2>
      <div class="space-y-2 text-sm">
        <div v-for="(val, key) in project.cost_breakdown" :key="key" class="flex gap-3">
          <span class="text-stone-500 w-16 shrink-0">{{ costLabels[key] }}</span>
          <span class="text-stone-800">{{ val }}</span>
        </div>
      </div>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="money" tag="span">收入模型</IconLabel></h2>
      <div class="space-y-2 text-sm">
        <div v-for="(val, key) in project.income_model" :key="key" class="flex gap-3">
          <span class="text-stone-500 w-20 shrink-0">{{ incomeLabels[key] }}</span>
          <span class="text-stone-800">{{ val }}</span>
        </div>
      </div>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="compass" tag="span">操作流程</IconLabel></h2>
      <div class="space-y-4">
        <div v-for="(steps, phase) in project.steps" :key="phase">
          <h3 class="text-sm font-medium text-stone-700 mb-1.5">{{ stepLabels[phase] }}</h3>
          <ol class="space-y-1.5">
            <li v-for="(step, i) in steps" :key="i" class="flex gap-2 text-sm text-stone-600">
              <span class="w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{{ i + 1 }}</span>
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="detail-section-accent">
      <h2 class="detail-section-title"><IconLabel icon="trend-down" tag="span">生意很差怎么办</IconLabel></h2>
      <ol class="space-y-1.5">
        <li v-for="(tip, i) in project.slow_day_playbook" :key="i" class="flex gap-2 text-sm text-stone-700">
          <span class="w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">{{ i + 1 }}</span>
          {{ tip }}
        </li>
      </ol>
    </section>

    <section class="detail-section">
      <h2 class="detail-section-title"><IconLabel icon="cloud" tag="span">天气影响与应对</IconLabel></h2>
      <p class="text-sm text-stone-600 mb-2">依赖程度：<strong>{{ project.weather?.level }}</strong> — {{ project.weather?.detail }}</p>
      <ul class="space-y-1">
        <li v-for="(t, i) in project.weather?.tactics" :key="i" class="text-sm text-stone-600 flex gap-2">
          <span class="text-stone-400">→</span>{{ t }}
        </li>
      </ul>
    </section>

    <section class="detail-section-warn">
      <h2 class="detail-section-title"><IconLabel icon="alert" tag="span">风险提示</IconLabel></h2>
      <ul class="space-y-1.5">
        <li v-for="(risk, i) in project.risks" :key="i" class="flex gap-2 text-sm text-stone-700">
          <span class="text-red-400 shrink-0">•</span>{{ risk }}
        </li>
      </ul>
    </section>

    <section class="detail-section-brand">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="detail-section-title mb-0"><IconLabel icon="robot" tag="span">顾问优化建议</IconLabel></h2>
        <button
          class="btn-primary btn-pill text-xs py-1.5 disabled:opacity-60"
          :disabled="guideLoading"
          @click="generateGuide"
        >
          {{ guideLoading ? '生成中...' : '生成完整指南' }}
        </button>
      </div>
      <ul class="space-y-1.5 mb-3">
        <li v-for="(tip, i) in project.ai_tips" :key="i" class="flex gap-2 text-sm text-brand-800">
          <AppIcon name="lightbulb" size="xs" class="shrink-0 mt-0.5 text-brand-600" />{{ tip }}
        </li>
      </ul>
      <div v-if="aiGuide" class="pt-3 border-t border-brand-200">
        <pre class="whitespace-pre-wrap text-sm text-stone-700 leading-relaxed font-sans">{{ aiGuide }}</pre>
      </div>
    </section>

    <section v-if="relatedProjects.length" class="mb-5">
      <h2 class="section-title mb-3">相关项目</h2>
      <div class="grid-cards">
        <ProjectCard v-for="p in relatedProjects" :key="p.id" :project="p" />
      </div>
    </section>

    <section v-if="relatedCases.length" class="mb-6">
      <h2 class="section-title mb-3">相关成功案例</h2>
      <div class="grid sm:grid-cols-2 gap-3">
        <CaseCard v-for="c in relatedCases" :key="c.id" :case-item="c" />
      </div>
    </section>

    <div class="flex flex-wrap gap-2 justify-center pt-2">
      <router-link
        :to="{ path: '/ai', query: { project: project.id, budget: project.cost_min, city: '三线城市' } }"
        class="btn-primary btn-pill px-6 py-2.5"
      >
        <AppIcon name="robot" size="sm" /> 让投资顾问为我定制方案
      </router-link>
      <router-link to="/guide" class="btn-ghost btn-pill px-6 py-2.5">
        <AppIcon name="book" size="sm" /> 新手指南
      </router-link>
    </div>
  </div>

  <div v-else class="page-narrow py-16 text-center text-stone-400">
    <AppIcon name="search" size="xl" class="mx-auto mb-3 text-stone-300" />
    <p class="text-sm">项目不存在</p>
    <router-link to="/projects" class="text-brand-600 text-sm mt-3 inline-block">返回项目库</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import CaseCard from '../components/CaseCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import CoverImage from '../components/ui/CoverImage.vue'
import IconLabel from '../components/ui/IconLabel.vue'
import ProjectPlaybook from '../components/ProjectPlaybook.vue'
import ProjectJourney from '../components/ProjectJourney.vue'
import CreatorFitSection from '../components/CreatorFitSection.vue'
import { getProjectById, getRelatedProjects, getRelatedCases, formatCostRange, formatIncomeRange } from '../data/mock.js'
import { weatherLevelStyle } from '../data/projectRealism.js'
import { generateProjectGuide } from '../lib/ai.js'
import { workModeBadgeClass } from '../data/projectWorkMode.js'

const route = useRoute()
const project = computed(() => getProjectById(route.params.id))
const relatedProjects = computed(() => getRelatedProjects(project.value))
const relatedCases = computed(() => getRelatedCases(project.value))

const weatherClass = computed(() => {
  const level = project.value?.weather?.level || '中'
  return weatherLevelStyle[level] || 'badge-neutral'
})

const aiGuide = ref('')
const guideLoading = ref(false)

const costRange = computed(() => project.value ? formatCostRange(project.value.cost_min, project.value.cost_max) : '')
const incomeRange = computed(() => project.value ? formatIncomeRange(project.value.income_min, project.value.income_max) : '')

const costLabels = { equipment: '设备', ingredients: '食材/原料', stall: '摊位' }
const incomeLabels = { daily: '日收入', profit: '利润率', peak: '高峰时段' }
const stepLabels = { prepare: '1. 准备阶段', operate: '2. 摆摊流程', manage: '3. 运营方法' }

async function generateGuide() {
  if (!project.value) return
  guideLoading.value = true
  try {
    const { content } = await generateProjectGuide(project.value.name, project.value)
    aiGuide.value = content
  } finally {
    guideLoading.value = false
  }
}
</script>
