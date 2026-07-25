<template>
  <div v-if="project" class="page-narrow pb-12">
    <nav class="breadcrumb">
      <router-link to="/">首页</router-link>
      <span>›</span>
      <router-link to="/projects">项目库</router-link>
      <span>›</span>
      <span class="text-[#1f2328]">{{ project.name }}</span>
    </nav>

    <header class="mb-2">
      <h1 class="text-3xl sm:text-4xl font-bold text-[#1f2328] mb-3 tracking-tight">
        {{ project.name }}
      </h1>
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="article-tag-dark">{{ project.category }}</span>
        <span class="article-tag-muted">{{ project.difficulty }}</span>
        <span
          v-for="wm in project.work_mode_labels"
          :key="wm.id"
          class="article-tag-outline"
        >
          {{ wm.label }}
        </span>
        <span v-if="project.weather?.level" class="article-tag-outline">
          天气依赖 · {{ project.weather.level }}
        </span>
      </div>
      <p class="text-base text-[#656d76] leading-relaxed">
        {{ project.description }}
      </p>
      <div v-if="project.tags?.length" class="flex flex-wrap gap-1.5 mt-4">
        <router-link
          v-for="tag in project.tags"
          :key="tag"
          :to="{ path: '/projects', query: { tag } }"
          class="badge-neutral hover:border-[#1f2328] hover:text-[#1f2328] transition-colors"
        >
          {{ tag }}
        </router-link>
      </div>
    </header>

    <hr class="article-divider" />

    <article class="article-prose">
      <!-- 一、概述 -->
      <section>
        <h2>一、概述</h2>
        <p>
          {{ project.name }}属于「{{ project.category }}」方向的小本创业项目，难度评级为
          <strong>{{ project.difficulty }}</strong>。启动资金大约在
          <strong>{{ costRange }}</strong>，日收入区间参考
          <strong>{{ incomeRange }}</strong>（老手上限 · 新手通常更低）。
        </p>
        <p v-if="project.realistic_note">
          <strong>真实预期：</strong>{{ project.realistic_note }}
          做决策前先按这个区间压预算，别用短视频里的峰值当日常规划。
        </p>
        <p v-if="project.target_audience">
          主打客群是{{ project.target_audience }}。选址、话术、出摊时段都围着这群人转，比盲目跟风品类更重要。
        </p>
        <p>
          下文从投入回报、分类细化、操作流程、设备进货、优缺点等维度拆开说明，方便你对照自己的预算、时间和体力做判断。
        </p>
      </section>

      <!-- 二、投入与回报 -->
      <section>
        <h2>二、投入与回报</h2>
        <p>
          先看钱能不能回得来：启动成本决定「敢不敢上手」，日收入与利润率决定「值不值得长期做」。
          下面这张表把关键数字摊开，方便和同类项目横向对比。
        </p>

        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>指标</th>
                <th>数值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>启动成本</td>
                <td class="cell-em">{{ costRange }}</td>
                <td>含设备、首批原料、摊位押金等起步开支</td>
              </tr>
              <tr>
                <td>日收入区间</td>
                <td class="cell-em">{{ incomeRange }}</td>
                <td>老手上限；新手前几周通常落在下限附近</td>
              </tr>
              <tr>
                <td>利润率参考</td>
                <td class="cell-em">{{ project.income_model?.profit || '—' }}</td>
                <td>扣原料与摊位后的毛利空间，实际因损耗浮动</td>
              </tr>
              <tr>
                <td>高峰时段</td>
                <td>{{ project.income_model?.peak || '—' }}</td>
                <td>优先把人力和备货压在高峰，淡季少硬撑</td>
              </tr>
              <tr>
                <td>天气依赖</td>
                <td>
                  <span class="badge-neutral">{{ project.weather?.level || '中' }}</span>
                </td>
                <td>{{ project.weather?.detail || '视点位与业态而定' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          想按自己的房租、人工、原料单价精算，可用
          <router-link
            :to="{ path: '/calculator', query: { project: project.id } }"
            class="underline font-medium text-[#1f2328]"
          >账单计算器</router-link>
          估算「{{ project.name }}」能不能做。
        </p>
      </section>

      <!-- 三、项目分类细化 -->
      <section>
        <h2>三、项目分类细化</h2>
        <p>
          「{{ project.category }}」只是大类。真正落地时，要把成本结构、收入模型、人力配置拆成可执行的明细。
          以下表格对应日常记账和排班时最常用的几块。
        </p>

        <h3>3.1 成本结构</h3>
        <p>
          启动期花钱最多的通常是设备；跑起来之后，原料和摊位才是月月要付的刚性支出。按类记账，才知道哪一项在吃利润。
        </p>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>成本项</th>
                <th>预估金额 / 说明</th>
                <th>类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in costRows" :key="row.key">
                <td class="cell-em">{{ row.label }}</td>
                <td>{{ row.value }}</td>
                <td>{{ row.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3.2 收入模型</h3>
        <p>
          收入不是「卖多少份 × 单价」这么简单，还要看高峰能不能接住、淡季会不会亏本出摊。对照下表设定自己的保本线。
        </p>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>维度</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in incomeRows" :key="row.key">
                <td class="cell-em w-28">{{ row.label }}</td>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 v-if="staffingRows.length">3.3 人力与分工</h3>
        <p v-if="staffingRows.length">
          一个人硬扛、夫妻搭班、雇临时工，成本差很多。先按建议人数配齐关键岗位，再谈扩品类。
        </p>
        <div v-if="staffingRows.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>建议</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in staffingRows" :key="row.label">
                <td class="cell-em w-32">{{ row.label }}</td>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 v-if="fitRows.length">3.4 适合人群画像</h3>
        <p v-if="fitRows.length">
          不是每个项目都适合所有人。年龄、体力、社交强度对得上，坚持下来的概率才高。
        </p>
        <div v-if="fitRows.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>维度</th>
                <th>匹配情况</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in fitRows" :key="row.label">
                <td class="cell-em w-32">{{ row.label }}</td>
                <td>{{ row.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 四、操作流程 -->
      <section>
        <h2>四、操作流程</h2>
        <p>
          流程拆成准备、出摊、运营三段。新手最容易在「准备不充分就出摊」和「出了摊却不记账」两头翻车——按表推进即可。
        </p>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>阶段</th>
                <th>步骤</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="phase in stepRows" :key="phase.phase">
                <td class="cell-em whitespace-nowrap align-top">{{ phase.label }}</td>
                <td>
                  <ol class="list-decimal pl-4 space-y-1">
                    <li v-for="(step, i) in phase.steps" :key="i">{{ step }}</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="project.playbook?.loop_summary">
          <strong>全链路一句话：</strong>{{ project.playbook.loop_summary }}
        </p>
      </section>

      <!-- 五、设备与进货 -->
      <section v-if="equipmentRows.length || ingredientRows.length || licenseRows.length">
        <h2>五、设备、进货与证照</h2>
        <p>
          设备买贵了会长期压现金流，原料渠道不稳则天天慌。优先二手/本地市场试水，跑通再升级。
        </p>

        <h3 v-if="equipmentRows.length">5.1 设备清单</h3>
        <div v-if="equipmentRows.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>设备</th>
                <th>预算</th>
                <th>渠道</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(eq, i) in equipmentRows" :key="i">
                <td class="cell-em">{{ eq.item }}</td>
                <td class="whitespace-nowrap">{{ eq.budget }}</td>
                <td>{{ (eq.channels || []).join(' · ') || '—' }}</td>
                <td>{{ eq.note || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 v-if="ingredientRows.length">5.2 原料 / 耗材</h3>
        <div v-if="ingredientRows.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>品类</th>
                <th>预算</th>
                <th>渠道</th>
                <th>频率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ing, i) in ingredientRows" :key="i">
                <td class="cell-em">{{ ing.item }}</td>
                <td>{{ ing.budget }}</td>
                <td>{{ (ing.channels || []).join(' · ') || '—' }}</td>
                <td>{{ ing.frequency || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 v-if="licenseRows.length">5.3 证照办理顺序</h3>
        <p v-if="licenseRows.length">
          证照不齐容易被查停业。按顺序办：健康证通常最先，备案/许可视当地政策。
        </p>
        <div v-if="licenseRows.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>顺序</th>
                <th>证照</th>
                <th>办理处</th>
                <th>费用</th>
                <th>周期</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lic in licenseRows" :key="lic.name">
                <td>{{ lic.order }}</td>
                <td class="cell-em">{{ lic.name }}</td>
                <td>{{ lic.where }}</td>
                <td>{{ lic.cost }}</td>
                <td>{{ lic.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 六、现场话术 -->
      <section v-if="project.talk_phrases?.length">
        <h2>六、现场话术</h2>
        <p>
          同样的产品，会不会开口差一截成交率。把高频场景的话术背熟，比临时尬聊管用。
        </p>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>场景</th>
                <th>怎么说</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in project.talk_phrases" :key="i">
                <td class="cell-em whitespace-nowrap">{{ item.when }}</td>
                <td>「{{ item.say }}」</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 七、天气与淡季 -->
      <section>
        <h2>七、天气影响与淡季应对</h2>
        <p>
          依赖程度：<strong>{{ project.weather?.level || '中' }}</strong>
          <span v-if="project.weather?.detail"> — {{ project.weather.detail }}</span>
        </p>
        <div v-if="weatherTactics.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>应对策略</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, i) in weatherTactics" :key="'w'+i">
                <td>{{ i + 1 }}</td>
                <td>{{ t }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="project.slow_day_playbook?.length">生意很差时，优先排查点位与时段，而不是立刻降价清仓：</p>
        <div v-if="project.slow_day_playbook?.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>淡季动作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tip, i) in project.slow_day_playbook" :key="'s'+i">
                <td>{{ i + 1 }}</td>
                <td>{{ tip }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 八、优缺点 -->
      <section>
        <h2>八、优缺点</h2>
        <p>
          没有完美项目，只有适不适合你。优点决定上限，缺点决定你能不能扛过前三个月。
        </p>
        <div class="pros-cons">
          <div class="pros-box">
            <h3>优点</h3>
            <ul>
              <li v-for="(tip, i) in pros" :key="'p'+i">{{ tip }}</li>
            </ul>
          </div>
          <div class="cons-box">
            <h3>缺点 / 风险</h3>
            <ul>
              <li v-for="(risk, i) in cons" :key="'c'+i">{{ risk }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 九、综合评价 -->
      <section>
        <h2>九、综合评价</h2>
        <div class="score-grid">
          <div v-for="s in scores" :key="s.label" class="score-card">
            <p class="score-label">{{ s.label }}</p>
            <p class="score-value">{{ s.value }}</p>
          </div>
        </div>
        <p>
          综合来看，<strong>{{ project.name }}</strong>更适合
          {{ fitSummary }}。建议先用小预算试跑 7–14 天，再决定是否加码设备或加盟。
        </p>
      </section>

      <!-- 十、顾问建议 -->
      <section>
        <h2>十、顾问优化建议</h2>
        <p>以下是针对该项目的实操提醒；需要更完整的分步指南，可一键生成。</p>
        <div v-if="project.ai_tips?.length" class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>建议</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tip, i) in project.ai_tips" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ tip }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <button
            class="btn-primary text-xs py-1.5 disabled:opacity-60"
            :disabled="guideLoading"
            @click="generateGuide"
          >
            {{ guideLoading ? '生成中...' : '生成完整指南' }}
          </button>
        </div>
        <div v-if="aiGuide" class="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-4">
          <pre class="whitespace-pre-wrap text-sm text-[#1f2328] leading-relaxed font-sans">{{ aiGuide }}</pre>
        </div>
      </section>

      <!-- FAQ -->
      <section v-if="faqs.length">
        <h2>十一、常见问题</h2>
        <details v-for="(faq, i) in faqs" :key="i" class="faq-item" :open="i === 0">
          <summary>
            <span>{{ faq.q }}</span>
            <span class="text-[#656d76] text-xs shrink-0">展开</span>
          </summary>
          <div class="faq-body">{{ faq.a }}</div>
        </details>
      </section>
    </article>

    <div class="article-cta">
      <p class="text-base font-semibold text-[#1f2328] mb-1">准备试试「{{ project.name }}」？</p>
      <p class="text-sm text-[#656d76] mb-4">
        启动约 {{ costRange }}，日入参考 {{ incomeRange }}。先算账，再让顾问帮你拆第一步。
      </p>
      <div class="flex flex-wrap gap-2 justify-center">
        <router-link
          :to="{ path: '/ai', query: { project: project.id, budget: project.cost_min, city: '三线城市' } }"
          class="btn-primary px-5 py-2"
        >
          让投资顾问定制方案
        </router-link>
        <router-link
          :to="{ path: '/calculator', query: { project: project.id } }"
          class="btn-ghost px-5 py-2"
        >
          打开账单计算器
        </router-link>
        <router-link to="/guide" class="btn-ghost px-5 py-2">
          新手指南
        </router-link>
      </div>
    </div>

    <section v-if="relatedProjects.length" class="mt-10">
      <h2 class="text-lg font-bold text-[#1f2328] mb-3">相关项目</h2>
      <div class="grid-cards">
        <ProjectCard v-for="p in relatedProjects" :key="p.id" :project="p" />
      </div>
    </section>

    <section v-if="relatedCases.length" class="mt-8">
      <h2 class="text-lg font-bold text-[#1f2328] mb-3">相关成功案例</h2>
      <div class="grid sm:grid-cols-2 gap-3">
        <CaseCard v-for="c in relatedCases" :key="c.id" :case-item="c" />
      </div>
    </section>
  </div>

  <div v-else class="page-narrow py-16 text-center text-[#656d76]">
    <AppIcon name="search" size="xl" class="mx-auto mb-3 text-[#d0d7de]" />
    <p class="text-sm">项目不存在</p>
    <router-link to="/projects" class="text-[#1f2328] text-sm mt-3 inline-block underline">返回项目库</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import CaseCard from '../components/CaseCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { getProjectById, getRelatedProjects, getRelatedCases, formatCostRange, formatIncomeRange } from '../data/mock.js'
import { formatStaffRange } from '../data/projectStaffing.js'
import { generateProjectGuide } from '../lib/ai.js'
import { labelAge, labelOccupation, labelPersonality } from '../data/creatorMatch.js'

const route = useRoute()
const project = computed(() => getProjectById(route.params.id))
const relatedProjects = computed(() => getRelatedProjects(project.value))
const relatedCases = computed(() => getRelatedCases(project.value))

const aiGuide = ref('')
const guideLoading = ref(false)

const costRange = computed(() => project.value ? formatCostRange(project.value.cost_min, project.value.cost_max) : '')
const incomeRange = computed(() => project.value ? formatIncomeRange(project.value.income_min, project.value.income_max) : '')

const costLabels = {
  equipment: { label: '设备', type: '一次性 / 低频' },
  ingredients: { label: '食材 / 原料', type: '日常流动' },
  stall: { label: '摊位 / 场地', type: '月度固定' },
}
const incomeLabels = { daily: '日收入', profit: '利润率', peak: '高峰时段' }
const stepLabels = { prepare: '准备阶段', operate: '摆摊流程', manage: '运营方法' }

const costRows = computed(() => {
  const bd = project.value?.cost_breakdown || {}
  return Object.entries(bd).map(([key, value]) => ({
    key,
    label: costLabels[key]?.label || key,
    type: costLabels[key]?.type || '其他',
    value,
  }))
})

const incomeRows = computed(() => {
  const m = project.value?.income_model || {}
  return Object.entries(m).map(([key, value]) => ({
    key,
    label: incomeLabels[key] || key,
    value,
  }))
})

const stepRows = computed(() => {
  const steps = project.value?.steps || {}
  return Object.entries(steps).map(([phase, list]) => ({
    phase,
    label: stepLabels[phase] || phase,
    steps: list || [],
  }))
})

const equipmentRows = computed(() => project.value?.playbook?.equipment || [])
const ingredientRows = computed(() => project.value?.playbook?.ingredients || [])
const licenseRows = computed(() => {
  const list = project.value?.playbook?.licenses || []
  return [...list].sort((a, b) => (a.order || 0) - (b.order || 0))
})

const staffingRows = computed(() => {
  const s = project.value?.staffing
  if (!s) return []
  const rows = [
    { label: '建议人数', value: `${formatStaffRange(s)}（理想 ${s.staff_ideal ?? '—'} 人）` },
  ]
  if (s.shop_modes?.length) {
    const map = { solo: '单人', couple: '夫妻/情侣', family: '家庭', partner: '合伙' }
    rows.push({ label: '适合模式', value: s.shop_modes.map((m) => map[m] || m).join('、') })
  }
  if (s.couple_suitable) {
    rows.push({ label: '夫妻店', value: '适合夫妻分工搭班' })
  }
  if (s.staffing_note) {
    rows.push({ label: '备注', value: s.staffing_note })
  }
  return rows
})

const fitRows = computed(() => {
  const fit = project.value?.creator_fit
  if (!fit) return []
  const rows = []
  if (fit.age?.length) {
    rows.push({
      label: '适合年龄',
      value: fit.age.map(labelAge).join('、') + (fit.age_note ? `（${fit.age_note}）` : ''),
    })
  }
  if (fit.occupation?.length) {
    rows.push({
      label: '适合身份',
      value: fit.occupation.map(labelOccupation).join('、') + (fit.occupation_note ? `（${fit.occupation_note}）` : ''),
    })
  }
  if (fit.personality?.length) {
    rows.push({
      label: '适合性格',
      value: fit.personality.map(labelPersonality).join('、') + (fit.personality_note ? `（${fit.personality_note}）` : ''),
    })
  }
  if (fit.physical) {
    rows.push({
      label: '体力与社交',
      value: `站立 ${fit.physical.stand || '—'} · 体力 ${fit.physical.strength || '—'} · 社交 ${fit.physical.social || '—'}`,
    })
  }
  return rows
})

const weatherTactics = computed(() => project.value?.weather?.tactics || [])

const pros = computed(() => {
  const tips = project.value?.ai_tips || []
  const base = [
    `启动成本约 ${costRange.value}，门槛相对清晰`,
    project.value?.income_model?.profit ? `利润空间参考：${project.value.income_model.profit}` : null,
    project.value?.work_mode_labels?.length
      ? `支持形态：${project.value.work_mode_labels.map((w) => w.short || w.label).join(' / ')}`
      : null,
    ...tips.slice(0, 3),
  ]
  return base.filter(Boolean)
})

const cons = computed(() => {
  const risks = project.value?.risks || []
  const weather = project.value?.weather
  const extra = weather?.level === '高' ? ['天气依赖高，雨雪天收入波动大'] : []
  return [...risks, ...extra]
})

const difficultyScore = computed(() => {
  const map = { 简单: '9/10', 中等: '7/10', 困难: '5/10' }
  return map[project.value?.difficulty] || '7/10'
})

const weatherScore = computed(() => {
  const map = { 低: '9/10', 中: '7/10', 高: '4/10' }
  return map[project.value?.weather?.level] || '7/10'
})

const costScore = computed(() => {
  const max = project.value?.cost_max ?? 5000
  if (max <= 2000) return '9/10'
  if (max <= 5000) return '8/10'
  if (max <= 10000) return '6/10'
  return '5/10'
})

const scores = computed(() => [
  { label: '上手难度', value: difficultyScore.value },
  { label: '资金门槛', value: costScore.value },
  { label: '天气抗性', value: weatherScore.value },
  { label: '利润空间', value: project.value?.income_model?.profit ? '8/10' : '7/10' },
  { label: '综合推荐', value: '8/10' },
])

const fitSummary = computed(() => {
  const fit = project.value?.creator_fit
  if (fit?.occupation?.length) {
    return fit.occupation.slice(0, 3).map(labelOccupation).join('、') + '等群体'
  }
  return project.value?.target_audience || '愿意动手、能坚持记账的新手'
})

const faqs = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    {
      q: `${p.name}大概要准备多少启动资金？`,
      a: `建议按 ${costRange.value} 准备，并额外留 20–30% 周转金应付前两周的淡季与损耗。`,
    },
    {
      q: '新手一天能赚多少？',
      a: `公开区间是 ${incomeRange.value}，但这是老手上限附近的参考。新手前 1–2 周常落在下限甚至更低；${p.realistic_note || '先按保守数字规划生活费。'}`,
    },
    {
      q: '天气不好还能做吗？',
      a: p.weather
        ? `天气依赖为「${p.weather.level}」。${p.weather.detail}${p.weather.tactics?.length ? ' 可参考：' + p.weather.tactics.join('；') : ''}`
        : '视点位而定，室内或有雨棚的位置更稳。',
    },
    {
      q: '需要办哪些证？',
      a: licenseRows.value.length
        ? `常见顺序：${licenseRows.value.map((l) => l.name).join(' → ')}。具体以当地市场监管要求为准。`
        : '餐饮类通常需要健康证；是否办理食品经营备案/许可，请咨询当地市场监管部门。',
    },
  ]
})

async function generateGuide() {
  if (!project.value) return
  guideLoading.value = true
  try {
    const { content } = await generateProjectGuide(project.value.name, project.value)
    aiGuide.value = content
  } finally {
    guideLoading.value = false
  }
}
</script>
