<template>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

    <router-link

      v-for="tier in budgetTiers"

      :key="tier.label"

      :to="{ path: '/projects', query: { budgetMin: tier.min || 0, budgetMax: tier.max || 999999 } }"

      class="tile group text-center items-center"

    >

      <span class="text-brand-600"><AppIcon :name="tier.icon" size="md" /></span>

      <p class="font-semibold text-stone-900 text-sm mt-1 group-hover:text-brand-600">{{ tier.label }}</p>

      <p class="text-[11px] text-stone-500 mt-0.5">{{ tier.desc }}</p>

    </router-link>

  </div>

</template>



<script setup>
import AppIcon from './ui/AppIcon.vue'
import { budgetTiers } from '../data/guides.js'
</script>


