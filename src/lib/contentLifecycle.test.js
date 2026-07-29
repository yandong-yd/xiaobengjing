import { describe, expect, it } from 'vitest'
import {
  enrichLifecycle,
  sortPublished,
  filterVisible,
  isStale,
  compareByRecommend,
} from './contentLifecycle.js'

describe('enrichLifecycle', () => {
  it('defaults status and heuristic priority', () => {
    const p = enrichLifecycle(
      { id: 1, name: '测试', description: '足够长的一段描述文字', cover: '/x.jpg', tags: ['a', 'b'], cost_min: 1000 },
      { type: 'project' },
    )
    expect(p.status).toBe('published')
    expect(p.priority).toBeGreaterThan(0)
    expect(p.content_type).toBe('project')
  })

  it('keeps explicit priority and updated_at', () => {
    const p = enrichLifecycle(
      { id: 1, priority: 99, updated_at: '2026-07-01', status: 'draft' },
      { type: 'project' },
    )
    expect(p.priority).toBe(99)
    expect(p.updated_at).toBe('2026-07-01')
    expect(p.status).toBe('draft')
  })
})

describe('sortPublished / filterVisible', () => {
  const items = [
    { id: 1, priority: 10, updated_at: '2026-01-01', status: 'published' },
    { id: 2, priority: 50, updated_at: '2026-06-01', status: 'published' },
    { id: 3, priority: 80, updated_at: '2026-01-01', status: 'archived' },
    { id: 4, priority: 50, updated_at: '2026-07-01', status: 'published' },
  ]

  it('filters archived and sorts by priority then date', () => {
    const sorted = sortPublished(items)
    expect(sorted.map((i) => i.id)).toEqual([4, 2, 1])
  })

  it('filterVisible keeps draft/published', () => {
    expect(filterVisible(items).map((i) => i.id)).toEqual([1, 2, 4])
  })
})

describe('isStale / compareByRecommend', () => {
  it('treats missing date as stale', () => {
    expect(isStale({})).toBe(true)
  })

  it('uses days window', () => {
    const now = Date.parse('2026-07-25T00:00:00Z')
    expect(isStale({ updated_at: '2026-07-20' }, 90, now)).toBe(false)
    expect(isStale({ updated_at: '2025-01-01' }, 90, now)).toBe(true)
  })

  it('compareByRecommend prefers higher priority', () => {
    expect(compareByRecommend({ priority: 1 }, { priority: 2 })).toBeGreaterThan(0)
  })
})
