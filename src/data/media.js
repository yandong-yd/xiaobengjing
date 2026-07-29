/**
 * 项目/案例配图
 * 优先级：item.cover → overrides → covers.map.json → 品类/名称推断
 */

import coverMap from './covers.map.json' with { type: 'json' }
import { projectCoverOverrides, caseCoverOverrides } from './covers.overrides.js'
import {
  COVER_POOLS,
  resolvePoolKey,
  pickFromPool,
  localCoverPath,
  resolveCoverUrl,
  isLocalCoverPath,
} from './coverRegistry.js'

export { resolvePoolKey, pickFromPool, localCoverPath as coverPath, projectCoverOverrides, caseCoverOverrides, COVER_POOLS, resolveCoverUrl }

const poolMeta = {
  food: { label: '餐饮' },
  drink: { label: '饮品' },
  craft: { label: '手工' },
  market: { label: '零售' },
  tech: { label: '数码' },
  service: { label: '服务' },
  flower: { label: '鲜花' },
  pet: { label: '宠物' },
  fun: { label: '娱乐' },
  fashion: { label: '服饰' },
  beauty: { label: '美业' },
  mood: { label: '情绪' },
}

function svgCover(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <rect width="800" height="500" fill="#24292f"/>
    <text x="48" y="420" font-family="system-ui,-apple-system,sans-serif" font-size="48" font-weight="700" fill="#fff">${label}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const svgPools = Object.fromEntries(
  Object.keys(poolMeta).map((key) => [key, [svgCover(poolMeta[key].label)]]),
)

function warnDev(message) {
  if (import.meta.env?.DEV) console.warn(`[cover] ${message}`)
}

function mapKey(type, id) {
  return `${type}:${id}`
}

function resolveExplicitCover(item, type) {
  if (item.cover && typeof item.cover === 'string') return item.cover
  const overrides = type === 'case' ? caseCoverOverrides : projectCoverOverrides
  if (overrides[item.id]) return overrides[item.id]
  const mapped = coverMap[mapKey(type, item.id)]
  if (mapped) return mapped
  if (item.image && isLocalCoverPath(item.image)) return item.image
  return ''
}

export function getFallbackCover(poolKey = 'market') {
  const pool = svgPools[poolKey] || svgPools.market
  return pool[0]
}

export function getCaseImage(caseItem) {
  const explicit = resolveExplicitCover(caseItem, 'case')
  if (explicit) return explicit
  const key = resolvePoolKey(caseItem)
  warnDev(`case#${caseItem?.id} 无显式封面，回退图池 ${key}`)
  return pickFromPool(key, caseItem.id || 0)
}

export function getProjectImage(project) {
  const explicit = resolveExplicitCover(project, 'project')
  if (explicit) return explicit
  const key = resolvePoolKey(project)
  warnDev(`project#${project?.id} 无显式封面，回退图池 ${key}`)
  return pickFromPool(key, project.id || 0)
}

export function enrichCaseMedia(caseItem) {
  const poolKey = resolvePoolKey(caseItem)
  const explicit = resolveExplicitCover(caseItem, 'case')
  const cover = explicit || pickFromPool(poolKey, caseItem.id || 0)
  if (!explicit) warnDev(`case#${caseItem.id}「${caseItem.title}」使用推断封面 ${cover}`)
  return {
    ...caseItem,
    cover,
    image: resolveCoverUrl(cover),
    image_alt: caseItem.image_alt || caseItem.cover_alt || `${caseItem.title} · ${caseItem.city || ''}`.trim(),
    image_pool: poolKey,
    cover_source: caseItem.cover_source || (explicit ? 'explicit' : 'inferred'),
  }
}

export function enrichProjectMedia(project) {
  const poolKey = resolvePoolKey(project)
  const explicit = resolveExplicitCover(project, 'project')
  const cover = explicit || pickFromPool(poolKey, project.id || 0)
  if (!explicit) warnDev(`project#${project.id}「${project.name}」使用推断封面 ${cover}`)
  return {
    ...project,
    cover,
    image: resolveCoverUrl(cover),
    image_alt: project.image_alt || project.cover_alt || `${project.name} · ${project.category}`,
    image_pool: poolKey,
    cover_source: project.cover_source || (explicit ? 'explicit' : 'inferred'),
  }
}
