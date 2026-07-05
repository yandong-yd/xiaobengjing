/** 项目硬性/软性要求（健康证、个体户、体力、家庭负担、语言） */

const categoryDefaults = {
  餐饮: {
    health_cert: 'required',
    health_cert_note: '直接接触食品，必须办理健康证；有甲肝、戊肝等传染项可能不通过',
    business_license: 'recommended',
    business_license_note: '正式长期出摊建议办个体户或食品小经营备案',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '餐饮耗时固定（如早餐4h），家庭负担重需有人替班',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_stand_long', 'cannot_heavy', 'recovering'],
    health_note: '需久站、重复体力，慢性病稳定可评估',
    language_min: 'average',
    language_note: '最好能说清「加什么、多少钱」；景区/涉外点位建议会方言+普通话',
    multilingual_bonus: true,
    time_flex: '低',
  },
  零售: {
    health_cert: 'optional',
    health_cert_note: '不接触入口食品一般不需要；若兼卖散装食品则需要',
    business_license: 'optional',
    business_license_note: '商场点位常要求营业执照；街摊可先试再办',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '时段相对灵活，适合需照顾家庭者做周末',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: ['cannot_heavy'],
    health_note: '多数可坐着或短时段',
    language_min: 'average',
    language_note: '销售型需主动开口；内向可选贴膜等低交流项目',
    multilingual_bonus: true,
    time_flex: '中',
  },
  服务: {
    health_cert: 'optional',
    health_cert_note: '非餐饮类服务通常不要健康证；洗鞋等接触人体用品建议咨询当地',
    business_license: 'recommended',
    business_license_note: '租门面或商场档建议办个体户',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '部分可预约制、社区定点，时间较可控',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '视具体项目，维修/塔罗可坐着',
    language_min: 'average',
    language_note: '服务解释需表达清楚；可用手写板辅助',
    multilingual_bonus: false,
    time_flex: '中',
  },
  手工: {
    health_cert: 'not_required',
    health_cert_note: '不接触入口食品，一般不需要健康证',
    business_license: 'optional',
    business_license_note: '市集快闪可先不办；长期门面建议办个体户享受政策',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '可在家制作，出摊仅周末，极适合带娃/照护老人',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long', 'cannot_heavy', 'recovering'],
    health_avoid: [],
    health_note: '坐着制作，体力要求低',
    language_min: 'weak',
    language_note: '作品会说话，弱表达也能做；定制需简单沟通',
    multilingual_bonus: true,
    time_flex: '高',
  },
  数码科技: {
    health_cert: 'not_required',
    health_cert_note: '贴膜、维修、配件销售一般不需要健康证',
    business_license: 'optional',
    business_license_note: '商场点位常要求执照；街摊可先试',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '时段灵活，周末商场人流高峰',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: ['cannot_heavy'],
    health_note: '维修类需久坐精细操作',
    language_min: 'average',
    language_note: '需解释故障和报价',
    multilingual_bonus: false,
    time_flex: '中',
  },
  文创潮玩: {
    health_cert: 'not_required',
    health_cert_note: '不接触入口食品',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '周末市集为主，时间较灵活',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '多数可坐着或短时段',
    language_min: 'weak',
    language_note: '展示+标价即可，定制需简单沟通',
    multilingual_bonus: true,
    time_flex: '高',
  },
  蔬果鲜花: {
    health_cert: 'required',
    health_cert_note: '鲜切水果等接触食品需健康证；纯鲜花零售各地要求不同',
    business_license: 'recommended',
    business_license_note: '生鲜类建议办食品相关许可',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '需每日备货，负担重需家人分担',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_stand_long', 'cannot_heavy'],
    health_note: '需久站、搬运',
    language_min: 'average',
    language_note: '简单叫卖和称重说明',
    multilingual_bonus: false,
    time_flex: '低',
  },
  便民生活: {
    health_cert: 'optional',
    health_cert_note: '洗鞋、改衣、磨刀等一般不要健康证',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '可固定周六或预约制',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '多数坐着操作',
    language_min: 'average',
    language_note: '社区服务需简单沟通',
    multilingual_bonus: false,
    time_flex: '高',
  },
  娱乐体验: {
    health_cert: 'not_required',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '夜市、节假日为主',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_stand_long'],
    health_note: '需一定站力和表达',
    language_min: 'good',
    language_note: '互动、讲解规则需要表达力',
    multilingual_bonus: false,
    time_flex: '中',
  },
  服饰鞋包: {
    health_cert: 'not_required',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '周末夜市适合兼职',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '站着售卖为主',
    language_min: 'average',
    language_note: '尺码、价格需说清楚',
    multilingual_bonus: false,
    time_flex: '中',
  },
  助农特产: {
    health_cert: 'optional',
    business_license: 'recommended',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '农忙季可全家帮忙',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_heavy'],
    health_note: '搬运装箱需一定体力',
    language_min: 'average',
    language_note: '讲产地故事加分',
    multilingual_bonus: false,
    time_flex: '中',
  },
  移动餐车: {
    health_cert: 'required',
    business_license: 'recommended',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '需驾照+出餐，家庭需配合',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_stand_long'],
    health_note: '开车+站立出餐',
    language_min: 'average',
    time_flex: '低',
  },
  派对婚庆: {
    health_cert: 'not_required',
    business_license: 'recommended',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '布场常在周末，需2人以上',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: [],
    health_note: '布场撤场需搬运',
    language_min: 'good',
    language_note: '对接新人需沟通清楚',
    multilingual_bonus: false,
    time_flex: '中',
  },
  教育体验: {
    health_cert: 'optional',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '周末市集为主，可带娃出摊（选手工体验类）',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '需耐心带活动',
    language_min: 'good',
    language_note: '面对家长和儿童需表达清楚',
    multilingual_bonus: true,
    time_flex: '高',
  },
  美业造型: {
    health_cert: 'optional',
    health_cert_note: '理发美甲一般不要食品健康证；需美容美发/美甲相关培训或资质（各地不同）',
    business_license: 'recommended',
    business_license_note: '固定档口建议办个体户；流动摊咨询当地城管与卫生要求',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '需固定时段出摊，下午晚高峰为主',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_stand_long'],
    health_note: '需久站、精细操作，视力与手部稳定',
    language_min: 'average',
    language_note: '需沟通发型需求与价格',
    multilingual_bonus: false,
    time_flex: '中',
  },
  情绪价值: {
    health_cert: 'not_required',
    health_cert_note: '非医疗、非餐饮，一般不需要健康证',
    business_license: 'optional',
    business_license_note: '市集快闪可先不办；长期门面建议个体户',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '时段相对灵活，但需连续专注服务',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '可坐着服务；需情绪稳定、边界清晰',
    language_min: 'good',
    language_note: '倾听、引导、表达是核心能力，内向可做但需练',
    multilingual_bonus: false,
    time_flex: '高',
  },
  宠物经济: {
    health_cert: 'not_required',
    health_cert_note: '非餐饮人类食品，一般不要食品健康证；宠物经营可能需动物防疫/备案（各地不同）',
    business_license: 'recommended',
    business_license_note: '固定点位或门店建议办个体户；流动服务咨询农业/城管部门',
    family_burden_ok: ['light', 'medium'],
    family_burden_note: '上门喂猫可灵活；洗宠车需固定出车时间',
    health_ok: ['good', 'chronic_mild'],
    health_avoid: ['cannot_heavy'],
    health_note: '洗宠、移动车需一定体力；过敏者慎选',
    language_min: 'average',
    language_note: '需与宠物主人沟通护理需求',
    multilingual_bonus: false,
    time_flex: '中',
  },
  兼职副业: {
    health_cert: 'optional',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '专为在职、学生、宝妈设计，时间需与主业协调',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long'],
    health_avoid: [],
    health_note: '视具体项目而定',
    language_min: 'average',
    language_note: '多数需基本沟通',
    multilingual_bonus: false,
    time_flex: '高',
  },
  居家办公: {
    health_cert: 'not_required',
    business_license: 'optional',
    family_burden_ok: ['light', 'medium', 'heavy'],
    family_burden_note: '适合需居家照护家庭者；需自律安排工作时间',
    health_ok: ['good', 'chronic_mild', 'cannot_stand_long', 'cannot_heavy', 'recovering'],
    health_avoid: [],
    health_note: '多数坐着完成，体力要求低',
    language_min: 'average',
    language_note: '线上沟通与交付能力重要',
    multilingual_bonus: true,
    time_flex: '高',
  },
}

const projectOverrides = {
  1: { health_cert: 'required', time_flex: '低', family_burden_note: '每天5点起，家庭需配合' },
  4: { health_cert: 'not_required', language_min: 'average', health_ok: ['good', 'chronic_mild', 'cannot_stand_long'] },
  6: { business_license: 'recommended' },
  16: { multilingual_bonus: true, language_note: '景区/涉外商场，会英语/方言加分' },
  20: { language_min: 'good', language_note: '需要一定表达和倾听能力' },
  28: { language_min: 'average', multilingual_bonus: true },
  29: { language_min: 'weak', health_cert: 'not_required' },
  35: { multilingual_bonus: true, language_note: '景区画肖像，外语可服务外国游客' },
}

export function getProjectRequirements(project) {
  const base = categoryDefaults[project.category] || categoryDefaults['零售']
  const override = projectOverrides[project.id] || {}
  return { ...base, ...override }
}

export const familyBurdens = [
  { id: 'light', label: '负担较轻', desc: '时间相对自由，或有人分担家务' },
  { id: 'medium', label: '负担中等', desc: '需照顾家但可抽固定时段' },
  { id: 'heavy', label: '负担较重', desc: '主要收入人/独自带娃老人，时间碎' },
]

export const healthStatuses = [
  { id: 'good', label: '健康良好' },
  { id: 'chronic_mild', label: '有慢性病但可控', desc: '如高血压、糖尿病稳定' },
  { id: 'cannot_stand_long', label: '不能久站', desc: '超过1-2小时需休息' },
  { id: 'cannot_heavy', label: '不能干重体力', desc: '搬重物、长时间弯腰不行' },
  { id: 'recovering', label: '术后/恢复中', desc: '暂不适合高强度' },
]

export const businessLicenseStatus = [
  { id: 'has', label: '已有个体户/执照' },
  { id: 'can_apply', label: '没有，但愿意办' },
  { id: 'unwilling', label: '不想办，先试试看' },
  { id: 'unknown', label: '不清楚怎么办' },
]

export const healthCertStatus = [
  { id: 'has', label: '已有健康证' },
  { id: 'can_get', label: '没有，但能办下来' },
  { id: 'cannot', label: '办不了/有传染项等', desc: '勿选餐饮等必填项目' },
  { id: 'not_needed', label: '我不做餐饮，应该不需要' },
]

export const languageLevels = [
  { id: 'good', label: '表达流利', desc: '敢主动吆喝、介绍' },
  { id: 'average', label: '一般', desc: '简单买卖沟通没问题' },
  { id: 'weak', label: '较弱/害羞', desc: '不太敢开口，更适合安静项目' },
]

export const languageCounts = [
  { id: '1', label: '主要是普通话/方言' },
  { id: '2', label: '2种（如普通话+方言/英语）' },
  { id: '3+', label: '3种及以上' },
]

export function labelFamilyBurden(id) {
  return familyBurdens.find((f) => f.id === id)?.label || id
}

export function labelHealth(id) {
  return healthStatuses.find((h) => h.id === id)?.label || id
}

export function labelBusinessLicense(id) {
  return businessLicenseStatus.find((b) => b.id === id)?.label || id
}

export function labelHealthCert(id) {
  return healthCertStatus.find((h) => h.id === id)?.label || id
}

export function labelLanguageLevel(id) {
  return languageLevels.find((l) => l.id === id)?.label || id
}

export function labelLanguageCount(id) {
  return languageCounts.find((l) => l.id === id)?.label || id
}

const languageMinRank = { weak: 1, average: 2, good: 3 }
const userLanguageRank = { weak: 1, average: 2, good: 3 }

export function isHealthCertOk(req, userCert) {
  if (!userCert || userCert === 'not_needed') {
    return req.health_cert !== 'required'
  }
  if (userCert === 'cannot') return req.health_cert !== 'required'
  if (userCert === 'has' || userCert === 'can_get') return true
  return req.health_cert !== 'required'
}

export function isHealthBodyOk(req, userHealth) {
  if (!userHealth || userHealth === 'good') return true
  if (req.health_avoid?.includes(userHealth)) return false
  return req.health_ok?.includes(userHealth) ?? true
}

export function isFamilyBurdenOk(req, burden) {
  if (!burden) return true
  return req.family_burden_ok?.includes(burden) ?? true
}

export function isLanguageOk(req, level) {
  if (!level) return true
  const need = languageMinRank[req.language_min] || 1
  const have = userLanguageRank[level] || 2
  return have >= need
}

export function matchExtendedProfile(project, filters) {
  const req = project.creator_fit?.requirements || getProjectRequirements(project)
  if (filters.health && !isHealthBodyOk(req, filters.health)) return false
  if (filters.healthCert && !isHealthCertOk(req, filters.healthCert)) return false
  if (filters.familyBurden && !isFamilyBurdenOk(req, filters.familyBurden)) return false
  if (filters.languageLevel && !isLanguageOk(req, filters.languageLevel)) return false
  return true
}

export function scoreExtendedProfile(project, profile) {
  const req = project.creator_fit?.requirements || getProjectRequirements(project)
  let score = 0
  if (profile.familyBurden && isFamilyBurdenOk(req, profile.familyBurden)) {
    if (req.time_flex === '高' && profile.familyBurden === 'heavy') score += 3
    else score += 1
  }
  if (profile.health && isHealthBodyOk(req, profile.health)) score += 2
  if (profile.healthCert && isHealthCertOk(req, profile.healthCert)) score += 2
  if (profile.languageLevel && isLanguageOk(req, profile.languageLevel)) score += 1
  if (profile.languageCount && ['2', '3+'].includes(profile.languageCount) && req.multilingual_bonus) score += 2
  if (profile.businessLicense === 'has' && req.business_license === 'recommended') score += 1
  return score
}
