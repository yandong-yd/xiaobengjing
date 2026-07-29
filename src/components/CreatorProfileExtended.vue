<template>
  <div class="space-y-4">
    <p class="text-xs font-medium text-[#656d76] bg-[#f6f8fa] px-3 py-2 rounded-lg">
      填得越细，推荐越准 — 帮你不进厂、不坐班也能选对路
    </p>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-1">为什么想创业（不想上班？）</label>
      <select :value="modelValue.motivation" class="w-full px-3 py-2 border border-[#d0d7de] rounded-xl text-sm bg-white" @change="update('motivation', $event.target.value)">
        <option value="">请选择</option>
        <option v-for="m in motivations" :key="m.id" :value="m.id">{{ m.label }}</option>
      </select>
    </div>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-1">前职业 / 之前做什么</label>
      <select :value="modelValue.formerJob" class="w-full px-3 py-2 border border-[#d0d7de] rounded-xl text-sm bg-white" @change="update('formerJob', $event.target.value)">
        <option value="">请选择</option>
        <option v-for="j in formerJobs" :key="j.id" :value="j.id">{{ j.label }}</option>
      </select>
    </div>

    <div class="grid sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-medium text-[#1f2328] mb-1">月收入目标</label>
        <select :value="modelValue.incomeGoal" class="w-full px-3 py-2 border border-[#d0d7de] rounded-xl text-sm bg-white" @change="update('incomeGoal', $event.target.value)">
          <option value="">不限</option>
          <option v-for="g in incomeGoals" :key="g.id" :value="g.id">{{ g.label }}</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-medium text-[#1f2328] mb-1">可用时间</label>
        <select :value="modelValue.availableTime" class="w-full px-3 py-2 border border-[#d0d7de] rounded-xl text-sm bg-white" @change="update('availableTime', $event.target.value)">
          <option value="">不限</option>
          <option v-for="t in availableTimes" :key="t.id" :value="t.id">{{ t.label }}</option>
        </select>
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-2">爱好（可多选）</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="h in hobbyOptions"
          :key="h.id"
          type="button"
          class="text-xs px-2.5 py-1 rounded-full border transition-colors"
          :class="modelValue.hobbies?.includes(h.id) ? 'bg-[#1f2328] text-white border-[#1f2328]' : 'bg-white border-[#d0d7de] text-[#1f2328]'"
          @click="toggleArray('hobbies', h.id)"
        >
          {{ h.label }}
        </button>
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-2">会什么（可多选）</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="s in skillOptions"
          :key="s.id"
          type="button"
          class="text-xs px-2.5 py-1 rounded-full border transition-colors"
          :class="modelValue.skillsKnown?.includes(s.id) ? 'bg-[#1f2328] text-white border-[#1f2328]' : 'bg-white border-stone-200 text-stone-700'"
          @click="toggleArray('skillsKnown', s.id)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-2">讨厌 / 接受不了（可多选）</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="d in dislikeOptions"
          :key="d.id"
          type="button"
          class="text-xs px-2.5 py-1 rounded-full border transition-colors"
          :class="modelValue.dislikes?.includes(d.id) ? 'bg-[#eaeef2] text-[#1f2328] border-[#1f2328]' : 'bg-white border-stone-200 text-stone-600'"
          @click="toggleArray('dislikes', d.id)"
        >
          {{ d.label }}
        </button>
      </div>
    </div>

    <div>
      <label class="block text-xs font-medium text-[#1f2328] mb-1">补充说明（选填）</label>
      <textarea
        :value="modelValue.freeText"
        rows="2"
        placeholder="例如：怕油烟、只能在家、有驾照..."
        class="w-full px-3 py-2 border border-[#d0d7de] rounded-xl text-sm resize-none"
        @input="update('freeText', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import {
  motivations,
  formerJobs,
  incomeGoals,
  availableTimes,
  hobbyOptions,
  skillOptions,
  dislikeOptions,
} from '../data/userProfile.js'

const props = defineProps({
  modelValue: { type: Object, required: true },
})

const emit = defineEmits(['update:modelValue'])

function update(key, val) {
  emit('update:modelValue', { ...props.modelValue, [key]: val })
}

function toggleArray(key, id) {
  const arr = [...(props.modelValue[key] || [])]
  const i = arr.indexOf(id)
  if (i >= 0) arr.splice(i, 1)
  else arr.push(id)
  update(key, arr)
}
</script>
