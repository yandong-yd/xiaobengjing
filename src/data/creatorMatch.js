/** 创业者画像维度与匹配逻辑 */

import * as projectRequirements from './projectRequirements.js'
import { getProjectRequirements } from './projectRequirements.js'
import { matchStaffingProfile, scoreStaffingProfile } from './projectStaffing.js'

export {
  teamModes,
  genders,
  familyMemberOptions,
  labelTeamMode,
  labelGender,
  labelFamilyMember,
  formatStaffRange,
} from './projectStaffing.js'

export {
  familyBurdens,
  healthStatuses,
  businessLicenseStatus,
  healthCertStatus,
  languageLevels,
  languageCounts,
  labelFamilyBurden,
  labelHealth,
  labelBusinessLicense,
  labelHealthCert,
  labelLanguageLevel,
  labelLanguageCount,
} from './projectRequirements.js'

export const ageGroups = [
  { id: '18-25', label: '18-25岁', desc: '学生/初入职场' },
  { id: '26-35', label: '26-35岁', desc: '青年主力' },
  { id: '36-45', label: '36-45岁', desc: '中年转型' },
  { id: '46-55', label: '46-55岁', desc: '经验丰富' },
  { id: '55+', label: '55岁以上', desc: '退休/准退休' },
]

export const occupations = [
  { id: 'student', label: '在校学生' },
  { id: 'employee', label: '上班族（副业）' },
  { id: 'mom', label: '宝妈/宝爸' },
  { id: 'retired', label: '退休/待退休' },
  { id: 'laidoff', label: '下岗/待业' },
  { id: 'freelance', label: '自由职业' },
  { id: 'disabled', label: '残疾人创业' },
  { id: 'veteran', label: '退伍军人' },
]

export const personalities = [
  { id: 'outgoing', label: '外向爱聊', desc: '适合吆喝、互动型摊位' },
  { id: 'introvert', label: '内向安静', desc: '适合手工、后台型' },
  { id: 'patient', label: '耐心细致', desc: '适合重复操作、服务类' },
  { id: 'creative', label: '创意动手', desc: '适合手工、定制类' },
  { id: 'physical', label: '体力较好', desc: '适合餐饮、搬运类' },
  { id: 'sales', label: '销售型', desc: '适合贴膜、套餐推销' },
]

/** 中国残疾等级：一级最重，四级最轻 */
export const disabilityLevels = [
  { id: 'none', label: '无残疾' },
  { id: '4', label: '四级（轻度）', desc: '部分项目可胜任' },
  { id: '3', label: '三级（中度）', desc: '需选低体力/可坐项目' },
  { id: '2', label: '二级（重度）', desc: '仅部分手工/线上可结合' },
  { id: '1', label: '一级（极重度）', desc: '建议以居家/线上为主，出摊需有人协助' },
]

export const disabilityLevelOrder = { none: 0, '4': 4, '3': 3, '2': 2, '1': 1 }

/**
 * @param {object} fit - project.creator_fit
 * @param {string} userLevel - none | 1 | 2 | 3 | 4
 */
export function isDisabilityCompatible(fit, userLevel) {
  if (!userLevel || userLevel === 'none') return true
  if (!fit?.disability) return false
  if (fit.disability.suitable === false) return false
  const supported = fit.disability.levels || []
  if (supported.includes('all_mild')) return ['4', '3'].includes(userLevel)
  return supported.includes(userLevel)
}

export function matchCreatorProfile(project, filters) {
  const fit = project.creator_fit
  if (!fit) return true

  if (filters.age && fit.age?.length && !fit.age.includes(filters.age)) return false
  if (filters.occupation && fit.occupation?.length && !fit.occupation.includes(filters.occupation)) return false
  if (filters.personality && fit.personality?.length && !fit.personality.includes(filters.personality)) return false
  if (filters.disability && !isDisabilityCompatible(fit, filters.disability)) return false
  if (!projectRequirements.matchExtendedProfile(project, filters)) return false
  if (!matchStaffingProfile(project, filters)) return false

  return true
}

export function scoreProjectForProfile(project, profile) {
  const fit = project.creator_fit
  if (!fit) return 0
  let score = 0
  if (profile.age && fit.age?.includes(profile.age)) score += 2
  if (profile.occupation && fit.occupation?.includes(profile.occupation)) score += 2
  if (profile.personality && fit.personality?.includes(profile.personality)) score += 2
  if (profile.disability && isDisabilityCompatible(fit, profile.disability)) score += 3
  if (fit.disability?.suitable && profile.occupation === 'disabled') score += 1
  score += projectRequirements.scoreExtendedProfile(project, profile)
  score += scoreStaffingProfile(project, profile)
  return score
}

export function getRecommendedProjects(projects, profile, limit = 6) {
  return [...projects]
    .map((p) => ({ project: p, score: scoreProjectForProfile(p, profile) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.project)
}

/** 各项目创业者适配（年龄/职业/性格/残疾等级） */
export const creatorFitByProject = {
  1: {
    age: ['26-35', '36-45', '46-55', '55+'],
    occupation: ['laidoff', 'retired', 'mom', 'veteran', 'employee'],
    personality: ['physical', 'patient', 'outgoing'],
    age_note: '需早起，年轻人能熬，中年人更稳',
    occupation_note: '下岗、退休者常见；宝妈需5点前能起',
    personality_note: '要扛早高峰压力，外向更好，内向也能做熟客生意',
    disability: { suitable: true, levels: ['4'], notes: '四级肢体残疾若可短时站立、手部灵活可尝试；需协助备料', avoid: '一二级、需长时间站立者不建议' },
    physical: { stand: '高（3-4h）', strength: '中', social: '中' },
  },
  2: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['student', 'employee', 'freelance', 'laidoff'],
    personality: ['physical', 'outgoing', 'sales'],
    disability: { suitable: false, levels: [], notes: '油烟、久站、炭火，不适合大多数残疾等级', avoid: '全部残疾等级慎选' },
    physical: { stand: '高（4-6h）', strength: '高', social: '高' },
  },
  3: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'mom', 'freelance'],
    personality: ['outgoing', 'creative', 'sales'],
    disability: { suitable: true, levels: ['4'], notes: '四级可坐着封口、备料，需助手搬冰', avoid: '三四级肢体/视力障碍慎选' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  4: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['student', 'employee', 'disabled', 'freelance'],
    personality: ['patient', 'introvert', 'sales'],
    disability: { suitable: true, levels: ['4', '3'], notes: '可坐着操作，聋哑不影响；三级肢体残疾可胜任', avoid: '手部精细动作障碍者需评估' },
    physical: { stand: '低', strength: '低', social: '中' },
  },
  5: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['mom', 'retired', 'employee', 'laidoff'],
    personality: ['outgoing', 'creative', 'patient'],
    disability: { suitable: true, levels: ['4'], notes: '周末出摊，四级可参与简单造型', avoid: '需一定手部灵活' },
    physical: { stand: '中', strength: '低', social: '高' },
  },
  6: {
    age: ['26-35', '36-45', '46-55', '55+'],
    occupation: ['veteran', 'laidoff', 'retired', 'disabled'],
    personality: ['patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '社区小摊可坐着洗、三级部分可胜任', avoid: '二级需简化流程' },
    physical: { stand: '低', strength: '中', social: '低' },
  },
  7: {
    age: ['36-45', '46-55', '55+'],
    occupation: ['laidoff', 'retired', 'mom', 'veteran'],
    personality: ['patient', 'physical'],
    disability: { suitable: true, levels: ['4'], notes: '在家预制，出摊可短时段', avoid: '一二级' },
    physical: { stand: '中', strength: '中', social: '低' },
  },
  8: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'freelance'],
    personality: ['outgoing', 'sales'],
    disability: { suitable: false, levels: [], notes: '需快速互动、整理奖品', avoid: '多数残疾等级不适合' },
    physical: { stand: '高', strength: '低', social: '高' },
  },
  9: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'freelance'],
    personality: ['outgoing', 'sales'],
    disability: { suitable: true, levels: ['4'], notes: '操作简单，四级可坐着烤', avoid: '需视力正常看火候' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  10: {
    age: ['26-35', '36-45', '46-55', '55+'],
    occupation: ['retired', 'laidoff', 'employee'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: true, levels: ['4'], notes: '可坐着守摊，冬季项目', avoid: '二三级久站' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  11: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['employee', 'laidoff', 'student'],
    personality: ['physical', 'patient'],
    disability: { suitable: false, levels: [], notes: '猛火、油烟、体力', avoid: '残疾等级多不适合' },
    physical: { stand: '高', strength: '高', social: '低' },
  },
  12: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'mom', 'employee'],
    personality: ['creative', 'outgoing'],
    disability: { suitable: true, levels: ['4'], notes: '夏季短时段，四级可备料', avoid: '一二级' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  13: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'freelance'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: true, levels: ['4'], notes: '商场内为主', avoid: '手部障碍慎选' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  14: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['mom', 'employee', 'student'],
    personality: ['patient', 'creative'],
    disability: { suitable: true, levels: ['4', '3'], notes: '商场内，可坐着操作机器', avoid: '一级' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  15: {
    age: ['26-35', '36-45'],
    occupation: ['employee', 'freelance', 'mom'],
    personality: ['sales', 'outgoing'],
    disability: { suitable: true, levels: ['4'], notes: '需搬运水果，四级轻量可', avoid: '二三级别' },
    physical: { stand: '中', strength: '中', social: '中' },
  },
  16: {
    age: ['26-35', '36-45'],
    occupation: ['freelance', 'mom', 'employee'],
    personality: ['creative', 'sales', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着包装、快闪，三级部分可', avoid: '需一定审美与手部灵活' },
    physical: { stand: '低', strength: '低', social: '中' },
  },
  17: {
    age: ['26-35', '36-45'],
    occupation: ['mom', 'freelance', 'disabled'],
    personality: ['patient', 'creative', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '可在家制作+周末出摊，适合居家灵活', avoid: '食品级卫生需达标' },
    physical: { stand: '低', strength: '低', social: '中' },
  },
  18: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['mom', 'freelance', 'employee', 'disabled'],
    personality: ['patient', 'creative', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着操作，聋哑不影响，三级肢体常见', avoid: '一级、手部精细障碍' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  19: {
    age: ['18-25', '26-35'],
    occupation: ['employee', 'freelance', 'disabled'],
    personality: ['patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着维修，技术导向', avoid: '视力障碍需辅助' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  20: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['freelance', 'student', 'employee'],
    personality: ['outgoing', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着服务，聋哑可文字/手语', avoid: '一级需陪同' },
    physical: { stand: '低', strength: '低', social: '高' },
  },
  // 手工类 21+
  21: {
    age: ['18-25', '26-35', '36-45', '46-55', '55+'],
    occupation: ['mom', 'retired', 'disabled', 'freelance', 'laidoff'],
    personality: ['creative', 'patient', 'introvert'],
    age_note: '全年龄段，退休者、宝妈特别多',
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '可全程坐着制作；聋哑不影响；二级部分可（需助手收摊）', avoid: '一级需家人协助出摊' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  22: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['mom', 'freelance', 'disabled', 'retired'],
    personality: ['creative', 'patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '居家制作+集市售卖，低体力', avoid: '化学品过敏者慎选' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  23: {
    age: ['26-35', '36-45', '55+'],
    occupation: ['retired', 'freelance', 'disabled', 'veteran'],
    personality: ['patient', 'introvert', 'creative'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着编绳，眼手协调即可', avoid: '严重震颤不适用' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  24: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['freelance', 'student', 'mom'],
    personality: ['creative', 'patient'],
    disability: { suitable: true, levels: ['4'], notes: '拉坯需体力，可只做上釉/成品卖', avoid: '二三级拉坯困难' },
    physical: { stand: '中', strength: '中', social: '中' },
  },
  25: {
    age: ['26-35', '36-45'],
    occupation: ['freelance', 'employee', 'disabled'],
    personality: ['creative', 'patient'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着缝制小皮件，三级部分可', avoid: '手部障碍需评估' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  26: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['mom', 'retired', 'freelance', 'disabled'],
    personality: ['creative', 'patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '精细手工，可居家+周末市集', avoid: '视力极差需辅助' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  27: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['mom', 'student', 'freelance', 'disabled'],
    personality: ['creative', 'patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着制作，商场/创意市集', avoid: '一级' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  28: {
    age: ['36-45', '46-55', '55+'],
    occupation: ['retired', 'laidoff', 'veteran', 'disabled'],
    personality: ['creative', 'outgoing', 'patient'],
    disability: { suitable: true, levels: ['4', '3'], notes: '传统技艺，可坐着操作；视力要好', avoid: '二级视力和手部' },
    physical: { stand: '低', strength: '低', social: '中' },
  },
  29: {
    age: ['26-35', '36-45', '46-55', '55+'],
    occupation: ['retired', 'freelance', 'disabled', 'mom'],
    personality: ['patient', 'introvert', 'creative'],
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '书法/定制可坐着，聋哑不影响', avoid: '一级需代写' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  30: {
    age: ['18-25', '26-35', '36-45'],
    occupation: ['freelance', 'student', 'laidoff'],
    personality: ['creative', 'sales'],
    disability: { suitable: true, levels: ['4', '3'], notes: '改造+售卖，创意为主', avoid: '需搬运旧物时注意' },
    physical: { stand: '中', strength: '中', social: '中' },
  },
  31: {
    age: ['26-35', '36-45'],
    occupation: ['mom', 'freelance', 'disabled', 'retired'],
    personality: ['creative', 'patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '居家制作，低体力高毛利', avoid: '火源操作注意安全' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  32: {
    age: ['36-45', '46-55', '55+'],
    occupation: ['retired', 'mom', 'disabled', 'laidoff'],
    personality: ['patient', 'introvert', 'creative'],
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '极适合坐着、安静、低社交', avoid: '视力障碍需大格绣布' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  33: {
    age: ['36-45', '46-55', '55+'],
    occupation: ['retired', 'laidoff', 'mom', 'disabled'],
    personality: ['patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着缝纫，社区刚需', avoid: '二级需简化设备' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  34: {
    age: ['46-55', '55+'],
    occupation: ['retired', 'laidoff', 'veteran', 'disabled'],
    personality: ['patient', 'introvert'],
    disability: { suitable: true, levels: ['4', '3'], notes: '老师傅型，坐着磨刀，低频次高信任', avoid: '需一定腕力' },
    physical: { stand: '低', strength: '中', social: '低' },
  },
  35: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'freelance', 'employee'],
    personality: ['creative', 'introvert', 'patient'],
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '画完再出摊，或现场定制；聋哑不影响', avoid: '一级需协助布展' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  36: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['mom', 'retired', 'disabled', 'freelance'],
    personality: ['patient', 'creative', 'introvert'],
    disability: { suitable: true, levels: ['4', '3', '2'], notes: '非遗类手工，坐着制作，适合安静性格', avoid: '色弱不影响，手抖慎选' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  40: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'freelance'],
    personality: ['outgoing', 'physical'],
    disability: { suitable: true, levels: ['4'], notes: '操作简单，四级可评估', avoid: '需视力看油温' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
  46: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['mom', 'employee', 'laidoff', 'retired'],
    personality: ['patient', 'outgoing', 'sales'],
    disability: { suitable: true, levels: ['4', '3'], notes: '可坐着守摊，社区型', avoid: '二级需简化' },
    physical: { stand: '低', strength: '低', social: '中' },
  },
  48: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'freelance'],
    personality: ['introvert', 'patient'],
    disability: { suitable: true, levels: ['4', '3'], notes: '坐着操作打印机', avoid: '一级需协助' },
    physical: { stand: '低', strength: '低', social: '低' },
  },
  88: {
    age: ['26-35', '36-45', '46-55'],
    occupation: ['employee', 'laidoff', 'retired', 'freelance'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: false, levels: [], notes: '需久站与精细手部操作', avoid: '不能久站、视力手部不稳慎选' },
    physical: { stand: '高', strength: '低', social: '中' },
  },
  95: {
    age: ['22-35', '26-35', '36-45'],
    occupation: ['student', 'freelance', 'employee'],
    personality: ['patient', 'introvert', 'outgoing'],
    disability: { suitable: true, levels: ['4', '3'], notes: '可坐着，需情绪稳定', avoid: '需较强共情与边界感' },
    physical: { stand: '低', strength: '低', social: '高' },
  },
  96: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'freelance'],
    personality: ['outgoing', 'creative'],
    disability: { suitable: true, levels: ['4'], notes: '娱乐向咨询，可坐着', avoid: '' },
    physical: { stand: '低', strength: '低', social: '高' },
  },
  103: {
    age: ['26-35', '36-45'],
    occupation: ['employee', 'freelance', 'laidoff'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: false, levels: [], notes: '需驾照+改装车投资', avoid: '不能长期开车者慎选' },
    physical: { stand: '中', strength: '中', social: '中' },
  },
  107: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'freelance', 'employee'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: true, levels: ['4'], notes: '需爱动物、懂基本行为', avoid: '动物过敏者不可' },
    physical: { stand: '低', strength: '低', social: '高' },
  },
  108: {
    age: ['18-25', '26-35'],
    occupation: ['student', 'employee', 'freelance'],
    personality: ['patient', 'outgoing'],
    disability: { suitable: true, levels: ['4', '3'], notes: '上门为主，时间灵活', avoid: '' },
    physical: { stand: '中', strength: '低', social: '中' },
  },
}

export function inferCreatorFit(project) {
  const isFood = project.category === '餐饮'
  const isHandcraft = project.category === '手工'
  const isBeauty = project.category === '美业造型'
  const isEmotional = project.category === '情绪价值'
  const isPet = project.category === '宠物经济'
  const isRemote = project.category === '居家办公'
  const isParttime = project.category === '兼职副业'
  return {
    age: isRemote || isParttime ? ['18-25', '26-35', '36-45'] : isHandcraft || isEmotional ? ['26-35', '36-45', '46-55', '55+'] : isBeauty ? ['18-25', '26-35', '36-45', '46-55'] : isPet ? ['18-25', '26-35', '36-45'] : ['18-25', '26-35', '36-45'],
    occupation: isRemote ? ['student', 'employee', 'freelance', 'mom'] : isParttime ? ['employee', 'student', 'mom', 'freelance'] : isHandcraft || isEmotional ? ['mom', 'retired', 'freelance', 'disabled'] : isBeauty ? ['employee', 'laidoff', 'retired', 'freelance'] : isPet ? ['employee', 'freelance', 'mom', 'student'] : ['employee', 'laidoff'],
    personality: isEmotional ? ['patient', 'outgoing', 'introvert'] : isPet ? ['patient', 'outgoing'] : isBeauty ? ['patient', 'outgoing'] : isHandcraft ? ['creative', 'patient', 'introvert'] : ['outgoing', 'physical'],
    disability: {
      suitable: isHandcraft || project.category === '零售' || isEmotional || isPet,
      levels: isHandcraft || isEmotional || isPet ? ['4', '3'] : ['4'],
      notes: isPet ? '上门喂猫可坐着；洗宠需体力' : isEmotional ? '倾听类需情绪稳定，可坐着服务' : isBeauty ? '美甲可坐着，理发需久站' : '请查看详情页具体说明',
      avoid: isFood ? '餐饮类多数需站立和体力' : isBeauty ? '理发类不能久站者慎选' : '',
    },
    physical: {
      stand: isFood || isBeauty ? '高' : '低',
      strength: isFood || isPet ? '中' : '低',
      social: isEmotional || isPet ? '高' : '中',
    },
  }
}

export function enrichCreatorFit(project) {
  const fit = creatorFitByProject[project.id] || inferCreatorFit(project)
  const requirements = getProjectRequirements(project)
  return { ...project, creator_fit: { ...fit, requirements } }
}

export function labelAge(id) {
  return ageGroups.find((a) => a.id === id)?.label || id
}

export function labelOccupation(id) {
  return occupations.find((o) => o.id === id)?.label || id
}

export function labelPersonality(id) {
  return personalities.find((p) => p.id === id)?.label || id
}

export function labelDisability(id) {
  return disabilityLevels.find((d) => d.id === id)?.label || id
}
