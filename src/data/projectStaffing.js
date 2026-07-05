/** 出摊人数、夫妻店/家庭店适配 */

export const teamModes = [
  { id: 'solo', label: '一个人做', desc: '全程自己出摊，无固定帮手' },
  { id: 'couple', label: '夫妻/情侣店', desc: '和配偶或伴侣一起出摊' },
  { id: 'family', label: '家庭店', desc: '父母/孩子等家人参与分工' },
  { id: 'partner', label: '与朋友合伙', desc: '2人及以上非亲属搭档' },
]

export const genders = [
  { id: 'male', label: '男' },
  { id: 'female', label: '女' },
  { id: 'other', label: '其他 / 不愿透露' },
]

/** 家庭成员谁能参与（调研用） */
export const familyMemberOptions = [
  { id: 'none', label: '没有家人能帮忙', desc: '只能靠自己，选单人可胜任项目' },
  { id: 'spouse', label: '配偶/伴侣能一起', desc: '适合夫妻店分工' },
  { id: 'spouse_part', label: '配偶只能偶尔帮', desc: '备料/收摊搭手，不能全程' },
  { id: 'parent', label: '父母能帮忙', desc: '看摊、备料、守家' },
  { id: 'child', label: '需带娃/带孩子出摊', desc: '选手工、短时、可坐着类更安全' },
  { id: 'sibling', label: '兄弟姐妹能合伙', desc: '类似朋友合伙' },
  { id: 'multi', label: '多位家人都能搭手', desc: '适合家庭店、高峰餐饮' },
]

const defaultStaffing = {
  staff_min: 1,
  staff_max: 2,
  staff_ideal: 1,
  shop_modes: ['solo', 'couple', 'family'],
  couple_suitable: true,
  family_suitable: true,
  gender_fit: 'any',
  gender_note: '男女均可，按个人条件选择',
  staffing_note: '1人可起步；忙时可家人搭手',
  roles: ['出摊售卖', '备料/收摊（可家人协助）'],
}

const categoryStaffing = {
  餐饮: {
    staff_min: 1,
    staff_max: 3,
    staff_ideal: 2,
    shop_modes: ['solo', 'couple', 'family', 'partner'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '早餐/夜宵高峰建议2人：一人出餐一人收银；夫妻店最常见',
    roles: ['主厨/出餐', '收银/打包', '备料（可提前在家完成）'],
  },
  手工: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '1人足够；配偶可帮忙看摊，孩子可带在身边（选手工类）',
    roles: ['制作（多在家）', '市集售卖'],
  },
  零售: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '1人可守摊；节假日可双人轮班',
    roles: ['看摊销售', '补货'],
  },
  服务: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: false,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '多数1人即可；按摩类可两人轮班',
    roles: ['服务操作', '预约/收银'],
  },
  数码科技: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'partner'],
    couple_suitable: false,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '1人技术+销售；忙时可搭档一人引流',
    roles: ['维修/贴膜', '销售'],
  },
  文创潮玩: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '体验摊可1人；亲子区夫妻分工一人陪娃一人守摊',
    roles: ['体验指导', '收银'],
  },
  蔬果鲜花: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 2,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '切配+售卖双人更高效；1人也可但损耗控制难',
    roles: ['切配/备货', '售卖称重'],
  },
  便民生活: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '社区定点1人即可；洗鞋等可家人帮收送',
    roles: ['现场服务', '取送（可家人）'],
  },
  娱乐体验: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '互动摊1人；套圈等忙时需2人',
    roles: ['主持互动', '补货/收银'],
  },
  服饰鞋包: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '1人守摊足够',
    roles: ['销售', '理货'],
  },
  助农特产: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '农产品季可全家帮忙装箱出摊',
    roles: ['售卖', '装箱搬运'],
  },
  移动餐车: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 2,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '开车+出餐最好2人；1人需选简化菜单',
    roles: ['驾驶/移动', '出餐'],
  },
  派对婚庆: {
    staff_min: 2,
    staff_max: 4,
    staff_ideal: 2,
    shop_modes: ['couple', 'partner', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '布场/接待至少2人，单人难接单场',
    roles: ['布场', '接待', '撤场'],
  },
  教育体验: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'family'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    gender_note: '女性做亲子体验类更常见，男性完全可做',
    staffing_note: '1人带活动；高峰需助手维持秩序',
    roles: ['讲解/带领', '安全维护'],
  },
  美业造型: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: false,
    gender_fit: 'any',
    gender_note: '理发男女均可；美甲编发女性从业者更多，男性可做男士快剪',
    staffing_note: '1人守摊即可；忙时第2人收银或吹干',
    roles: ['剪发/造型', '收银/消毒'],
  },
  情绪价值: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: false,
    family_suitable: false,
    gender_fit: 'any',
    gender_note: '倾听、夸夸类不限性别；注意边界与安全',
    staffing_note: '必须1人对1客，不能同时接多单；高峰可双人轮场',
    roles: ['倾听/引导', '计时/场控'],
  },
  宠物经济: {
    staff_min: 1,
    staff_max: 2,
    staff_ideal: 1,
    shop_modes: ['solo', 'couple', 'partner'],
    couple_suitable: true,
    family_suitable: true,
    gender_fit: 'any',
    gender_note: '上门喂猫遛狗、撸宠体验均需耐心与动物知识',
    staffing_note: '移动美容车/洗宠车建议2人：一人操作一人安抚宠物',
    roles: ['宠物护理/操作', '预约/交通/安抚'],
  },
  兼职副业: {
    staff_min: 1,
    staff_max: 1,
    staff_ideal: 1,
    shop_modes: ['solo'],
    couple_suitable: false,
    family_suitable: false,
    gender_fit: 'any',
    staffing_note: '副业默认1人，与主业时间错开',
    roles: ['独立完成'],
  },
  居家办公: {
    staff_min: 1,
    staff_max: 1,
    staff_ideal: 1,
    shop_modes: ['solo'],
    couple_suitable: false,
    family_suitable: true,
    gender_fit: 'any',
    staffing_note: '1人即可；带娃可在孩子睡后/上学时工作',
    roles: ['居家独立交付'],
  },
}

const projectStaffingOverrides = {
  1: { staff_ideal: 2, couple_suitable: true, staffing_note: '经典夫妻店：一人摊饼一人加料收钱；单人需手速快' },
  2: { staff_min: 1, staff_ideal: 2, staff_max: 3, couple_suitable: true, staffing_note: '烧烤建议2人：一人烤一人包/收银；单人可但高峰忙不过来' },
  6: { staff_min: 1, staff_ideal: 1, couple_suitable: false, family_suitable: true, staffing_note: '1人操作即可；家人可帮收送鞋' },
  7: { staff_ideal: 2, couple_suitable: true, staffing_note: '在家卤制可1人；出摊切配+售卖2人更轻松' },
  8: { staff_ideal: 2, couple_suitable: true, staffing_note: '套圈摊忙时需2人：一人主持一人补货' },
  11: { staff_min: 1, staff_ideal: 2, couple_suitable: true, staffing_note: '猛火炒粉1人可干，2人分工更安全' },
  18: { staff_min: 1, staff_ideal: 1, gender_fit: 'female_friendly', gender_note: '女性美甲师更常见，男性亦可' },
  33: { staff_min: 1, staff_ideal: 1, family_suitable: true, staffing_note: '改衣1人坐着即可' },
  47: { staff_min: 2, staff_ideal: 2, shop_modes: ['couple', 'partner'], couple_suitable: true, staffing_note: '需持证技师+前台，至少2人合作' },
  55: { staff_ideal: 2, couple_suitable: true, staffing_note: '生煎需盯锅+打包，夫妻分工常见' },
  62: { staff_ideal: 1, family_suitable: true, staffing_note: '1人指导涂鸦；家长可陪娃，适合带娃出摊' },
  86: { staff_min: 2, staff_ideal: 2, couple_suitable: true, family_suitable: true, staffing_note: '布场+撤场至少2人，可夫妻或家人搭档' },
  85: { staff_min: 1, staff_ideal: 2, staff_max: 2, couple_suitable: true, staffing_note: '建议2人：一人开车一人出餐；单人需简化菜单' },
}

export function labelTeamMode(id) {
  return teamModes.find((t) => t.id === id)?.label || id
}

export function labelGender(id) {
  return genders.find((g) => g.id === id)?.label || id
}

export function labelFamilyMember(id) {
  return familyMemberOptions.find((f) => f.id === id)?.label || id
}

export function formatStaffRange(staffing) {
  if (!staffing) return '1人'
  if (staffing.staff_min === staffing.staff_max) return `${staffing.staff_min}人`
  return `${staffing.staff_min}-${staffing.staff_max}人`
}

export function inferStaffing(project) {
  const base = categoryStaffing[project.category] || defaultStaffing
  const override = projectStaffingOverrides[project.id] || {}
  return { ...defaultStaffing, ...base, ...override }
}

export function matchStaffingProfile(project, filters) {
  const s = project.staffing || inferStaffing(project)
  const { teamMode, familyMember, gender } = filters

  if (teamMode === 'solo' && s.staff_min > 1) return false

  if (teamMode === 'couple') {
    if (!s.shop_modes?.includes('couple') && !s.couple_suitable) return false
  }

  if (teamMode === 'family' && !s.family_suitable && !s.shop_modes?.includes('family')) return false

  if (familyMember === 'none' && s.staff_min >= 2 && teamMode !== 'couple' && teamMode !== 'partner') return false

  if (familyMember === 'child') {
    if (project.tags?.includes('夜宵') && project.category === '餐饮') return false
  }

  if (gender === 'female' && s.gender_fit === 'male_friendly') return false
  if (gender === 'male' && s.gender_fit === 'female_friendly') return false

  return true
}

export function scoreStaffingProfile(project, profile) {
  const s = project.staffing || inferStaffing(project)
  let score = 0

  if (profile.teamMode === 'couple' && s.couple_suitable) score += 3
  if (profile.teamMode === 'family' && s.family_suitable) score += 2
  if (profile.teamMode === 'solo' && s.staff_ideal === 1) score += 2
  if (profile.teamMode === 'solo' && s.staff_ideal >= 2) score -= 1

  if (profile.familyMember === 'spouse' && s.couple_suitable) score += 2
  if (profile.familyMember === 'multi' && s.staff_max >= 3) score += 2
  if (profile.familyMember === 'child' && project.category === '手工') score += 2

  if (profile.gender === 'female' && s.gender_fit === 'female_friendly') score += 1
  if (profile.gender === 'male' && s.gender_fit === 'male_friendly') score += 1

  return score
}

export function enrichStaffing(project) {
  const staffing = inferStaffing(project)
  return { ...project, staffing }
}
