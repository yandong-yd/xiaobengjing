/** 摆摊经济 · 账单与利润计算 */

export const revenueScenarios = [
  { id: 'newbie', label: '新手期', factor: 0.65, desc: '前1-2月，熟练度不足、点位未稳' },
  { id: 'normal', label: '平常日', factor: 1, desc: '位置、天气、竞争都正常' },
  { id: 'good', label: '旺季/好日', factor: 1.25, desc: '节假日、周末、好天气' },
  { id: 'bad', label: '差日/雨天', factor: 0.45, desc: '下雨、整条街都差、学校放假' },
]

export const defaultPaymentFeeRate = 0.006
/** 默认打工时薪参考（可按城市改） */
export const defaultJobHourlyWage = 22

export function num(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

/** 安全除法：分母为 0 或非有限数时返回 fallback，避免 NaN/Infinity */
export function safeDivide(numerator, denominator, fallback = 0) {
  const n = num(numerator, 0)
  const d = num(denominator, 0)
  if (d === 0) return fallback
  const result = n / d
  return Number.isFinite(result) ? result : fallback
}

const MIN_FEE_DENOMINATOR = 0.0001

/** 从时薪或月薪推算打工日收入 */
export function resolveJobDailyIncome(input) {
  const hourly = num(input.jobHourlyWage, 0)
  const jobHours = Math.max(1, num(input.jobHoursPerDay, 8))
  if (hourly > 0) {
    return { hourly, hours: jobHours, daily: hourly * jobHours }
  }
  const monthly = num(input.jobMonthlySalary, 0)
  const jobDays = Math.max(1, num(input.jobWorkDaysPerMonth, 22))
  if (monthly > 0) {
    const daily = safeDivide(monthly, jobDays, 0)
    return { hourly: safeDivide(daily, jobHours, 0), hours: jobHours, daily, monthly, jobDays }
  }
  return { hourly: 0, hours: jobHours, daily: 0 }
}

/** 推算每人每日机会成本（元） */
export function resolveOpportunityCostDaily(input) {
  const manual = num(input.laborOpportunityDaily, 0)
  if (manual > 0 && !input.useHoursForLabor) {
    return { perPerson: manual, source: 'manual' }
  }

  const stallHours = Math.max(0, num(input.hoursAtStall, 8))
  const prepHours = Math.max(0, num(input.hoursPrepDaily, 2))
  const totalHours = stallHours + prepHours
  const hourly = num(input.jobHourlyWage, defaultJobHourlyWage)
  const perPerson = totalHours * hourly
  return { perPerson, totalHours, hourly, stallHours, prepHours, source: 'hours' }
}

/** @param {object} input */
export function calculateProfitBill(input) {
  const daysPerMonth = Math.max(1, num(input.daysPerMonth, 26))
  const workDays = Math.max(0, num(input.workDaysPerMonth, daysPerMonth))
  const rainDays = Math.min(Math.max(0, num(input.rainyDaysPerMonth, 0)), workDays)
  const normalDays = Math.max(0, workDays - rainDays)

  const baseRevenue = num(input.dailyRevenue, 0)
  const unitPrice = num(input.unitPrice, 0)
  const unitsPerDay = num(input.unitsPerDay, 0)
  const revenueFromUnits = unitPrice > 0 && unitsPerDay > 0 ? unitPrice * unitsPerDay : 0
  const dailyRevenueBase = revenueFromUnits || baseRevenue

  const ingredients = num(input.ingredientsDaily, 0)
  const packaging = num(input.packagingDaily, 0)
  const transport = num(input.transportDaily, 0)
  const miscDaily = num(input.miscDaily, 0)
  const stallFeeMonthly = num(input.stallFeeMonthly, 0)
  const storageMonthly = num(input.storageMonthly, 0)
  const otherFixedMonthly = num(input.otherFixedMonthly, 0)

  const stallDaily = safeDivide(stallFeeMonthly, daysPerMonth, 0)
  const storageDaily = safeDivide(storageMonthly, daysPerMonth, 0)
  const fixedDaily = safeDivide(otherFixedMonthly, daysPerMonth, 0)

  const equipmentCost = num(input.equipmentCost, 0)
  const licenseCost = num(input.licenseCost, 0)
  const firstInventory = num(input.firstInventory, 0)
  const otherStartup = num(input.otherStartup, 0)
  const startupTotal = equipmentCost + licenseCost + firstInventory + otherStartup

  const equipmentLifeMonths = Math.max(1, num(input.equipmentLifeMonths, 18))
  const equipmentAmortDaily = safeDivide(
    safeDivide(equipmentCost, equipmentLifeMonths, 0),
    daysPerMonth,
    0
  )

  const wasteRate = Math.min(0.5, Math.max(0, num(input.wasteRate, 0.05)))
  const wasteDaily = ingredients * wasteRate

  const paymentFeeRate = Math.min(0.05, Math.max(0, num(input.paymentFeeRate, defaultPaymentFeeRate)))

  const staffCount = Math.max(1, num(input.staffCount, 1))
  const paidLaborDaily = num(input.paidLaborDaily, num(input.laborDaily, 0))

  const opp = resolveOpportunityCostDaily(input)
  const opportunityPerPerson = opp.perPerson
  const opportunityTotalDaily = opportunityPerPerson * staffCount
  const laborTotalDaily = paidLaborDaily + opportunityTotalDaily

  const hoursAtStall = opp.stallHours ?? Math.max(0, num(input.hoursAtStall, 8))
  const hoursPrepDaily = opp.prepHours ?? Math.max(0, num(input.hoursPrepDaily, 2))
  const totalHoursPerPerson = opp.totalHours ?? hoursAtStall + hoursPrepDaily
  const totalHoursAllStaff = totalHoursPerPerson * staffCount

  const jobRef = resolveJobDailyIncome(input)
  const jobDailyPerPerson = jobRef.daily
  const jobMonthlyPerPerson = jobRef.monthly ?? jobDailyPerPerson * num(input.jobWorkDaysPerMonth, 22)

  const variableDaily = ingredients + packaging + transport + miscDaily + wasteDaily
  const fixedCostDaily = stallDaily + storageDaily + fixedDaily + equipmentAmortDaily
  /** 不含任何人工（含自己时间） */
  const materialCostDaily = variableDaily + fixedCostDaily

  function dayLayers(revenue) {
    const paymentFee = revenue * paymentFeeRate
    const costBeforeLabor = materialCostDaily + paymentFee
    const accountingProfit = revenue - costBeforeLabor - paidLaborDaily
    const trueProfit = accountingProfit - opportunityTotalDaily
    const marginAccounting = safeDivide(accountingProfit, revenue, 0)
    const marginTrue = safeDivide(trueProfit, revenue, 0)
    const stallHourlyRate =
      totalHoursAllStaff > 0 ? safeDivide(trueProfit, totalHoursAllStaff, null) : null
    return {
      revenue,
      paymentFee,
      costBeforeLabor,
      materialCostDaily,
      paidLaborDaily,
      opportunityTotalDaily,
      accountingProfit,
      trueProfit,
      marginAccounting,
      marginTrue,
      stallHourlyRate,
      totalCost: costBeforeLabor + paidLaborDaily + opportunityTotalDaily,
      profit: trueProfit,
      margin: marginTrue,
    }
  }

  const scenarioResults = revenueScenarios.map((s) => {
    const revenue = Math.round(dailyRevenueBase * s.factor)
    const day = dayLayers(revenue)
    const dayWeight =
      s.id === 'bad'
        ? safeDivide(rainDays, workDays, workDays > 0 ? 0 : 0.15)
        : s.id === 'normal'
          ? safeDivide(normalDays, workDays, workDays > 0 ? 0 : 0.7)
          : 1
    const monthlyTrue = Math.round(day.trueProfit * workDays * dayWeight)
    return { ...s, revenue, ...day, profit: day.trueProfit, monthlyProfit: monthlyTrue }
  })

  const normalDay = dayLayers(dailyRevenueBase)
  const monthlyRevenue = dailyRevenueBase * workDays
  const monthlyPaymentFee = monthlyRevenue * paymentFeeRate
  const monthlyVariable = variableDaily * workDays
  const monthlyFixed = (stallFeeMonthly + storageMonthly + otherFixedMonthly) + equipmentAmortDaily * workDays
  const monthlyPaidLabor = paidLaborDaily * workDays
  const monthlyOpportunity = opportunityTotalDaily * workDays
  const monthlyLabor = monthlyPaidLabor + monthlyOpportunity
  const monthlyMaterialCost = monthlyVariable + monthlyFixed + monthlyPaymentFee
  const monthlyAccountingProfit = monthlyRevenue - monthlyMaterialCost - monthlyPaidLabor
  const monthlyTrueProfit = monthlyAccountingProfit - monthlyOpportunity

  const feeDenominator = Math.max(MIN_FEE_DENOMINATOR, 1 - paymentFeeRate)
  const breakEvenMaterial = materialCostDaily
  const breakEvenRevenueAccounting = safeDivide(breakEvenMaterial + paidLaborDaily, feeDenominator, 0)
  const breakEvenRevenueTrue = safeDivide(
    breakEvenMaterial + paidLaborDaily + opportunityTotalDaily,
    feeDenominator,
    0
  )
  const breakEvenRevenue = Math.round(breakEvenRevenueTrue)
  const breakEvenUnits = unitPrice > 0 ? Math.ceil(safeDivide(breakEvenRevenue, unitPrice, 0)) : null

  let paybackDays = null
  let paybackMonths = null
  if (normalDay.trueProfit > 0 && startupTotal > 0) {
    paybackDays = Math.ceil(safeDivide(startupTotal, normalDay.trueProfit, Infinity))
    paybackMonths = Math.ceil(safeDivide(paybackDays, daysPerMonth, Infinity))
    if (!Number.isFinite(paybackDays)) paybackDays = null
    if (!Number.isFinite(paybackMonths)) paybackMonths = null
  }

  const newbieFactor = num(input.newbieFactor, 0.65)
  const newbieMonths = num(input.newbieMonths, 2)
  const newbieMonthlyTrue = monthlyTrueProfit * newbieFactor
  const stableMonthlyTrue = monthlyTrueProfit

  const livingCost = num(input.monthlyLivingCost, 0)
  const otherIncome = num(input.otherIncome, 0)
  const netCashAfterLiving = monthlyTrueProfit + otherIncome - livingCost
  const runwayMonths =
    livingCost > 0 && netCashAfterLiving < 0 && startupTotal > 0
      ? safeDivide(startupTotal, Math.abs(netCashAfterLiving), null)
      : null

  const grossMargin = safeDivide(
    dailyRevenueBase - ingredients - packaging - wasteDaily,
    dailyRevenueBase,
    0
  )
  const netMargin = normalDay.marginTrue
  const accountingMargin = normalDay.marginAccounting

  const jobMonthlyAllStaff = jobMonthlyPerPerson * staffCount
  const jobDailyAllStaff = jobDailyPerPerson * staffCount
  const beatJobMonthly =
    monthlyTrueProfit -
    jobMonthlyAllStaff * safeDivide(workDays, num(input.jobWorkDaysPerMonth, 22), 1)
  const beatJobDaily = normalDay.trueProfit - jobDailyAllStaff

  const warnings = []
  if (normalDay.accountingProfit > 0 && normalDay.trueProfit <= 0) {
    warnings.push('账面有赚，但扣掉自己出摊时间后不如打工 — 这不是真正盈利')
  }
  if (normalDay.trueProfit > 0 && normalDay.stallHourlyRate != null && jobRef.hourly > 0 && normalDay.stallHourlyRate < jobRef.hourly) {
    warnings.push(`摆摊折合时薪 ${formatMoney(normalDay.stallHourlyRate)} 元，低于打工时薪 ${formatMoney(jobRef.hourly)} 元`)
  }
  if (netMargin < 0.15 && dailyRevenueBase > 0 && normalDay.trueProfit > 0) warnings.push('真实净利率低于15%，略一波动就可能亏')
  if (breakEvenRevenue > dailyRevenueBase * 0.85) warnings.push('营业额接近真实盈亏线，抗风险能力弱')
  if (rainDays > workDays * 0.4) warnings.push('雨天/差日占比过高，建议算全年账（季节项目尤其注意）')
  if (livingCost > 0 && netCashAfterLiving < 0) warnings.push('按真实盈利，月利润覆盖不了生活费，需储备或副业')
  if (normalDay.trueProfit <= 0) warnings.push('平常日真实盈利为负，请重新检查成本、时长或提高客单/销量')
  if (opportunityTotalDaily <= 0) warnings.push('未计入自己出摊的时间成本，下方「真实盈利」可能偏高')

  const algorithm = buildAlgorithmSteps({
    dailyRevenueBase,
    materialCostDaily,
    paidLaborDaily,
    opportunityTotalDaily,
    opportunityPerPerson,
    staffCount,
    totalHoursPerPerson,
    totalHoursAllStaff,
    hoursAtStall,
    hoursPrepDaily,
    opp,
    paymentFeeRate,
    normalDay,
    jobRef,
    jobDailyAllStaff,
    workDays,
    monthlyTrueProfit,
    monthlyAccountingProfit,
  })

  return {
    dailyRevenueBase,
    breakEvenRevenue,
    breakEvenRevenueAccounting: Math.round(breakEvenRevenueAccounting),
    breakEvenUnits,
    daily: {
      revenue: dailyRevenueBase,
      ingredients,
      packaging,
      transport,
      miscDaily,
      wasteDaily,
      stallDaily,
      storageDaily,
      fixedDaily,
      equipmentAmortDaily,
      materialCostDaily,
      paidLaborDaily,
      opportunityTotalDaily,
      opportunityPerPerson,
      laborTotalDaily,
      paymentFee: normalDay.paymentFee,
      totalCost: normalDay.totalCost,
      accountingProfit: normalDay.accountingProfit,
      trueProfit: normalDay.trueProfit,
      profit: normalDay.trueProfit,
      margin: normalDay.marginTrue,
      marginAccounting: normalDay.marginAccounting,
      stallHourlyRate: normalDay.stallHourlyRate,
    },
    monthly: {
      workDays,
      rainDays,
      revenue: Math.round(monthlyRevenue),
      variable: Math.round(monthlyVariable),
      fixed: Math.round(monthlyFixed),
      materialCost: Math.round(monthlyMaterialCost),
      paidLabor: Math.round(monthlyPaidLabor),
      opportunity: Math.round(monthlyOpportunity),
      labor: Math.round(monthlyLabor),
      paymentFee: Math.round(monthlyPaymentFee),
      totalCost: Math.round(monthlyMaterialCost + monthlyLabor),
      accountingProfit: Math.round(monthlyAccountingProfit),
      trueProfit: Math.round(monthlyTrueProfit),
      profit: Math.round(monthlyTrueProfit),
      livingCost,
      otherIncome,
      netCashAfterLiving: Math.round(netCashAfterLiving),
    },
    labor: {
      hoursAtStall,
      hoursPrepDaily,
      totalHoursPerPerson,
      totalHoursAllStaff,
      staffCount,
      jobHourlyWage: opp.hourly ?? jobRef.hourly,
      opportunityPerPerson,
      opportunityTotalDaily,
      paidLaborDaily,
      jobDailyPerPerson,
      jobDailyAllStaff,
      jobMonthlyPerPerson: Math.round(jobMonthlyPerPerson),
      jobMonthlyAllStaff: Math.round(jobMonthlyAllStaff),
    },
    comparison: {
      beatJobDaily: Math.round(beatJobDaily),
      beatJobMonthly: Math.round(beatJobMonthly),
      stallHourlyRate: normalDay.stallHourlyRate != null ? Math.round(normalDay.stallHourlyRate * 10) / 10 : null,
      jobHourlyRate: jobRef.hourly,
      worthIt: normalDay.trueProfit > 0 && beatJobDaily > 0,
    },
    startup: {
      equipmentCost,
      licenseCost,
      firstInventory,
      otherStartup,
      total: startupTotal,
    },
    scenarios: scenarioResults,
    newbie: {
      months: newbieMonths,
      factor: newbieFactor,
      monthlyProfit: Math.round(newbieMonthlyTrue),
      stableMonthlyProfit: Math.round(stableMonthlyTrue),
      monthlyAccountingProfit: Math.round(monthlyAccountingProfit * newbieFactor),
    },
    paybackDays,
    paybackMonths,
    runwayMonths: runwayMonths ? Math.round(runwayMonths * 10) / 10 : null,
    grossMargin,
    netMargin,
    accountingMargin,
    warnings,
    algorithm,
  }
}

function buildAlgorithmSteps(ctx) {
  const feePct = (ctx.paymentFeeRate * 100).toFixed(2)
  const oppExplain =
    ctx.opp.source === 'hours'
      ? `(${ctx.hoursAtStall} + ${ctx.hoursPrepDaily}) 小时/人 × ${formatMoney(ctx.opp.hourly)} 元/时 × ${ctx.staffCount} 人`
      : `${formatMoney(ctx.opportunityPerPerson)} 元/人/天 × ${ctx.staffCount} 人（手动填写）`

  return [
    {
      step: 1,
      title: '日营业额',
      formula: '客单价 × 日销量，或直接填平常日营业额',
      value: ctx.dailyRevenueBase,
      sign: '+',
    },
    {
      step: 2,
      title: '减：物料与经营成本',
      formula: '原料 + 打包 + 交通 + 杂项 + 损耗 + 摊位/仓储/固定（摊到日）+ 设备分摊',
      value: ctx.materialCostDaily,
      sign: '−',
    },
    {
      step: 3,
      title: '减：支付手续费',
      formula: `营业额 × ${feePct}%（微信/支付宝扫码）`,
      value: ctx.normalDay.paymentFee,
      sign: '−',
    },
    {
      step: 4,
      title: '减：外聘人工',
      formula: '请人帮手的日工资（如有）',
      value: ctx.paidLaborDaily,
      sign: '−',
      optional: ctx.paidLaborDaily <= 0,
    },
    {
      step: 5,
      title: '= 账面日利润',
      formula: '不算自己时间，很多摊主误以为的「赚了」',
      value: ctx.normalDay.accountingProfit,
      sign: '=',
      highlight: 'accounting',
    },
    {
      step: 6,
      title: '减：自己的时间成本（机会成本）',
      formula: `${oppExplain}。时间也是成本：不出摊去打工能拿到的钱`,
      value: ctx.opportunityTotalDaily,
      sign: '−',
      highlight: 'labor',
    },
    {
      step: 7,
      title: '= 真实日盈利',
      formula: '扣完自己出摊投入的时间后，才算真正赚到的',
      value: ctx.normalDay.trueProfit,
      sign: '=',
      highlight: 'true',
    },
    {
      step: 8,
      title: '对比：同样时长去打工',
      formula: `${ctx.staffCount} 人 × 打工 ${formatMoney(ctx.jobDailyPerPerson)} 元/人/天 ≈ ${formatMoney(ctx.jobDailyAllStaff)} 元/天`,
      value: ctx.jobDailyAllStaff,
      sign: 'vs',
      compareTo: ctx.normalDay.trueProfit,
      compareLabel: '真实日盈利',
    },
    {
      step: 9,
      title: '月真实盈利',
      formula: `真实日盈利 × ${ctx.workDays} 出摊天`,
      value: ctx.monthlyTrueProfit,
      sign: '=',
      highlight: 'true',
    },
  ]
}

/** 从项目库数据生成计算器默认值 */
export function defaultsFromProject(project) {
  if (!project) return null
  const incomeMin = num(project.income_min, 0)
  const incomeMax = num(project.income_max, incomeMin)
  const midIncome = Math.round((incomeMin + incomeMax) / 2)
  const newbieIncome = Math.round(incomeMin * 0.85)
  const isFood = project.category === '餐饮' || project.category === '蔬果鲜花'
  const isBeauty = project.category === '美业造型'
  const isEmotional = project.category === '情绪价值'
  const isPet = project.category === '宠物经济'
  const isRemote = project.category === '居家办公'
  const isParttime = project.category === '兼职副业'

  const stall = project.cost_breakdown?.stall
  let stallMonthly = 800
  if (stall) {
    const m = String(stall).match(/(\d+)\s*-\s*(\d+)/)
    if (m) stallMonthly = Math.round((Number(m[1]) + Number(m[2])) / 2)
  }

  const equip = project.cost_breakdown?.equipment
  let equipment = project.cost_min * 0.5
  if (equip) {
    const m = String(equip).match(/(\d+)\s*-\s*(\d+)/)
    if (m) equipment = Math.round((Number(m[1]) + Number(m[2])) / 2)
  }

  const ing = project.cost_breakdown?.ingredients
  let ingredientsDaily = Math.round(midIncome * (isEmotional ? 0.08 : isBeauty ? 0.12 : isPet ? 0.15 : isRemote ? 0.05 : isParttime ? 0.2 : 0.35))
  if (ing) {
    const dayMatch = String(ing).match(/(\d+)\s*-\s*(\d+)\s*元?\/?天/)
    const weekMatch = String(ing).match(/(\d+)\s*-\s*(\d+)\s*元?\/?周/)
    if (dayMatch) ingredientsDaily = Math.round((Number(dayMatch[1]) + Number(dayMatch[2])) / 2)
    else if (weekMatch) ingredientsDaily = Math.round((Number(weekMatch[1]) + Number(weekMatch[2])) / 2 / 7)
  }

  const staffCount = project.staffing?.staff_ideal || 1
  const hoursAtStall = isRemote ? 6 : isParttime ? 5 : isFood ? 9 : isBeauty ? 9 : isEmotional ? 7 : isPet ? 6 : 8
  const hoursPrepDaily = isRemote ? 1 : isParttime ? 1 : isFood ? 3 : isBeauty ? 1 : isEmotional ? 1 : isPet ? 2 : 2
  const jobHourlyWage = isRemote || isParttime ? 30 : isBeauty ? 28 : isEmotional ? 25 : isPet ? 24 : defaultJobHourlyWage

  return {
    projectName: project.name,
    dailyRevenue: midIncome,
    newbieDailyRevenue: newbieIncome,
    ingredientsDaily,
    packagingDaily: isFood ? Math.round(ingredientsDaily * 0.08) : isBeauty ? 20 : 5,
    transportDaily: isEmotional ? 10 : 15,
    miscDaily: isBeauty ? 15 : 10,
    stallFeeMonthly: stallMonthly,
    storageMonthly: isFood ? 200 : 0,
    equipmentCost: equipment,
    licenseCost: isFood ? 300 : isBeauty ? 200 : 0,
    firstInventory: Math.round(ingredientsDaily * 3),
    otherStartup: 200,
    startupCost: project.cost_min,
    wasteRate: isFood ? 0.08 : 0.03,
    staffCount,
    hoursAtStall,
    hoursPrepDaily,
    jobHourlyWage,
    jobHoursPerDay: 8,
    jobWorkDaysPerMonth: 22,
    useHoursForLabor: true,
    laborOpportunityDaily: 0,
    daysPerMonth: 26,
    workDaysPerMonth: 26,
    rainyDaysPerMonth: 4,
    monthlyLivingCost: 3000,
  }
}

export function formatMoney(n) {
  if (n == null || !Number.isFinite(n)) return '—'
  return Math.round(n).toLocaleString()
}

export function formatPercent(n) {
  if (!Number.isFinite(n)) return '—'
  return `${(n * 100).toFixed(1)}%`
}

export function formatHours(n) {
  if (!Number.isFinite(n)) return '—'
  return `${n} 小时`
}
