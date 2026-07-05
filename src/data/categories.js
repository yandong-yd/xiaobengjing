/** 摆摊/小本创业分类（对照市面常见划分 + 市面招商加盟品类） */

export const categories = [

  { name: '餐饮', icon: 'utensils', desc: '小吃饮品，现金流快', slug: '餐饮' },

  { name: '手工', icon: 'sparkles', desc: '安静创作，可居家+市集', slug: '手工' },

  { name: '零售', icon: 'shopping-bag', desc: '卖货为主，灵活出摊', slug: '零售' },

  { name: '服务', icon: 'wrench', desc: '技能变现，复购率高', slug: '服务' },

  { name: '数码科技', icon: 'phone', desc: '贴膜、维修、配件', slug: '数码科技' },

  { name: '文创潮玩', icon: 'palette', desc: '玩具、饰品、创意小物', slug: '文创潮玩' },

  { name: '蔬果鲜花', icon: 'flower', desc: '生鲜、水果、鲜花', slug: '蔬果鲜花' },

  { name: '便民生活', icon: 'home', desc: '洗鞋、改衣、磨刀', slug: '便民生活' },

  { name: '娱乐体验', icon: 'ticket', desc: '套圈、互动、趣味服务', slug: '娱乐体验' },

  { name: '服饰鞋包', icon: 'tag', desc: '袜子、帽饰、快时尚', slug: '服饰鞋包' },

  { name: '助农特产', icon: 'leaf', desc: '土特产、农产品、溯源', slug: '助农特产' },

  { name: '移动餐车', icon: 'truck', desc: '餐车、流动小吃', slug: '移动餐车' },

  { name: '派对婚庆', icon: 'gift', desc: '气球布置、婚庆周边', slug: '派对婚庆' },

  { name: '教育体验', icon: 'academic', desc: '亲子研学、手工体验', slug: '教育体验' },

  { name: '美业造型', icon: 'scissors', desc: '快剪、美甲、编发造型', slug: '美业造型' },

  { name: '情绪价值', icon: 'chat', desc: '倾听、解压、陪伴体验', slug: '情绪价值' },

  { name: '宠物经济', icon: 'paw', desc: '鲜食、美容、陪伴托育', slug: '宠物经济' },

  { name: '兼职副业', icon: 'clock', desc: '周末晚间、不影响主业', slug: 'parttime', route: '/part-time', isWorkMode: true },

  { name: '居家办公', icon: 'home', desc: '在家交付、自由接单', slug: 'remote', route: '/remote', isWorkMode: true },

  { name: '加盟品牌', icon: 'handshake', desc: '品牌加盟库+避坑指南', slug: 'franchise', route: '/franchise', isFranchise: true },

]



export function getCategoryBySlug(slug) {

  return categories.find((c) => c.slug === slug || c.name === slug)

}

