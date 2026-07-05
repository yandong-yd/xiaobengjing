<template>

  <div>

    <SearchHero />

    <StatsBar />



    <section class="section-tight">

      <SectionHead title="按创业形态浏览" description="出摊、兼职、居家接单都算个人创业" />

      <WorkModeStrip />

    </section>



    <section class="section-tight border-t border-stone-100">

      <SectionHead

        title="按行业类型浏览"

        :description="`${projectCategories.length}+ 个方向：餐饮、手工、美业、宠物、加盟等`"

      />

      <CategoryGrid />

    </section>



    <section class="section-muted section-tight">

      <SectionHead title="按预算选项目" description="你有多少钱，就能起步什么项目" />

      <BudgetPicker />

    </section>



    <section class="section-tight">

      <SectionHead

        title="推荐项目"

        :description="`精选 ${projects.length} 个低成本创业项目`"

        to="/projects"

      />

      <div class="grid-cards">

        <ProjectCard v-for="p in featuredProjects" :key="p.id" :project="p" />

      </div>

    </section>



    <section class="section-muted section-tight">

      <SectionHead

        title="成功案例"

        :description="`${cases.length} 个真实创业故事`"

        to="/cases"

      />

      <div class="grid-cards">

        <CaseCard v-for="c in featuredCases" :key="c.id" :case-item="c" />

      </div>

    </section>



    <section class="section-tight">
      <SectionHead title="快捷入口" description="工具与专题" />
      <div class="grid-cards-4 mb-6">
        <router-link to="/part-time" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="clock" size="md" /></span>
          <p class="tile-title">兼职副业</p>
          <p class="tile-desc">周末、晚间可做的个人创业</p>
        </router-link>
        <router-link to="/remote" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="home" size="md" /></span>
          <p class="tile-title">居家办公</p>
          <p class="tile-desc">写作、设计、剪辑、电商接单</p>
        </router-link>
        <router-link to="/guide" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="book" size="md" /></span>
          <p class="tile-title">新手指南</p>
          <p class="tile-desc">选址、证照、装备、避坑</p>
        </router-link>
        <router-link to="/calculator" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="calculator" size="md" /></span>
          <p class="tile-title">账单计算器</p>
          <p class="tile-desc">真实盈利 vs 打工时薪</p>
        </router-link>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <router-link to="/categories" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="shopping-bag" size="md" /></span>
          <p class="tile-title">品类导航</p>
          <p class="tile-desc">13大类 · 80+细分类对照</p>
        </router-link>
        <router-link to="/franchise" class="tile group">
          <span class="tile-icon text-stone-900"><AppIcon name="handshake" size="md" /></span>
          <p class="tile-title">加盟品牌</p>
          <p class="tile-desc">怎么选、怎么验、避坑清单</p>
        </router-link>
        <router-link to="/ai" class="tile group">
          <span class="tile-icon text-brand-600"><AppIcon name="robot" size="md" /></span>
          <p class="tile-title">投资顾问</p>
          <p class="tile-desc">填画像，3 秒生成定制方案</p>
        </router-link>
      </div>
    </section>



    <section class="section-tight border-t border-stone-100">
      <div class="section-head">
        <div class="min-w-0">
          <h2 class="section-title flex items-center gap-2">
            <span class="hot-badge">热</span>
            热门标签
          </h2>
          <p class="section-desc">快速找到适合你的方向</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <router-link
          v-for="tag in hotTags"
          :key="tag"
          :to="{ path: '/projects', query: { tag } }"
          class="badge-neutral px-2.5 py-1 hover:border-stone-400 hover:text-accent-700 hover:bg-stone-50 border border-stone-200 transition-colors"
        >
          # {{ tag }}
        </router-link>
      </div>
    </section>



    <section class="section-tight pb-10">

      <SectionHead title="常见问题" />

      <FaqSection />

    </section>



    <section class="section-tight pb-12">
      <div class="card bg-stone-900 border-stone-900 p-6 md:p-8 text-white text-center">
        <h2 class="text-lg md:text-xl font-semibold mb-1">还没找到合适的项目？</h2>
        <p class="text-stone-400 text-sm mb-4 max-w-sm mx-auto">填写预算、城市和技能，获取专属投资方案</p>
        <router-link to="/ai" class="inline-flex btn bg-brand-500 text-white hover:bg-brand-600 font-semibold">
          立即咨询投资顾问
        </router-link>
      </div>
    </section>

  </div>

</template>



<script setup>

import { computed } from 'vue'

import SearchHero from '../components/SearchHero.vue'

import StatsBar from '../components/StatsBar.vue'

import AppIcon from '../components/ui/AppIcon.vue'
import SectionHead from '../components/ui/SectionHead.vue'

import WorkModeStrip from '../components/WorkModeStrip.vue'

import CategoryGrid from '../components/CategoryGrid.vue'

import BudgetPicker from '../components/BudgetPicker.vue'

import ProjectCard from '../components/ProjectCard.vue'

import CaseCard from '../components/CaseCard.vue'

import FaqSection from '../components/FaqSection.vue'

import { projects, cases, hotTags } from '../data/mock.js'

import { categories } from '../data/categories.js'



const projectCategories = categories.filter((c) => !c.isFranchise && !c.isWorkMode)

const featuredProjects = computed(() => projects.slice(0, 9))

const featuredCases = computed(() => cases.slice(0, 9))

</script>


