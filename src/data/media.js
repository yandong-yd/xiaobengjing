/** 项目/案例配图 — 本地实拍封面（public/images/covers） */

const poolFiles = {
  food: ['food-0', 'food-1', 'food-2', 'food-3'],
  drink: ['drink-0', 'drink-1', 'drink-2', 'drink-3'],
  craft: ['craft-0', 'craft-1', 'craft-2'],
  market: ['market-0', 'market-1', 'market-2'],
  tech: ['tech-0', 'tech-1', 'tech-2'],
  service: ['service-0', 'service-1', 'service-2'],
  flower: ['flower-0', 'flower-1', 'flower-2'],
  pet: ['pet-0', 'pet-1'],
  fun: ['fun-0', 'fun-1', 'fun-2'],
  fashion: ['fashion-0', 'fashion-1', 'fashion-2'],
  beauty: ['beauty-0', 'beauty-1', 'beauty-2'],
  mood: ['mood-0', 'mood-1', 'mood-2'],
}

const poolMeta = {
  food: { label: '餐饮', themes: [['#ea580c', '#9a3412'], ['#f97316', '#c2410c'], ['#fb923c', '#7c2d12']] },
  drink: { label: '饮品', themes: [['#0d9488', '#115e59'], ['#14b8a6', '#0f766e'], ['#2dd4bf', '#134e4a']] },
  craft: { label: '手工', themes: [['#db2777', '#9d174d'], ['#ec4899', '#be185d'], ['#f472b6', '#831843']] },
  market: { label: '零售', themes: [['#d97706', '#92400e'], ['#f59e0b', '#b45309'], ['#eab308', '#a16207']] },
  tech: { label: '数码', themes: [['#2563eb', '#1e3a8a'], ['#3b82f6', '#1d4ed8'], ['#6366f1', '#3730a3']] },
  service: { label: '服务', themes: [['#059669', '#065f46'], ['#10b981', '#047857'], ['#34d399', '#059669']] },
  flower: { label: '鲜花', themes: [['#e11d48', '#9f1239'], ['#f43f5e', '#be123c'], ['#fb7185', '#e11d48']] },
  pet: { label: '宠物', themes: [['#7c3aed', '#5b21b6'], ['#8b5cf6', '#6d28d9']] },
  fun: { label: '娱乐', themes: [['#7c3aed', '#4c1d95'], ['#a855f7', '#6b21a8'], ['#c084fc', '#7e22ce']] },
  fashion: { label: '服饰', themes: [['#78716c', '#44403c'], ['#a8a29e', '#57534e'], ['#d6d3d1', '#78716c']] },
  beauty: { label: '美业', themes: [['#c026d3', '#86198f'], ['#d946ef', '#a21caf'], ['#e879f9', '#c026d3']] },
  mood: { label: '情绪', themes: [['#0891b2', '#164e63'], ['#06b6d4', '#0e7490'], ['#22d3ee', '#155e75']] },
}

function coverPath(file) {
  return `/images/covers/${file}.jpg`
}

function svgCover(label, c1, c2, variant = 0) {
  const accents = [
    '<circle cx="680" cy="90" r="110" fill="#fff" opacity="0.1"/>',
    '<circle cx="720" cy="420" r="160" fill="#fff" opacity="0.07"/>',
    '<rect x="520" y="30" width="180" height="180" rx="36" fill="#fff" opacity="0.08" transform="rotate(18 610 120)"/>',
  ]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#bg)"/>
    ${accents[variant % accents.length]}
    ${accents[(variant + 1) % accents.length]}
    <text x="48" y="420" font-family="system-ui,-apple-system,sans-serif" font-size="52" font-weight="700" fill="#fff" opacity="0.95">${label}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function buildSvgPool(key) {
  const meta = poolMeta[key] || poolMeta.market
  return meta.themes.map(([c1, c2], i) => svgCover(meta.label, c1, c2, i))
}

const svgPools = Object.fromEntries(Object.keys(poolMeta).map((k) => [k, buildSvgPool(k)]))

const pools = Object.fromEntries(
  Object.entries(poolFiles).map(([key, files]) => [key, files.map(coverPath)]),
)

const categoryPool = {
  餐饮: 'food',
  手工: 'craft',
  零售: 'market',
  服务: 'service',
  数码科技: 'tech',
  文创潮玩: 'craft',
  蔬果鲜花: 'flower',
  便民生活: 'service',
  娱乐体验: 'fun',
  服饰鞋包: 'fashion',
  美业造型: 'beauty',
  情绪价值: 'mood',
  宠物经济: 'pet',
  兼职副业: 'service',
  居家办公: 'tech',
  助农特产: 'market',
  移动餐车: 'food',
  派对婚庆: 'fun',
  教育体验: 'fun',
}

const tagPool = {
  饮品: 'drink',
  夏季: 'drink',
  宠物: 'pet',
  小吃: 'food',
  手工: 'craft',
  文创: 'craft',
  理发: 'beauty',
  美甲: 'beauty',
  倾听: 'mood',
  解压: 'mood',
  情绪: 'mood',
  鲜食: 'pet',
  头皮: 'beauty',
  跑腿: 'service',
  清洗: 'service',
  线上: 'tech',
  远程: 'tech',
  自媒体: 'tech',
  接单: 'service',
  副业: 'service',
  剪辑: 'tech',
  写作: 'tech',
  咖啡: 'drink',
  奶茶: 'drink',
}

function pickFromPool(poolKey, seed) {
  const pool = pools[poolKey] || pools.market
  return pool[Math.abs(seed) % pool.length]
}

export function resolvePoolKey(item) {
  if (item.image_key) return item.image_key
  const tags = item.tags || []
  for (const t of tags) {
    if (tagPool[t]) return tagPool[t]
  }
  if (item.category && categoryPool[item.category]) return categoryPool[item.category]
  for (const t of tags) {
    if (['餐饮', '服务', '零售'].includes(t)) return categoryPool[t] || 'market'
  }
  return 'market'
}

/** 加载失败时的 SVG 兜底（仅 error 时用） */
export function getFallbackCover(poolKey = 'market') {
  const pool = svgPools[poolKey] || svgPools.market
  return pool[0]
}

export function getCaseImage(caseItem) {
  if (caseItem?.image) return caseItem.image
  const key = resolvePoolKey(caseItem)
  return pickFromPool(key, caseItem.id || 0)
}

export function getProjectImage(project) {
  if (project?.image) return project.image
  const key = resolvePoolKey(project)
  return pickFromPool(key, project.id || 0)
}

/** 首页常见项目指定更贴切封面 */
export const projectCoverOverrides = {
  1: coverPath('food-3'),
  2: coverPath('food-0'),
  3: coverPath('drink-3'),
  4: coverPath('tech-0'),
  5: coverPath('fun-2'),
  6: coverPath('service-2'),
  7: coverPath('food-1'),
  8: coverPath('fun-0'),
  21: coverPath('craft-1'),
  39: coverPath('tech-1'),
}

/** 案例指定封面 */
export const caseCoverOverrides = {
  1: coverPath('food-3'),
  2: coverPath('food-0'),
  3: coverPath('drink-3'),
  4: coverPath('service-0'),
  5: coverPath('food-1'),
  6: coverPath('tech-0'),
  7: coverPath('food-0'),
  8: coverPath('food-2'),
  10: coverPath('drink-1'),
  11: coverPath('flower-0'),
  12: coverPath('pet-0'),
  13: coverPath('craft-0'),
  14: coverPath('tech-1'),
  19: coverPath('food-2'),
  21: coverPath('craft-1'),
  22: coverPath('food-1'),
  24: coverPath('craft-2'),
  25: coverPath('tech-2'),
  32: coverPath('flower-1'),
  36: coverPath('drink-2'),
  39: coverPath('flower-0'),
  44: coverPath('fun-0'),
  63: coverPath('food-0'),
  64: coverPath('food-2'),
  65: coverPath('market-1'),
  66: coverPath('food-3'),
}

export function enrichCaseMedia(caseItem) {
  const image = caseCoverOverrides[caseItem.id] || getCaseImage(caseItem)
  return {
    ...caseItem,
    image,
    image_alt: caseItem.image_alt || `${caseItem.title} · ${caseItem.city}`,
    image_pool: resolvePoolKey(caseItem),
  }
}

export function enrichProjectMedia(project) {
  const poolKey = resolvePoolKey(project)
  return {
    ...project,
    image: projectCoverOverrides[project.id] || project.image || getProjectImage(project),
    image_alt: project.image_alt || `${project.name} · ${project.category}`,
    image_pool: poolKey,
  }
}
