<template>
  <section class="relative overflow-hidden bg-stone-900 border-b border-stone-800">
    <!-- 背景大图 + 深色渐变蒙层 -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80&auto=format&fit=crop"
        alt=""
        class="w-full h-full object-cover opacity-60"
        loading="eager"
        @error="$event.target.style.display='none'"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/60 to-stone-900/85" />
    </div>

    <div class="relative app-container py-16 md:py-24 text-center max-w-3xl">
      <p class="text-amber-400 text-xs font-bold mb-3 tracking-widest">小本经 · 摆摊手册 · 渡你上岸</p>
      <h1 class="text-2xl md:text-4xl font-bold text-white mb-3 leading-snug tracking-tight">
        输入预算，AI 帮你生成赚钱方案
      </h1>
      <p class="text-stone-300 text-sm md:text-base mb-8 max-w-2xl mx-auto">
        出摊、兼职、居家 — 选项目、算账、避坑，<strong class="text-white font-medium">一步一步做到自己当老板</strong>
      </p>

      <form class="max-w-xl mx-auto" @submit.prevent="handleSearch">
        <div class="flex flex-col sm:flex-row gap-2 bg-white rounded-lg p-1.5 shadow-xl">
          <input
            v-model="query"
            type="text"
            placeholder="我有5000元，想在三线城市创业"
            class="flex-1 px-3 py-2 text-sm text-stone-800 placeholder-stone-400 rounded-md focus:outline-none"
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
          class="text-xs px-2.5 py-1 bg-white/10 hover:bg-white/20 text-stone-200 rounded-full transition-colors border border-white/15 backdrop-blur-sm"
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
