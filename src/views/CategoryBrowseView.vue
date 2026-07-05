<template>
  <div class="page">
    <PageHeader
      center
      eyebrow="品类导航"
      title="创业品类大全"
      description="按行业整理的小本摆摊/副业可落地方向"
    />

    <p class="text-xs text-stone-500 text-center mb-6 -mt-2">
      本站为小本自营版，侧重低预算可落地项目，非大额加盟
    </p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      <button
        v-for="sector in zhaoShangSectors"
        :key="sector.id"
        type="button"
        class="text-left panel p-4 hover:border-brand-300 hover:shadow-md transition-all"
        @click="openSector(sector.id)"
      >
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="inline-flex items-center gap-1.5 font-semibold text-stone-900 text-sm">
            <AppIcon :name="sector.icon" size="sm" class="text-brand-600" />
            {{ sector.label }}
          </span>
          <span class="badge-brand shrink-0">{{ sectorCounts[sector.id] || 0 }} 项</span>
        </div>
        <p class="text-xs text-stone-500 line-clamp-2">
          {{ sector.subs.slice(0, 4).map((s) => s.label).join(' · ') }}
          <span v-if="sector.subs.length > 4"> 等{{ sector.subs.length }}类</span>
        </p>
      </button>
    </div>

    <div v-if="activeSector" class="panel mb-6">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="font-semibold text-stone-900 text-sm">
          {{ activeSector.label }} · 细分类
        </h2>
        <router-link
          :to="{ path: '/projects', query: { sector: activeSector.id } }"
          class="text-xs text-brand-600 hover:underline"
        >
          查看全部 {{ sectorCounts[activeSector.id] || 0 }} 个项目 →
        </router-link>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <router-link
          v-for="sub in activeSector.subs"
          :key="sub.id"
          :to="{ path: '/projects', query: { sector: activeSector.id, sub: sub.id } }"
          class="text-xs px-2.5 py-1 rounded-full font-medium border transition-colors btn-pill-inactive hover:border-brand-300"
        >
          {{ sub.label }}
          <span v-if="subCounts[sub.id]" class="text-stone-400">({{ subCounts[sub.id] }})</span>
        </router-link>
      </div>
    </div>

    <div class="panel-brand text-center py-6">
      <p class="text-sm text-brand-900 mb-3">不确定选哪类？让投资顾问根据你的预算和情况匹配</p>
      <router-link to="/ai" class="btn-primary btn-pill inline-flex items-center gap-1.5">
        <AppIcon name="robot" size="xs" /> 咨询投资顾问
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/ui/PageHeader.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { projects } from '../data/mock.js'
import {
  zhaoShangSectors,
  getZhaoShangSector,
  countProjectsBySector,
  countProjectsBySub,
} from '../data/zhaoShang58.js'

const sectorCounts = computed(() => countProjectsBySector(projects))
const activeId = ref(zhaoShangSectors[0]?.id || 'food')
const activeSector = computed(() => getZhaoShangSector(activeId.value))
const subCounts = computed(() =>
  activeId.value ? countProjectsBySub(projects, activeId.value) : {},
)

function openSector(id) {
  activeId.value = id
}
</script>
