import { getProjectById, getCaseById, projects, cases } from '../data/mock.js'
import { getFranchiseById, franchises } from '../data/franchises.js'

export const SITE_NAME = '小本经'
export const SITE_TAGLINE = '从小本到老板 · 摆摊手册'
export const SITE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) ||
  'https://www.xiaobenjing.com'

const DEFAULT_KEYWORDS = [
  '小本经',
  '从小本到老板',
  '小本创业',
  '摆摊',
  '摆摊项目',
  '副业',
  '居家办公',
  '加盟避坑',
]

const DEFAULT_DESC =
  '小本经帮你从小本到老板：200+低预算创业项目、真实案例、利润计算器与投资顾问。出摊、兼职、居家接单都能查。'

/** 各静态路由独立 TDK（title / description / keywords） */
export const ROUTE_META = {
  home: {
    title: '小本经 · 从小本到老板 | 摆摊手册',
    description: DEFAULT_DESC,
    keywords: [...DEFAULT_KEYWORDS, '创业项目库', '利润计算器', '投资顾问'],
  },
  categories: {
    title: '创业品类大全_餐饮手工美业宠物等58+方向',
    description:
      '按餐饮、手工、美业、宠物、数码、零售等58+品类浏览小本创业与摆摊方向，快速定位适合自己的赛道。',
    keywords: ['创业品类', '摆摊品类', '餐饮创业', '手工副业', '美业创业', '宠物经济', '小本经'],
  },
  projects: {
    title: '低成本创业项目库_200+摆摊副业项目筛选',
    description:
      '精选200+低成本创业项目，支持按预算、难度、行业、出摊/兼职/居家形态筛选，帮你找到可落地的起步方向。',
    keywords: ['创业项目库', '低成本创业', '摆摊项目', '副业项目', '小本创业项目', '小本经'],
  },
  cases: {
    title: '成功案例库_真实摆摊与副业创业故事',
    description:
      '汇集真实摆摊、兼职、居家创业案例，公开投入成本、月利润与踩坑经验，用别人的复盘缩短你的试错。',
    keywords: ['创业案例', '摆摊成功案例', '副业故事', '创业复盘', '真实案例', '小本经'],
  },
  ai: {
    title: 'AI投资顾问_按预算生成专属创业方案',
    description:
      '填写预算、城市与个人画像，投资顾问从项目库中匹配可执行方案，给出成本、流程与风险提示。',
    keywords: ['AI创业', '投资顾问', '创业方案', '预算创业', '创业匹配', '小本经'],
  },
  guide: {
    title: '新手指南_选址证照装备与摆摊避坑必读',
    description:
      '面向零基础创业者的新手指南：怎么选址、办哪些证、买什么装备、如何避坑，一步步走通第一周。',
    keywords: ['摆摊新手指南', '创业指南', '健康证', '选址', '摆摊装备', '避坑', '小本经'],
  },
  calculator: {
    title: '利润计算器_算出摊真实盈利与打工对比',
    description:
      '分项录入成本、出摊时长与收入，自动估算真实利润、回本周期，并可与打工时薪对比，避免理想化算账。',
    keywords: ['利润计算器', '摆摊算账', '回本周期', '创业成本', '时薪对比', '小本经'],
  },
  'part-time': {
    title: '兼职副业项目_周末晚间可做的个人创业',
    description:
      '精选周末、晚间可启动的兼职副业项目，不必先辞职。适合上班族用业余时间验证生意与现金流。',
    keywords: ['兼职副业', '周末创业', '副业项目', '下班创业', '业余摆摊', '小本经'],
  },
  remote: {
    title: '居家办公与自由职业_在家接单创业项目',
    description:
      '写作、设计、剪辑、电商、咨询等居家可交付项目合集，地点自由、按单计酬，适合宝妈与远程工作者。',
    keywords: ['居家办公', '自由职业', '在家接单', '远程创业', '线上副业', '小本经'],
  },
  challenges: {
    title: '创业难题预演_资金家庭技能证照避坑',
    description:
      '提前预演资金不足、家庭反对、技能欠缺、证照不全等常见创业难题，附应对思路，降低冲动开工风险。',
    keywords: ['创业难题', '创业避坑', '创业风险', '证照问题', '家庭创业', '小本经'],
  },
  insights: {
    title: '创业心得_过来人真实分享不灌鸡汤',
    description:
      '收录过来人创业心得：抓现金流、控成本、选品与坚持的关键判断，少鸡汤、多可执行经验。',
    keywords: ['创业心得', '创业经验', '过来人分享', '创业干货', '小本经'],
  },
  stories: {
    title: '创业故事_小本创业者的关键决策纪实',
    description:
      '记录小本创业者从起步到稳定的真实故事与关键决策，看别人怎么选项目、扛淡季、做成回头客。',
    keywords: ['创业故事', '摆摊故事', '小本创业故事', '创业经历', '小本经'],
  },
  franchise: {
    title: '加盟避坑指南_品牌库与投资核实清单',
    description:
      '加盟怎么选、怎么验：口碑品牌库、投资区间、红旗信号与核实清单，帮你避开高承诺低兑现的坑。',
    keywords: ['加盟避坑', '加盟品牌', '加盟费用', '招商加盟', '加盟核实', '小本经'],
  },
}

function uniq(list) {
  return [...new Set(list.filter(Boolean))]
}

function joinKeywords(list) {
  return uniq(list).join(',')
}

function setMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** 规范化 SEO 字段（供浏览器与预渲染共用） */
export function normalizeSeo({
  title,
  description,
  keywords,
  path = '',
  image = '',
  useSiteSuffix = true,
} = {}) {
  const pageTitle = !title
    ? `${SITE_NAME} · ${SITE_TAGLINE}`
    : useSiteSuffix && !title.includes(SITE_NAME)
      ? `${title} | ${SITE_NAME}`
      : title
  const desc = description || DEFAULT_DESC
  const kw = Array.isArray(keywords) ? joinKeywords(keywords) : keywords || joinKeywords(DEFAULT_KEYWORDS)
  const base = String(SITE_URL).replace(/\/$/, '')
  const cleanPath = !path || path === '/' ? '/' : path.startsWith('/') ? path.split('?')[0] : `/${path.split('?')[0]}`
  const url = `${base}${cleanPath === '/' ? '/' : cleanPath}`
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${base}${image.startsWith('/') ? image : `/${image}`}`
    : `${base}/favicon.svg`

  return {
    title: pageTitle,
    description: desc,
    keywords: kw,
    path: cleanPath,
    url,
    image: ogImage,
    siteName: `${SITE_NAME} · 摆摊手册`,
  }
}

/**
 * @param {{ title?: string, description?: string, keywords?: string[]|string, path?: string, image?: string, useSiteSuffix?: boolean }} opts
 */
export function applySeo(opts = {}) {
  const seo = normalizeSeo(opts)
  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('name', 'keywords', seo.keywords)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', seo.url)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', seo.siteName)
  setMeta('property', 'og:image', seo.image)
  setMeta('name', 'twitter:card', 'summary')
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', seo.url)
}

function seoForProjectsQuery(route) {
  const q = route.query || {}
  const mode = q.mode
  const tag = q.tag
  const category = q.category || q.cat

  if (mode === 'stall') {
    return {
      title: '出摊线下项目合集_夜市市集社区摆摊',
      description:
        '聚焦出摊/线下形态：夜市、市集、社区定点等可落地项目，按预算与难度筛选，适合想直接上手摆摊的人。',
      keywords: ['出摊项目', '线下摆摊', '夜市摆摊', '市集创业', '社区摆摊', '小本经'],
      path: route.path || '/projects',
    }
  }

  if (tag) {
    return {
      title: `${tag}相关创业项目_低成本起步推荐`,
      description: `浏览标签「${tag}」下的小本创业与摆摊项目，对比启动成本、难度与收入区间，找到更匹配的方向。`,
      keywords: [tag, `${tag}创业`, `${tag}摆摊`, '创业项目', '小本创业', '小本经'],
      path: route.path || '/projects',
    }
  }

  if (category) {
    return {
      title: `${category}创业项目大全_小本起步方案`,
      description: `「${category}」方向低成本创业项目合集：启动资金、日收入参考与操作要点，适合想做${category}赛道的新手。`,
      keywords: [category, `${category}创业`, `${category}项目`, '小本创业', '摆摊', '小本经'],
      path: route.path || '/projects',
    }
  }

  return { ...ROUTE_META.projects, path: route.path || '/projects' }
}

function seoForProjectDetail(project, path) {
  const tags = project.tags || []
  const difficulty = project.difficulty || ''
  const category = project.category || ''
  return {
    title: `${project.name}_${category}小本创业项目详解`,
    description: `${project.description}启动约${project.cost_min}-${project.cost_max}元，日收入参考${project.income_min}-${project.income_max}元，难度${difficulty}。含成本结构、流程、风险与话术。`,
    keywords: uniq([
      project.name,
      category,
      `${project.name}创业`,
      `${category}摆摊`,
      ...tags,
      '小本创业',
      '项目详解',
      '小本经',
    ]),
    path,
    image: project.image,
  }
}

function seoForCaseDetail(caseItem, path) {
  const tags = caseItem.tags || []
  return {
    title: `${caseItem.title}_创业案例复盘`,
    description: `${caseItem.city || ''}真实案例：投入约${caseItem.cost}元，月利润约${caseItem.monthly_profit}元。看起步过程、关键决策与经验总结。`.replace(
      /^\s+/,
      '',
    ),
    keywords: uniq([
      caseItem.title,
      caseItem.city,
      '创业案例',
      '成功案例',
      ...tags,
      '小本经',
    ]),
    path,
    image: caseItem.image,
  }
}

function seoForFranchiseDetail(franchise, path) {
  return {
    title: `${franchise.name}加盟怎么样_投资与避坑解析`,
    description:
      franchise.tagline ||
      `${franchise.name}（${franchise.category}）加盟解析：投资约${franchise.investment_min}-${franchise.investment_max}万，适合人群、核实建议与风险提醒。`,
    keywords: uniq([
      franchise.name,
      `${franchise.name}加盟`,
      franchise.category,
      '加盟避坑',
      '加盟费用',
      '小本经',
    ]),
    path,
  }
}

/** 纯函数：根据路由算出 SEO 配置（不碰 DOM） */
export function resolveRouteSeo(route) {
  const name = route.name
  const id = route.params?.id

  if (name === 'project-detail') {
    const p = getProjectById(id)
    if (p) return { ...seoForProjectDetail(p, route.path), useSiteSuffix: true }
  }

  if (name === 'case-detail') {
    const c = getCaseById(id)
    if (c) return { ...seoForCaseDetail(c, route.path), useSiteSuffix: true }
  }

  if (name === 'franchise-detail') {
    const f = getFranchiseById(id)
    if (f) return { ...seoForFranchiseDetail(f, route.path), useSiteSuffix: true }
  }

  if (name === 'projects') {
    return { ...seoForProjectsQuery(route), useSiteSuffix: true }
  }

  const meta = ROUTE_META[name]
  if (meta) {
    return { ...meta, path: route.path, useSiteSuffix: name !== 'home' }
  }

  return { path: route.path, useSiteSuffix: true }
}

export function applyRouteSeo(route) {
  applySeo(resolveRouteSeo(route))
}

/** 预渲染用的全部路由清单 */
export function listPrerenderRoutes() {
  const staticRoutes = [
    { name: 'home', path: '/' },
    { name: 'categories', path: '/categories' },
    { name: 'projects', path: '/projects' },
    { name: 'cases', path: '/cases' },
    { name: 'ai', path: '/ai' },
    { name: 'guide', path: '/guide' },
    { name: 'calculator', path: '/calculator' },
    { name: 'part-time', path: '/part-time' },
    { name: 'remote', path: '/remote' },
    { name: 'challenges', path: '/challenges' },
    { name: 'insights', path: '/insights' },
    { name: 'stories', path: '/stories' },
    { name: 'franchise', path: '/franchise' },
  ]

  return [
    ...staticRoutes,
    ...projects.map((p) => ({ name: 'project-detail', path: `/project/${p.id}`, params: { id: String(p.id) } })),
    ...cases.map((c) => ({ name: 'case-detail', path: `/case/${c.id}`, params: { id: String(c.id) } })),
    ...franchises.map((f) => ({
      name: 'franchise-detail',
      path: `/franchise/${f.id}`,
      params: { id: String(f.id) },
    })),
  ]
}
