<template>

  <div class="grid-cards-4">

    <router-link

      v-for="mode in modesWithCount"

      :key="mode.id"

      :to="modeLink(mode)"

      class="tile group"

      :class="highlightClass(mode.id)"

    >

      <span class="tile-icon text-brand-600"><AppIcon :name="mode.icon" size="md" /></span>

      <p class="tile-title">{{ mode.label }}</p>

      <p class="tile-desc">{{ mode.desc }}</p>

      <p class="tile-meta">{{ mode.count }} 个项目 →</p>

    </router-link>

  </div>

</template>



<script setup>

import { computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'

import { projects } from '../data/mock.js'

import { workModes, countByWorkMode } from '../data/projectWorkMode.js'



const counts = computed(() => countByWorkMode(projects))



const modesWithCount = computed(() =>

  workModes.map((m) => ({

    ...m,

    count: counts.value[m.id] || 0,

  }))

)



function modeLink(mode) {

  if (mode.query) return { path: mode.route, query: mode.query }

  return mode.route

}



function highlightClass(id) {

  if (id === 'parttime') return 'border-blue-100 bg-gradient-to-br from-blue-50/40 to-white'

  if (id === 'remote') return 'border-green-100 bg-gradient-to-br from-green-50/40 to-white'

  return ''

}

</script>


