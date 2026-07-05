<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
    <div class="app-container h-14 flex items-center justify-between gap-4">
      <router-link to="/" class="flex items-center gap-2 min-w-0 font-semibold shrink-0">
        <AppLogo size="md" />
        <span class="flex flex-col leading-tight min-w-0">
          <span class="text-base text-stone-900">小本经</span>
          <span class="hidden lg:inline text-[10px] text-stone-400 font-normal truncate">从小本到老板 · 摆摊手册</span>
        </span>
      </router-link>

      <nav class="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-2xl">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link px-2.5 py-1 rounded-md hover:bg-stone-50"
          active-class="nav-link-active border-b-2 border-accent-600 rounded-b-none"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <router-link to="/ai" class="btn-primary btn-pill hidden sm:inline-flex text-xs py-1.5 shrink-0 gap-1">
        <AppIcon name="robot" size="xs" />
        <span>投资顾问</span>
      </router-link>

      <button
        class="lg:hidden p-1.5 text-stone-600 rounded-md hover:bg-stone-100"
        aria-label="菜单"
        @click="menuOpen = !menuOpen"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div v-if="menuOpen" class="lg:hidden border-t border-stone-200 bg-white px-4 py-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-sm">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="py-2 text-stone-600 hover:text-accent-700"
        active-class="!text-accent-700 font-medium"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </router-link>
      <router-link to="/ai" class="col-span-2 py-2 text-brand-600 font-medium border-t border-stone-100 mt-1 flex items-center gap-1" @click="menuOpen = false">
        <AppIcon name="robot" size="xs" /> 投资顾问
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'
import AppIcon from './ui/AppIcon.vue'

const menuOpen = ref(false)

const links = [
  { to: '/', label: '首页' },
  { to: '/projects', label: '项目库' },
  { to: '/categories', label: '品类' },
  { to: '/part-time', label: '兼职' },
  { to: '/remote', label: '居家' },
  { to: '/challenges', label: '难题' },
  { to: '/cases', label: '案例' },
  { to: '/franchise', label: '加盟' },
]
</script>
