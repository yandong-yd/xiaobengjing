#!/usr/bin/env node
/**
 * 内容体检：缺描述、过短、无标签、草稿混入等
 * 用法：npm run audit:content
 */

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
  if (p.status === 'draft') warnings.push(`${label}: 仍为 draft`)
  if (p.cost_min == null || p.cost_max == null) warnings.push(`${label}: 成本区间不完整`)
}

for (const c of mock.cases) {
  const label = `case:${c.id}「${c.title}」`
  if (!c.title) errors.push(`${label}: 缺 title`)
  if (!c.cover && !c.image) errors.push(`${label}: 缺封面`)
  if (c.monthly_profit == null) warnings.push(`${label}: 无 monthly_profit`)
}

console.log(`content audit: projects=${mock.projects.length} cases=${mock.cases.length}`)
if (warnings.length) {
  console.log(`warnings (${warnings.length}):`)
  warnings.slice(0, 25).forEach((w) => console.log(`  ⚠ ${w}`))
}
if (errors.length) {
  console.error(`errors (${errors.length}):`)
  errors.slice(0, 40).forEach((e) => console.error(`  ✗ ${e}`))
  process.exit(1)
}
console.log('OK')
