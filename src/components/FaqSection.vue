<template>

  <div class="space-y-2">

    <details

      v-for="faq in faqs"

      :key="faq.q"

      class="group card overflow-hidden"

    >

      <summary class="px-4 py-3 cursor-pointer text-sm font-medium text-stone-800 hover:bg-stone-50 list-none flex justify-between items-center gap-2">

        {{ faq.q }}

        <span class="text-stone-400 group-open:rotate-180 transition-transform text-xs shrink-0">▼</span>

      </summary>

      <p class="px-4 pb-3 text-stone-600 text-xs leading-relaxed border-t border-stone-100 pt-2">{{ faq.a }}</p>

    </details>

  </div>

</template>



<script setup>

import { faqs } from '../data/guides.js'

</script>


