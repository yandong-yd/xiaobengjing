#!/usr/bin/env node
/**
 * 生成 src/data/covers.map.json —— 每个项目/案例一条显式封面
 * 用法：npm run covers:map
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { resolvePoolKey, pickFromPool, isLocalCoverPath } from '../src/data/coverRegistry.js'
import { projectCoverOverrides, caseCoverOverrides } from '../src/data/covers.overrides.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outFile = path.join(root, 'src/data/covers.map.json')
const coversDir = path.join(root, 'public/images/covers')

const mock = await import('../src/data/mock.js')

function assign(item, overrides) {
  // 重建时不读 enrich 后的 cover，避免「旧 map → 新 map」锁死
  if (overrides[item.id]) return overrides[item.id]
  const pool = resolvePoolKey({
    id: item.id,
    name: item.name || item.title,
    title: item.title,
    category: item.category,
    tags: item.tags,
    image_key: item.image_key,
  })
  return pickFromPool(pool, item.id || 0)
}

const map = {}
for (const p of mock.projects) {
  map[`project:${p.id}`] = assign(p, projectCoverOverrides)
}
for (const c of mock.cases) {
  map[`case:${c.id}`] = assign(c, caseCoverOverrides)
}

const missing = []
for (const [key, src] of Object.entries(map)) {
  if (!isLocalCoverPath(src)) continue
  const file = path.join(coversDir, path.basename(src))
  if (!fs.existsSync(file)) missing.push({ key, src })
}

fs.writeFileSync(outFile, `${JSON.stringify(map, null, 2)}\n`)
console.log(`wrote ${outFile}`)
console.log(`projects=${mock.projects.length} cases=${mock.cases.length} unique=${new Set(Object.values(map)).size}`)
if (missing.length) {
  console.error('missing cover files:')
  missing.forEach((m) => console.error(`  ${m.key} → ${m.src}`))
  process.exit(1)
}
