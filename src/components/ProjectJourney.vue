<template>
  <section class="mb-5">
    <div class="section-head mb-3">
      <div>
        <h2 class="section-title inline-flex items-center gap-1.5">
          <AppIcon name="academic" size="sm" class="text-brand-600" />
          手把手五步法
        </h2>
        <p class="section-desc">从小白到上手 — 选择、认识、准备、实施、问题预演</p>
      </div>
    </div>

    <div class="space-y-2">
      <div v-for="step in steps" :key="step.id" class="card overflow-hidden">
        <button
          type="button"
          class="w-full flex items-center gap-3 p-3.5 text-left hover:bg-stone-50 transition-colors"
          @click="open = open === step.id ? null : step.id"
        >
          <span class="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold shrink-0">
            {{ step.step }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-stone-800 inline-flex items-center gap-1">
              <AppIcon :name="step.icon" size="xs" class="text-brand-600" />
              {{ step.title }}
            </p>
            <p class="text-xs text-stone-500 truncate">{{ step.summary }}</p>
          </div>
          <span class="text-stone-400 text-xs">{{ open === step.id ? '▲' : '▼' }}</span>
        </button>
        <div v-show="open === step.id" class="px-3.5 pb-3.5 border-t border-stone-100">
          <ul class="mt-3 space-y-1.5">
            <li v-for="(pt, i) in step.points" :key="i" class="text-sm text-stone-600 flex gap-2">
              <span class="text-brand-500 shrink-0">·</span>{{ pt }}
            </li>
          </ul>
          <p class="mt-3 text-xs bg-brand-50 text-brand-800 rounded-lg px-3 py-2">
            <strong>行动：</strong>{{ step.action }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'
import { buildProjectJourney } from '../lib/projectJourney.js'

const props = defineProps({
  project: { type: Object, required: true },
})

const open = ref('choose')
const steps = computed(() => buildProjectJourney(props.project))
</script>
