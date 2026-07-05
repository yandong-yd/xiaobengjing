import { describe, it, expect } from 'vitest'
import {
  calculateProfitBill,
  num,
  safeDivide,
  formatMoney,
  formatPercent,
  defaultsFromProject,
} from './profitCalculator.js'

/** 断言账单核心字段无 NaN/Infinity（逻辑看门狗） */
function assertBillFinite(bill) {
  const keys = [
    bill.daily.trueProfit,
    bill.daily.accountingProfit,
    bill.monthly.trueProfit,
    bill.breakEvenRevenue,
    bill.netMargin,
    bill.grossMargin,
  ]
  for (const v of keys) {
    expect(Number.isFinite(v)).toBe(true)
  }
  if (bill.paybackDays != null) expect(Number.isFinite(bill.paybackDays)).toBe(true)
  if (bill.paybackMonths != null) expect(Number.isFinite(bill.paybackMonths)).toBe(true)
}

describe('num', () => {
  it('handles undefined, null, NaN, empty string', () => {
    expect(num(undefined, 5)).toBe(5)
    expect(num(null, 0)).toBe(0)
    expect(num('abc', 0)).toBe(0)
    expect(num(NaN, 99)).toBe(99)
  })

  it('passes through finite numbers', () => {
    expect(num(42)).toBe(42)
    expect(num('3.5')).toBe(3.5)
  })
})

describe('safeDivide', () => {
  it('returns fallback on zero denominator', () => {
    expect(safeDivide(100, 0, null)).toBe(null)
    expect(safeDivide(100, 0, 0)).toBe(0)
  })

  it('computes normal division', () => {
    expect(safeDivide(100, 4)).toBe(25)
  })
})

describe('calculateProfitBill · 回本周期', () => {
  it('profit <= 0 时 payback 为 null', () => {
    const bill = calculateProfitBill({
      dailyRevenue: 80,
      ingredientsDaily: 200,
      equipmentCost: 5000,
      hoursAtStall: 10,
      jobHourlyWage: 30,
    })
    assertBillFinite(bill)
    expect(bill.paybackDays).toBeNull()
    expect(bill.paybackMonths).toBeNull()
  })

  it('真实盈利 > 0 且启动成本 > 0 时计算回本天数', () => {
    const bill = calculateProfitBill({
      dailyRevenue: 1200,
      ingredientsDaily: 250,
      packagingDaily: 30,
      stallFeeMonthly: 600,
      equipmentCost: 8000,
      hoursAtStall: 8,
      hoursPrepDaily: 2,
      jobHourlyWage: 22,
      staffCount: 1,
      workDaysPerMonth: 26,
    })
    assertBillFinite(bill)
    expect(bill.daily.trueProfit).toBeGreaterThan(0)
    expect(bill.paybackDays).toBeGreaterThan(0)
    expect(bill.paybackMonths).toBeGreaterThan(0)
  })
})

describe('calculateProfitBill · 边界防御', () => {
  it('空输入不产生 NaN', () => {
    assertBillFinite(calculateProfitBill({}))
  })

  it('workDays = 0 时不崩溃', () => {
    assertBillFinite(
      calculateProfitBill({ dailyRevenue: 500, workDaysPerMonth: 0, daysPerMonth: 26 })
    )
  })

  it('极高手续费率不导致 Infinity 盈亏线', () => {
    const bill = calculateProfitBill({
      dailyRevenue: 500,
      ingredientsDaily: 100,
      paymentFeeRate: 0.99,
    })
    assertBillFinite(bill)
    expect(Number.isFinite(bill.breakEvenRevenue)).toBe(true)
  })

  it('rainDays 超过 workDays 时被钳制', () => {
    const bill = calculateProfitBill({
      dailyRevenue: 400,
      workDaysPerMonth: 10,
      rainyDaysPerMonth: 99,
    })
    expect(bill.monthly.rainDays).toBeLessThanOrEqual(bill.monthly.workDays)
  })
})

describe('formatMoney / formatPercent', () => {
  it('非有限数显示占位符', () => {
    expect(formatMoney(NaN)).toBe('—')
    expect(formatMoney(null)).toBe('—')
    expect(formatPercent(Infinity)).toBe('—')
  })
})

describe('defaultsFromProject', () => {
  it('null 项目返回 null', () => {
    expect(defaultsFromProject(null)).toBeNull()
  })

  it('缺失 income 字段时使用 0 兜底', () => {
    const d = defaultsFromProject({ name: '测试', category: '餐饮', cost_min: 3000 })
    expect(d).not.toBeNull()
    expect(Number.isFinite(d.dailyRevenue)).toBe(true)
  })
})
