import { describe, expect, it } from 'vitest'
import { resolvePoolKey, pickFromPool, isLocalCoverPath } from './coverRegistry.js'

describe('coverRegistry', () => {
  it('maps category to pool', () => {
    expect(resolvePoolKey({ category: '餐饮', name: '测试' })).toBe('food')
    expect(resolvePoolKey({ category: '宠物经济', name: '测试' })).toBe('pet')
  })

  it('prefers name keywords over vague summer tag', () => {
    expect(resolvePoolKey({ name: '烧烤摊', category: '餐饮', tags: ['夏季', '夜市'] })).toBe('food')
    expect(resolvePoolKey({ name: '手打柠檬茶', category: '餐饮', tags: ['夏季'] })).toBe('drink')
  })

  it('does not map 夏季 alone to drink', () => {
    expect(resolvePoolKey({ name: '普通项目', category: '零售', tags: ['夏季'] })).toBe('market')
  })

  it('respects image_key', () => {
    expect(resolvePoolKey({ image_key: 'beauty', category: '餐饮', name: 'x' })).toBe('beauty')
  })

  it('pickFromPool returns local path', () => {
    const src = pickFromPool('food', 1)
    expect(isLocalCoverPath(src)).toBe(true)
    expect(src).toContain('food-')
  })
})
