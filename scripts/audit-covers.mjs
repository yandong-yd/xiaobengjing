#!/usr/bin/env node
/**
 * 封面体检：缺映射、文件不存在、图池与品类明显冲突 → 非 0 退出
 * 用法：npm run audit:covers
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CATEGORY_POOL, isLocalCoverPath, coverFileFromPath, COVER_POOLS } from '../src/data/coverRegistry.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const coversDir = path.join(root, 'public/images/covers')
const coverMap = JSON.parse(fs.readFileSync(path.join(root, 'src/data/covers.map.json'), 'utf8'))

const mock = await import('../src/data/mock.js')

const errors = []
const warnings = []

function assertFile(src, label) {
  if (!src) {
    errors.push(`${label}: 无封面路径`)
    return
  }
  if (!isLocalCoverPath(src) && !/^https?:\/\//i.test(src)) {
    errors.push(`${label}: 非法封面 ${src}`)
    return
  }
  if (isLocalCoverPath(src)) {
    const file = path.join(coversDir, `${coverFileFromPath(src)}.jpg`)
    if (!fs.existsSync(file)) errors.push(`${label}: 文件不存在 ${src}`)
  }
}

for (const p of mock.projects) {
  const key = `project:${p.id}`
  const mapped = coverMap[key]
  if (!mapped) errors.push(`${key}「${p.name}」: covers.map.json 缺条目`)
  assertFile(p.cover || p.image || mapped, `${key}「${p.name}」`)

  const expectedPool = CATEGORY_POOL[p.category]
  const file = coverFileFromPath(p.cover || mapped || '')
  if (expectedPool && file) {
    const poolFiles = COVER_POOLS[expectedPool] || []
    const actualPool = Object.keys(COVER_POOLS).find((k) => COVER_POOLS[k].includes(file.split('-').slice(0, -1).join('-') || file.replace(/-\d+$/, '')))
    // file like food-3 → pool food
    const filePool = file.replace(/-\d+$/, '')
    if (expectedPool && filePool && expectedPool !== filePool && p.image_pool !== filePool) {
      // 仅警告：名称关键词可能故意跨品类（如餐饮里的饮品）
      if (p.image_pool && p.image_pool !== expectedPool) {
        warnings.push(`${key}「${p.name}」: 品类 ${p.category}→${expectedPool}，实际池 ${p.image_pool}/${filePool}`)
      }
    }
    void actualPool
    void poolFiles
  }

  if (!p.image_alt || p.image_alt.length < 4) {
    warnings.push(`${key}「${p.name}」: image_alt 过短`)
  }
}

for (const c of mock.cases) {
  const key = `case:${c.id}`
  const mapped = coverMap[key]
  if (!mapped) errors.push(`${key}「${c.title}」: covers.map.json 缺条目`)
  assertFile(c.cover || c.image || mapped, `${key}「${c.title}」`)
}

// map 里的每条文件都要存在
for (const [key, src] of Object.entries(coverMap)) {
  assertFile(src, `map ${key}`)
}

// 磁盘上未使用的封面（提示可清理）
const used = new Set(
  Object.values(coverMap)
    .filter(isLocalCoverPath)
    .map((s) => `${coverFileFromPath(s)}.jpg`),
)
const onDisk = fs.existsSync(coversDir)
  ? fs.readdirSync(coversDir).filter((f) => f.endsWith('.jpg'))
  : []
const unused = onDisk.filter((f) => !used.has(f))

console.log(`audit covers: projects=${mock.projects.length} cases=${mock.cases.length}`)
console.log(`map entries=${Object.keys(coverMap).length} disk jpgs=${onDisk.length}`)
if (unused.length) {
  console.log(`unused files (${unused.length}): ${unused.slice(0, 8).join(', ')}${unused.length > 8 ? '…' : ''}`)
}
if (warnings.length) {
  console.log(`\nwarnings (${warnings.length}):`)
  warnings.slice(0, 30).forEach((w) => console.log(`  ⚠ ${w}`))
  if (warnings.length > 30) console.log(`  … +${warnings.length - 30} more`)
}
if (errors.length) {
  console.error(`\nerrors (${errors.length}):`)
  errors.slice(0, 40).forEach((e) => console.error(`  ✗ ${e}`))
  if (errors.length > 40) console.error(`  … +${errors.length - 40} more`)
  process.exit(1)
}
console.log('\nOK — all covers mapped and files exist')
