<template>
  <section class="detail-section border-l-4 border-l-[#1f2328]">
    <h2 class="detail-section-title"><IconLabel icon="users" tag="span">什么人适合做这个？</IconLabel></h2>

    <div class="grid sm:grid-cols-2 gap-3 mb-3">
      <div>
        <p class="label">适合年龄</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="a in fit.age" :key="a" class="badge-neutral">{{ labelAge(a) }}</span>
        </div>
        <p v-if="fit.age_note" class="text-xs text-stone-500 mt-1">{{ fit.age_note }}</p>
      </div>
      <div>
        <p class="label">适合职业/身份</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="o in fit.occupation" :key="o" class="badge-neutral">{{ labelOccupation(o) }}</span>
        </div>
        <p v-if="fit.occupation_note" class="text-xs text-stone-500 mt-1">{{ fit.occupation_note }}</p>
      </div>
      <div>
        <p class="label">适合性格</p>
        <div class="flex flex-wrap gap-1">
          <span v-for="p in fit.personality" :key="p" class="badge-neutral">{{ labelPersonality(p) }}</span>
        </div>
        <p v-if="fit.personality_note" class="text-xs text-stone-500 mt-1">{{ fit.personality_note }}</p>
      </div>
      <div>
        <p class="label">体力与社交</p>
        <p class="text-sm text-stone-700">
          站立：{{ fit.physical?.stand || '—' }} ·
          体力：{{ fit.physical?.strength || '—' }} ·
          社交：{{ fit.physical?.social || '—' }}
        </p>
      </div>
    </div>

    <div class="bg-stone-50 rounded-lg p-3 mb-3">
      <p class="text-sm font-medium text-stone-800 mb-2"><IconLabel icon="users" tag="span" icon-size="xs">出摊人数与分工</IconLabel></p>
      <div class="grid sm:grid-cols-2 gap-2 text-sm mb-2">
        <div>
          <p class="text-xs text-stone-500">建议人数</p>
          <p class="text-stone-800 font-medium">{{ staffRange }}（理想 {{ staffing.staff_ideal }} 人）</p>
        </div>
        <div>
          <p class="text-xs text-stone-500">适合模式</p>
          <p class="text-stone-800">{{ shopModesText }}</p>
        </div>
      </div>
      <p v-if="staffing.couple_suitable" class="text-xs text-[#656d76] mb-1">适合夫妻店分工</p>
      <p v-if="staffing.staffing_note" class="text-sm text-stone-600">{{ staffing.staffing_note }}</p>
      <ul v-if="staffing.roles?.length" class="mt-1.5 space-y-0.5">
        <li v-for="role in staffing.roles" :key="role" class="text-xs text-stone-600 flex gap-1">
          <span>·</span>{{ role }}
        </li>
      </ul>
      <p v-if="staffing.gender_note" class="text-xs text-stone-400 mt-1">{{ staffing.gender_note }}</p>
    </div>

    <div class="bg-stone-50 rounded-lg p-3 mb-3">
      <p class="text-sm font-medium text-stone-800 mb-1">
        残疾友好度：<span :class="disabilityBadgeClass">{{ disabilityLabel }}</span>
      </p>
      <p v-if="fit.disability?.levels?.length" class="text-xs text-stone-600 mb-0.5">较适合等级：{{ disabilityLevelsText }}</p>
      <p v-if="fit.disability?.notes" class="text-sm text-stone-600">{{ fit.disability.notes }}</p>
      <p v-if="fit.disability?.avoid" class="text-xs text-red-700 mt-1.5 inline-flex items-center gap-1">
        <AppIcon name="alert" size="xs" /> {{ fit.disability.avoid }}
      </p>
    </div>

    <div v-if="req" class="bg-stone-50 rounded-lg p-3">
      <p class="text-sm font-medium text-stone-800 mb-2"><IconLabel icon="clipboard" tag="span" icon-size="xs">条件与证照要求</IconLabel></p>
      <div class="grid sm:grid-cols-2 gap-2 text-sm">
        <div>
          <p class="text-xs text-stone-500">健康证</p>
          <p class="text-stone-800 font-medium">{{ healthCertLabel }}</p>
          <p v-if="req.health_cert_note" class="text-xs text-stone-400 mt-0.5">{{ req.health_cert_note }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500">个体户/执照</p>
          <p class="text-stone-800 font-medium">{{ licenseLabel }}</p>
          <p v-if="req.business_license_note" class="text-xs text-stone-400 mt-0.5">{{ req.business_license_note }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500">家庭负担</p>
          <p class="text-stone-800">{{ familyLabel }}</p>
          <p v-if="req.family_burden_note" class="text-xs text-stone-400 mt-0.5">{{ req.family_burden_note }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500">语言要求</p>
          <p class="text-stone-800">{{ languageLabel }}</p>
          <p v-if="req.language_note" class="text-xs text-stone-400 mt-0.5">{{ req.language_note }}</p>
        </div>
        <div class="sm:col-span-2">
          <p class="text-xs text-stone-500">身体状况</p>
          <p class="text-stone-800">{{ req.health_note }}</p>
          <p v-if="req.health_avoid?.length" class="text-xs text-red-600 mt-0.5">不适合：{{ healthAvoidText }}</p>
        </div>
        <div>
          <p class="text-xs text-stone-500">时间灵活度</p>
          <p class="text-stone-800">{{ timeFlexLabel }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'
import IconLabel from './ui/IconLabel.vue'
import {
  labelAge,
  labelOccupation,
  labelPersonality,
  disabilityLevels,
} from '../data/creatorMatch.js'
import { labelHealth } from '../data/projectRequirements.js'
import { formatStaffRange } from '../data/projectStaffing.js'

const props = defineProps({
  fit: { type: Object, required: true },
  staffing: { type: Object, default: null },
})

const staffing = computed(() => props.staffing || props.fit.staffing)
const staffRange = computed(() => formatStaffRange(staffing.value))

const shopModesText = computed(() => {
  const map = { solo: '单人', couple: '夫妻/情侣', family: '家庭', partner: '合伙' }
  return (staffing.value?.shop_modes || []).map((m) => map[m] || m).join(' · ')
})

const req = computed(() => props.fit.requirements)

const healthCertLabel = computed(() => {
  const m = { required: '必须', optional: '不强制', not_required: '不需要' }
  return m[req.value?.health_cert] || '—'
})

const licenseLabel = computed(() => {
  const m = { required: '建议办理', recommended: '建议办理', optional: '可选' }
  return m[req.value?.business_license] || '—'
})

const familyLabel = computed(() =>
  (req.value?.family_burden_ok || []).map((id) => ({ light: '轻', medium: '中', heavy: '重' }[id] || id)).join(' / ') + ' 负担可考虑'
)

const languageLabel = computed(() => {
  const m = { good: '需表达流利', average: '一般沟通即可', weak: '弱表达也可' }
  return m[req.value?.language_min] || '—'
})

const timeFlexLabel = computed(() => {
  const m = { 高: '高（适合家庭负担重）', 中: '中等', 低: '低（时段固定）' }
  return m[req.value?.time_flex] || '—'
})

const healthAvoidText = computed(() =>
  (req.value?.health_avoid || []).map((id) => labelHealth(id)).join('、')
)

const disabilityLabel = computed(() => {
  const d = props.fit.disability
  if (!d) return '未标注'
  if (d.suitable === false) return '不太适合出摊（体力/环境限制）'
  if (d.levels?.includes('2')) return '较友好（含二三四级部分类型）'
  return '部分等级可胜任'
})

const disabilityBadgeClass = computed(() => {
  const d = props.fit.disability
  if (d?.suitable === false) return 'text-[#1f2328]'
  if (d?.levels?.length >= 2) return 'text-[#656d76]'
  return 'text-[#656d76]'
})

const disabilityLevelsText = computed(() =>
  (props.fit.disability?.levels || [])
    .map((id) => disabilityLevels.find((d) => d.id === id)?.label || id)
    .join('、')
)
</script>
