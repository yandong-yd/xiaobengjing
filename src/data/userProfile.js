/** AI 定制 · 用户画像选项库（可持续扩展） */

export const motivations = [
  { id: 'leave_factory', label: '不想进厂/流水线', desc: '体力重复、时间不自由' },
  { id: 'leave_office', label: '不想坐班/打卡', desc: '厌恶通勤、办公室政治' },
  { id: 'side_income', label: '想多一份副业收入', desc: '主业保留，先试水' },
  { id: 'family', label: '要照顾家庭/孩子', desc: '时间必须灵活' },
  { id: 'laidoff', label: '失业/被裁后转型', desc: '需要尽快有现金流' },
  { id: 'retire_active', label: '退休但想有事做', desc: '轻体力、社区型' },
  { id: 'be_own_boss', label: '想自己当老板', desc: '哪怕从小做起' },
]

export const incomeGoals = [
  { id: 'pocket', label: '月多 2000-3000 就行', desc: '补贴家用' },
  { id: 'replace_part', label: '月 5000-8000', desc: '抵一份工资' },
  { id: 'replace_full', label: '月 8000-15000', desc: '全职替代上班' },
  { id: 'grow', label: '先活下来再做大', desc: '不急于一时' },
]

export const availableTimes = [
  { id: 'evening', label: '只有晚上', desc: '2-4小时/天' },
  { id: 'weekend', label: '只有周末', desc: '周六日为主' },
  { id: 'flex', label: '时间较灵活', desc: '可自己排班' },
  { id: 'full', label: '可全天投入', desc: '相当于全职创业' },
  { id: 'fragment', label: '时间很碎', desc: '带娃/照护为主' },
]

export const hobbyOptions = [
  { id: 'cook', label: '做饭/烘焙' },
  { id: 'craft', label: '手工/DIY' },
  { id: 'photo', label: '拍照/修图' },
  { id: 'video', label: '拍视频/剪辑' },
  { id: 'write', label: '写作/阅读' },
  { id: 'chat', label: '聊天/倾听' },
  { id: 'pet', label: '养宠物' },
  { id: 'plant', label: '绿植/园艺' },
  { id: 'sport', label: '运动/健身' },
  { id: 'game', label: '游戏/动漫' },
  { id: 'beauty', label: '美妆/穿搭' },
  { id: 'tech', label: '数码/折腾设备' },
  { id: 'drive', label: '开车/跑腿' },
  { id: 'teach', label: '教人/分享' },
]

export const skillOptions = [
  { id: 'cooking', label: '会做饭' },
  { id: 'handcraft', label: '会做手工' },
  { id: 'repair', label: '会维修（手机/家电等）' },
  { id: 'design', label: '会设计/PS' },
  { id: 'video_edit', label: '会剪辑视频' },
  { id: 'writing', label: '会写作' },
  { id: 'english', label: '会英语/外语' },
  { id: 'sales', label: '会销售/吆喝' },
  { id: 'accounting', label: '会记账/Excel' },
  { id: 'driving', label: '有驾照/会开车' },
  { id: 'beauty_skill', label: '会理发/美甲/化妆' },
  { id: 'none', label: '暂无特别技能', desc: '愿意从零学' },
]

export const dislikeOptions = [
  { id: 'stand_long', label: '讨厌久站' },
  { id: 'talk_strangers', label: '不爱和陌生人说话' },
  { id: 'smell_oil', label: '受不了油烟味' },
  { id: 'night', label: '不能接受熬夜/夜班' },
  { id: 'cold_call', label: '讨厌推销/求人' },
  { id: 'heavy', label: '干不了重体力' },
  { id: 'inventory', label: '不想囤货/压货' },
  { id: 'paperwork', label: '烦办证/跑手续' },
  { id: 'risk', label: '不想投太多钱' },
  { id: 'pet_smell', label: '受不了宠物气味' },
]

export const formerJobs = [
  { id: 'factory', label: '工厂/流水线' },
  { id: 'office', label: '公司白领/文职' },
  { id: 'sales_job', label: '销售/业务' },
  { id: 'service_job', label: '餐饮/服务业' },
  { id: 'driver', label: '司机/配送' },
  { id: 'teacher', label: '教师/培训' },
  { id: 'tech_job', label: 'IT/技术' },
  { id: 'medical', label: '医护/美容' },
  { id: 'student', label: '在校学生' },
  { id: 'homemaker', label: '全职宝妈/宝爸' },
  { id: 'laidoff', label: '刚失业/待业' },
  { id: 'other', label: '其他' },
]

export function labelById(list, id) {
  return list.find((x) => x.id === id)?.label || id
}

export function labelsByIds(list, ids) {
  if (!ids?.length) return []
  return ids.map((id) => labelById(list, id)).filter(Boolean)
}

export const defaultExtendedProfile = {
  motivation: '',
  formerJob: '',
  incomeGoal: '',
  availableTime: '',
  hobbies: [],
  skillsKnown: [],
  dislikes: [],
  freeText: '',
}

export function mergeExtendedProfile(base = {}) {
  return { ...defaultExtendedProfile, ...base }
}
