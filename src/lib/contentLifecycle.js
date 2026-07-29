/**
 * 内容生命周期：项目/案例自我更新与排序用的基础字段
 * - status: draft | published | archived
 * - priority: 数字越大越靠前（首页/推荐）
 * - updated_at: ISO 日期字符串
 */

export const CONTENT_STATUS = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
}

/** 超过该天数未更新且无人工 priority 时，健康报告标为 stale */
export const STALE_DAYS = 90

export function enrichLifecycle(item, { type = 'project' } = {}) {
  const status = item.status || CONTENT_STATUS.published
  const priority = Number.isFinite(item.priority) ? item.priority : defaultPriority(item, type)
  const updated_at = item.updated_at || item.created_at || null
  return {
    ...item,
    status,
    priority,
    updated_at,
    content_type: type,
  }
}

function defaultPriority(item, type) {
  let score = type === 'case' ? 10 : 0
  if (item.cover || item.image) score += 5
  const desc = item.description || item.story || ''
  if (desc.length > 20) score += 3
  if (desc.length > 80) score += 2
  if ((item.tags || []).length >= 2) score += 2
  if (type === 'project' && item.cost_min != null && item.cost_min <= 3000) score += 2
  if (type === 'case') {
    if (item.process) score += 2
    if (item.profit_model) score += 2
    if (item.monthly_profit != null && item.monthly_profit >= 5000) score += 2
  }
  return score
}

/** 已发布内容，按 priority / 更新时间排序 */
export function sortPublished(items) {
  return [...items]
    .filter((i) => (i.status || CONTENT_STATUS.published) === CONTENT_STATUS.published)
    .sort(compareByRecommend)
}

/** 仅过滤掉 archived（draft 默认不展示库内列表时可另滤） */
export function filterVisible(items) {
  return items.filter((i) => (i.status || CONTENT_STATUS.published) !== CONTENT_STATUS.archived)
}

export function compareByRecommend(a, b) {
  const pd = (b.priority || 0) - (a.priority || 0)
  if (pd !== 0) return pd
  const ta = a.updated_at ? Date.parse(a.updated_at) : 0
  const tb = b.updated_at ? Date.parse(b.updated_at) : 0
  return tb - ta
}

/** 是否超过 freshness 窗口（无日期视为 stale） */
export function isStale(item, days = STALE_DAYS, now = Date.now()) {
  if (!item?.updated_at) return true
  const t = Date.parse(item.updated_at)
  if (!Number.isFinite(t)) return true
  return now - t > days * 86400000
}
