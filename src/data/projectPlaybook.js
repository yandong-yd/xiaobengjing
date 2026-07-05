/** 从0到盈利 · 完整闭环（进货/设备/车辆/加盟培训/办证/第一周） */
function pb(data) {
  return data
}

const commonChannels = {
  equipment1688: '1688.com 搜关键词 + 看评价和发货地',
  localKitchen: '本地厨具/五金批发市场（可现场试）',
  xianyu: '闲鱼搜「二手+项目名」省30-50%',
  wholesaleMarket: '当地农贸市场/冻品批发区',
  meituan: '美团优选/多多买菜（小量补货）',
}

export const projectPlaybook = {
  1: pb({
    loop_summary: '跟摊学手艺 → 买铁板推车 → 办健康证 → 蹲点3天 → 试出摊7天 → 固定点位盈利',
    profit_loop: {
      upstream: '面粉/鸡蛋/酱料/脆片：农贸市场+1688；煤气：燃气公司',
      sell: '早高峰现做现卖，加蛋加肠提客单',
      retention: '固定点位+认脸+「还是老样子」',
    },
    roadmap: [
      { phase: '调研（3-5天）', budget: '0-50元', tasks: ['蹲3个候选点位数7-9点人流', '问3个煎饼摊主（不要问配方，问办证和摊位）', '试吃5家记价格和口味'] },
      { phase: '学手艺（7-14天）', budget: '0-800元', tasks: ['跟摊学1-2周（帮工换教，或付300-500）', '在家练50张不破皮', '定自己的默认口味（偏甜/偏辣）'] },
      { phase: '采购出摊（3-5天）', budget: '1500-3500元', tasks: ['买铁板+小推车+工具', '办健康证', '首批原料够3天', '试出摊3天'] },
      { phase: '稳定盈利（第3周起）', budget: '流动', tasks: ['固定时段出摊', '记账21天', '老客>50人考虑加豆浆'] },
    ],
    equipment: [
      { item: '燃气/电铁板+刮板+铲子', budget: '600-1500元', channels: ['1688「煎饼机」', commonChannels.localKitchen, commonChannels.xianyu], note: '新手买二手铁板即可，先练手再换' },
      { item: '小推车/摊位架', budget: '300-800元', channels: ['1688「早餐车」', '本地焊车铺定做', commonChannels.xianyu], note: '要能绑煤气罐和挡风雨' },
      { item: '工具包（桶、瓶、挤酱瓶）', budget: '100-200元', channels: [commonChannels.localKitchen, '拼多多'], note: '酱瓶分甜/辣/咸' },
    ],
    ingredients: [
      { item: '面粉、鸡蛋、薄脆/油条', budget: '80-150元/天', channels: [commonChannels.wholesaleMarket, '面铺'], frequency: '每日采或2日一采' },
      { item: '甜面酱/辣椒酱/腐乳', budget: '50-100元首采', channels: ['批发市场', '1688大瓶装'], frequency: '每周补' },
    ],
    vehicle: {
      needed: true,
      types: [
        { name: '简易手推早餐车', budget: '400-900元', buy_at: '1688 / 本地焊车', note: '最常见，灵活' },
        { name: '三轮快餐车', budget: '1500-3500元', buy_at: '闲鱼 / 本地车厂', note: '想长期做再买' },
      ],
      stall: { how: '工业园/学校/社区口跟物业或城管了解；很多点位靠「早去占位+和摊主混熟」', cost: '0-2000元/月', note: '别先签一年，试2周再谈' },
    },
    franchise: {
      exists: true,
      options: [
        { brand: '各类「XX煎饼」加盟', fee: '1-5万+', includes: '品牌+培训+部分设备', verdict: '小白想快上手可考虑，但加盟费吃掉3个月利润' },
        { brand: '纯品牌授权（无强制供货）', fee: '5000-2万', includes: '招牌和配方', verdict: '性价比一般，不如跟摊学' },
      ],
      recommendation: '强烈建议：先跟摊学2周 + 自己起名，零加盟。熟练后再考虑品牌。',
    },
    training: [
      { method: '跟摊当学徒', cost: '0-500元（帮工或红包）', duration: '7-14天', how_to_find: '早市找师傅，诚恳说「帮工学手艺」', verdict: '最推荐' },
      { method: '短视频自学', cost: '0', duration: '3-7天', how_to_find: 'B站/抖音搜「煎饼果子教程」', verdict: '可打底，必须实际上手练' },
      { method: '培训班', cost: '800-3000元', duration: '1-3天', how_to_find: '本地搜「小吃培训」实地考察', verdict: '快但浅，选能「反复练」的班' },
    ],
    licenses: [
      { name: '健康证', where: '当地疾控中心/指定医院', cost: '100-200元', time: '3-7天', order: 1 },
      { name: '食品小餐饮备案/许可', where: '市场监管局', cost: '0-500元', time: '1-2周', order: 2 },
      { name: '营业执照（可选）', where: '政务大厅/网上办', cost: '0', time: '1-3天', order: 3 },
    ],
    week1_plan: [
      { day: 'Day1-2', task: '蹲点+试吃，选定1个主点位' },
      { day: 'Day3-5', task: '跟摊或自学，每天练20张' },
      { day: 'Day6', task: '采购设备，在家试做给家人吃' },
      { day: 'Day7', task: '办健康证（预约）' },
    ],
    daily_flow: {
      prep: ['5:00 起床和面/调酱', '5:30 推车上路占位', '6:00 预热铁板'],
      open: ['6:00-6:30 第一锅可能慢，别慌', '6:30-9:00 高峰快速出餐'],
      peak: ['记住3个老客口味', '酱不够马上补'],
      close: ['9:30 收摊清洁铁板', '10:00 回家算今日份数和流水'],
    },
    opening_checklist: ['健康证带身上', '煤气检漏', '面糊/酱/蛋够今天', '零钱和收款码', '垃圾袋', '雨棚（看天气）'],
  }),

  2: pb({
    loop_summary: '学腌制烤技 → 买烤炉备料 → 谈夜市位 → 周五试摆 → 固定周末+夜宵时段',
    profit_loop: {
      upstream: '肉串/蔬菜：冻品批发市场；炭/气：本地供应商；竹签一次性用品：1688',
      sell: '夜宵社交场景，啤酒搭配，套餐引流',
      retention: '口味稳定+熟客记「微辣中辣」',
    },
    roadmap: [
      { phase: '学烤（2-4周）', budget: '200-500元练手食材', tasks: ['跟烧烤摊学腌制和火候', '在家阳台试烤50串', '定5个招牌SKU'] },
      { phase: '设备采购', budget: '2500-5000元', tasks: ['烤炉（炭/气）+展示柜+保温', '冰柜存串（如需）', '采购首批食材'] },
      { phase: '谈点位试摆', budget: '500-2000元押金', tasks: ['联系夜市管理或社区', '试摆2个周五六', '记录21-24点销量'] },
    ],
    equipment: [
      { item: '烧烤炉（炭/燃气）', budget: '800-2500元', channels: ['1688', commonChannels.localKitchen, commonChannels.xianyu], note: '炭炉烟大，查当地环保规定' },
      { item: '展示柜/保温箱', budget: '500-1200元', channels: [commonChannels.xianyu, '1688'], note: '串要展示才诱人' },
      { item: '冰柜（可选）', budget: '800-1500元', channels: [commonChannels.xianyu], note: '量大再买' },
    ],
    ingredients: [
      { item: '羊肉/牛肉/鸡翅等冻串', budget: '300-600元/天', channels: [commonChannels.wholesaleMarket, '冻品城'], frequency: '每日或隔日补' },
      { item: '炭或液化气', budget: '50-100元/天', channels: ['炭：劳保店/批发', '气：燃气公司'], frequency: '按出摊日' },
    ],
    vehicle: {
      needed: true,
      types: [
        { name: '夜市固定档口+烤炉', budget: '摊位费+设备', buy_at: '夜市管理方', note: '最稳' },
        { name: '移动烧烤车', budget: '3000-8000元', buy_at: '定制车厂/1688', note: '需谈定点' },
      ],
      stall: { how: '找本地夜市招商/城管许可区域/社区外摆', cost: '800-3000元/月', note: '问清油烟和环保要求' },
    },
    franchise: {
      exists: true,
      options: [
        { brand: '连锁烧烤加盟（如部分地域品牌）', fee: '5-20万', includes: '供应链+培训+VI', verdict: '预算5万内不建议' },
        { brand: '半成品串供应商「加盟配送」', fee: '0加盟费，绑进货', includes: '腌制好的串', verdict: '省事但毛利低，适合纯新手过渡' },
      ],
      recommendation: '先跟摊学+冻品市场自己腌，掌握核心后再考虑半成品供应链。',
    },
    training: [
      { method: '烧烤摊帮工', cost: '0-800元', duration: '2-4周', how_to_find: '夜市问师傅', verdict: '必做' },
      { method: '冻品店学腌制', cost: '0', duration: '几天', how_to_find: '批发店师傅常愿教基础', verdict: '补充渠道' },
    ],
    licenses: [
      { name: '健康证', where: '疾控中心', cost: '100-200元', time: '1周', order: 1 },
      { name: '食品经营许可/备案', where: '市场监管局', cost: '视当地', time: '1-2周', order: 2 },
    ],
    week1_plan: [
      { day: 'Day1-3', task: '考察3个夜市，问摊位费和规则' },
      { day: 'Day4-7', task: '跟摊或自学，定5个招牌串' },
    ],
    daily_flow: {
      prep: ['16:00 穿串/解冻', '17:00 生火预热', '18:00 出摊'],
      open: ['20:00-24:00 高峰'],
      peak: ['推套餐：20元体验套'],
      close: ['清理炭火安全熄灭', '串剩多少记录损耗'],
    },
    opening_checklist: ['健康证', '炭/气充足', '冰柜温度正常', '灭火器（部分区域要求）', '收款码'],
  }),

  3: pb({
    loop_summary: '定3款配方 → 买制冰封口机 → 设计招牌 → 选学校/商圈 → 试卖调糖度',
    profit_loop: { upstream: '水果：批发市场/美团优选；茶叶/糖浆：1688', sell: '现打展示+半糖推荐', retention: '招牌款+小红书打卡' },
    roadmap: [
      { phase: '配方（1周）', budget: '200-400元试料', tasks: ['定3款：招牌/便宜引流/季节限定', '找10人试喝调糖'] },
      { phase: '设备（3天）', budget: '1500-3500元', tasks: ['制冰机+封口机+保温箱', '招牌布和杯贴'] },
      { phase: '出摊试卖（1周）', budget: '500元/周原料', tasks: ['选点位试3天', '拍视频发群'] },
    ],
    equipment: [
      { item: '制冰机', budget: '600-1500元', channels: ['1688', commonChannels.xianyu], note: '商用小型即可' },
      { item: '封口机+杯架', budget: '300-800元', channels: ['1688', '拼多多'], note: '' },
    ],
    ingredients: [
      { item: '新鲜柠檬/鸭屎香茶叶', budget: '150-350元/天', channels: [commonChannels.wholesaleMarket, '水果批发'], frequency: '柠檬建议每日' },
    ],
    vehicle: { needed: true, types: [{ name: '冰饮手推车', budget: '500-1500元', buy_at: '1688/定做', note: '要能放制冰机和电源' }], stall: { how: '学校门口需谈保安/物业；商圈跟商场招商', cost: '0-1500元/月', note: '' } },
    franchise: {
      exists: true,
      options: [{ brand: '各类柠檬茶/奶茶加盟', fee: '3-15万', includes: '品牌+设备+原料', verdict: '预算不够别碰；可研究「供货加盟」学配方' }],
      recommendation: '自己创小品牌，3款做精，比加盟灵活。',
    },
    training: [
      { method: '去饮品店打工1周', cost: '0（工资）', duration: '1-2周', how_to_find: '招聘软件', verdict: '学设备和流程' },
      { method: '付费配方课', cost: '300-2000元', duration: '1-3天', how_to_find: '本地培训机构', verdict: '选能带走配方的' },
    ],
    licenses: [{ name: '健康证+食品许可', where: '当地市监', cost: '100-500元', time: '1-2周', order: 1 }],
    week1_plan: [{ day: 'Day1-3', task: '定配方+试喝' }, { day: 'Day4-5', task: '买设备' }, { day: 'Day6-7', task: '试出摊' }],
    daily_flow: { prep: ['洗水果、备冰', '提前泡茶汤'], open: ['现打给路人看'], peak: ['半糖推荐'], close: ['算损耗、洗设备'] },
    opening_checklist: ['制冰机正常', '柠檬新鲜', '杯贴和收款码', '电源延长线安全'],
  }),

  4: pb({
    loop_summary: '练贴膜3天 → 备各型号膜 → 谈商场/街铺位 → 贴坏包换口碑 → 推膜+壳套餐',
    profit_loop: { upstream: '膜/壳/线：1688/alibaba批量', sell: '免费清灰+快速贴膜', retention: '贴坏包换+记机型' },
    equipment: [{ item: '贴膜工具+灯+凳子', budget: '200-600元', channels: ['1688「贴膜工具套装」', '拼多多'], note: '灯很重要' }],
    ingredients: [{ item: '钢化膜、手机壳', budget: '200-800元首批', channels: ['1688按机型批', '深圳华强北线上'], frequency: '随销量补' }],
    vehicle: { needed: false, types: [{ name: '折叠桌+中庭展位', budget: '0-500元', buy_at: '商场谈合作', note: '多数不需车' }], stall: { how: '商场招商部/中庭临时展位/电信柜台旁', cost: '分成或日租200-800', note: '' } },
    franchise: { exists: false, options: [], recommendation: '无必要加盟，纯手艺+进货渠道。' },
    training: [{ method: '手机店打工', cost: '0', duration: '1-4周', how_to_find: '招聘', verdict: '最佳' }, { method: 'B站教程', cost: '0', duration: '3天', how_to_find: '搜无痕贴膜', verdict: '必练' }],
    licenses: [{ name: '部分商场要营业执照', where: '商场要求', cost: '0-500', time: '1周', order: 1 }],
    week1_plan: [{ day: 'Day1-3', task: '练膜50张' }, { day: 'Day4-5', task: '进货+谈点位' }, { day: 'Day6-7', task: '正式出摊' }],
    daily_flow: { prep: ['摆好膜和工具', '擦净桌面'], open: ['主动问「贴膜吗」'], peak: ['推套餐'], close: ['盘点库存'] },
    opening_checklist: ['主流机型膜齐', '工具齐全', '贴坏包换标语'],
  }),

  5: pb({
    loop_summary: '学2-3种造型 → 采购气球玩具 → 周末公园/商场 → 现场做吸引孩子',
    profit_loop: { upstream: '气球/玩具：1688批发', sell: '现场制作展示', retention: '周末固定点+记住孩子喜好' },
    equipment: [{ item: '气球、打气筒、展示架', budget: '300-800元', channels: ['1688', '拼多多'], note: '学造型比设备重要' }],
    ingredients: [{ item: '长条气球、小玩具', budget: '200-500元/周', channels: ['1688'], frequency: '每周补' }],
    vehicle: { needed: false, types: [{ name: '拉杆箱+展示架', budget: '200-400', buy_at: '1688', note: '' }], stall: { how: '公园、商场中庭申请或跟活动走', cost: '0-500/次', note: '' } },
    franchise: { exists: false, options: [], recommendation: '无加盟，B站学 balloon art。' },
    training: [{ method: 'B站/抖音教程', cost: '0-200', duration: '3-7天', how_to_find: '搜造型气球', verdict: '够用' }],
    licenses: [],
    week1_plan: [{ day: 'Day1-4', task: '学3种造型' }, { day: 'Day5-7', task: '周末试摆' }],
    daily_flow: { prep: ['打气预备'], open: ['做给路人看'], peak: ['孩子停下就互动'], close: ['清点存货'] },
    opening_checklist: ['气球足量', '打气筒正常', '垃圾袋'],
  }),

  6: pb({
    loop_summary: '学清洗技术 → 买设备 → 社区定点 → 免费洗一双换宣传 → 推会员次卡',
    profit_loop: { upstream: '清洁剂：1688；设备：闲鱼/1688', sell: '快洗+洗坏包赔', retention: '会员次卡' },
    equipment: [{ item: '洗鞋机/超声波+烘干', budget: '1000-3000元', channels: [commonChannels.xianyu, '1688'], note: '可先人工+简单设备起步' }],
    ingredients: [{ item: '清洗剂、刷子套装', budget: '100-300元/月', channels: ['1688'], frequency: '月补' }],
    vehicle: { needed: false, types: [{ name: '社区小门面或档口', budget: '500-1500元/月', buy_at: '社区底商', note: '' }], stall: { how: '社区出入口租半档', cost: '500-1500/月', note: '' } },
    franchise: { exists: true, options: [{ brand: '部分洗鞋连锁', fee: '3-10万', includes: '设备+培训', verdict: '学技术可以，小本自己干更灵活' }], recommendation: '跟店学1月+自己开店摊。' },
    training: [{ method: '洗鞋店学徒', cost: '0', duration: '2-4周', how_to_find: '招聘/上门问', verdict: '推荐' }],
    licenses: [{ name: '营业执照（门面建议）', where: '政务大厅', cost: '0', time: '3天', order: 1 }],
    week1_plan: [{ day: 'Day1-7', task: '学技术+免费洗10双发朋友圈' }],
    daily_flow: { prep: ['检查设备'], open: ['30分钟承诺'], peak: ['拍照对比'], close: ['整理待取鞋'] },
    opening_checklist: ['设备正常', '清洁剂齐', '价目表'],
  }),

  7: pb({
    loop_summary: '学卤方 → 在家试做 → 办食品证 → 菜市场/社区口 → 控制产量减损耗',
    profit_loop: { upstream: '卤料+原料：批发市场；卤料包：1688/本地调料行', sell: '下班高峰+试吃', retention: '老客记口味' },
    equipment: [{ item: '大锅/卤桶、保温展示柜', budget: '800-2000元', channels: [commonChannels.localKitchen, commonChannels.xianyu], note: '' }],
    ingredients: [{ item: '肉/豆/蛋等', budget: '300-600元/天', channels: [commonChannels.wholesaleMarket], frequency: '每日' }],
    vehicle: { needed: true, types: [{ name: '保温推车', budget: '400-1000', buy_at: '1688', note: '' }], stall: { how: '菜市场租半档最稳', cost: '500-2000/月', note: '' } },
    franchise: { exists: true, options: [{ brand: '绝味/周黑鸭等（门槛高）', fee: '20万+', includes: '全套', verdict: '非小本' }, { brand: '本地卤味「学技术+料包」', fee: '3000-1万', includes: '配方+培训', verdict: '小白可考虑短期学' }], recommendation: '跟师傅学或买料包试，别一上来大加盟。' },
    training: [{ method: '跟卤味师傅学', cost: '2000-8000', duration: '1-4周', how_to_find: '本地培训/师傅带', verdict: '核心' }],
    licenses: [{ name: '健康证+食品许可', where: '市监', cost: '100-500', time: '1-2周', order: 1 }],
    week1_plan: [{ day: 'Day1-7', task: '学卤+试做+试卖' }],
    daily_flow: { prep: ['在家提前卤'], open: ['16:00切配展示'], peak: ['17-20点'], close: ['剩货处理记录'] },
    opening_checklist: ['食品证', '温度计/保温', '一次性手套'],
  }),

  8: pb({
    loop_summary: '买套圈设备+奖品 → 谈夜市 → 控难度 → 节日备货',
    profit_loop: { upstream: '奖品：1688小玩具批发', sell: '10元3次套餐', retention: '换奖品款式' },
    equipment: [{ item: '套圈架、圈、奖品', budget: '800-2000元', channels: ['1688', '义乌小商品线上'], note: '' }],
    ingredients: [{ item: '小玩具、娃娃补货', budget: '200-500/周', channels: ['1688'], frequency: '周补' }],
    vehicle: { needed: true, types: [{ name: '夜市固定摊', budget: '300-1500/月', buy_at: '夜市管理', note: '' }], stall: { how: '夜市招商', cost: '300-1500/月', note: '' } },
    franchise: { exists: false, options: [], recommendation: '无加盟，设备简单。' },
    training: [{ method: '观察其他摊主', cost: '0', duration: '1-2天', how_to_find: '夜市蹲点', verdict: '够用' }],
    licenses: [{ name: '部分城市娱乐摊需备案', where: '城管/市监', cost: '视当地', time: '', order: 1 }],
    week1_plan: [{ day: 'Day1-3', task: '买设备+谈夜市' }, { day: 'Day4-7', task: '试摆调难度' }],
    daily_flow: { prep: ['摆奖品'], open: ['演示吸引'], peak: ['控成本'], close: ['数奖品损耗'] },
    opening_checklist: ['圈够', '大奖展示', '收款码'],
  }),
}

// 9-20 项目闭环（结构完整，可按 id 扩展）
const playbookTemplate = (name, opts) => pb({
  loop_summary: opts.loop || `调研 → 采购 → 办证 → 试出摊 → 固定点位`,
  profit_loop: opts.profit_loop || { upstream: '1688+本地批发市场', sell: '现场售卖', retention: '固定点位+老客' },
  roadmap: opts.roadmap || [
    { phase: '调研3天', budget: '0', tasks: ['蹲点', '问摊主', '试竞品'] },
    { phase: '采购+学习', budget: opts.startBudget || '1000-3000', tasks: ['设备原料', '学基础操作'] },
    { phase: '试出摊7天', budget: '流动', tasks: ['试点位', '记账', '调产品'] },
  ],
  equipment: opts.equipment || [{ item: '核心设备', budget: '视项目', channels: ['1688', '闲鱼', '本地市场'], note: '优先二手' }],
  ingredients: opts.ingredients || [{ item: '主要原料', budget: '日/周采', channels: ['农贸市场', '1688'], frequency: '按销量' }],
  vehicle: opts.vehicle || { needed: true, types: [{ name: '手推车', budget: '300-1000', buy_at: '1688/定做', note: '' }], stall: { how: '夜市/社区/商场招商', cost: '0-2000/月', note: '先试后签' } },
  franchise: opts.franchise || { exists: false, options: [], recommendation: '小本建议自学或跟摊，慎交加盟费。' },
  training: opts.training || [{ method: '跟摊学徒', cost: '0-500', duration: '1-2周', how_to_find: '现场问师傅', verdict: '推荐' }],
  licenses: opts.licenses || [{ name: '健康证（餐饮类）', where: '疾控中心', cost: '100-200', time: '1周', order: 1 }],
  week1_plan: opts.week1 || [{ day: 'Day1-3', task: '调研+学习' }, { day: 'Day4-7', task: '采购试出摊' }],
  daily_flow: opts.daily || { prep: ['备料'], open: ['出摊'], peak: ['主推'], close: ['收摊复盘'] },
  opening_checklist: opts.checklist || ['证照', '原料', '收款码', '清洁用品'],
})

Object.assign(projectPlaybook, {
  9: playbookTemplate('淀粉肠', {
    loop: '买烤肠机 → 1688进纯肉肠 → 调蘸料 → 夜市定点 → 直播/试吃引流',
    startBudget: '800-2000',
    equipment: [{ item: '烤肠机+小推车', budget: '500-1200', channels: ['1688', commonChannels.xianyu], note: '机器别买太大' }],
    ingredients: [{ item: '纯肉肠、蘸料', budget: '150-300/天', channels: ['1688', '冻品批发'], frequency: '2-3日' }],
    franchise: { exists: true, options: [{ brand: '部分品牌淀粉肠供货', fee: '0-1万', includes: '原料+机器', verdict: '绑供货，适合不想找渠道的新手' }], recommendation: '自己1688找纯肉肠+自调酱更灵活。' },
    training: [{ method: '看同行+短视频', cost: '0', duration: '1-2天', how_to_find: '夜市蹲点', verdict: '够用' }],
  }),
  10: playbookTemplate('关东煮', {
    loop: '买关东煮机 → 批发食材 → 秋冬出摊 → 推暖手套餐',
    equipment: [{ item: '关东煮机+汤料', budget: '1000-2500', channels: ['1688', commonChannels.localKitchen], note: '汤料是核心' }],
    ingredients: [{ item: '鱼豆腐/萝卜/福袋等', budget: '200-400/天', channels: [commonChannels.wholesaleMarket, '1688冻品'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '罗森/711同款供应链（非加盟）', fee: '0', includes: '可研究同款货源', verdict: '学陈列和选品' }], recommendation: '季节项目，自己进货即可。' },
    vehicle: { needed: true, types: [{ name: '带电源手推车', budget: '800-2000', buy_at: '1688', note: '冬天必备' }], stall: { how: '公交站/夜市', cost: '500-1500/月', note: '' } },
  }),
  11: playbookTemplate('炒粉', {
    loop: '跟摊学锅气 → 买猛火灶 → 定2-3款粉 → 夜宵点位',
    equipment: [{ item: '猛火灶+锅+推车', budget: '1500-3500', channels: [commonChannels.localKitchen, '1688'], note: '通风和消防注意' }],
    ingredients: [{ item: '粉/面/蔬菜/蛋', budget: '300-500/天', channels: [commonChannels.wholesaleMarket], frequency: '每日' }],
    training: [{ method: '夜宵摊跟学7天', cost: '500-1000', duration: '1-2周', how_to_find: '直接问师傅', verdict: '必做' }],
  }),
  12: playbookTemplate('冰粉', {
    loop: '学搓冰粉/买粉 → 小料区 → 夏季景区/学校 → 9.9引流',
    equipment: [{ item: '保温箱+小料盒+桌', budget: '500-1500', channels: ['1688', '拼多多'], note: '' }],
    ingredients: [{ item: '冰粉、红糖、小料', budget: '150-350/天', channels: ['批发市场', '1688'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '四川冰粉品牌加盟', fee: '1-5万', includes: '品牌+培训', verdict: '非本地特色可考虑' }], recommendation: '自己学做+自创小料更划算。' },
  }),
  13: playbookTemplate('章鱼小丸子', {
    loop: '买章鱼烧机 → 练翻面 → 商场/夜市 → 现做展示',
    equipment: [{ item: '章鱼烧机+酱', budget: '2000-4000', channels: ['1688', commonChannels.xianyu], note: '先二手练手' }],
    ingredients: [{ item: '预拌粉/章鱼/木鱼花', budget: '250-450/天', channels: ['1688', '冻品'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '台湾小吃培训+设备套餐', fee: '5000-2万', includes: '机器+配方', verdict: '想快上手可考虑' }], recommendation: 'B站学+买机器自己试。' },
  }),
  14: playbookTemplate('鸡蛋仔', {
    loop: '买鸡蛋仔机 → 练配方 → 周末商场 → 香味引流',
    equipment: [{ item: '鸡蛋仔机', budget: '1500-3500', channels: ['1688', commonChannels.xianyu], note: '' }],
    franchise: { exists: true, options: [{ brand: '港式鸡蛋仔加盟', fee: '2-8万', includes: '品牌+设备', verdict: '商场档口可考虑' }], recommendation: '周末快闪可先不加盟。' },
  }),
  15: playbookTemplate('果汁', {
    loop: '买榨汁机+冰柜 → 找水果渠道 → 商场/健身房旁 → 损耗控制',
    equipment: [{ item: '榨汁机+冰柜', budget: '2500-5000', channels: ['1688', commonChannels.xianyu], note: '' }],
    ingredients: [{ item: '当季水果', budget: '400-700/天', channels: ['水果批发市场'], frequency: '每日', note: '损耗是生死线' }],
  }),
  16: playbookTemplate('鲜花', {
    loop: '找云南/本地花源 → 预包装 → 节日爆发+平日快闪',
    equipment: [{ item: '展示架+保鲜+包装', budget: '500-1500', channels: ['1688', '本地花市'], note: '' }],
    ingredients: [{ item: '花材', budget: '300-800/次', channels: ['本地花市', '云南直发网批'], frequency: '按订单/节日' }],
    vehicle: { needed: false, types: [{ name: '后备箱+展架', budget: '500', buy_at: '自备车即可', note: '' }], stall: { how: '商场快闪/地铁口/咖啡店门口', cost: '0-800/次', note: '' } },
    franchise: { exists: false, options: [], recommendation: '无加盟，靠货源和审美。' },
  }),
  17: playbookTemplate('宠物零食', {
    loop: '学烘焙/找代工 → 试吃换群 → 公园周六日 → 订阅配送',
    equipment: [{ item: '烤箱+包装机（或家庭厨房起步）', budget: '500-2000', channels: ['1688', '拼多多'], note: '小本厨房先试' }],
    ingredients: [{ item: '鸡肉/鸭肉/燕麦', budget: '400-600/周', channels: ['1688食品级原料'], frequency: '周' }],
    franchise: { exists: true, options: [{ brand: '宠物烘焙培训', fee: '3000-1万', includes: '配方+营销', verdict: '学配方可以' }], recommendation: '先在家做+业主群试卖。' },
  }),
  18: playbookTemplate('美甲', {
    loop: '培训/跟店学 → 买工具 → 谈商场快闪 → 9.9引流+办卡',
    equipment: [{ item: '美甲灯+桌椅+工具', budget: '1000-2500', channels: ['1688', '美甲用品店'], note: '' }],
    ingredients: [{ item: '甲油胶、卸甲', budget: '300-500/周', channels: ['1688'], frequency: '周补' }],
    franchise: { exists: true, options: [{ brand: '美甲连锁加盟', fee: '5-15万', includes: '全套', verdict: '摆摊快闪不需要' }], recommendation: '跟店学1月+自己快闪。' },
    training: [{ method: '美甲店学徒', cost: '0', duration: '1-3月', how_to_find: '招聘', verdict: '最佳' }],
    vehicle: { needed: false, types: [{ name: '折叠桌快闪', budget: '200-500', buy_at: '商场谈', note: '' }], stall: { how: '商场招商快闪', cost: '按天200-600', note: '' } },
  }),
  19: playbookTemplate('手机快修', {
    loop: '维修店学 → 囤主流屏 → 谈商场中庭 → 贴膜+维修组合',
    equipment: [{ item: '维修工具+屏幕库存', budget: '2500-5000', channels: ['1688', '深圳线上配件商'], note: '别囤冷门机' }],
    franchise: { exists: true, options: [{ brand: '快修连锁加盟', fee: '5-20万', includes: '供应链', verdict: '学体系可以，小本自己干' }], recommendation: '跟店学+自己进货。' },
    training: [{ method: '维修店打工', cost: '0', duration: '2-6月', how_to_find: '招聘', verdict: '必做' }],
    vehicle: { needed: false, types: [{ name: '商场中庭档', budget: '分成模式', buy_at: '商场', note: '' }], stall: { how: '商场招商', cost: '流水10-20%分成常见', note: '' } },
  }),
  20: playbookTemplate('塔罗占卜', {
    loop: '学基础牌意 → 买牌+布置 → 夜市/集市 → 15分钟体验价',
    equipment: [{ item: '塔罗牌+桌布+灯', budget: '200-600', channels: ['1688', '拼多多'], note: '氛围>牌价' }],
    franchise: { exists: false, options: [], recommendation: '无加盟，自学+练表达。' },
    training: [{ method: '书籍+线上课', cost: '0-500', duration: '2-4周', how_to_find: 'B站/读书', verdict: '够用' }],
    vehicle: { needed: false, types: [{ name: '折叠桌', budget: '100-300', buy_at: '1688', note: '' }], stall: { how: '夜市/创意集市', cost: '0-500/次', note: '' } },
    licenses: [],
  }),
  37: playbookTemplate('鲜切水果', {
    loop: '学切配+保鲜 → 买展示柜 → 办健康证 → 社区/写字楼试7天',
    equipment: [{ item: '展示柜+刀具+打包', budget: '1000-2500', channels: ['1688', commonChannels.xianyu], note: '损耗是核心 KPI' }],
    ingredients: [{ item: '当季水果', budget: '400-800/天', channels: ['水果批发市场'], frequency: '每日', note: '少SKU' }],
    franchise: { exists: true, options: [{ brand: '百果园/果切品牌加盟', fee: '10万+', includes: '供应链+品牌', verdict: '小摊级别不建议' }], recommendation: '自己切+1688买包装即可。' },
  }),
  38: playbookTemplate('袜子帽饰', {
    loop: '1688进货 → 夜市定点 → 走量套餐 → 记录爆款补货',
    equipment: [{ item: '展示架+射灯', budget: '500-1200', channels: ['1688'], note: '' }],
    ingredients: [{ item: '袜子、帽饰', budget: '500-1500/批', channels: ['1688', '义乌网批'], frequency: '周补' }],
    franchise: { exists: false, options: [], recommendation: '无加盟，纯走量。' },
    licenses: [],
  }),
  39: playbookTemplate('二手数码', {
    loop: '学鉴别 → 闲鱼+线下收机 → 商场/夜市 → 以旧换新引流',
    equipment: [{ item: '检测工具+展示', budget: '1500-3500', channels: ['1688', '深圳配件商'], note: '别压太多资金在库存' }],
    franchise: { exists: false, options: [], recommendation: '跟维修店学鉴别。' },
    training: [{ method: '维修店/闲鱼实战', cost: '0', duration: '1-2月', how_to_find: '跟师傅学', verdict: '必做' }],
    licenses: [],
  }),
  40: playbookTemplate('狼牙土豆', {
    loop: '跟摊学切法 → 买油炸锅 → 调蘸料 → 学校/夜市试3天',
    equipment: [{ item: '油炸小锅/铁板+推车', budget: '400-1000', channels: ['1688', commonChannels.xianyu], note: '' }],
    ingredients: [{ item: '土豆+调料', budget: '80-200/天', channels: ['农贸市场', '1688'], frequency: '每日' }],
    franchise: { exists: false, options: [], recommendation: '跟摊学3天足够，无需加盟。' },
  }),
  41: playbookTemplate('手抓饼', {
    loop: '买电饼铛 → 1688进饼皮 → 练加料速度 → 早餐点位',
    equipment: [{ item: '电饼铛+小桌', budget: '500-1500', channels: ['1688', '拼多多'], note: '先家用练手' }],
    ingredients: [{ item: '冷冻饼皮、蛋、培根', budget: '150-350/天', channels: ['1688冻品', '批发市场'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '台湾手抓饼品牌供货', fee: '0-1万', includes: '饼皮+酱', verdict: '绑供货，可研究货源自己进' }], recommendation: '自己1688找饼皮更灵活。' },
  }),
  42: playbookTemplate('无骨鸡爪', {
    loop: '定配方 → 在家腌制 → 社群预售 → 夜市/市集清货',
    equipment: [{ item: '保鲜盒+秤+展示', budget: '300-800', channels: ['1688'], note: '' }],
    ingredients: [{ item: '鸡爪+调料', budget: '300-600/批', channels: ['冻品批发', '1688'], frequency: '2-3日一批' }],
    franchise: { exists: true, options: [{ brand: '网红鸡爪培训', fee: '3000-1万', includes: '配方', verdict: '学配方可以，别交高额加盟' }], recommendation: 'B站学+自己试味。' },
    vehicle: { needed: false, types: [{ name: '保温箱+折叠桌', budget: '200-500', buy_at: '1688', note: '' }], stall: { how: '市集/夜市', cost: '0-500/次', note: '' } },
  }),
  43: playbookTemplate('糖炒栗子', {
    loop: '买炒栗机 → 找栗子渠道 → 选避风点位 → 只做秋冬4-5月',
    equipment: [{ item: '糖炒栗子机', budget: '1500-4500', channels: ['1688', commonChannels.localKitchen], note: '算全年账' }],
    ingredients: [{ item: '栗子/红薯', budget: '400-800/天', channels: ['批发市场', '产地直发'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '炒栗连锁', fee: '3-10万', includes: '机器+货源', verdict: '季节项目慎加盟' }], recommendation: '自己找栗子渠道。' },
  }),
  44: playbookTemplate('烤冷面', {
    loop: 'B站学流程 → 买铁板 → 调酱 → 夜市展示现做',
    equipment: [{ item: '铁板+小推车', budget: '1000-2500', channels: ['1688', commonChannels.xianyu], note: '' }],
    ingredients: [{ item: '冷面片、酱、蛋、肠', budget: '200-400/天', channels: ['1688', '冻品'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '东北烤冷面培训', fee: '2000-8000', includes: '配方+设备', verdict: '想快上手可考虑' }], recommendation: '跟摊学+自己调酱。' },
  }),
  45: playbookTemplate('铁板豆腐', {
    loop: '买铁板 → 学煎制 → 双酱配方 → 夜市入口位',
    equipment: [{ item: '电扒炉/铁板', budget: '600-1500', channels: ['1688'], note: '' }],
    ingredients: [{ item: '豆腐+酱料', budget: '100-250/天', channels: ['农贸市场'], frequency: '每日' }],
    franchise: { exists: false, options: [], recommendation: '无需加盟。' },
  }),
  46: playbookTemplate('社区应急小百', {
    loop: '谈物业定点 → 1688进应急货 → 建群问需求 → 代存快递增信',
    equipment: [{ item: '折叠桌+展示盒', budget: '300-800', channels: ['1688', '拼多多'], note: '' }],
    ingredients: [{ item: '充电线、雨衣、创可贴等', budget: '500-1200/批', channels: ['1688', '本地批发'], frequency: '周补' }],
    franchise: { exists: false, options: [], recommendation: '无加盟。' },
    licenses: [],
    vehicle: { needed: false, types: [{ name: '固定社区点位', budget: '0', buy_at: '物业沟通', note: '' }], stall: { how: '与物业签简易协议', cost: '0-500/月', note: '' } },
  }),
  47: playbookTemplate('午休按摩', {
    loop: '找持证技师合作 → 买折叠床 → 谈CBD定点 → 12-14点营业',
    equipment: [{ item: '折叠床+帘+消毒', budget: '800-2000', channels: ['1688'], note: '' }],
    franchise: { exists: false, options: [], recommendation: '合作分成，别买按摩加盟。' },
    training: [{ method: '与持证技师合作', cost: '分成', duration: '持续', how_to_find: '按摩店/技校', verdict: '必须' }],
    licenses: [{ name: '技师职业资格证', where: '合作方持有', cost: '-', time: '-', order: 1 }],
  }),
  48: playbookTemplate('校园打印', {
    loop: '买打印机 → 谈高校门口 → 论文季加急 → 加微信复购',
    equipment: [{ item: '打印机+装订机', budget: '1000-3000', channels: ['京东', '1688'], note: '选耗材便宜的型号' }],
    ingredients: [{ item: '纸、墨、装订耗材', budget: '200-500/月', channels: ['1688'], frequency: '月补' }],
    franchise: { exists: false, options: [], recommendation: '无加盟。' },
    licenses: [],
  }),
  49: playbookTemplate('茉莉花花环', {
    loop: '学串法 → 找花源 → 景区/夜市 → 现场制作展示',
    equipment: [{ item: '铁丝、材料、保鲜', budget: '200-600', channels: ['1688', '本地花市'], note: '' }],
    ingredients: [{ item: '新鲜茉莉花', budget: '200-500/天', channels: ['本地花市', '花农直供'], frequency: '当日', note: '当日卖完' }],
    franchise: { exists: false, options: [], recommendation: '网红项目无加盟，自学即可。' },
    licenses: [],
  }),
  50: playbookTemplate('炒酸奶', {
    loop: '买炒酸奶机 → 练小料搭配 → 商场/步行街 → 夏季主力',
    equipment: [{ item: '炒酸奶机+冰柜', budget: '2000-4500', channels: ['1688', commonChannels.xianyu], note: '可先二手' }],
    ingredients: [{ item: '酸奶、水果、小料', budget: '300-600/天', channels: ['批发市场', '1688'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '炒酸奶品牌加盟', fee: '2-8万', includes: '设备+培训', verdict: '商场档可考虑' }], recommendation: '小摊自己买机器学即可。' },
  }),
  51: playbookTemplate('鸡蛋汉堡', {
    loop: '买汉堡机 → 练面糊 → 早餐6:30出摊 → 社区/学校口',
    equipment: [{ item: '鸡蛋汉堡机+推车', budget: '800-2000', channels: ['1688'], note: '' }],
    ingredients: [{ item: '面糊、蛋、肉馅', budget: '150-300/天', channels: ['农贸市场', '1688'], frequency: '每日' }],
    franchise: { exists: false, options: [], recommendation: '跟早餐摊学3天。' },
  }),
  52: playbookTemplate('共享充电宝', {
    loop: '对比平台政策 → 谈点位 → 铺设柜机 → 维护补宝',
    equipment: [{ item: '充电宝柜机或加盟', budget: '3000-8000', channels: ['平台招商', '1688'], note: '点位>设备' }],
    franchise: { exists: true, options: [{ brand: '街电/怪兽/美团等', fee: '押金+分成', includes: '设备+系统', verdict: '有资源可合作' }], recommendation: '谈分成比买机器更重要。' },
    licenses: [],
  }),
  53: playbookTemplate('凉皮', {
    loop: '学调醋和辣油 → 在家预制 → 夏季午餐出摊 → 推加肉加蛋',
    equipment: [{ item: '保温箱+桌+餐具', budget: '500-1200', channels: ['1688'], note: '' }],
    ingredients: [{ item: '面皮、黄瓜、辣椒油', budget: '150-350/天', channels: ['批发市场', '自己预制'], frequency: '每日' }],
    franchise: { exists: true, options: [{ brand: '陕西凉皮培训', fee: '2000-5000', includes: '配方', verdict: '学配方即可' }], recommendation: '跟摊学+自己调油。' },
  }),
  // 21-36 手工类闭环
  ...Object.fromEntries(
    [
      [21, { loop: 'B站/残联培训学钩针 → 1688买线 → 做20件样品 → 创意市集/商场快闪', startBudget: '300-1500', vehicle: { needed: false, types: [{ name: '折叠桌+展示架', budget: '200-500', buy_at: '1688', note: '' }], stall: { how: '创意市集/残联公益展/商场快闪', cost: '0-300/次', note: '残联有时免费' } }, training: [{ method: 'B站免费教程', cost: '0', duration: '1-2周', how_to_find: '搜钩针入门', verdict: '推荐' }, { method: '残联/社区培训', cost: '0-500', duration: '1-4周', how_to_find: '当地残联/妇联', verdict: '残疾人强烈推荐' }], licenses: [] }],
      [22, { loop: '学做皂 → 居家生产 → 市集+社群复购', startBudget: '500-2000' }],
      [23, { loop: '学编绳 → 1688珠料 → 景区/市集', startBudget: '400-1500' }],
      [27, { loop: '学饰品制作 → 商场快闪 → 小红书引流', startBudget: '400-1800' }],
      [29, { loop: '练书法 → 景区/婚庆定制', startBudget: '200-1000', licenses: [] }],
      [32, { loop: '绣成品或接定制 → 残联/社区展卖', startBudget: '300-1200', training: [{ method: '残联刺绣培训', cost: '0', duration: '1-3月', how_to_find: '县/区残联', verdict: '残疾人首选路径之一' }] }],
      [33, { loop: '有缝纫基础 → 社区租半档 → 改衣+定制', startBudget: '500-2000' }],
    ].map(([id, opts]) => [id, playbookTemplate('手工', opts)])
  ),
})

export const defaultPlaybook = {
  loop_summary: '调研3天 → 学基础1-2周 → 采购试出摊 → 固定点位21天评估',
  profit_loop: { upstream: '1688 + 本地批发市场', sell: '现场成交', retention: '固定出摊+老客' },
  roadmap: [
    { phase: '调研', budget: '0-100元', tasks: ['蹲点', '问3个摊主', '算成本'] },
    { phase: '学习+采购', budget: '视项目', tasks: ['跟摊或培训', '买设备', '办证'] },
    { phase: '试营业', budget: '3天原料', tasks: ['试3天', '记账', '调整'] },
  ],
  equipment: [{ item: '核心设备', budget: '1688/闲鱼/本地', channels: ['1688', '闲鱼'], note: '二手优先' }],
  ingredients: [{ item: '原料', budget: '按日', channels: ['农贸市场'], frequency: '每日' }],
  vehicle: { needed: true, types: [{ name: '手推车', budget: '300-1000', buy_at: '1688', note: '' }], stall: { how: '问摊主+物业', cost: '0-2000/月', note: '' } },
  franchise: { exists: false, options: [], recommendation: '先跟摊学，再决定要不要加盟。' },
  training: [{ method: '跟摊学徒', cost: '0-500', duration: '1-2周', how_to_find: '现场问', verdict: '推荐' }],
  licenses: [{ name: '健康证（如涉及食品）', where: '疾控中心', cost: '100-200', time: '1周', order: 1 }],
  week1_plan: [{ day: 'Day1-3', task: '调研' }, { day: 'Day4-7', task: '学习+采购' }],
  daily_flow: { prep: ['备料'], open: ['出摊'], peak: ['主推'], close: ['复盘'] },
  opening_checklist: ['证照', '原料', '收款码'],
}

export function enrichPlaybook(project) {
  const p = projectPlaybook[project.id] || defaultPlaybook
  return { ...project, playbook: p }
}
