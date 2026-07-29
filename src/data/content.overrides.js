/**
 * 运营加权表：不改各分片数据，只在这里调推荐位与上下架。
 * 字段：priority（越大越靠前）、status（draft|published|archived）、updated_at（ISO）
 *
 * 周更时优先改本文件 + 必要时补正文；见 docs/content-ops.md
 */

/** @type {Record<number, { priority?: number, status?: string, updated_at?: string }>} */
export const projectContentOverrides = {
  // 首页/库内推荐位示例：高转化、故事完整的低成本项目
  1: { priority: 90, updated_at: '2026-07-20' },
  2: { priority: 85, updated_at: '2026-07-18' },
  3: { priority: 80, updated_at: '2026-07-15' },
  7: { priority: 78, updated_at: '2026-07-12' },
  21: { priority: 75, updated_at: '2026-07-10' },
}

/** @type {Record<number, { priority?: number, status?: string, updated_at?: string }>} */
export const caseContentOverrides = {
  1: { priority: 95, updated_at: '2026-07-22' },
  2: { priority: 88, updated_at: '2026-07-20' },
  3: { priority: 82, updated_at: '2026-07-16' },
  10: { priority: 80, updated_at: '2026-07-14' },
  19: { priority: 76, updated_at: '2026-07-11' },
}

export function applyContentOverride(item, overrides) {
  const patch = overrides?.[item.id]
  if (!patch) return item
  return { ...item, ...patch }
}
