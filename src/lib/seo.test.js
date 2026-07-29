import { describe, expect, it } from 'vitest'
import { ROUTE_META, listPrerenderRoutes, resolveRouteSeo, normalizeSeo } from './seo.js'

describe('ROUTE_META TDK uniqueness', () => {
  const entries = Object.entries(ROUTE_META)

  it('covers all expected static routes', () => {
    const names = entries.map(([name]) => name).sort()
    expect(names).toEqual(
      [
        'ai',
        'calculator',
        'cases',
        'categories',
        'challenges',
        'franchise',
        'guide',
        'home',
        'insights',
        'part-time',
        'projects',
        'remote',
        'stories',
      ].sort(),
    )
  })

  it('each route has non-empty title, description, keywords', () => {
    for (const [name, meta] of entries) {
      expect(meta.title?.trim(), `${name}.title`).toBeTruthy()
      expect(meta.description?.trim(), `${name}.description`).toBeTruthy()
      expect(Array.isArray(meta.keywords), `${name}.keywords array`).toBe(true)
      expect(meta.keywords.length, `${name}.keywords length`).toBeGreaterThan(2)
    }
  })

  it('titles are unique across routes', () => {
    const titles = entries.map(([, m]) => m.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('descriptions are unique across routes', () => {
    const descs = entries.map(([, m]) => m.description)
    expect(new Set(descs).size).toBe(descs.length)
  })

  it('keyword sets are not identical between routes', () => {
    const serialized = entries.map(([, m]) => [...m.keywords].sort().join(','))
    expect(new Set(serialized).size).toBe(serialized.length)
  })

  it('description length is SEO-friendly (40-160 chars)', () => {
    for (const [name, meta] of entries) {
      const len = meta.description.length
      expect(len, `${name} desc too short`).toBeGreaterThanOrEqual(40)
      expect(len, `${name} desc too long`).toBeLessThanOrEqual(160)
    }
  })
})

describe('prerender route SEO', () => {
  it('lists static + detail routes', () => {
    const routes = listPrerenderRoutes()
    expect(routes.length).toBeGreaterThan(50)
    expect(routes.some((r) => r.path === '/calculator')).toBe(true)
    expect(routes.some((r) => r.path.startsWith('/project/'))).toBe(true)
  })

  it('produces different titles for different pages', () => {
    const a = normalizeSeo(resolveRouteSeo({ name: 'calculator', path: '/calculator' }))
    const b = normalizeSeo(resolveRouteSeo({ name: 'project-detail', path: '/project/1', params: { id: '1' } }))
    expect(a.title).not.toBe(b.title)
    expect(a.description).not.toBe(b.description)
    expect(a.keywords).not.toBe(b.keywords)
  })
})
