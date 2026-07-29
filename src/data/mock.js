import { extraProjects } from './extraProjects.js'
import { extraCases } from './extraCases.js'
import { batchCases } from './batchCases.js'
import { handcraftProjects } from './handcraftProjects.js'
import { moreProjects } from './moreProjects.js'
import { batchProjects } from './batchProjects.js'
import { wellnessProjects } from './wellnessProjects.js'
import { marketplaceProjects } from './marketplaceProjects.js'
import { freelanceProjects } from './freelanceProjects.js'
import { enrichWorkMode } from './projectWorkMode.js'
import { enrichProject } from './projectRealism.js'
import { enrichCase } from './caseRealism.js'
import { enrichPlaybook } from './projectPlaybook.js'
import { enrichCreatorFit, matchCreatorProfile } from './creatorMatch.js'
import { enrichStaffing } from './projectStaffing.js'
import { enrichProjectMedia, enrichCaseMedia } from './media.js'
import { enrichLifecycle } from '../lib/contentLifecycle.js'
import { fiftyEightProjects } from './fiftyEightProjects.js'
import { enrichFiftyEightGroup } from './zhaoShang58.js'
import { zhaoShangProjects } from './zhaoShangProjects.js'

const baseProjects = [
  {
    id: 1,
    name: '煎饼果子摊',
    category: '餐饮',
    cost_min: 1000,
    cost_max: 5000,
    income_min: 300,
    income_max: 800,
    difficulty: '简单',
    tags: ['夜市', '小吃', '早餐'],
    description: '经典街头小吃，投入低、出餐快，适合新手起步。',
    cost_breakdown: {
      equipment: '800-2000元（铁板、工具、小推车）',
      ingredients: '300-500元/天',
      stall: '500-2000元/月（摊位费）',
    },
    income_model: {
      daily: '300-800元/天',
      profit: '利润率约40-55%',
      peak: '早餐+夜宵双高峰',
    },
    steps: {
      prepare: ['办理健康证', '采购设备与原料', '选定摊位位置', '试做产品调口味'],
      operate: ['提前1小时出摊备料', '高峰时段快速出餐', '保持卫生与服务态度', '收摊清洁设备'],
      manage: ['记录每日销量与成本', '根据反馈调整口味', '周末增加新品试卖', '建立回头客微信群'],
    },
    risks: ['天气影响出摊', '城管巡查风险', '同质化竞争激烈', '食材损耗需控制'],
    ai_tips: ['可搭配豆浆/粥提高客单价', '企业园区早餐需求稳定', '提前预制面糊提升效率'],
  },
  {
    id: 2,
    name: '烧烤摊',
    category: '餐饮',
    cost_min: 3000,
    cost_max: 8000,
    income_min: 400,
    income_max: 1200,
    difficulty: '中等',
    tags: ['夜市', '小吃', '社交'],
    description: '夜宵场景刚需，社交属性强，复购率高。',
    cost_breakdown: {
      equipment: '2000-4000元（烤炉、炭、工具）',
      ingredients: '500-800元/天',
      stall: '800-3000元/月',
    },
    income_model: {
      daily: '400-1200元/天',
      profit: '利润率约35-50%',
      peak: '周五至周日夜间',
    },
    steps: {
      prepare: ['学习腌制与火候', '采购烤炉与食材', '办理相关证照', '选址靠近夜市或社区'],
      operate: ['17:00开始备串', '20:00-24:00高峰', '提供啤酒搭配增销', '保持摊位整洁'],
      manage: ['记录畅销品类', '控制食材新鲜度', '做会员满减活动', '雨天准备雨棚'],
    },
    risks: ['环保与油烟限制', '食材保鲜要求高', '夏季竞争加剧', '人工强度大'],
    ai_tips: ['特色秘制酱料是差异化关键', '可接外卖平台扩大覆盖', '套餐组合提升客单价'],
  },
  {
    id: 3,
    name: '手打柠檬茶',
    category: '餐饮',
    cost_min: 2000,
    cost_max: 6000,
    income_min: 250,
    income_max: 700,
    difficulty: '简单',
    tags: ['饮品', '年轻群体', '夏季'],
    description: '年轻人喜爱的轻创业选择，设备简单、毛利高。',
    cost_breakdown: {
      equipment: '1500-3000元（制冰机、封口机）',
      ingredients: '200-400元/天',
      stall: '500-1500元/月',
    },
    income_model: {
      daily: '250-700元/天',
      profit: '利润率约50-65%',
      peak: '夏季下午至晚间',
    },
    steps: {
      prepare: ['学习配方与制作', '设计品牌视觉', '采购新鲜水果', '选址学校或商圈'],
      operate: ['现场手打展示', '推季节限定款', '收集顾客反馈', '保持出品稳定'],
      manage: ['控制水果损耗', '做小红书引流', '发展团购订单', '冬季转热饮'],
    },
    risks: ['季节性强', '水果价格波动', '品牌同质化', '需一定营销能力'],
    ai_tips: ['「手打」过程是最好的广告', '与本地博主合作探店', '推出9.9引流款'],
  },
  {
    id: 4,
    name: '手机贴膜摊',
    category: '数码科技',
    cost_min: 500,
    cost_max: 2000,
    income_min: 150,
    income_max: 500,
    difficulty: '简单',
    tags: ['零售', '低门槛', '商场'],
    description: '几乎零厨艺要求，靠位置和手艺吃饭。',
    cost_breakdown: {
      equipment: '300-800元（贴膜工具、灯）',
      ingredients: '200-500元/周（各类膜）',
      stall: '0-1000元/月（商场分成或免费点位）',
    },
    income_model: {
      daily: '150-500元/天',
      profit: '利润率约60-80%',
      peak: '周末及换机季',
    },
    steps: {
      prepare: ['练习贴膜无气泡', '备齐各型号膜', '申请商场或街铺点位', '准备清洁套装'],
      operate: ['主动招揽顾客', '贴膜时推荐配件', '提供免费清洁服务', '建立快速出品流程'],
      manage: ['跟进新机型补货', '做套餐（膜+壳）', '发展回头客', '记录各型号销量'],
    },
    risks: ['线上贴膜冲击', '点位租金上涨', '技术门槛被低估', '客单价有限'],
    ai_tips: ['搭配数据线、充电器销售', '商场中庭位置曝光高', '提供「贴坏包换」建立信任'],
  },
  {
    id: 5,
    name: '儿童气球/玩具摊',
    category: '文创潮玩',
    cost_min: 800,
    cost_max: 3000,
    income_min: 200,
    income_max: 600,
    difficulty: '简单',
    tags: ['零售', '亲子', '周末'],
    image_key: 'fun',
    description: '公园、商场周末刚需，互动性强，孩子拉动消费。',
    cost_breakdown: {
      equipment: '500-1000元（展示架、充气工具）',
      ingredients: '300-600元/周（气球、小玩具）',
      stall: '0-500元/次（公园或集市）',
    },
    income_model: {
      daily: '200-600元/天',
      profit: '利润率约45-60%',
      peak: '周末及节假日',
    },
    steps: {
      prepare: ['采购气球与玩具', '学习造型气球技巧', '选定公园或商场', '设计吸引眼球的展示'],
      operate: ['现场制作吸引围观', '家长互动促成交', '推套餐组合', '保持摊位色彩丰富'],
      manage: ['节日备货充足', '记录畅销款式', '与商场活动联动', '发展派对定制单'],
    },
    risks: ['受天气和季节影响', '仅周末有效', '需一定动手能力', '竞争在热门点位'],
    ai_tips: ['学几种卡通造型是加分项', '生日派对定制利润更高', '与亲子机构合作引流'],
  },
  {
    id: 6,
    name: '洗鞋服务摊',
    category: '便民生活',
    cost_min: 1500,
    cost_max: 5000,
    income_min: 200,
    income_max: 600,
    difficulty: '中等',
    tags: ['服务', '社区', '复购'],
    description: '社区周边刚需服务，复购率高，口碑传播强。',
    cost_breakdown: {
      equipment: '1000-3000元（清洗设备、烘干）',
      ingredients: '100-300元/周（清洁剂）',
      stall: '500-1500元/月',
    },
    income_model: {
      daily: '200-600元/天',
      profit: '利润率约50-70%',
      peak: '周末及换季时',
    },
    steps: {
      prepare: ['学习各类材质清洗', '采购专业设备', '选址社区门口', '制定价目表'],
      operate: ['30分钟快速取件', '严重污渍加价说明', '提供上门取送', '展示清洗前后对比'],
      manage: ['建立会员次卡', '与鞋店异业合作', '做社群接单', '记录常洗客户'],
    },
    risks: ['损坏赔偿风险', '设备维护成本', '需一定技术积累', '淡季明显'],
    ai_tips: ['「洗3送1」锁定客户', '大学周边需求旺盛', '拍照发圈做口碑营销'],
  },
  {
    id: 7,
    name: '卤味熟食摊',
    category: '餐饮',
    cost_min: 2000,
    cost_max: 6000,
    income_min: 300,
    income_max: 900,
    difficulty: '中等',
    tags: ['小吃', '社区', '晚餐'],
    description: '社区晚餐刚需，可在家预制，出摊即可售卖。',
    cost_breakdown: {
      equipment: '800-2000元（保温箱、展示柜）',
      ingredients: '400-700元/天',
      stall: '500-2000元/月',
    },
    income_model: {
      daily: '300-900元/天',
      profit: '利润率约40-55%',
      peak: '17:00-20:00',
    },
    steps: {
      prepare: ['学习或加盟卤方', '在家提前卤制', '办理食品证照', '选址社区出入口'],
      operate: ['切配展示吸引顾客', '推组合套餐', '提供加热服务', '收摊处理剩余'],
      manage: ['控制每日产量', '收集口味反馈', '节日推礼盒', '发展团购客户'],
    },
    risks: ['食品安全要求高', '剩余处理损耗', '口味需持续优化', '夏季保存需注意'],
    ai_tips: ['独家卤料配方是核心', '与便利店合作代销', '推「下班顺手带」概念'],
  },
  {
    id: 8,
    name: '套圈/小游戏摊',
    category: '娱乐体验',
    cost_min: 1000,
    cost_max: 4000,
    income_min: 250,
    income_max: 800,
    difficulty: '简单',
    tags: ['娱乐', '夜市', '亲子'],
    image_key: 'fun',
    description: '夜市经典项目，互动性强，节假日收入可观。',
    cost_breakdown: {
      equipment: '800-2500元（套圈、奖品展示）',
      ingredients: '200-500元/周（小奖品补货）',
      stall: '300-1500元/月',
    },
    income_model: {
      daily: '250-800元/天',
      profit: '利润率约50-70%',
      peak: '节假日及夜市',
    },
    steps: {
      prepare: ['采购套圈与奖品', '设计游戏规则', '选定夜市位置', '布置灯光氛围'],
      operate: ['现场演示吸引参与', '控制难度与成本', '推「10元3次」套餐', '保持奖品新鲜度'],
      manage: ['定期更换奖品款式', '与夜市管理搞好关系', '节日加大备货', '记录每日流水'],
    },
    risks: ['奖品成本控制', '部分城市限制', '依赖人流位置', '同质化竞争'],
    ai_tips: ['大奖展示提升参与欲', '亲子双人套餐好卖', '与网红打卡点联动'],
  },
]

export const projects = [...baseProjects, ...extraProjects, ...handcraftProjects, ...moreProjects, ...batchProjects, ...wellnessProjects, ...marketplaceProjects, ...fiftyEightProjects, ...zhaoShangProjects, ...freelanceProjects].map((p) =>
  enrichLifecycle(
    enrichWorkMode(enrichProjectMedia(enrichStaffing(enrichPlaybook(enrichCreatorFit(enrichFiftyEightGroup(enrichProject(p))))))),
    { type: 'project' },
  )
)

export { matchCreatorProfile, getRecommendedProjects } from './creatorMatch.js'

export const baseCases = [
  {
    id: 1,
    title: '三线城市夫妻煎饼摊，月赚8000',
    city: '洛阳',
    cost: 3500,
    monthly_profit: 8000,
    tags: ['餐饮', '夫妻店', '稳定'],
    story: '老张和妻子都是工厂下岗职工，2023年用3500元起步做煎饼果子，选在工业园的早餐点位。',
    process: '前两周每天亏损，因为位置不对。后来换到园区食堂出口，第三周开始日入400+。妻子负责备料，老张负责出摊。',
    decisions: '关键决策是放弃繁华商圈，选择工业园稳定客流；同时加了鸡蛋灌饼和豆浆，客单价从6元提到12元。',
    profit_model: '每天出摊4小时（6:30-10:30），日均450元，月休4天，月利润约8000元。',
    experience: '选址比手艺更重要；一定要办健康证；和周边摊主搞好关系互相照应；坚持3个月才有稳定回头客。',
  },
  {
    id: 2,
    title: '大学生暑假烧烤摊，2个月回本',
    city: '成都',
    cost: 6000,
    monthly_profit: 12000,
    tags: ['餐饮', '学生', '夏季'],
    story: '大三学生小李，用暑假2个月时间在社区门口做烧烤，6月投入6000，8月底已完全回本。',
    process: '先在自家阳台练手1个月，然后在小区门口的空白点位出摊。通过业主群宣传，第一天就卖了800元。',
    decisions: '主打「干净烧烤」差异化，用透明操作台；推出19.9元体验套餐引流；只在周五到周日出摊降低强度。',
    profit_model: '周末3天日均1000+，工作日不出摊。两月总营收约25000，净利润12000。',
    experience: '学生创业优势是时间和精力；社群营销比发传单有效100倍；不要贪多，先把3-5个招牌菜做好。',
  },
  {
    id: 3,
    title: '宝妈柠檬茶摊，兼顾带娃与收入',
    city: '杭州',
    cost: 4000,
    monthly_profit: 6000,
    tags: ['饮品', '宝妈', '灵活'],
    story: '全职妈妈小王，孩子上幼儿园后空闲时间多，用4000元在小学门口做手打柠檬茶。',
    process: '先在厨房练配方2周，然后选择下午3点放学时段出摊2小时。通过家长群口碑传播，第二周就开始排队。',
    decisions: '只做4款经典产品保证品质；推出「妈妈手作」标签；与学校小卖部错开竞争，选校门口最佳位置。',
    profit_model: '每天出摊2小时，日均350元，月工作22天，月利润约6000元。',
    experience: '时间灵活是最大优势；品质稳定比花样多更重要；家长群体口碑传播极快；注意季节变化及时调整。',
  },
  {
    id: 4,
    title: '退伍军人洗鞋摊，社区口碑王',
    city: '武汉',
    cost: 4500,
    monthly_profit: 9000,
    tags: ['服务', '社区', '复购'],
    story: '退伍军人老刘，用4500元在小区商业街开洗鞋摊，靠口碑3个月做到区域第一。',
    process: '先在朋友圈免费洗10双积累案例，然后在社区门口租小门面。前一个月日均200，第三个月日均400+。',
    decisions: '推出洗坏包赔承诺；30分钟快洗差异化；与周边鞋店互推客户；发展会员次卡锁定客户。',
    profit_model: '日均380元，月工作26天，月利润约9000元。会员次卡占总收入40%。',
    experience: '服务质量是生命线；拍照对比是最好的广告；社区生意靠口碑；会员制是稳定收入的关键。',
  },
  {
    id: 5,
    title: '下岗职工卤味摊，逆袭月入过万',
    city: '郑州',
    cost: 5000,
    monthly_profit: 10000,
    tags: ['餐饮', '社区', '晚餐'],
    story: '李姐45岁下岗后，用5000元跟师傅学卤味，在菜市场门口出摊，现在月入过万。',
    process: '跟师傅学了1个月，在家试做2周。先在菜市场租半档口，下午4点出摊，晚上8点收摊。',
    decisions: '独家卤方是核心竞争力；只做5样经典产品；推「下班顺手带」套餐；与菜市场管理者搞好关系。',
    profit_model: '日均450元，月工作28天，月利润约10000元。周末加量50%。',
    experience: '年龄不是障碍，执行力才是；配方需要不断微调；老客户比新客户重要；冬天可以转卤味礼盒。',
  },
  {
    id: 6,
    title: '95后贴膜小哥，商场月入1.5万',
    city: '深圳',
    cost: 2000,
    monthly_profit: 15000,
    tags: ['零售', '商场', '技巧'],
    story: '95后阿杰，用2000元在商场中庭做手机贴膜，靠技术和销售技巧月入1.5万。',
    process: '先在手机店打工学技术3个月，然后承包商场中庭小点位。第一天就贴了20张膜，进账600元。',
    decisions: '贴膜免费帮清灰增服务感；推「膜+壳+线」套餐；与商场活动联动做促销；记录每个顾客机型备膜。',
    profit_model: '日均600-800元，月工作26天，月利润约15000元。配件销售占40%。',
    experience: '技术要练到无痕贴膜；销售话术和手艺一样重要；商场点位贵但流量值得；新机型上市是黄金期。',
  },
]

export const cases = [...baseCases, ...extraCases, ...batchCases].map((c) =>
  enrichLifecycle(enrichCaseMedia(enrichCase(c)), { type: 'case' }),
)

export const hotTags = [
  '夜市', '小吃', '低门槛', '宝妈适合', '学生创业',
  '高利润', '周末出摊', '社区生意', '夏季热门', '无需厨艺',
  '副业', '冬季', '宠物', '商场', '饮品', '亲子', '技术',
  '手工', '残疾友好', '可坐着', '退休适合', '创意',
  '早餐', '网红', 'CBD', '校园', '季节', '便民', '文创',
  '美业', '理发', '美甲', '情绪价值', '倾听', '解压', '男性向', '女性向',
  '宠物经济', '上门', '移动', '头皮', '跑腿', '代收', '家电清洗', '鲜食',
  '居家办公', '自由职业', '线上', '接单', '自媒体', '远程', '写作', '剪辑',
  '热门', '面食', '火锅', '干锅', '蛋糕', '快餐', '地方特产', '茶叶',
]

export const cities = [...new Set(cases.map((c) => c.city))].sort()

export function getProjectById(id) {
  return projects.find((p) => p.id === Number(id))
}

export function getCaseById(id) {
  return cases.find((c) => c.id === Number(id))
}

export function formatCostRange(min, max) {
  return `${min}-${max}元`
}

export function formatIncomeRange(min, max) {
  return `${min}-${max}元/天`
}

export function getRelatedProjects(project, limit = 3) {
  if (!project) return []
  return projects
    .filter((p) => p.id !== project.id && (p.category === project.category || p.tags.some((t) => project.tags.includes(t))))
    .slice(0, limit)
}

export function getRelatedCases(project, limit = 2) {
  if (!project) return []
  const tag = project.category === '餐饮' ? '餐饮' : project.tags[0]
  return cases.filter((c) => c.tags.includes(tag) || c.tags.includes(project.category)).slice(0, limit)
}

export function filterProjectsByBudget(projectsList, tier) {
  if (!tier) return projectsList
  const { min = 0, max = Infinity } = tier
  return projectsList.filter((p) => p.cost_min >= min && p.cost_min <= max)
}

export function searchProjects(projectsList, keyword) {
  if (!keyword) return projectsList
  const q = keyword.toLowerCase()
  return projectsList.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.category.includes(q)
  )
}
