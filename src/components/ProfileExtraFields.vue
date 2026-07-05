<template>
  <div class="space-y-3">
    <div class="grid sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-medium text-violet-800 mb-1">性别</label>
        <select :value="modelValue.gender" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('gender', $event.target.value)">
          <option value="">不限</option>
          <option v-for="g in genders" :key="g.id" :value="g.id">{{ g.label }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-violet-800 mb-1">出摊人数/模式</label>
        <select :value="modelValue.teamMode" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('teamMode', $event.target.value)">
          <option value="">不限</option>
          <option v-for="t in teamModes" :key="t.id" :value="t.id">{{ t.label }}</option>
        </select>
        <p v-if="teamModeHint" class="text-xs text-violet-600 mt-0.5">{{ teamModeHint }}</p>
      </div>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">家庭成员谁能参与？</label>
      <select :value="modelValue.familyMember" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('familyMember', $event.target.value)">
        <option value="">不限 / 未调研</option>
        <option v-for="f in familyMemberOptions" :key="f.id" :value="f.id">{{ f.label }}</option>
      </select>
      <p v-if="familyMemberHint" class="text-xs text-violet-600 mt-0.5">{{ familyMemberHint }}</p>
    </div>

    <hr class="border-violet-200" />

    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">家庭负担</label>
      <select :value="modelValue.familyBurden" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('familyBurden', $event.target.value)">
        <option value="">不限</option>
        <option v-for="f in familyBurdens" :key="f.id" :value="f.id">{{ f.label }}</option>
      </select>
      <p v-if="hintFamily" class="text-xs text-violet-600 mt-0.5">{{ hintFamily }}</p>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">身体状况</label>
      <select :value="modelValue.health" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('health', $event.target.value)">
        <option value="">不限 / 健康</option>
        <option v-for="h in healthStatuses" :key="h.id" :value="h.id">{{ h.label }}</option>
      </select>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">个体户/营业执照</label>
      <select :value="modelValue.businessLicense" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('businessLicense', $event.target.value)">
        <option value="">不限</option>
        <option v-for="b in businessLicenseStatus" :key="b.id" :value="b.id">{{ b.label }}</option>
      </select>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">健康证情况</label>
      <select :value="modelValue.healthCert" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('healthCert', $event.target.value)">
        <option value="">不限</option>
        <option v-for="h in healthCertStatus" :key="h.id" :value="h.id">{{ h.label }}</option>
      </select>
      <p v-if="modelValue.healthCert === 'cannot'" class="text-xs text-red-600 mt-0.5">将自动排除必须健康证的餐饮项目</p>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">语言表达能力</label>
      <select :value="modelValue.languageLevel" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('languageLevel', $event.target.value)">
        <option value="">不限</option>
        <option v-for="l in languageLevels" :key="l.id" :value="l.id">{{ l.label }}</option>
      </select>
    </div>
    <div>
      <label class="block text-xs font-medium text-violet-800 mb-1">会几种语言</label>
      <select :value="modelValue.languageCount" class="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm bg-white" @change="update('languageCount', $event.target.value)">
        <option value="">不限</option>
        <option v-for="l in languageCounts" :key="l.id" :value="l.id">{{ l.label }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  familyBurdens,
  healthStatuses,
  businessLicenseStatus,
  healthCertStatus,
  languageLevels,
  languageCounts,
} from '../data/projectRequirements.js'
import { teamModes, genders, familyMemberOptions } from '../data/projectStaffing.js'

const props = defineProps({
  modelValue: { type: Object, required: true },
  hintFamily: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const teamModeHint = computed(() =>
  teamModes.find((t) => t.id === props.modelValue.teamMode)?.desc || ''
)

const familyMemberHint = computed(() =>
  familyMemberOptions.find((f) => f.id === props.modelValue.familyMember)?.desc || ''
)

function update(key, val) {
  emit('update:modelValue', { ...props.modelValue, [key]: val })
}
</script>
