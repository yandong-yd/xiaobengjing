#!/usr/bin/env node
/**
 * 构建后预渲染：为每个路由生成带独立 TDK 的 HTML
 * 输出到 dist{path}/index.html，Nginx try_files $uri $uri/ 即可命中
 *
 * 用法：在 vite build 之后自动执行（postbuild）
 *   node scripts/prerender-html.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// 读本地 .env，供 SITE_URL 使用
const envFile = path.join(root, '.env')
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    const [, k, raw] = m
    if (process.env[k] == null) process.env[k] = raw.replace(/^['"]|['"]$/g, '')
  }
}

const { listPrerenderRoutes, resolveRouteSeo, normalizeSeo } = await import('../src/lib/seo.js')

const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html 不存在，请先 npm run build')
  process.exit(1)
}

const template = fs.readFileSync(templatePath, 'utf8')
const routes = listPrerenderRoutes()

function upsertMeta(html, attr, key, content) {
  const re = new RegExp(`<meta\\s+[^>]*${attr}=["']${key}["'][^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`)
}

function upsertTitle(html, title) {
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
  }
  return html.replace(/<\/head>/i, `    <title>${escapeHtml(title)}</title>\n  </head>`)
}

function upsertCanonical(html, href) {
  const re = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`)
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectSeo(html, seo) {
  let out = html
  out = upsertTitle(out, seo.title)
  out = upsertMeta(out, 'name', 'description', seo.description)
  out = upsertMeta(out, 'name', 'keywords', seo.keywords)
  out = upsertMeta(out, 'property', 'og:title', seo.title)
  out = upsertMeta(out, 'property', 'og:description', seo.description)
  out = upsertMeta(out, 'property', 'og:url', seo.url)
  out = upsertMeta(out, 'property', 'og:type', 'website')
  out = upsertMeta(out, 'property', 'og:site_name', seo.siteName)
  out = upsertMeta(out, 'property', 'og:image', seo.image)
  out = upsertMeta(out, 'name', 'twitter:card', 'summary')
  out = upsertMeta(out, 'name', 'twitter:title', seo.title)
  out = upsertMeta(out, 'name', 'twitter:description', seo.description)
  out = upsertCanonical(out, seo.url)
  return out
}

function outPathFor(routePath) {
  if (!routePath || routePath === '/') return path.join(distDir, 'index.html')
  const clean = routePath.replace(/\/$/, '')
  return path.join(distDir, clean.replace(/^\//, ''), 'index.html')
}

let written = 0
const titles = new Set()

for (const route of routes) {
  const raw = resolveRouteSeo(route)
  const seo = normalizeSeo(raw)
  const html = injectSeo(template, seo)
  const file = outPathFor(route.path)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html, 'utf8')
  written++
  titles.add(seo.title)
}

console.log(`prerender-html: ${written} pages → dist/**/index.html`)
console.log(`unique titles: ${titles.size}`)

// 抽样校验
const samples = ['/calculator', '/project/1', '/cases']
for (const p of samples) {
  const file = outPathFor(p)
  if (!fs.existsSync(file)) {
    console.error(`missing sample ${file}`)
    process.exit(1)
  }
  const html = fs.readFileSync(file, 'utf8')
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
  const desc = (html.match(/name="description"\s+content="([^"]*)"/i) || [])[1] || ''
  console.log(`  ${p} → ${title.slice(0, 40)}…`)
  if (!title || !desc) {
    console.error(`TDK incomplete for ${p}`)
    process.exit(1)
  }
}

if (titles.size < Math.min(20, written)) {
  console.error('titles look insufficiently unique')
  process.exit(1)
}

console.log('OK')
