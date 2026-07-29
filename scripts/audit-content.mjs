#!/usr/bin/env node
/**
 * 内容体检：缺描述、过短、无标签、草稿混入、案例故事完整性
 * 用法：npm run audit:content
 */

import { CONTENT_STATUS, isStale, STALE_DAYS } from '../src/lib/contentLifecycle.js'

const mock = await import('../src/data/mock.js')

const errors = []
const warnings = []

for (const p of mock.projects) {
  const label = `project:${p.id}「${p.name}」`
  if (!p.name) errors.push(`${label}: 缺 name`)
  if (!p.category) errors.push(`${label}: 缺 category`)
  if (!p.description || p.description.length < 12) errors.push(`${label}: description 过短`)
  if (!p.cover && !p.image) errors.push(`${label}: 缺封面`)
  if (!p.tags?.length) warnings.push(`${label}: 无 tags`)
  if (p.status === CONTENT_STATUS.draft) warnings.push(`${label}: 仍为 draft`)
  if (p.cost_min == null || p.cost_max == null) warnings.push(`${label}: 成本区间不完整`)
  if (p.status === CONTENT_STATUS.published && isStale(p, STALE_DAYS)) {
    // 仅统计提示，不刷屏：聚合在下方
  }
}

for (const c of mock.cases) {
  const label = `case:${c.id}「${c.title}」`
  if (!c.title) errors.push(`${label}: 缺 title`)
  if (!c.cover && !c.image) errors.push(`${label}: 缺封面`)
  if (!c.story || c.story.length < 20) errors.push(`${label}: story 过短或缺失`)
  if (!c.tags?.length) warnings.push(`${label}: 无 tags`)
  if (c.monthly_profit == null) warnings.push(`${label}: 无 monthly_profit`)
  if (!c.process) warnings.push(`${label}: 无 process`)
  if (c.status === CONTENT_STATUS.draft) warnings.push(`${label}: 仍为 draft`)
}

const staleP = mock.projects.filter(
  (p) => p.status === CONTENT_STATUS.published && isStale(p),
).length
const staleC = mock.cases.filter(
  (c) => c.status === CONTENT_STATUS.published && isStale(c),
).length
if (staleP || staleC) {
  warnings.push(
    `${staleP} 个项目 / ${staleC} 个案例超过 ${STALE_DAYS} 天未更新或无日期（npm run content:health 看清单）`,
  )
}

console.log(`content audit: projects=${mock.projects.length} cases=${mock.cases.length}`)
if (warnings.length) {
  console.log(`warnings (${warnings.length}):`)
  warnings.slice(0, 25).forEach((w) => console.log(`  ⚠ ${w}`))
  if (warnings.length > 25) console.log(`  … +${warnings.length - 25} more`)
}
if (errors.length) {
  console.error(`errors (${errors.length}):`)
  errors.slice(0, 40).forEach((e) => console.error(`  ✗ ${e}`))
  process.exit(1)
}
console.log('OK')
