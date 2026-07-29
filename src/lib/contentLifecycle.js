/**
 * 内容生命周期：项目/案例自我更新与排序用的基础字段
 * - status: draft | published | archived
 * - priority: 数字越大越靠前（首页/推荐）
 * - updated_at: ISO 日期字符串，缺省用构建占位
 */

export const CONTENT_STATUS = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
}

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
  // 有完整封面与描述的内容略加权，便于推荐排序
  let score = type === 'case' ? 10 : 0
  if (item.cover || item.image) score += 5
  if ((item.description || '').length > 20) score += 3
  if ((item.tags || []).length >= 2) score += 2
  if (item.cost_min != null && item.cost_min <= 3000) score += 2
  return score
}

/** 已发布内容，按 priority / 更新时间排序 */
export function sortPublished(items) {
  return [...items]
    .filter((i) => (i.status || CONTENT_STATUS.published) === CONTENT_STATUS.published)
    .sort((a, b) => {
      const pd = (b.priority || 0) - (a.priority || 0)
      if (pd !== 0) return pd
      const ta = a.updated_at ? Date.parse(a.updated_at) : 0
      const tb = b.updated_at ? Date.parse(b.updated_at) : 0
      return tb - ta
    })
}
