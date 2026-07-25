<template>
  <section class="relative overflow-hidden border-b border-[#d0d7de] bg-[#f6f8fa]">
    <div
      class="absolute inset-0 opacity-[0.35]"
      style="background-image: radial-gradient(#d0d7de 1px, transparent 1px); background-size: 18px 18px;"
      aria-hidden="true"
    />
    <div class="absolute inset-x-0 top-0 h-px bg-[#d0d7de]" />

    <div class="relative app-container py-14 md:py-20 text-center max-w-3xl">
      <p class="text-[#656d76] text-xs font-semibold mb-3 tracking-[0.2em] uppercase">
        小本经 · 摆摊手册
      </p>
      <h1 class="text-3xl md:text-5xl font-bold text-[#1f2328] mb-3 leading-tight tracking-tight">
        小本经
      </h1>
      <p class="text-[#656d76] text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
        输入预算，生成赚钱方案。出摊、兼职、居家 — 选项目、算账、避坑。
      </p>

      <form class="max-w-xl mx-auto" @submit.prevent="handleSearch">
        <div class="flex flex-col sm:flex-row gap-2 bg-white rounded-md p-1.5 border border-[#d0d7de] shadow-sm">
          <input
            v-model="query"
            type="text"
            placeholder="我有5000元，想在三线城市创业"
            class="flex-1 px-3 py-2 text-sm text-[#1f2328] placeholder-[#8c959f] rounded-md focus:outline-none"
          />
          <button type="submit" class="btn-primary rounded-md px-4 py-2 whitespace-nowrap inline-flex items-center gap-1.5">
            <AppIcon name="robot" size="xs" />
            获取方案
          </button>
        </div>
      </form>

      <div class="flex flex-wrap justify-center gap-1.5 mt-4">
        <button
          v-for="example in examples"
          :key="example"
          class="text-xs px-2.5 py-1 bg-white hover:bg-[#eaeef2] text-[#656d76] rounded-full transition-colors border border-[#d0d7de]"
          @click="query = example"
        >
          {{ example }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from './ui/AppIcon.vue'

const router = useRouter()
const query = ref('')

const examples = [
  '我有3000元想创业',
  '5000元周末兼职',
  '在家接单自由职业',
  '2000元宝妈副业',
]

function parseQuery(text) {
  const budgetMatch = text.match(/(\d+)\s*元/)
  const budget = budgetMatch ? budgetMatch[1] : '3000'

  let city = '三线城市'
  if (text.includes('一线')) city = '一线城市'
  else if (text.includes('二线')) city = '二线城市'

  return { budget, city, q: text }
}

function handleSearch() {
  const { budget, city, q } = parseQuery(query.value || '我有3000元想创业')
  router.push({ path: '/ai', query: { budget, city, q } })
}
</script>
