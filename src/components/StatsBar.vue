<template>

  <section class="bg-white border-b border-stone-200">

    <div class="app-container py-4">

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

        <div v-for="stat in stats" :key="stat.label">

          <p class="text-xl md:text-2xl font-semibold text-stone-900 tabular-nums">{{ stat.value }}</p>

          <p class="text-xs text-stone-500 mt-0.5">{{ stat.label }}</p>

        </div>

      </div>

    </div>

  </section>

</template>



<script setup>

import { computed } from 'vue'

import { projects, cases } from '../data/mock.js'



const stats = computed(() => [

  { value: `${projects.length}+`, label: '创业项目' },

  { value: `${cases.length}+`, label: '成功案例' },

  { value: '500元', label: '最低起步' },

  { value: '3秒', label: '快速匹配' },

])

</script>


