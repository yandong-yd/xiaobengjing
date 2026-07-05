<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold text-stone-800 mb-2">摆摊 / 创业故事</h1>
    <p class="text-stone-500 mb-8">
      {{ cases.length }} 个真实路径 — 不只晒收入，更讲怎么选、怎么熬、本质要点是什么
    </p>

    <div class="bg-brand-50 border border-brand-200 rounded-2xl p-5 mb-8 text-sm text-brand-900">
      <strong>怎么读故事：</strong>看启动资金、前3个月怎么过、关键决策、利润模型是否含时间成本。
      对照项目详情页的「五步法」和「问题预演」。
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <CaseCard v-for="c in cases" :key="c.id" :case-item="c" />
    </div>
  </div>
</template>

<script setup>
import CaseCard from '../components/CaseCard.vue'
import { cases } from '../data/mock.js'
</script>
