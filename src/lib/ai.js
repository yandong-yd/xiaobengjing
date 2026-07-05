import { projects } from '../data/mock.js'
import { chatCompletion, isOpenAiConfigured } from './openai.js'
import {
  getRecommendedProjects,
  matchCreatorProfile,
  labelAge,
  labelOccupation,
  labelPersonality,
  labelDisability,
} from '../data/creatorMatch.js'
import {
  labelFamilyBurden,
  labelHealth,
  labelBusinessLicense,
  labelHealthCert,
  labelLanguageLevel,
  labelLanguageCount,
} from '../data/projectRequirements.js'
import { labelGender, labelTeamMode, labelFamilyMember } from '../data/projectStaffing.js'
import {
  labelById,
  labelsByIds,
  motivations,
  formerJobs,
  incomeGoals,
  availableTimes,
  hobbyOptions,
  skillOptions,
  dislikeOptions,
} from '../data/userProfile.js'

function formatExtendedProfile(params) {
  const lines = [
    params.motivation ? `- 创业动机：${labelById(motivations, params.motivation)}` : '',
    params.formerJob ? `- 前职业：${labelById(formerJobs, params.formerJob)}` : '',
    params.incomeGoal ? `- 月收入目标：${labelById(incomeGoals, params.incomeGoal)}` : '',
    params.availableTime ? `- 可用时间：${labelById(availableTimes, params.availableTime)}` : '',
    params.hobbies?.length ? `- 爱好：${labelsByIds(hobbyOptions, params.hobbies).join('、')}` : '',
    params.skillsKnown?.length ? `- 会什么：${labelsByIds(skillOptions, params.skillsKnown).join('、')}` : '',
    params.dislikes?.length ? `- 讨厌/不接受：${labelsByIds(dislikeOptions, params.dislikes).join('、')}` : '',
    params.freeText ? `- 补充：${params.freeText}` : '',
  ].filter(Boolean)
  return lines.join('\n')
}

export function buildStartupPrompt(params) {
  const {
    budget, city, fullTime, skills, age, occupation, personality, disability,
    familyBurden, health, businessLicense, healthCert, languageLevel, languageCount,
    gender, teamMode, familyMember,
  } = params

  const profileLines = [
    gender ? `- 性别：${labelGender(gender)}` : '',
    teamMode ? `- 出摊模式：${labelTeamMode(teamMode)}` : '',
    familyMember ? `- 家庭成员参与：${labelFamilyMember(familyMember)}` : '',
    age ? `- 年龄：${labelAge(age)}` : '',
    occupation ? `- 职业/身份：${labelOccupation(occupation)}` : '',
    personality ? `- 性格：${labelPersonality(personality)}` : '',
    disability && disability !== 'none' ? `- 残疾等级：${labelDisability(disability)}` : '',
    familyBurden ? `- 家庭负担：${labelFamilyBurden(familyBurden)}` : '',
    health ? `- 身体状况：${labelHealth(health)}` : '',
    businessLicense ? `- 个体户/执照：${labelBusinessLicense(businessLicense)}` : '',
    healthCert ? `- 健康证：${labelHealthCert(healthCert)}` : '',
    languageLevel ? `- 语言表达：${labelLanguageLevel(languageLevel)}` : '',
    languageCount ? `- 会几种语言：${labelLanguageCount(languageCount)}` : '',
  ].filter(Boolean).join('\n')

  const extended = formatExtendedProfile(params)
  const extendedBlock = extended ? `\n【个人创业画像 · 扩展】\n${extended}` : ''

  const extraRules = [
    params.dislikes?.includes('stand_long') || params.dislikes?.includes('heavy') ? '用户讨厌久站/重体力：禁止推荐需长时间站立搬运的项目' : '',
    params.dislikes?.includes('talk_strangers') ? '用户不爱社交：优先手工、线上、接单类' : '',
    params.dislikes?.includes('smell_oil') ? '用户受不了油烟：禁止餐饮油炸类' : '',
    params.availableTime === 'weekend' ? '用户只有周末：必须推荐周末有效或居家项目' : '',
    params.availableTime === 'evening' ? '用户只有晚上：推荐晚间兼职或居家' : '',
    params.formerJob === 'factory' ? '工厂背景：可推荐手艺+社区服务，写清转型路径' : '',
    params.formerJob === 'office' ? '文职背景：可推荐线上、手工、代运营' : '',
    healthCert === 'cannot' ? '用户办不了健康证：禁止推荐餐饮等必须健康证项目' : '若做餐饮须说明健康证办理',
    health === 'cannot_stand_long' || health === 'cannot_heavy' ? '用户体力有限：优先推荐可坐着、短时段、手工类' : '根据身体状况匹配体力要求',
    familyBurden === 'heavy' ? '家庭负担重：优先时间灵活、可居家预制、周末出摊的项目' : '说明出摊时间是否影响家庭',
    teamMode === 'solo' ? '用户一个人做：禁止推荐必须2人以上的项目' : teamMode === 'couple' ? '用户夫妻店：写清分工' : '',
    familyMember === 'child' ? '用户需带娃：优先短时、可坐着项目' : familyMember === 'none' ? '无家人帮忙：勿推必须2人的项目' : '',
    languageLevel === 'weak' ? '表达较弱：推荐少吆喝项目，教3句必备口语' : '给出2-3句现场话术',
    businessLicense === 'unwilling' ? '用户暂不想办执照：优先快闪/市集/不需门面' : '说明是否需要个体户',
  ].filter(Boolean)

  return `你是一个「在一线摆过摊、也做过居家副业」的低成本创业顾问，服务对象是**不想进厂、不想坐班**的普通人。「摆摊」= 个人创业代名词，含出摊、兼职、居家接单。

说话要像老手带徒弟，不要鸡汤，不要夸大收入。

用户信息：
- 预算：${budget}元
- 城市：${city}
- 是否全职：${fullTime}
- 技能（自述）：${skills || '未填'}
${profileLines}${extendedBlock}

请输出3个适合的低成本创业方案（可出摊、可兼职、可居家）。必须综合考虑用户画像。

硬性要求：
1. 必须现实可执行，写清楚新手前2周可能只有理想收入的几成
2. 必须低成本，预算不够的项目不要推
${extraRules.map((r, i) => `${i + 3}. ${r}`).join('\n')}
${extraRules.length ? '' : ''}
- 每个方案必须写：为什么适合 THIS 用户
- 必须写天气影响（如适用）、生意差怎么办
- 禁止夸大收入

输出结构：

方案1：
- 项目名称：
- 为什么适合您：
- 启动成本：
- 日收入范围（新手期 / 稳定期）：
- 主打群体：
- 现场话术示例：
- 进货/学手艺从哪开始：
- 天气影响：
- 生意差怎么办：
- 风险：

方案2：
...

方案3：
...

【首推】最推荐方案

【拆解】详细拆解（最推荐方案）：
- 从0到出摊全链路（含进货渠道、要不要加盟/培训）
- 设备清单
- 选址建议

【注意】风险提示

【建议】务实建议`
}

export function buildProjectGuidePrompt(name, project) {
  const ctx = project
    ? `\n已有信息：主打群体=${project.target_audience}；天气=${project.weather?.level}；真实预期=${project.realistic_note}${project.playbook ? `；闭环=${project.playbook.loop_summary}` : ''}`
    : ''
  return `请帮我生成【摆摊项目 · 从0到盈利完整指南】，读者是完全没摆过摊的小白。

项目：${name}${ctx}

必须包含以下章节（缺一不可）：
1. 全链路概览（从决定做到稳定盈利要几步）
2. 上游进货：设备去哪买、原料去哪买、大概多少钱（1688/批发市场/闲鱼等具体渠道）
3. 车子/摊位：要不要推车、去哪买、摊位怎么谈
4. 加盟与培训：有没有成熟加盟、是否建议加盟、跟摊学/培训班怎么选
5. 办证顺序（按步骤列）
6. 第一周每天干什么
7. 出摊一天的时间线（备料-出摊-高峰-收摊）
8. 出摊前检查清单
9. 成本拆解 + 新手期/稳定期收入（诚实数字）
10. 主打人群 + 现场话术4句
11. 天气影响 + 生意差怎么办
12. 盈利闭环：怎么进货、怎么卖、怎么留客

风格：像老师傅带徒弟，逐步可执行。禁止空话。`
}

export function isAiDemoMode() {
  return !isOpenAiConfigured()
}

export function generateMockProjectTailoredResponse(params, project) {
  if (!project) return generateMockAiResponse(params)

  const {
    budget, city, fullTime, skills, age, occupation, personality, disability,
    familyBurden, health, businessLicense, healthCert, languageLevel,
  } = params
  const profile = {
    age, occupation, personality, disability: disability || 'none',
    familyBurden, health, businessLicense, healthCert, languageLevel,
  }
  const fits = matchCreatorProfile(project, profile)
  const req = project.creator_fit?.requirements || {}
  const pb = project.playbook || {}

  const profileLabel = [
    age && labelAge(age),
    occupation && labelOccupation(occupation),
    personality && labelPersonality(personality),
  ].filter(Boolean).join(' · ') || '未填写画像'

  const warnLines = []
  if (!fits) warnLines.push('【注意】按您当前条件，此项目可能有硬性门槛（健康证/体力/证照等），请先看详情页「适合谁」再决定。')
  if (healthCert === 'cannot' && req.health_cert === 'required') warnLines.push('【注意】您办不了健康证，此餐饮类项目不建议做。')
  if (health === 'cannot_stand_long' && (req.health_ok || []).length && !(req.health_ok || []).includes('cannot_stand_long')) {
    warnLines.push('【注意】体力有限，此项目可能需久站，建议选手工/可坐着类。')
  }

  const phrases = (project.talk_phrases || []).slice(0, 3).map((t) => `  · ${t.when}：「${t.say}」`).join('\n')
  const slowDay = (project.slow_day_playbook || []).slice(0, 3).map((t, i) => `${i + 1}. ${t}`).join('\n')
  const week1 = (pb.week1_plan || []).slice(0, 5).map((d) => `${d.day}：${d.task}`).join('\n')

  return `【方案】为【${project.name}】定制的创业方案

【画像】您的画像：${profileLabel}
【地区】城市：${city || '未填'} · 预算：${budget || project.cost_min}元 · ${fullTime === '是' ? '全职' : '兼职/副业'}
${skills ? `【技能】技能：${skills}` : ''}

${warnLines.length ? warnLines.join('\n') + '\n\n' : ''}${fits ? '【匹配】项目库匹配：符合您当前筛选条件\n\n' : ''}【概况】项目概况
- 类型：${project.category} · 难度：${project.difficulty}
- 启动成本：${project.cost_min}-${project.cost_max}元
- 日收入（库内区间）：${project.income_min}-${project.income_max}元/天
- 真实预期：${project.realistic_note || '新手期取下限，别按峰值规划生活费'}

【客群】主打群体
${project.target_audience || '见详情页'}

【话术】现场话术（可直接练）
${phrases || '  · 见项目详情页'}

【天气】天气影响：${project.weather?.level || '中'} — ${project.weather?.detail || ''}

【淡季】生意差怎么办
${slowDay || '换时段、换位置、减备货'}

【首周】从0到出摊（第一周）
${week1 || pb.loop_summary || '调研 → 学习 → 采购 → 试出摊7天'}

【进货】进货/学手艺
${pb.profit_loop?.upstream || '1688、本地批发市场、跟摊学'}
${pb.franchise?.recommendation ? `\n加盟建议：${pb.franchise.recommendation}` : ''}

【证照】证照提示
${req.health_cert === 'required' ? '需健康证（餐饮/食品类）' : '一般不需要健康证'}
${req.business_license === 'recommended' ? ' · 长期固定点位建议办个体户' : ''}

【注意】主要风险
${(project.risks || []).map((r) => `· ${r}`).join('\n')}

【建议】务实建议（针对${city || '本地'}）
- 先蹲点3天再租摊位，别第一天就长租
- 按「新手日收入 ${Math.round(project.income_min * 0.6)}-${Math.round(project.income_min * 0.9)} 元」规划前1个月
- 详情页有完整闭环（设备清单、办证顺序、出摊检查清单）

→ 本方案由项目库数据 + 您的画像智能匹配生成`
}

export function generateMockAiResponse(params, project = null) {
  if (project) return generateMockProjectTailoredResponse(params, project)

  const {
    budget, city, fullTime, skills, age, occupation, personality, disability,
    familyBurden, health, businessLicense, healthCert, languageLevel, languageCount,
  } = params
  const b = Number(budget) || 3000

  const profile = {
    age, occupation, personality, disability: disability || 'none',
    familyBurden, health, businessLicense, healthCert, languageLevel, languageCount,
  }

  let pool = projects.filter((p) => p.cost_min <= b && matchCreatorProfile(p, profile))

  let librarySection = ''
  const matched = getRecommendedProjects(pool.length ? pool : projects.filter((p) => p.cost_min <= b), profile, 3)
  if (matched.length) {
    const profileLabel = [
      age && labelAge(age),
      familyBurden && labelFamilyBurden(familyBurden),
      health && labelHealth(health),
      healthCert && labelHealthCert(healthCert),
      languageLevel && labelLanguageLevel(languageLevel),
    ].filter(Boolean).join(' · ')
    librarySection = `\n【项目库】项目库匹配${profileLabel ? `（${profileLabel}）` : ''}：\n${matched.map((p, i) => {
      const req = p.creator_fit?.requirements
      const cert = req?.health_cert === 'required' ? '需健康证' : '无需健康证'
      return `${i + 1}. ${p.name}（${p.cost_min}-${p.cost_max}元）${cert}`
    }).join('\n')}\n→ 详情页含：进货渠道、证照、第一周计划\n`
  }

  const skipFood = healthCert === 'cannot' || health === 'cannot_stand_long' || health === 'cannot_heavy'

  const plans = []

  if (personality === 'creative' || personality === 'introvert' || occupation === 'disabled' || (disability && disability !== 'none') || familyBurden === 'heavy' || languageLevel === 'weak' || skipFood) {
    plans.unshift({
      name: matched[0]?.name || '钩针/手工小物摊',
      cost: Math.min(b, 1500),
      incomeNew: '80-180元/天',
      incomeStable: '150-450元/天（周末市集）',
      audience: '喜欢独特小物的人、送礼需求',
      phrases: ['「都是手工做的，可以定制。」', '「这个做一个要两小时。」'],
      weather: '低依赖，优先室内市集',
      slowDay: '转线上定制；别贱卖工时',
      reason: `适合${personality === 'introvert' ? '内向' : '动手型'}、${disability && disability !== 'none' ? `${labelDisability(disability)}可坐着制作` : '想低社交创业'}的您`,
      steps: ['B站/残联学基础', '做20件样品', '1688采购', '创意市集试卖', '加微信接定制'],
      risk: '定价过低、销量不稳定',
    })
  }

  if (b >= 500) {
    plans.push({
      name: '手机贴膜摊',
      cost: Math.min(b, 2000),
      incomeNew: '80-200元/天',
      incomeStable: '200-450元/天',
      audience: '换机党、家长、怕贴坏的中老年',
      phrases: ['「贴膜吗？免费清灰，两分钟。」', '「贴坏包换，您看着贴。」'],
      weather: '低依赖，商场室内为主',
      slowDay: '换楼层/换周末；主动帮人清灰；新机型上市前备货',
      reason: `${city}商场或街铺，${fullTime === '是' ? '可拉长营业时间' : '适合兼职时段'}，但前半月可能几小时不开张`,
      steps: ['练到无气泡3天', '备主流机型膜', '谈点位别选死角', '膜+壳组合', '贴坏包换口碑'],
      risk: '线上低价膜、点位差、技术翻车',
    })
  }
  if (b >= 1500 && !skipFood) {
    plans.push({
      name: '手打柠檬茶',
      cost: Math.min(b, 4000),
      incomeNew: '100-220元/天',
      incomeStable: '250-500元/天（夏季）',
      audience: '15-30岁学生、逛街女生',
      phrases: ['「现打的，真柠檬，半糖少冰第一次？」', '「前面还有2杯，您扫码先付。」'],
      weather: '高依赖，秋冬要转热饮或休摊',
      slowDay: '推9.9小杯；挪到放学口；别在下午空场硬熬',
      reason: `适合${city}年轻人，${skills ? `可结合${skills}` : '上手快'}，但冬天收入可能腰斩`,
      steps: ['定3款招牌', '买制冰机', '选学校/商圈', '拍制作过程发群', '控水果损耗'],
      risk: '季节性强、同质化、损耗吃利润',
    })
  }
  if (b >= 2000 && !skipFood) {
    plans.push({
      name: '卤味熟食摊',
      cost: Math.min(b, 5000),
      incomeNew: '150-280元/天',
      incomeStable: '350-550元/天',
      audience: '下班顺路族、老邻居、爱喝两口男性',
      phrases: ['「刚出锅的，先尝再称。」', '「凑整20？再加个蛋。」'],
      weather: '中等，暴雨少人；夏天注意保鲜',
      slowDay: '收摊前半价清库存；开社群接单；别盲目加品种',
      reason: `${city}社区晚餐刚需，${fullTime === '是' ? '全职傍晚出摊' : '适合17-20点兼职'}`,
      steps: ['学卤方', '办证', '选社区口', '推下班套餐', '控产量'],
      risk: '食品安全、剩货损耗、口味不稳定',
    })
  }

  const recommended = plans[1] || plans[0]

  const fmt = (p, i) => `方案${i + 1}：${p.name}
- 启动成本：${p.cost}元
- 日收入：新手 ${p.incomeNew}｜稳定 ${p.incomeStable}
- 主打群体：${p.audience}
- 现场话术：${p.phrases.join(' / ')}
- 天气影响：${p.weather}
- 生意差怎么办：${p.slowDay}
- 适合原因：${p.reason}
- 操作步骤：${p.steps.join(' → ')}
- 风险：${p.risk}`

  const condNote = [
    healthCert === 'cannot' ? '【注意】您办不了健康证，已排除餐饮类' : '',
    familyBurden === 'heavy' ? '【建议】家庭负担重，优先选手工/周末/可居家项目' : '',
    languageLevel === 'weak' ? '【建议】表达弱可选手工，必备口语见各方案' : '',
    businessLicense === 'unwilling' ? '【建议】暂不办照可选市集快闪' : '',
  ].filter(Boolean).join('\n')

  return `${librarySection}${condNote ? condNote + '\n\n' : ''}【方案】推荐创业方案（${budget}元 · ${city} · 务实版）

${plans.map((p, i) => fmt(p, i)).join('\n\n')}

【首推】最推荐：${recommended.name}
${city}${fullTime === '是' ? '全职' : '兼职'}可执行，但请按「新手收入」做前1个月预算，别按稳定期规划生活费。

【拆解】详细拆解（${recommended.name}）：
- 启动流程：谈点位 → 小批量试卖3天 → 再补货和设备
- 设备清单：核心设备约 ${Math.round(recommended.cost * 0.55)} 元，留 ${Math.round(recommended.cost * 0.25)} 元流动资金
- 选址：先蹲点3天数人流，别第一天就长租摊位

【注意】最可能亏钱的3种情况：
- 按抖音峰值收入租太贵的点位
- 第一天进太多货/备太多货
- 连续差还不换时段和位置，硬扛

【建议】务实建议：
- 提高利润：套餐、会员、社群复购，别只会降价
- 降低成本：二手设备、错峰进货、少品类做精
- 止损线：连续7天连摊位费都赚不回来，换点位或换项目`
}

export async function generateStartupPlan(params, project = null) {
  if (isAiDemoMode()) {
    await new Promise((r) => setTimeout(r, 1500))
    return { content: generateMockAiResponse(params, project), mock: true }
  }

  const prompt = project
    ? `${buildStartupPrompt(params)}\n\n请重点围绕项目「${project.name}」定制，结合该项目特点给出可执行建议。`
    : buildStartupPrompt(params)

  const content = await chatCompletion([{ role: 'user', content: prompt }], { temperature: 0.7 })
  return { content, mock: false }
}

export function generateMockProjectGuide(name, project) {
  const p = project || {}
  const pb = p.playbook || {}
  const phrases = (p.talk_phrases || []).map((t) => `  · ${t.when}：「${t.say}」`).join('\n')
  const equip = (pb.equipment || []).map((e) => `  · ${e.item}（${e.budget}）→ ${(e.channels || []).slice(0, 2).join('、')}`).join('\n')
  const train = (pb.training || []).map((t) => `  · ${t.method}：${t.cost}，${t.verdict}`).join('\n')

  return `【${name} · 从0到盈利 · 小白版】

【全链路】全链路
${pb.loop_summary || '调研 → 学习 → 采购 → 试出摊 → 固定点位'}

【进货】上游进货
${pb.profit_loop?.upstream || '1688 + 本地批发市场'}
设备：
${equip || '  · 1688/闲鱼/本地厨具城'}

【摊位】车子/摊位
${pb.vehicle?.needed ? '需要' : '视点位'} — ${pb.vehicle?.stall?.how || '问摊主和物业'}
费用：${pb.vehicle?.stall?.cost || '0-2000元/月'}

【培训】加盟与培训
${pb.franchise?.recommendation || '建议先跟摊学'}
${train}

【证照】办证（按顺序）
${(pb.licenses || []).map((l) => `${l.order}. ${l.name}（${l.where}，${l.time}）`).join('\n') || '健康证等咨询本地市监'}

【第一周】第一周
${(pb.week1_plan || []).map((d) => `${d.day}：${d.task}`).join('\n')}

【匹配】出摊前清单
${(pb.opening_checklist || []).join(' · ')}

【概况】真实预期
${p.realistic_note || '新手期取下限'}

【客群】主打群体
${p.target_audience || ''}

【话术】现场话术
${phrases}

【天气】天气：${p.weather?.level} — ${p.weather?.detail}

【淡季】生意差怎么办
${(p.slow_day_playbook || []).slice(0, 3).map((t, i) => `${i + 1}. ${t}`).join('\n')}`
}

export async function generateProjectGuide(name, project) {
  if (isAiDemoMode()) {
    await new Promise((r) => setTimeout(r, 1200))
    return { content: generateMockProjectGuide(name, project), mock: true }
  }

  const prompt = buildProjectGuidePrompt(name, project)
  const content = await chatCompletion([{ role: 'user', content: prompt }], { temperature: 0.7 })
  return { content, mock: false }
}

export const aiPresets = [
  { label: '夫妻店·餐饮', budget: 5000, city: '洛阳', fullTime: '是', skills: '烹饪', age: '36-45', occupation: 'laidoff', personality: 'physical', disability: 'none', gender: 'male', teamMode: 'couple', familyMember: 'spouse', familyBurden: 'medium', health: 'good', businessLicense: 'can_apply', healthCert: 'can_get', languageLevel: 'average', languageCount: '1' },
  { label: '宝妈·负担重·手工', budget: 2000, city: '杭州', fullTime: '否', skills: '手工', age: '26-35', occupation: 'mom', personality: 'introvert', disability: 'none', gender: 'female', teamMode: 'solo', familyMember: 'child', familyBurden: 'heavy', health: 'good', businessLicense: 'unwilling', healthCert: 'not_needed', languageLevel: 'average', languageCount: '1' },
  { label: '一个人做·无帮手', budget: 2000, city: '武汉', fullTime: '否', skills: '', age: '26-35', occupation: 'employee', personality: 'introvert', disability: 'none', gender: 'female', teamMode: 'solo', familyMember: 'none', familyBurden: 'medium', health: 'good', businessLicense: 'unwilling', healthCert: 'not_needed', languageLevel: 'weak', languageCount: '1' },
  { label: '办不了健康证', budget: 3000, city: '武汉', fullTime: '否', skills: '', age: '36-45', occupation: 'laidoff', personality: 'patient', disability: 'none', familyBurden: 'medium', health: 'good', businessLicense: 'can_apply', healthCert: 'cannot', languageLevel: 'average', languageCount: '1' },
  { label: '不能久站·四级残疾', budget: 1500, city: '郑州', fullTime: '否', skills: '', age: '36-45', occupation: 'disabled', personality: 'introvert', disability: '4', familyBurden: 'heavy', health: 'cannot_stand_long', businessLicense: 'unknown', healthCert: 'not_needed', languageLevel: 'weak', languageCount: '1' },
  { label: '退休·已有执照', budget: 3000, city: '洛阳', fullTime: '是', skills: '', age: '55+', occupation: 'retired', personality: 'patient', disability: 'none', gender: 'male', teamMode: 'couple', familyMember: 'spouse_part', familyBurden: 'light', health: 'chronic_mild', businessLicense: 'has', healthCert: 'has', languageLevel: 'average', languageCount: '2' },
  { label: '不想进厂·兼职', budget: 3000, city: '东莞', fullTime: '否', skills: '', age: '26-35', occupation: 'employee', personality: 'patient', disability: 'none', motivation: 'leave_factory', formerJob: 'factory', incomeGoal: 'replace_part', availableTime: 'weekend', hobbies: ['craft'], skillsKnown: [], dislikes: ['stand_long', 'smell_oil'], gender: 'male', teamMode: 'solo', familyMember: 'spouse_part', familyBurden: 'medium', health: 'good', businessLicense: 'unwilling', healthCert: 'not_needed', languageLevel: 'average', languageCount: '1' },
  { label: '文职转居家', budget: 2000, city: '上海', fullTime: '否', skills: '写作', age: '26-35', occupation: 'employee', personality: 'introvert', disability: 'none', motivation: 'leave_office', formerJob: 'office', incomeGoal: 'pocket', availableTime: 'evening', hobbies: ['write', 'video'], skillsKnown: ['writing'], dislikes: ['talk_strangers'], gender: 'female', teamMode: 'solo', familyMember: 'none', familyBurden: 'light', health: 'good', businessLicense: 'unwilling', healthCert: 'not_needed', languageLevel: 'good', languageCount: '1' },
]
