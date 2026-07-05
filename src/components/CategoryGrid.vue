<template>

  <div class="grid-tiles">

    <router-link

      v-for="cat in categoryList"

      :key="cat.name"

      :to="categoryLink(cat)"

      class="tile group flex-row items-center gap-3 !flex-row"

      :class="cat.isFranchise ? 'border-amber-200 bg-gradient-to-br from-amber-50/40 to-white' : ''"

    >

      <span class="text-brand-600 shrink-0"><AppIcon :name="cat.icon" size="md" /></span>

      <div class="min-w-0 flex-1">

        <p class="tile-title truncate">{{ cat.name }}</p>

        <p class="tile-desc line-clamp-1">{{ cat.desc }}</p>

        <p class="tile-meta">

          {{ cat.isFranchise ? `${cat.count} 个品牌` : `${cat.count} 个项目` }} →

        </p>

      </div>

    </router-link>

  </div>

</template>



<script setup>

import { computed } from 'vue'
import AppIcon from './ui/AppIcon.vue'

import { projects } from '../data/mock.js'

import { categories } from '../data/categories.js'

import { franchises } from '../data/franchises.js'

import { filterByWorkMode } from '../data/projectWorkMode.js'



function categoryLink(cat) {

  if (cat.isFranchise) return '/franchise'

  if (cat.isWorkMode) return cat.route

  return { path: '/projects', query: { category: cat.name } }

}



const categoryList = computed(() =>

  categories.map((c) => ({

    ...c,

    count: c.isFranchise

      ? franchises.length

      : c.slug === 'parttime'

        ? filterByWorkMode(projects, 'parttime').length

        : c.slug === 'remote'

          ? filterByWorkMode(projects, 'remote').length

          : projects.filter((p) => p.category === c.name).length,

  }))

)

</script>


