#!/usr/bin/env node
/**
 * 内容健康报告：缺字段、过期、低分、推荐位预览
 * 用法：npm run content:health
 * 退出码：有 error 级问题时为 1（默认可仅 warning，用 --strict 才失败）
 */

import {
  sortPublished,
  isStale,
  STALE_DAYS,
  CONTENT_STATUS,
} from '../src/lib/contentLifecycle.js'

const mock = await import('../src/data/mock.js')
const strict = process.argv.includes('--strict')

const errors = []
const warnings = []
const tips = []

function scoreCase(c) {
  let n = 0
  if ((c.story || '').length >= 40) n++
  if (c.process) n++
  if (c.decisions || c.profit_model) n++
  if ((c.tags || []).length >= 2) n++
  if (c.monthly_profit != null) n++
  return n
}

const publishedProjects = mock.projects.filter(
  (p) => (p.status || CONTENT_STATUS.published) === CONTENT_STATUS.published,
)
const publishedCases = mock.cases.filter(
  (c) => (c.status || CONTENT_STATUS.published) === CONTENT_STATUS.published,
)

const staleProjects = publishedProjects.filter((p) => isStale(p))
const staleCases = publishedCases.filter((c) => isStale(c))
const noDateProjects = publishedProjects.filter((p) => !p.updated_at)
const noDateCases = publishedCases.filter((c) => !c.updated_at)

if (noDateProjects.length) {
  warnings.push(`项目 ${noDateProjects.length} 条无 updated_at（健康报告视为待复审）`)
}
if (noDateCases.length) {
  warnings.push(`案例 ${noDateCases.length} 条无 updated_at（健康报告视为待复审）`)
}

const thinCases = publishedCases.filter((c) => scoreCase(c) < 3)
thinCases.slice(0, 15).forEach((c) => {
  warnings.push(`case:${c.id}「${c.title}」故事字段偏薄（story/process/profit 等）`)
})

const lowPriorityProjects = [...publishedProjects]
  .sort((a, b) => (a.priority || 0) - (b.priority || 0))
  .slice(0, 8)
const lowPriorityCases = [...publishedCases]
  .sort((a, b) => (a.priority || 0) - (b.priority || 0))
  .slice(0, 8)

tips.push('—— 首页推荐预览（项目 Top 9）——')
sortPublished(mock.projects)
  .slice(0, 9)
  .forEach((p, i) => tips.push(`  ${i + 1}. [#${p.id}] ${p.name} · p=${p.priority} · ${p.updated_at || '无日期'}`))

tips.push('—— 首页推荐预览（案例 Top 9）——')
sortPublished(mock.cases)
  .slice(0, 9)
  .forEach((c, i) => tips.push(`  ${i + 1}. [#${c.id}] ${c.title} · p=${c.priority} · ${c.updated_at || '无日期'}`))

tips.push(`—— 建议本周复审（stale>${STALE_DAYS}天或无日期，项目前 10）——`)
staleProjects
  .slice(0, 10)
  .forEach((p) => tips.push(`  project:${p.id}「${p.name}」→ 改正文或 content.overrides.js`))

tips.push('—— 建议本周复审（案例前 10）——')
staleCases
  .slice(0, 10)
  .forEach((c) => tips.push(`  case:${c.id}「${c.title}」`))

tips.push('—— 低分候选（可补封面/描述后升权）——')
lowPriorityProjects.forEach((p) => tips.push(`  project:${p.id} p=${p.priority}「${p.name}」`))
lowPriorityCases.forEach((c) => tips.push(`  case:${c.id} p=${c.priority}「${c.title}」`))

console.log(
  `content health: projects=${mock.projects.length} (published=${publishedProjects.length}) ` +
    `cases=${mock.cases.length} (published=${publishedCases.length})`,
)
console.log(`stale projects≈${staleProjects.length} cases≈${staleCases.length} (window=${STALE_DAYS}d)`)

if (warnings.length) {
  console.log(`warnings (${warnings.length}):`)
  warnings.slice(0, 30).forEach((w) => console.log(`  ⚠ ${w}`))
  if (warnings.length > 30) console.log(`  … +${warnings.length - 30} more`)
}

tips.forEach((t) => console.log(t))

if (errors.length) {
  console.error(`errors (${errors.length}):`)
  errors.forEach((e) => console.error(`  ✗ ${e}`))
  process.exit(1)
}

if (strict && warnings.length) {
  console.error('strict: warnings treated as failure')
  process.exit(1)
}

console.log('\nOK — 详见 docs/content-ops.md')
