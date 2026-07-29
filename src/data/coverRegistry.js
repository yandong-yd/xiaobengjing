/**
 * 封面注册表：品类 → 图池、可用本地封面、解析规则
 * 约定：本地文件位于 public/images/covers/{file}.jpg
 * COS：配置 VITE_COVER_CDN 后，路径自动加 CDN 前缀
 */

export const COVER_POOLS = {
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

/** 品类 → 默认图池（主规则） */
export const CATEGORY_POOL = {
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

/**
 * 高置信标签 → 图池（仅保留不易误伤的标签）
 * 注意：不要把「夏季」之类季节标签映射到 drink
 */
export const TAG_POOL = {
  饮品: 'drink',
  咖啡: 'drink',
  奶茶: 'drink',
  柠檬茶: 'drink',
  宠物: 'pet',
  鲜食: 'pet',
  手工: 'craft',
  文创: 'craft',
  理发: 'beauty',
  美甲: 'beauty',
  头皮: 'beauty',
  倾听: 'mood',
  解压: 'mood',
  情绪: 'mood',
  跑腿: 'service',
  清洗: 'service',
  线上: 'tech',
  远程: 'tech',
  自媒体: 'tech',
  剪辑: 'tech',
  写作: 'tech',
  夜市: 'food',
  小吃: 'food',
  早餐: 'food',
}

/** 名称关键词 → 图池（比模糊标签更准） */
export const NAME_POOL_RULES = [
  { re: /茶|咖啡|奶茶|柠檬|饮|豆浆|粥/, pool: 'drink' },
  { re: /花|鲜切|绿植/, pool: 'flower' },
  { re: /宠|猫|狗|宠物/, pool: 'pet' },
  { re: /美甲|理发|造型|美容|护肤/, pool: 'beauty' },
  { re: /贴膜|数码|手机|电脑|维修/, pool: 'tech' },
  { re: /手工|编织|陶|银饰|文创/, pool: 'craft' },
  { re: /气球|套圈|娱乐|派对/, pool: 'fun' },
  { re: /鞋|袜|衣|服|帽/, pool: 'fashion' },
  { re: /倾听|情绪|陪伴|解压/, pool: 'mood' },
  { re: /洗|修|跑腿|保洁|便民/, pool: 'service' },
  { re: /煎饼|烧烤|卤|粉|面|饭|串|餐|小吃/, pool: 'food' },
]

export function localCoverPath(file) {
  const name = String(file).replace(/\.jpg$/i, '')
  return `/images/covers/${name}.jpg`
}

export function isLocalCoverPath(src) {
  return typeof src === 'string' && src.startsWith('/images/covers/')
}

export function coverFileFromPath(src) {
  if (!isLocalCoverPath(src)) return ''
  return src.replace(/^\/images\/covers\//, '').replace(/\.jpg$/i, '')
}

export function resolvePoolKey(item = {}) {
  if (item.image_key && COVER_POOLS[item.image_key]) return item.image_key

  const name = item.name || item.title || ''
  for (const rule of NAME_POOL_RULES) {
    if (rule.re.test(name)) return rule.pool
  }

  const tags = item.tags || []
  for (const t of tags) {
    if (TAG_POOL[t]) return TAG_POOL[t]
  }

  if (item.category && CATEGORY_POOL[item.category]) {
    return CATEGORY_POOL[item.category]
  }

  return 'market'
}

export function pickFromPool(poolKey, seed = 0) {
  const files = COVER_POOLS[poolKey] || COVER_POOLS.market
  const file = files[Math.abs(Number(seed) || 0) % files.length]
  return localCoverPath(file)
}

/** 把相对封面路径解析为可访问 URL（支持 COS CDN） */
export function resolveCoverUrl(src, cdnBase = '') {
  if (!src) return ''
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src
  const base = (cdnBase || import.meta.env?.VITE_COVER_CDN || '').replace(/\/$/, '')
  if (base && src.startsWith('/')) return `${base}${src}`
  return src
}
