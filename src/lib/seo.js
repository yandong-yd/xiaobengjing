import { getProjectById, getCaseById } from '../data/mock.js'
import { getFranchiseById } from '../data/franchises.js'

export const SITE_NAME = '小本经 · 摆摊手册'
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.xiaobenjing.com'

const DEFAULT_DESC =
  '从小本到老板 — 低预算创业项目库、成功案例、利润计算器、AI 投资顾问。出摊、副业、居家都能查。'

const ROUTE_META = {
  home: { title: '从小本到老板', description: DEFAULT_DESC },
  categories: { title: '品类导航', description: '按餐饮、手工、美业、宠物等 58+ 品类浏览创业项目' },
  projects: { title: '项目库', description: '200+ 低成本创业项目，按预算、难度、行业筛选' },
  cases: { title: '成功案例', description: '真实摆摊与副业创业故事，成本、利润与经验复盘' },
  ai: { title: '投资顾问', description: '填写预算与画像，AI 生成专属创业方案' },
  guide: { title: '新手指南', description: '选址、证照、装备、避坑 — 摆摊创业必读' },
  calculator: { title: '利润计算器', description: '分项成本、出摊时长、与打工对比 — 算清真实盈利' },
  'part-time': { title: '兼职副业', description: '周末、晚间可做的个人创业项目' },
  remote: { title: '居家办公', description: '写作、设计、剪辑、电商 — 在家接单交付' },
  challenges: { title: '创业难题', description: '资金、家庭、技能、证照 — 提前预演避坑' },
  insights: { title: '创业心得', description: '过来人真实分享，抓本质不灌鸡汤' },
  stories: { title: '创业故事', description: '小本创业者的真实经历与关键决策' },
  franchise: { title: '加盟避坑', description: '怎么选、怎么验、口碑品牌库与避坑清单' },
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applySeo({ title, description, path = '', image = '' }) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const desc = description || DEFAULT_DESC
  const url = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
  const ogImage = image || `${SITE_URL}/favicon.svg`

  document.title = pageTitle
  setMeta('name', 'description', desc)
  setMeta('property', 'og:title', pageTitle)
  setMeta('property', 'og:description', desc)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:image', ogImage)
  setMeta('name', 'twitter:card', 'summary')
  setMeta('name', 'twitter:title', pageTitle)
  setMeta('name', 'twitter:description', desc)

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}

export function applyRouteSeo(route) {
  const name = route.name
  const id = route.params.id

  if (name === 'project-detail') {
    const p = getProjectById(id)
    if (p) {
      applySeo({
        title: p.name,
        description: `${p.description} 启动 ${p.cost_min}-${p.cost_max} 元，日收入 ${p.income_min}-${p.income_max} 元。`,
        path: route.fullPath,
        image: p.image,
      })
      return
    }
  }

  if (name === 'case-detail') {
    const c = getCaseById(id)
    if (c) {
      applySeo({
        title: c.title,
        description: `${c.city} · 投入 ${c.cost} 元 · 月利润约 ${c.monthly_profit} 元`,
        path: route.fullPath,
        image: c.image,
      })
      return
    }
  }

  if (name === 'franchise-detail') {
    const f = getFranchiseById(id)
    if (f) {
      applySeo({
        title: f.name,
        description: f.tagline || `${f.category} 加盟品牌 · 投资 ${f.investment_min}-${f.investment_max} 万`,
        path: route.fullPath,
      })
      return
    }
  }

  const meta = ROUTE_META[name]
  if (meta) {
    applySeo({ ...meta, path: route.path })
    return
  }

  applySeo({ path: route.path })
}
