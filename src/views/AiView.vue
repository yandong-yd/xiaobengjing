<template>
  <div class="page">
    <PageHeader
      center
      eyebrow="核心功能"
      title="投资顾问"
      :description="`填画像，从 ${projectCount} 个项目里闭环匹配方案`"
    />

    <div v-if="focusProject" class="panel-brand mb-4 text-xs text-brand-900">
      正在为 <strong>「{{ focusProject.name }}」</strong> 定制方案 — 填好城市后点生成。
    </div>

    <div class="flex flex-wrap justify-center gap-1.5 mb-5">
      <button
        v-for="preset in aiPresets"
        :key="preset.label"
        class="btn-ghost btn-pill text-xs"
        @click="applyPreset(preset)"
      >
        {{ preset.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <form class="md:col-span-2 space-y-3" @submit.prevent="handleGenerate">
        <div class="panel space-y-3">
          <p class="text-xs font-medium text-violet-700 bg-violet-50 px-2.5 py-1.5 rounded-md">你的画像</p>

          <p class="text-xs font-medium text-stone-600">基本信息</p>
          <div>
            <label class="label">预算（元）<span class="text-red-500">*</span></label>
            <input v-model="form.budget" type="number" min="500" placeholder="例如：3000" required class="input" />
          </div>
          <div>
            <label class="label">城市<span class="text-red-500">*</span></label>
            <input v-model="form.city" type="text" placeholder="例如：洛阳" required class="input" />
          </div>
          <div>
            <label class="label">是否全职</label>
            <select v-model="form.fullTime" class="select">
              <option value="是">是，全职创业</option>
              <option value="否">否，兼职/副业</option>
            </select>
          </div>

          <hr class="border-stone-200" />
          <p class="text-xs font-medium text-stone-600">你的情况（越准匹配越好）</p>
          <div>
            <label class="label">年龄</label>
            <select v-model="form.age" class="select">
              <option value="">请选择</option>
              <option v-for="a in ageGroups" :key="a.id" :value="a.id">{{ a.label }}</option>
            </select>
          </div>
          <div>
            <label class="label">职业/身份</label>
            <select v-model="form.occupation" class="select">
              <option value="">请选择</option>
              <option v-for="o in occupations" :key="o.id" :value="o.id">{{ o.label }}</option>
            </select>
          </div>
          <div>
            <label class="label">性格</label>
            <select v-model="form.personality" class="select">
              <option value="">请选择</option>
              <option v-for="p in personalities" :key="p.id" :value="p.id">{{ p.label }}</option>
            </select>
          </div>
          <div>
            <label class="label">技能（选填）</label>
            <input v-model="form.skills" type="text" placeholder="烹饪、手工、维修..." class="input" />
          </div>
          <div>
            <label class="label">残疾等级</label>
            <select v-model="form.disability" class="select">
              <option v-for="d in disabilityLevels" :key="d.id" :value="d.id">{{ d.label }}</option>
            </select>
          </div>

          <hr class="border-stone-200" />
          <details class="group">
            <summary class="text-xs font-medium text-stone-500 cursor-pointer list-none flex items-center gap-1">
              个人现实条件（选填）
              <span class="text-stone-400 group-open:rotate-180 transition-transform text-[10px]">▼</span>
            </summary>
            <div class="mt-2 space-y-3">
              <ProfileExtraFields v-model="profileExtra" />
            </div>
          </details>

          <details class="group">
            <summary class="text-xs font-medium text-stone-500 cursor-pointer list-none flex items-center gap-1">
              扩展画像（选填，填细更准）
              <span class="text-stone-400 group-open:rotate-180 transition-transform text-[10px]">▼</span>
            </summary>
            <div class="mt-2">
              <CreatorProfileExtended v-model="profileExtended" />
            </div>
          </details>

          <button type="submit" :disabled="loading" class="w-full btn-primary py-2.5 disabled:opacity-60 inline-flex items-center justify-center gap-1.5">
            <AppIcon v-if="!loading" name="robot" size="xs" />
            {{ loading ? '匹配中...' : '生成投资方案' }}
          </button>
        </div>
      </form>

      <div class="md:col-span-3">
        <div v-if="loading" class="panel p-8 text-center">
          <AppIcon name="robot" size="xl" class="mx-auto mb-4 text-brand-500 animate-bounce" />
          <p class="text-stone-500">正在结合你的画像匹配项目...</p>
        </div>

        <div v-else-if="error" class="panel-accent bg-red-50 border-red-200 p-4 text-red-700 text-sm">{{ error }}</div>
        <div v-else-if="result" class="panel p-4">
          <div class="flex items-center justify-end mb-4">
            <button class="text-sm text-brand-600 hover:text-brand-700 inline-flex items-center gap-1" @click="copyResult">
              <AppIcon name="clipboard" size="xs" /> 复制结果
            </button>
          </div>
          <div class="whitespace-pre-wrap text-stone-700 leading-relaxed text-sm">{{ result }}</div>
        </div>

        <div v-else class="panel p-8 text-center border-dashed bg-stone-50 text-stone-500 text-sm">
          <AppIcon name="sparkles" size="xl" class="mx-auto mb-4 text-stone-300" />
          <p class="text-stone-500">先填预算和城市，再选年龄、职业、性格</p>
          <p class="text-stone-400 text-sm mt-2">会匹配项目库 + 输出完整闭环建议</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { generateStartupPlan, aiPresets } from '../lib/ai.js'
import PageHeader from '../components/ui/PageHeader.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import ProfileExtraFields from '../components/ProfileExtraFields.vue'
import CreatorProfileExtended from '../components/CreatorProfileExtended.vue'
import { defaultExtendedProfile } from '../data/userProfile.js'
import { projects, getProjectById } from '../data/mock.js'
import {
  ageGroups,
  occupations,
  personalities,
  disabilityLevels,
} from '../data/creatorMatch.js'

const route = useRoute()
const form = reactive({
  budget: '',
  city: '',
  fullTime: '否',
  skills: '',
  age: '',
  occupation: '',
  personality: '',
  disability: 'none',
})

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

const profileExtended = reactive({ ...defaultExtendedProfile })
const loading = ref(false)
const result = ref('')
const error = ref('')
const projectId = ref('')

const projectCount = computed(() => projects.length)
const focusProject = computed(() => (projectId.value ? getProjectById(projectId.value) : null))

function applyPreset(preset) {
  Object.assign(form, {
    budget: preset.budget,
    city: preset.city,
    fullTime: preset.fullTime,
    skills: preset.skills || '',
    age: preset.age || '',
    occupation: preset.occupation || '',
    personality: preset.personality || '',
    disability: preset.disability || 'none',
  })
  Object.assign(profileExtra, {
    gender: preset.gender || '',
    teamMode: preset.teamMode || '',
    familyMember: preset.familyMember || '',
    familyBurden: preset.familyBurden || '',
    health: preset.health || '',
    businessLicense: preset.businessLicense || '',
    healthCert: preset.healthCert || '',
    languageLevel: preset.languageLevel || '',
    languageCount: preset.languageCount || '',
  })
  Object.assign(profileExtended, {
    motivation: preset.motivation || '',
    formerJob: preset.formerJob || '',
    incomeGoal: preset.incomeGoal || '',
    availableTime: preset.availableTime || '',
    hobbies: preset.hobbies || [],
    skillsKnown: preset.skillsKnown || [],
    dislikes: preset.dislikes || [],
    freeText: preset.freeText || '',
  })
}

onMounted(() => {
  if (route.query.budget) form.budget = route.query.budget
  if (route.query.city) form.city = route.query.city
  else if (route.query.budget) form.city = '三线城市'
  if (route.query.project) {
    projectId.value = route.query.project
    const p = getProjectById(route.query.project)
    if (p && !form.budget) form.budget = String(p.cost_min)
  }
  if (route.query.budget && form.city) handleGenerate()
})

async function handleGenerate() {
  loading.value = true
  error.value = ''
  result.value = ''
  try {
    const { content } = await generateStartupPlan(
      { ...form, ...profileExtra, ...profileExtended },
      focusProject.value
    )
    result.value = content
  } catch (e) {
    error.value = e.message || '生成失败，请重试'
  } finally {
    loading.value = false
  }
}

async function copyResult() {
  await navigator.clipboard.writeText(result.value)
}
</script>
