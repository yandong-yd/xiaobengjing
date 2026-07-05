/**
 * 市面招商品类树
 * 小本摆摊版：映射到项目库筛选，非大额加盟导向
 */

export const zhaoShangSectors = [
  {
    id: 'food',
    label: '餐饮加盟',
    icon: 'utensils',
    subs: [
      { id: 'food-snack', label: '特色小吃', match: ['小吃', '章鱼', '狼牙', '淀粉肠', '烤冷面', '狼牙土豆'] },
      { id: 'food-bbq', label: '烧烤', match: ['烧烤', '烤串', '炸串'] },
      { id: 'food-hotpot', label: '火锅', match: ['火锅', '涮', '冒菜', '麻辣烫', '串串', '钵钵鸡'] },
      { id: 'food-noodles', label: '面食', match: ['面', '馄饨', '抄手', '肠粉', '米粉', '炒粉', '凉皮', '热干面', '刀削', '拉面'] },
      { id: 'food-drink', label: '冷饮热饮', match: ['奶茶', '柠檬茶', '果汁', '冰粉', '雪花冰', '绵绵冰', '咖啡', '豆浆'] },
      { id: 'food-braised', label: '卤菜熟食', match: ['卤', '熟食', '烧腊', '斩料'] },
      { id: 'food-drypot', label: '干锅', match: ['干锅', '香锅'] },
      { id: 'food-cake', label: '蛋糕店', match: ['蛋糕', '烘焙', '面包', '甜点', '鸡蛋仔', '华夫'] },
      { id: 'food-fast', label: '快餐', match: ['快餐', '便当', '盒饭', '盖浇', '汉堡', '热狗'] },
      { id: 'food-western', label: '西餐', match: ['西餐', '披萨', '意面', '意式'] },
      { id: 'food-chinese', label: '中餐', match: ['中餐', '家常', '小炒', '生煎', '锅贴'] },
      { id: 'food-porridge', label: '粥店', match: ['粥', '煎饼', '手抓饼', '酱香饼', '包子', '油条'] },
      { id: 'food-tea-wine', label: '烟酒茶饮料', match: ['茶叶', '茶具', '精酿', '酒水', '名酒'] },
      { id: 'food-local', label: '地方特产', match: ['特产', '助农', '腊肉', '腊肠', '地标'] },
      { id: 'food-wine', label: '名酒加盟', match: ['名酒', '白酒', '红酒'] },
    ],
  },
  {
    id: 'special',
    label: '特色加盟',
    icon: 'sparkles',
    subs: [
      { id: 'special-mobile', label: '移动通讯', match: ['5G', '通讯', '号卡', '广电'] },
      { id: 'special-digital', label: '数码电子', match: ['数码', '电子', '无人售货', '售货机'] },
      { id: 'special-transfer-tech', label: '技术转让', match: ['技术转让', '配方'] },
      { id: 'special-transfer-biz', label: '生意转让', match: ['转让', '接手'] },
      { id: 'special-shop', label: '商铺招商', match: ['商铺', '档口', '招商'] },
      { id: 'special-other', label: '其他', match: [] },
    ],
  },
  {
    id: 'clothing',
    label: '服装加盟',
    icon: 'tag',
    subs: [
      { id: 'cloth-women', label: '女装', match: ['女装', '连衣裙'] },
      { id: 'cloth-men', label: '男装', match: ['男装'] },
      { id: 'cloth-kids', label: '童装', match: ['童装', '亲子装'] },
      { id: 'cloth-acc', label: '服装配饰', match: ['配饰', '帽饰', '围巾'] },
      { id: 'cloth-underwear', label: '内衣袜子泳装', match: ['袜子', '内衣', '泳装'] },
      { id: 'cloth-sport', label: '运动户外', match: ['运动', '户外', '露营装备'] },
      { id: 'cloth-shoes', label: '鞋加盟', match: ['鞋', '洗鞋'] },
      { id: 'cloth-bags', label: '箱包皮具', match: ['箱包', '皮具', '拉杆箱'] },
    ],
  },
  {
    id: 'beauty',
    label: '美容保健加盟',
    icon: 'scissors',
    subs: [
      { id: 'beauty-health', label: '养生保健', match: ['养生', '艾灸', '头疗', '头皮', '保健'] },
      { id: 'beauty-cos', label: '化妆品', match: ['化妆品', '美妆', '护肤'] },
      { id: 'beauty-care', label: '洗护用品', match: ['洗护', '洗发', '洗衣'] },
      { id: 'beauty-spa', label: '美容SPA/美发', match: ['美发', '美甲', '美容', '快剪', '理发', '美睫'] },
      { id: 'beauty-adult', label: '成人用品', match: ['成人用品'] },
    ],
  },
  {
    id: 'network',
    label: '网络服务加盟',
    icon: 'phone',
    subs: [
      { id: 'net-agent', label: '网站代理', match: ['网站', '代理', '推客'] },
      { id: 'net-site', label: '自助建站', match: ['建站'] },
      { id: 'net-shop', label: '网上开店', match: ['网上开店', '闲鱼', '电商', '带货', '自媒体', '代运营'] },
      { id: 'net-taobao', label: '淘宝代理', match: ['淘宝', '拼多多', '抖音小店', '快手'] },
    ],
  },
  {
    id: 'life',
    label: '生活服务加盟',
    icon: 'home',
    subs: [
      { id: 'life-travel', label: '旅游/票务', match: ['旅游', '票务', '景区'] },
      { id: 'life-express', label: '快递物流', match: ['快递', '物流', '代收', '跑腿'] },
      { id: 'life-dry', label: '干洗', match: ['干洗', '洗衣'] },
      { id: 'life-house', label: '家政服务', match: ['家政', '保洁', '陪诊', '月嫂'] },
      { id: 'life-hotel', label: '酒店', match: ['酒店', '民宿'] },
      { id: 'life-retail', label: '零售业', match: ['便利店', '无人便利', '百货', '2元店', '团购自提'] },
      { id: 'life-leather', label: '皮革/奢饰品护理', match: ['皮革', '奢修', '皮具修复'] },
      { id: 'life-wedding', label: '婚庆', match: ['婚庆', '气球', '派对', '婚礼'] },
      { id: 'life-fun', label: '娱乐场所', match: ['娱乐', 'K歌', '套圈', '游戏摊'] },
    ],
  },
  {
    id: 'edu',
    label: '教育母婴加盟',
    icon: 'academic',
    subs: [
      { id: 'edu-school', label: '教育机构', match: ['教育', '培训', '家教', '托育'] },
      { id: 'edu-play', label: '儿童乐园', match: ['儿童乐园', '摇摇车', '亲子体验', '科学体验'] },
      { id: 'edu-sports', label: '文体用品', match: ['文体', '轮滑', '体育'] },
      { id: 'edu-stationery', label: '文具加工', match: ['文具'] },
      { id: 'edu-baby', label: '母婴儿童用品', match: ['母婴', '小儿推拿', '儿童用品'] },
    ],
  },
  {
    id: 'home',
    label: '家居环保加盟',
    icon: 'home',
    subs: [
      { id: 'home-deco', label: '家饰摆件', match: ['家饰', '摆件', '扩香石'] },
      { id: 'home-furniture', label: '家具', match: ['家具'] },
      { id: 'home-curtain', label: '窗帘布艺', match: ['窗帘', '布艺'] },
      { id: 'home-textile', label: '家纺床品', match: ['家纺', '床品'] },
      { id: 'home-appliance', label: '家用电器', match: ['家电', '清洗', '空调'] },
      { id: 'home-daily', label: '日用品', match: ['日用品', '百货'] },
      { id: 'home-clean', label: '清洁环保', match: ['环保', '净水', '智能家电', '智能家居'] },
      { id: 'home-kitchen', label: '厨具餐具', match: ['厨具', '餐具'] },
    ],
  },
  {
    id: 'building',
    label: '建材加盟',
    icon: 'wrench',
    subs: [
      { id: 'build-wall', label: '壁纸', match: ['壁纸'] },
      { id: 'build-door', label: '门窗楼梯', match: ['门窗'] },
      { id: 'build-light', label: '灯具灯饰', match: ['灯具', '灯饰'] },
      { id: 'build-floor', label: '地板瓷砖', match: ['地板', '瓷砖'] },
      { id: 'build-kitchen', label: '厨卫设备', match: ['厨卫'] },
      { id: 'build-paint', label: '装饰涂料', match: ['涂料', '油漆'] },
      { id: 'build-stone', label: '石材板材', match: ['石材', '板材'] },
      { id: 'build-hardware', label: '五金机电', match: ['五金', '配钥匙', '开锁'] },
      { id: 'build-coat', label: '油漆涂料', match: ['油漆'] },
    ],
  },
  {
    id: 'auto',
    label: '汽车服务加盟',
    icon: 'truck',
    subs: [
      { id: 'auto-beauty', label: '汽车美容', match: ['汽车美容', '洗车'] },
      { id: 'auto-wash', label: '洗车', match: ['洗车'] },
      { id: 'auto-parts', label: '汽车用品', match: ['汽车用品', '机油'] },
      { id: 'auto-repair', label: '汽车维修', match: ['汽车维修', '救援', '充电'] },
      { id: 'auto-deco', label: '汽车装饰', match: ['贴膜', '装饰'] },
      { id: 'auto-ev', label: '电动车', match: ['电动车', '电车'] },
      { id: 'auto-rent', label: '汽车租赁/买卖', match: ['租车', '二手车'] },
    ],
  },
  {
    id: 'machine',
    label: '机械加盟',
    icon: 'wrench',
    subs: [
      { id: 'mach-food', label: '食品加工机械', match: ['食品机械', '炒栗机', '豆浆机'] },
      { id: 'mach-engine', label: '工程机械', match: ['工程机械'] },
      { id: 'mach-env', label: '环保机械', match: ['环保机械', '清洁设备'] },
      { id: 'mach-farm', label: '农用机械', match: ['农用机械', '大棚'] },
    ],
  },
  {
    id: 'gift',
    label: '礼物商品加盟',
    icon: 'gift',
    subs: [
      { id: 'gift-item', label: '礼品', match: ['礼品', '伴手礼'] },
      { id: 'gift-craft', label: '工艺品', match: ['工艺', '非遗', '糖画', '手工'] },
      { id: 'gift-jewelry', label: '饰品挂件', match: ['饰品', '挂件', '编绳', '串珠', '耳环'] },
      { id: 'gift-make', label: '礼品加工', match: ['加工', '定制'] },
      { id: 'gift-jade', label: '珠宝玉器', match: ['珠宝', '玉器', '文玩'] },
    ],
  },
  {
    id: 'agri',
    label: '农业加盟',
    icon: 'leaf',
    subs: [
      { id: 'agri-farm', label: '种植养殖', match: ['种植', '养殖', '肉兔', '菌菇', '助农', '土特产'] },
      { id: 'agri-tools', label: '农业用具', match: ['农具', '农资'] },
      { id: 'agri-fish', label: '渔具', match: ['渔具', '钓具'] },
    ],
  },
]

const allSubs = zhaoShangSectors.flatMap((s) =>
  s.subs.map((sub) => ({ ...sub, sectorId: s.id, sectorLabel: s.label })),
)

const categoryToSector = {
  餐饮: 'food',
  手工: 'gift',
  零售: 'life',
  服务: 'life',
  数码科技: 'special',
  文创潮玩: 'gift',
  蔬果鲜花: 'food',
  便民生活: 'life',
  娱乐体验: 'life',
  服饰鞋包: 'clothing',
  助农特产: 'agri',
  移动餐车: 'food',
  派对婚庆: 'life',
  教育体验: 'edu',
  美业造型: 'beauty',
  情绪价值: 'beauty',
  宠物经济: 'special',
  兼职副业: 'network',
  居家办公: 'network',
}

export function getZhaoShangSector(id) {
  return zhaoShangSectors.find((s) => s.id === id)
}

export function getZhaoShangSub(subId) {
  return allSubs.find((s) => s.id === subId)
}

function matchSub(nameTags, sub) {
  if (!sub.match?.length) return false
  return sub.match.some((kw) => kw && nameTags.includes(kw))
}

export function resolveZhaoShang(project) {
  if (project.zhao_shang_sub) {
    const sub = getZhaoShangSub(project.zhao_shang_sub)
    if (sub) return { sectorId: sub.sectorId, subId: sub.id }
  }
  const nameTags = `${project.name} ${(project.tags || []).join(' ')}`
  for (const sub of allSubs) {
    if (matchSub(nameTags, sub)) return { sectorId: sub.sectorId, subId: sub.id }
  }
  const sectorId = categoryToSector[project.category] || 'special'
  const sector = getZhaoShangSector(sectorId)
  const fallbackSub = sector?.subs[0]?.id || 'special-other'
  return { sectorId, subId: fallbackSub }
}

export function enrichZhaoShangGroup(project) {
  const { sectorId, subId } = resolveZhaoShang(project)
  const sector = getZhaoShangSector(sectorId)
  const sub = getZhaoShangSub(subId)
  return {
    ...project,
    zhao_shang_sector: sectorId,
    zhao_shang_sub: subId,
    zhao_shang_sector_label: sector?.label || null,
    zhao_shang_sub_label: sub?.label || null,
  }
}

export function filterByZhaoShangSector(projectsList, sectorId) {
  if (!sectorId) return projectsList
  return projectsList.filter((p) => p.zhao_shang_sector === sectorId)
}

export function filterByZhaoShangSub(projectsList, subId) {
  if (!subId) return projectsList
  return projectsList.filter((p) => p.zhao_shang_sub === subId)
}

export function countProjectsBySector(projectsList) {
  const counts = Object.fromEntries(zhaoShangSectors.map((s) => [s.id, 0]))
  for (const p of projectsList) {
    if (p.zhao_shang_sector && counts[p.zhao_shang_sector] != null) {
      counts[p.zhao_shang_sector]++
    }
  }
  return counts
}

export function countProjectsBySub(projectsList, sectorId) {
  const sector = getZhaoShangSector(sectorId)
  if (!sector) return {}
  const counts = Object.fromEntries(sector.subs.map((s) => [s.id, 0]))
  for (const p of projectsList) {
    if (p.zhao_shang_sector === sectorId && counts[p.zhao_shang_sub] != null) {
      counts[p.zhao_shang_sub]++
    }
  }
  return counts
}

/** 餐饮细类快捷筛选 */
export const fiftyEightCategories = zhaoShangSectors.find((s) => s.id === 'food').subs.map((sub) => ({
  id: sub.id.replace('food-', ''),
  label: sub.label,
  match: sub.match,
}))

export function filterByFiftyEightGroup(projectsList, groupId) {
  if (!groupId) return projectsList
  const subId = groupId.includes('-') ? groupId : `food-${groupId}`
  return filterByZhaoShangSub(projectsList, subId)
}

export function enrichFiftyEightGroup(project) {
  const enriched = enrichZhaoShangGroup(project)
  const foodSub = enriched.zhao_shang_sector === 'food' ? enriched.zhao_shang_sub?.replace('food-', '') : null
  return {
    ...enriched,
    fifty_eight_group: foodSub,
    fifty_eight_label: enriched.zhao_shang_sector === 'food' ? enriched.zhao_shang_sub_label : null,
  }
}

export function resolveFiftyEightGroup(project) {
  return project.fifty_eight_group || (project.zhao_shang_sector === 'food' ? project.zhao_shang_sub?.replace('food-', '') : null)
}
