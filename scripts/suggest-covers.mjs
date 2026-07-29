#!/usr/bin/env node
/**
 * 按项目名/品类向 Unsplash 或 Pexels 请求候选封面（人工挑选后写入 overrides / map）
 *
 * 环境变量（.env）：
 *   UNSPLASH_ACCESS_KEY=xxx
 *   # 或
 *   PEXELS_API_KEY=xxx
 *
 * 用法：
 *   npm run covers:suggest -- --type project --id 1
 *   npm run covers:suggest -- --type project --limit 5
 *   npm run covers:suggest -- --query "street food stall"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
loadEnv(path.join(root, '.env'))

const args = parseArgs(process.argv.slice(2))
const unsplashKey = process.env.UNSPLASH_ACCESS_KEY || process.env.VITE_UNSPLASH_ACCESS_KEY || ''
const pexelsKey = process.env.PEXELS_API_KEY || process.env.VITE_PEXELS_API_KEY || ''

if (!unsplashKey && !pexelsKey) {
  console.error('请在 .env 配置 UNSPLASH_ACCESS_KEY 或 PEXELS_API_KEY')
  process.exit(1)
}

const mock = await import('../src/data/mock.js')
const outDir = path.join(root, 'tmp/cover-suggestions')
fs.mkdirSync(outDir, { recursive: true })

const targets = []
if (args.query) {
  targets.push({ id: 'custom', name: args.query, query: args.query, type: 'custom' })
} else {
  const type = args.type || 'project'
  const list = type === 'case' ? mock.cases : mock.projects
  const filtered = args.id != null ? list.filter((i) => String(i.id) === String(args.id)) : list
  const limit = Number(args.limit || 10)
  for (const item of filtered.slice(0, limit)) {
    const name = item.name || item.title
    const query = buildQuery(name, item.category, item.tags)
    targets.push({ id: item.id, name, category: item.category, query, type, cover: item.cover })
  }
}

const results = []
for (const t of targets) {
  process.stdout.write(`… ${t.type}:${t.id} ${t.name} ← ${t.query}\n`)
  try {
    const photos = unsplashKey
      ? await searchUnsplash(t.query, unsplashKey, 5)
      : await searchPexels(t.query, pexelsKey, 5)
    results.push({ ...t, photos })
  } catch (err) {
    results.push({ ...t, error: String(err.message || err), photos: [] })
  }
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const outFile = path.join(outDir, `suggestions-${stamp}.json`)
fs.writeFileSync(outFile, JSON.stringify(results, null, 2))
console.log(`\n写到 ${outFile}`)
console.log('挑选满意的 url 后：下载到 public/images/covers/，并在 covers.overrides.js 指定 id。')

function buildQuery(name, category, tags = []) {
  const dict = {
    餐饮: 'chinese street food stall',
    手工: 'handmade craft market',
    零售: 'retail market stall',
    服务: 'local service small business',
    数码科技: 'phone repair stall',
    美业造型: 'beauty salon nail bar',
    宠物经济: 'pet care small shop',
    居家办公: 'home office freelance desk',
    蔬果鲜花: 'flower market stall',
    娱乐体验: 'carnival game booth',
    服饰鞋包: 'clothing market stall',
    情绪价值: 'calm counseling space',
  }
  const enCat = dict[category] || 'small business stall china'
  const tagHint = (tags || []).slice(0, 2).join(' ')
  return `${enCat} ${tagHint}`.trim()
}

function searchUnsplash(query, key, perPage) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`
  return httpJson(url, { Authorization: `Client-ID ${key}` }).then((data) =>
    (data.results || []).map((p) => ({
      id: p.id,
      url: p.urls?.regular,
      thumb: p.urls?.thumb,
      author: p.user?.name,
      link: p.links?.html,
      provider: 'unsplash',
    })),
  )
}

function searchPexels(query, key, perPage) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`
  return httpJson(url, { Authorization: key }).then((data) =>
    (data.photos || []).map((p) => ({
      id: p.id,
      url: p.src?.large,
      thumb: p.src?.tiny,
      author: p.photographer,
      link: p.url,
      provider: 'pexels',
    })),
  )
}

function httpJson(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let body = ''
        res.on('data', (c) => (body += c))
        res.on('end', () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`))
          try {
            resolve(JSON.parse(body))
          } catch (e) {
            reject(e)
          }
        })
      })
      .on('error', reject)
  })
}

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--') continue
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) out[key] = true
      else {
        out[key] = next
        i++
      }
    }
  }
  return out
}

function loadEnv(file) {
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    const k = m[1]
    let v = m[2].replace(/^['"]|['"]$/g, '')
    if (process.env[k] == null) process.env[k] = v
  }
}
