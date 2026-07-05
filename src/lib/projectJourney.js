/** 项目五步法：选择 → 介绍 → 开始 → 实施 → 问题预演 */

export function buildProjectJourney(project) {
  if (!project) return []
  const pb = project.playbook || {}
  const risks = project.risks || []
  const slow = project.slow_day_playbook || []

  return [
    {
      id: 'choose',
      step: 1,
      title: '选择',
      icon: 'target',
      summary: '为什么选它、适合谁、启动要多少',
      points: [
        `启动 ${project.cost_min}-${project.cost_max} 元，日收入区间 ${project.income_min}-${project.income_max} 元`,
        project.realistic_note || '新手期收入取下限，稳定后再按峰值规划',
        project.creator_fit?.disability?.notes || '详见下方「适合谁」',
        (project.work_mode_labels || []).map((m) => m.label).join(' · ') || '出摊/线下',
      ].filter(Boolean),
      action: '用投资顾问填画像，看是否匹配；用账单计算器算真实盈利',
    },
    {
      id: 'intro',
      step: 2,
      title: '认识项目',
      icon: 'book',
      summary: '本质是什么、钱从哪来、核心能力',
      points: [
        project.description,
        project.target_audience || '主打人群见详情',
        pb.profit_loop?.sell || project.income_model?.profit || '靠差价/服务费',
        `核心要点：${(project.ai_tips || []).slice(0, 2).join('；') || '手艺/位置/复购'}`,
      ],
      action: '读「主打群体」和话术，判断自己能不能开口、能不能坚持',
    },
    {
      id: 'start',
      step: 3,
      title: '开始准备',
      icon: 'rocket',
      summary: '第一周、办证、进货、学手艺',
      points: [
        pb.loop_summary || '调研 → 学习 → 采购 → 试营业',
        ...(pb.week1_plan || []).slice(0, 4).map((d) => `${d.day}：${d.task}`),
        (pb.licenses || []).length ? `办证：${pb.licenses.map((l) => l.name).join(' → ')}` : '多数不需复杂证照（以详情为准）',
      ],
      action: '按「完整闭环」路线图逐项打勾，别跳过试营业7天',
    },
    {
      id: 'run',
      step: 4,
      title: '实施运营',
      icon: 'cog',
      summary: '日常怎么干、怎么留客、怎么记账',
      points: [
        ...(project.steps?.operate || []).slice(0, 3),
        pb.profit_loop?.retention || '老客靠稳定点位+口碑',
        pb.opening_checklist?.length ? `出摊前 ${pb.opening_checklist.length} 项检查清单` : '收摊清洁、记账复盘',
        project.weather ? `天气依赖${project.weather.level}：${project.weather.tactics?.[0] || ''}` : '',
      ].filter(Boolean),
      action: '固定时段出摊21天再判断，每天记营业额和成本',
    },
    {
      id: 'rehearse',
      step: 5,
      title: '问题预演',
      icon: 'mask',
      summary: '提前知道会踩什么坑、差日怎么办',
      points: [
        ...risks.slice(0, 4).map((r) => `风险：${r}`),
        ...slow.slice(0, 3).map((s) => `差日：${s}`),
        project.weather?.detail ? `天气：${project.weather.detail}` : '',
      ].filter(Boolean),
      action: '预演最坏情况：连续7天亏摊位费怎么办？有备用方案再加大投入',
    },
  ]
}
