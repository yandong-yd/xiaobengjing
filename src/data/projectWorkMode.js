/** 创业形态：「摆摊」= 个人创业的代名词，不限于线下出摊 */

export const workModes = [
  {
    id: 'stall',
    label: '出摊 / 线下',
    short: '出摊',
    icon: 'store',
    desc: '市集、夜市、社区定点、流动摊位',
    route: '/projects',
    query: { mode: 'stall' },
    color: 'amber',
  },
  {
    id: 'parttime',
    label: '兼职 / 副业',
    short: '兼职',
    icon: 'clock',
    desc: '主业之外，周末、晚间、假期可做的项目',
    route: '/part-time',
    color: 'blue',
  },
  {
    id: 'remote',
    label: '居家办公',
    short: '居家',
    icon: 'home',
    desc: '在家完成交付，电脑+网络即可起步',
    route: '/remote',
    color: 'green',
  },
  {
    id: 'freelance',
    label: '自由职业',
    short: '自由职业',
    icon: 'briefcase',
    desc: '按单/按项目接单，时间地点自主',
    route: '/remote',
    query: { tab: 'freelance' },
    color: 'violet',
  },
]

export function getWorkMode(id) {
  return workModes.find((m) => m.id === id)
}

/** 按分类默认创业形态 */
const categoryWorkModes = {
  餐饮: ['stall', 'parttime'],
  手工: ['stall', 'remote', 'freelance'],
  零售: ['stall', 'parttime'],
  服务: ['stall', 'parttime', 'freelance'],
  数码科技: ['stall', 'parttime'],
  文创潮玩: ['stall', 'remote'],
  蔬果鲜花: ['stall', 'parttime'],
  便民生活: ['stall', 'parttime', 'freelance'],
  娱乐体验: ['stall', 'parttime'],
  服饰鞋包: ['stall', 'parttime'],
  助农特产: ['stall', 'remote', 'freelance'],
  移动餐车: ['stall', 'parttime'],
  派对婚庆: ['parttime', 'freelance'],
  教育体验: ['stall', 'parttime'],
  美业造型: ['stall', 'parttime', 'freelance'],
  情绪价值: ['stall', 'parttime', 'remote', 'freelance'],
  宠物经济: ['stall', 'parttime', 'freelance'],
  兼职副业: ['parttime'],
  居家办公: ['remote', 'freelance'],
}

/** 标签追加形态 */
const tagWorkModes = {
  副业: ['parttime'],
  上门: ['parttime', 'freelance'],
  周末: ['parttime'],
  社区: ['stall', 'parttime'],
  远程: ['remote', 'freelance'],
  线上: ['remote', 'freelance'],
  接单: ['freelance', 'remote'],
  自媒体: ['remote', 'freelance'],
  学生创业: ['parttime', 'stall'],
}

/** 项目 id 覆盖 */
const projectOverrides = {
  108: ['parttime', 'freelance'],
  115: ['parttime', 'freelance'],
  119: ['parttime', 'freelance'],
  17: ['stall', 'remote', 'parttime'],
  67: ['parttime', 'stall'],
  83: ['parttime', 'freelance'],
}

export function inferWorkModes(project) {
  if (projectOverrides[project.id]) return [...new Set(projectOverrides[project.id])]
  if (project.work_modes?.length) return project.work_modes

  const set = new Set(categoryWorkModes[project.category] || ['stall'])
  for (const tag of project.tags || []) {
    for (const m of tagWorkModes[tag] || []) set.add(m)
  }
  if (project.category === '手工' || project.tags?.includes('手工')) {
    set.add('remote')
    set.add('freelance')
  }
  return [...set]
}

export function enrichWorkMode(project) {
  const modes = inferWorkModes(project)
  return {
    ...project,
    work_modes: modes,
    work_mode_labels: modes.map((id) => getWorkMode(id)).filter(Boolean),
  }
}

export function filterByWorkMode(projects, modeId) {
  if (!modeId) return projects
  return projects.filter((p) => p.work_modes?.includes(modeId))
}

export function countByWorkMode(projects) {
  const counts = { stall: 0, parttime: 0, remote: 0, freelance: 0 }
  for (const p of projects) {
    for (const m of p.work_modes || []) {
      if (counts[m] != null) counts[m]++
    }
  }
  return counts
}

export function workModeBadgeClass(modeId) {
  const map = {
    stall: 'bg-amber-100 text-amber-800',
    parttime: 'bg-blue-100 text-blue-800',
    remote: 'bg-green-100 text-green-800',
    freelance: 'bg-violet-100 text-violet-800',
  }
  return map[modeId] || 'bg-stone-100 text-stone-600'
}
