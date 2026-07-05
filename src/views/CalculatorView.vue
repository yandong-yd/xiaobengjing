<template>
  <div class="page-narrow">
    <PageHeader
      title="摆摊账单计算器"
      description="扣掉出摊时间后的真实盈利，并可与打工时薪对比"
    />

    <div v-if="linkedProject" class="panel-brand mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
      <p class="text-sm text-brand-900">
        已载入项目：<strong>{{ linkedProject.name }}</strong>（库内 {{ linkedProject.income_min }}-{{ linkedProject.income_max }} 元/天）
      </p>
      <router-link :to="`/project/${linkedProject.id}`" class="text-sm text-brand-600 hover:underline">查看详情 →</router-link>
    </div>

    <div class="flex flex-wrap gap-1.5 mb-4">
      <button
        v-for="m in modes"
        :key="m.id"
        type="button"
        class="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
        :class="mode === m.id ? 'btn-pill-active' : 'btn-pill-inactive'"
        @click="mode = m.id"
      >
        {{ m.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div class="lg:col-span-2 space-y-4">
        <section class="panel space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="money" tag="span">营业额</IconLabel></h2>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">平常日营业额（元/天）</label>
            <input v-model.number="form.dailyRevenue" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">客单价（选填）</label>
              <input v-model.number="form.unitPrice" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">日销量（选填）</label>
              <input v-model.number="form.unitsPerDay" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </div>
          <p v-if="unitRevenueHint" class="text-xs text-brand-600">{{ unitRevenueHint }}</p>
        </section>

        <section v-if="mode === 'detail'" class="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="cart" tag="span">每日变动成本</IconLabel></h2>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">原料/进货（元/天）</label>
            <input v-model.number="form.ingredientsDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">打包/耗材（元/天）</label>
            <input v-model.number="form.packagingDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">交通/油费（元/天）</label>
            <input v-model.number="form.transportDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">杂项（元/天）</label>
            <input v-model.number="form.miscDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">原料损耗率 %</label>
            <input v-model.number="wastePercent" type="number" min="0" max="50" class="w-24 px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            <span class="text-xs text-stone-400 ml-2">餐饮建议 5-10%</span>
          </div>
        </section>

        <section v-if="mode === 'detail'" class="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="store" tag="span">每月固定成本</IconLabel></h2>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">摊位/场地费（元/月）</label>
            <input v-model.number="form.stallFeeMonthly" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">仓储/冷库（元/月）</label>
            <input v-model.number="form.storageMonthly" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">其他固定（元/月）</label>
            <input v-model.number="form.otherFixedMonthly" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
        </section>

        <section class="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="rocket" tag="span">启动 & 出摊</IconLabel></h2>
          <template v-if="mode === 'detail'">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">设备/工具（元）</label>
              <input v-model.number="form.equipmentCost" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">证照办理（元）</label>
              <input v-model.number="form.licenseCost" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">首批进货（元）</label>
              <input v-model.number="form.firstInventory" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">其他启动（元）</label>
              <input v-model.number="form.otherStartup" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">设备分摊周期（月）</label>
              <input v-model.number="form.equipmentLifeMonths" type="number" min="6" max="36" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </template>
          <div v-else>
            <label class="block text-xs font-medium text-stone-600 mb-1">启动总投入（元）</label>
            <input v-model.number="simpleStartupTotal" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            <p class="text-xs text-stone-400 mt-1">简易模式按 55% 设备 / 30% 首批货 / 10% 证照 自动拆分</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">每月出摊天数</label>
              <input v-model.number="form.workDaysPerMonth" type="number" min="1" max="31" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">差日/雨天</label>
              <input v-model.number="form.rainyDaysPerMonth" type="number" min="0" max="31" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </div>
        </section>

        <section class="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="clock" tag="span">出摊时长 & 打工对比</IconLabel></h2>
          <p class="text-xs text-stone-500">你的时间有成本。不出摊去打工能拿多少钱，就要从利润里扣掉，剩下的才是真实盈利。</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">出摊在岗（小时/天）</label>
              <input v-model.number="form.hoursAtStall" type="number" min="0" max="16" step="0.5" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">备货/收摊/路途（小时/天）</label>
              <input v-model.number="form.hoursPrepDaily" type="number" min="0" max="8" step="0.5" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </div>
          <p class="text-xs text-brand-700">合计投入 {{ bill.labor.totalHoursPerPerson }} 小时/人 · {{ bill.labor.totalHoursAllStaff }} 小时/天（{{ form.staffCount }} 人）</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">出摊人数</label>
              <input v-model.number="form.staffCount" type="number" min="1" max="5" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-medium text-stone-600 mb-1">外聘帮工（元/天，可选）</label>
              <input v-model.number="form.paidLaborDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </div>
          <div class="border-t border-stone-100 pt-3 space-y-3">
            <p class="text-xs font-medium text-stone-700">打工参考（算机会成本）</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">打工时薪（元/时）</label>
                <input v-model.number="form.jobHourlyWage" type="number" min="0" step="1" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
              </div>
              <div>
                <label class="block text-xs font-medium text-stone-600 mb-1">打工日工时（小时）</label>
                <input v-model.number="form.jobHoursPerDay" type="number" min="1" max="12" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
              </div>
            </div>
            <p class="text-xs text-stone-500">
              时间成本 = ({{ form.hoursAtStall }}+{{ form.hoursPrepDaily }}) × {{ form.jobHourlyWage }} × {{ form.staffCount }} =
              <strong class="text-amber-800">{{ formatMoney(bill.labor.opportunityTotalDaily) }} 元/天</strong>
            </p>
            <label class="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
              <input v-model="form.useHoursForLabor" type="checkbox" class="rounded border-stone-300" />
              按时长×时薪自动算（取消则改用手动填写）
            </label>
            <div v-if="!form.useHoursForLabor">
              <label class="block text-xs font-medium text-stone-600 mb-1">手动：机会成本（元/人/天）</label>
              <input v-model.number="form.laborOpportunityDaily" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
            </div>
          </div>
        </section>

        <section v-if="mode === 'detail'" class="bg-white rounded-lg border border-stone-200 p-4 space-y-3">
          <h2 class="font-bold text-stone-800"><IconLabel icon="home" tag="span">生活账（可选）</IconLabel></h2>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">月生活费（元/月）</label>
            <input v-model.number="form.monthlyLivingCost" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-stone-600 mb-1">其他收入（元/月）</label>
            <input v-model.number="form.otherIncome" type="number" min="0" class="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm" />
          </div>
        </section>

        <div v-if="mode === 'simple'" class="bg-stone-50 rounded-lg border border-stone-200 p-4 text-sm text-stone-600">
          简易模式按营业额约 42% 估变动成本。切换「详细账单」可填原料、摊位、损耗、设备分摊等。
        </div>
      </div>

      <div class="lg:col-span-3 space-y-4">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="bg-brand-50 rounded-lg border-2 border-brand-300 p-5">
            <p class="text-sm text-brand-800 font-medium">真实日盈利</p>
            <p class="text-xs text-brand-600 mt-0.5">扣掉自己出摊时间</p>
            <p class="text-2xl font-bold mt-1" :class="bill.daily.trueProfit >= 0 ? 'text-green-700' : 'text-red-600'">
              {{ formatMoney(bill.daily.trueProfit) }} 元
            </p>
            <p v-if="bill.comparison.stallHourlyRate != null" class="text-xs text-brand-700 mt-1">
              折合 {{ bill.comparison.stallHourlyRate }} 元/时
            </p>
          </div>
          <div class="bg-white rounded-lg border border-stone-200 p-4">
            <p class="text-sm text-stone-500">账面日利润</p>
            <p class="text-xs text-stone-400">未扣自己时间</p>
            <p class="text-xl font-bold mt-1" :class="bill.daily.accountingProfit >= 0 ? 'text-stone-700' : 'text-red-600'">
              {{ formatMoney(bill.daily.accountingProfit) }} 元
            </p>
          </div>
          <div class="bg-white rounded-lg border border-stone-200 p-4">
            <p class="text-sm text-stone-500">月真实盈利</p>
            <p class="text-2xl font-bold" :class="bill.monthly.trueProfit >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ formatMoney(bill.monthly.trueProfit) }} 元
            </p>
          </div>
          <div class="bg-white rounded-lg border border-stone-200 p-4">
            <p class="text-sm text-stone-500">真实净利率</p>
            <p class="text-2xl font-bold text-brand-600">{{ formatPercent(bill.netMargin) }}</p>
          </div>
        </div>

        <section class="rounded-lg border p-5" :class="bill.comparison.worthIt ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'">
          <h2 class="font-bold mb-2" :class="bill.comparison.worthIt ? 'text-green-900' : 'text-amber-900'">
            {{ bill.comparison.worthIt ? '比打工划算' : '与打工对比' }}
          </h2>
          <div class="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p class="text-stone-600">摆摊真实日盈利</p>
              <p class="text-xl font-bold" :class="bill.daily.trueProfit >= 0 ? 'text-green-700' : 'text-red-600'">{{ formatMoney(bill.daily.trueProfit) }} 元</p>
              <p v-if="bill.comparison.stallHourlyRate != null" class="text-xs text-stone-500">≈ {{ bill.comparison.stallHourlyRate }} 元/时（{{ bill.labor.totalHoursAllStaff }}h）</p>
            </div>
            <div>
              <p class="text-stone-600">同样人数去打工</p>
              <p class="text-xl font-bold text-stone-800">{{ formatMoney(bill.labor.jobDailyAllStaff) }} 元/天</p>
              <p class="text-xs text-stone-500">{{ form.staffCount }}人 × {{ formatMoney(bill.labor.jobDailyPerPerson) }}（{{ form.jobHourlyWage }}元/时×{{ form.jobHoursPerDay }}h）</p>
            </div>
            <div>
              <p class="text-stone-600">每天多赚/少赚</p>
              <p class="text-xl font-bold" :class="bill.comparison.beatJobDaily >= 0 ? 'text-green-700' : 'text-red-600'">
                {{ bill.comparison.beatJobDaily >= 0 ? '+' : '' }}{{ formatMoney(bill.comparison.beatJobDaily) }} 元
              </p>
              <p class="text-xs text-stone-500">月约 {{ bill.comparison.beatJobMonthly >= 0 ? '+' : '' }}{{ formatMoney(bill.comparison.beatJobMonthly) }} 元</p>
            </div>
          </div>
          <p v-if="bill.daily.accountingProfit > 0 && bill.daily.trueProfit <= 0" class="mt-3 text-sm text-amber-800 font-medium">
            账面日赚 {{ formatMoney(bill.daily.accountingProfit) }} 元，但扣掉 {{ formatMoney(bill.labor.opportunityTotalDaily) }} 元时间成本后为负 — 不如去打工。
          </p>
        </section>

        <div class="grid sm:grid-cols-2 gap-3">
          <div class="bg-white rounded-lg border border-stone-200 p-4">
            <p class="text-sm text-stone-500 mb-1">真实盈亏平衡营业额</p>
            <p class="text-2xl font-bold text-amber-700">{{ formatMoney(bill.breakEvenRevenue) }} 元/天</p>
            <p class="text-xs text-stone-500 mt-1">含时间成本；账面线 {{ formatMoney(bill.breakEvenRevenueAccounting) }} 元/天</p>
            <p v-if="bill.breakEvenUnits" class="text-xs text-stone-500">约需 {{ bill.breakEvenUnits }} 份/天</p>
          </div>
          <div class="bg-white rounded-lg border border-stone-200 p-4">
            <p class="text-sm text-stone-500 mb-1">启动回本</p>
            <p class="text-2xl font-bold text-brand-600">{{ paybackText }}</p>
            <p class="text-xs text-stone-500 mt-1">启动合计 {{ formatMoney(bill.startup.total) }} 元</p>
          </div>
        </div>

        <section class="bg-white rounded-lg border border-stone-200 p-4">
          <h2 class="font-bold text-stone-800 mb-4"><IconLabel icon="chart" tag="span">四种情景对比</IconLabel></h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-stone-500 border-b border-stone-100">
                  <th class="pb-2 pr-4">情景</th>
                  <th class="pb-2 pr-4">日营业额</th>
                  <th class="pb-2 pr-4">日利润</th>
                  <th class="pb-2">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in bill.scenarios" :key="s.id" class="border-b border-stone-50">
                  <td class="py-2.5 pr-4 font-medium">{{ s.label }}</td>
                  <td class="py-2.5 pr-4">{{ formatMoney(s.revenue) }}</td>
                  <td class="py-2.5 pr-4" :class="s.profit >= 0 ? 'text-green-700' : 'text-red-600'">{{ formatMoney(s.profit) }}</td>
                  <td class="py-2.5 text-xs text-stone-500">{{ s.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="bg-stone-800 rounded-lg p-5 text-stone-100">
          <h2 class="font-bold text-white mb-1 inline-flex items-center gap-1.5"><AppIcon name="scale" size="sm" class="text-white" /> 算账公式（平常日）</h2>
          <p class="text-xs text-stone-400 mb-4">按步骤扣完，最后一步才是真实盈利</p>
          <ol class="space-y-3">
            <li
              v-for="a in bill.algorithm"
              :key="a.step"
              class="rounded-xl px-4 py-3 text-sm"
              :class="{
                'bg-stone-700/80': !a.highlight,
                'bg-amber-900/40 ring-1 ring-amber-600/50': a.highlight === 'accounting',
                'bg-violet-900/40 ring-1 ring-violet-500/50': a.highlight === 'labor',
                'bg-green-900/50 ring-2 ring-green-500/60': a.highlight === 'true',
              }"
            >
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <span class="font-medium text-white">{{ a.step }}. {{ a.title }}</span>
                <span
                  class="font-bold tabular-nums"
                  :class="a.highlight === 'true' ? (a.value >= 0 ? 'text-green-400' : 'text-red-400') : 'text-stone-200'"
                >
                  <template v-if="a.sign === 'vs'">参考 {{ formatMoney(a.value) }} 元</template>
                  <template v-else-if="a.sign === '='">{{ formatMoney(a.value) }} 元</template>
                  <template v-else>− {{ formatMoney(a.value) }} 元</template>
                </span>
              </div>
              <p class="text-xs text-stone-400 mt-1">{{ a.formula }}</p>
              <p v-if="a.compareTo != null" class="text-xs mt-1" :class="a.compareTo >= a.value ? 'text-green-400' : 'text-red-400'">
                {{ a.compareLabel }} {{ formatMoney(a.compareTo) }} 元 →
                {{ a.compareTo >= a.value ? '摆摊更划算' : '不如打工' }}
                （差 {{ formatMoney(Math.abs(a.compareTo - a.value)) }} 元/天）
              </p>
            </li>
          </ol>
        </section>

        <section v-if="mode === 'detail'" class="bg-white rounded-lg border border-stone-200 p-4">
          <h2 class="font-bold text-stone-800 mb-4"><IconLabel icon="clipboard" tag="span">平常日账单明细</IconLabel></h2>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-stone-600">营业额</span><span class="text-green-700 font-medium">+{{ formatMoney(bill.daily.revenue) }}</span></div>
            <div v-if="bill.daily.ingredients" class="flex justify-between"><span class="text-stone-600">原料</span><span>-{{ formatMoney(bill.daily.ingredients) }}</span></div>
            <div v-if="bill.daily.packaging" class="flex justify-between"><span class="text-stone-600">打包</span><span>-{{ formatMoney(bill.daily.packaging) }}</span></div>
            <div v-if="bill.daily.wasteDaily" class="flex justify-between"><span class="text-stone-600">损耗</span><span>-{{ formatMoney(bill.daily.wasteDaily) }}</span></div>
            <div v-if="bill.daily.transport" class="flex justify-between"><span class="text-stone-600">交通</span><span>-{{ formatMoney(bill.daily.transport) }}</span></div>
            <div v-if="bill.daily.miscDaily" class="flex justify-between"><span class="text-stone-600">杂项</span><span>-{{ formatMoney(bill.daily.miscDaily) }}</span></div>
            <div v-if="bill.daily.stallDaily" class="flex justify-between"><span class="text-stone-600">摊位（摊到日）</span><span>-{{ formatMoney(bill.daily.stallDaily) }}</span></div>
            <div v-if="bill.daily.storageDaily" class="flex justify-between"><span class="text-stone-600">仓储（摊到日）</span><span>-{{ formatMoney(bill.daily.storageDaily) }}</span></div>
            <div v-if="bill.daily.equipmentAmortDaily" class="flex justify-between"><span class="text-stone-600">设备分摊</span><span>-{{ formatMoney(bill.daily.equipmentAmortDaily) }}</span></div>
            <div class="flex justify-between"><span class="text-stone-600">扫码手续费</span><span>-{{ formatMoney(bill.daily.paymentFee) }}</span></div>
            <div v-if="bill.daily.paidLaborDaily" class="flex justify-between"><span class="text-stone-600">外聘帮工</span><span>-{{ formatMoney(bill.daily.paidLaborDaily) }}</span></div>
            <div class="border-t border-stone-200 pt-2 flex justify-between font-medium text-stone-700">
              <span>账面日利润</span><span>{{ formatMoney(bill.daily.accountingProfit) }} 元</span>
            </div>
            <div class="flex justify-between text-violet-800 bg-violet-50 -mx-2 px-2 py-1.5 rounded-lg">
              <span>自己的时间成本（{{ bill.labor.totalHoursPerPerson }}h×{{ form.staffCount }}人×{{ form.jobHourlyWage }}元/时）</span>
              <span>-{{ formatMoney(bill.daily.opportunityTotalDaily) }}</span>
            </div>
            <div class="border-t border-stone-200 pt-2 flex justify-between font-bold">
              <span>真实日盈利</span>
              <span :class="bill.daily.trueProfit >= 0 ? 'text-green-700' : 'text-red-600'">{{ formatMoney(bill.daily.trueProfit) }} 元</span>
            </div>
          </dl>
        </section>

        <section v-if="mode === 'detail'" class="bg-white rounded-lg border border-stone-200 p-4">
          <h2 class="font-bold text-stone-800 mb-4"><IconLabel icon="calendar" tag="span">本月汇总（{{ bill.monthly.workDays }} 天出摊）</IconLabel></h2>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between"><span>月营业额</span><span class="text-green-700">+{{ formatMoney(bill.monthly.revenue) }}</span></div>
            <div class="flex justify-between"><span>变动成本</span><span>-{{ formatMoney(bill.monthly.variable) }}</span></div>
            <div class="flex justify-between"><span>固定+分摊</span><span>-{{ formatMoney(bill.monthly.fixed) }}</span></div>
            <div class="flex justify-between"><span>支付手续费</span><span>-{{ formatMoney(bill.monthly.paymentFee) }}</span></div>
            <div v-if="bill.monthly.paidLabor" class="flex justify-between"><span>外聘帮工</span><span>-{{ formatMoney(bill.monthly.paidLabor) }}</span></div>
            <div class="flex justify-between font-medium"><span>账面月利润</span><span>{{ formatMoney(bill.monthly.accountingProfit) }} 元</span></div>
            <div class="flex justify-between text-violet-800"><span>自己的时间成本</span><span>-{{ formatMoney(bill.monthly.opportunity) }}</span></div>
            <div class="border-t pt-2 flex justify-between font-bold">
              <span>月真实盈利</span>
              <span :class="bill.monthly.trueProfit >= 0 ? 'text-green-700' : 'text-red-600'">{{ formatMoney(bill.monthly.trueProfit) }} 元</span>
            </div>
            <template v-if="form.monthlyLivingCost > 0">
              <div class="flex justify-between text-stone-600"><span>减：生活费</span><span>-{{ formatMoney(bill.monthly.livingCost) }}</span></div>
              <div v-if="form.otherIncome" class="flex justify-between"><span>加：其他收入</span><span class="text-green-700">+{{ formatMoney(bill.monthly.otherIncome) }}</span></div>
              <div class="flex justify-between font-bold text-brand-800">
                <span>扣生活费后结余</span>
                <span :class="bill.monthly.netCashAfterLiving >= 0 ? 'text-green-700' : 'text-red-600'">{{ formatMoney(bill.monthly.netCashAfterLiving) }} 元</span>
              </div>
              <p v-if="bill.runwayMonths" class="text-xs text-amber-700">按当前缺口，启动资金约撑 {{ bill.runwayMonths }} 个月</p>
            </template>
          </dl>
        </section>

        <section class="bg-violet-50 rounded-lg border border-violet-200 p-5">
          <h2 class="font-bold text-violet-900 mb-3"><IconLabel icon="trend-down" tag="span">新手期 vs 稳定期</IconLabel></h2>
          <div class="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-violet-600">前 {{ bill.newbie.months }} 个月</p>
              <p class="text-2xl font-bold text-violet-900">{{ formatMoney(bill.newbie.monthlyProfit) }} 元/月</p>
            </div>
            <div>
              <p class="text-violet-600">稳定后</p>
              <p class="text-2xl font-bold text-violet-900">{{ formatMoney(bill.newbie.stableMonthlyProfit) }} 元/月</p>
            </div>
          </div>
        </section>

        <div v-if="bill.warnings.length" class="bg-amber-50 rounded-lg border border-amber-200 p-5">
          <p class="font-bold text-amber-900 mb-2"><IconLabel icon="alert" tag="span">风险提示</IconLabel></p>
          <ul class="space-y-1 text-sm text-amber-800">
            <li v-for="(w, i) in bill.warnings" :key="i">· {{ w }}</li>
          </ul>
        </div>
      </div>
    </div>

    <section class="mt-12">
      <h2 class="text-xl font-bold text-stone-800 mb-4">从项目库一键载入</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          v-for="p in sampleProjects"
          :key="p.id"
          type="button"
          class="text-left bg-white rounded-xl border border-stone-200 p-4 hover:border-brand-300 text-sm"
          @click="loadProject(p)"
        >
          <p class="font-medium text-stone-800">{{ p.name }}</p>
          <p class="text-green-600 mt-1">{{ p.income_min }}-{{ p.income_max }} 元/天</p>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '../components/ui/PageHeader.vue'
import IconLabel from '../components/ui/IconLabel.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import { projects, getProjectById } from '../data/mock.js'
import { calculateProfitBill, defaultsFromProject, formatMoney, formatPercent } from '../lib/profitCalculator.js'

const route = useRoute()
const mode = ref('detail')
const modes = [
  { id: 'simple', label: '简易估算' },
  { id: 'detail', label: '详细账单' },
]

const form = reactive({
  dailyRevenue: 400,
  unitPrice: 0,
  unitsPerDay: 0,
  ingredientsDaily: 140,
  packagingDaily: 15,
  transportDaily: 15,
  miscDaily: 10,
  wasteRate: 0.08,
  stallFeeMonthly: 800,
  storageMonthly: 0,
  otherFixedMonthly: 0,
  equipmentCost: 1500,
  licenseCost: 300,
  firstInventory: 400,
  otherStartup: 200,
  equipmentLifeMonths: 18,
  workDaysPerMonth: 26,
  daysPerMonth: 26,
  rainyDaysPerMonth: 4,
  staffCount: 1,
  hoursAtStall: 8,
  hoursPrepDaily: 2,
  jobHourlyWage: 22,
  jobHoursPerDay: 8,
  jobWorkDaysPerMonth: 22,
  jobMonthlySalary: 0,
  useHoursForLabor: true,
  paidLaborDaily: 0,
  laborOpportunityDaily: 0,
  paymentFeeRate: 0.006,
  monthlyLivingCost: 3000,
  otherIncome: 0,
  newbieFactor: 0.65,
  newbieMonths: 2,
})

const linkedProject = ref(null)
const simpleStartupTotal = ref(2400)

const wastePercent = computed({
  get: () => Math.round(form.wasteRate * 1000) / 10,
  set: (v) => { form.wasteRate = (Number(v) || 0) / 100 },
})

const effectiveForm = computed(() => {
  const rev = form.unitPrice > 0 && form.unitsPerDay > 0
    ? form.unitPrice * form.unitsPerDay
    : form.dailyRevenue

  if (mode.value === 'simple') {
    const total = simpleStartupTotal.value
    return {
      ...form,
      dailyRevenue: rev,
      daysPerMonth: form.workDaysPerMonth,
      ingredientsDaily: Math.round(rev * 0.35),
      packagingDaily: Math.round(rev * 0.04),
      transportDaily: 15,
      miscDaily: 10,
      wasteRate: 0.05,
      stallFeeMonthly: Math.max(300, Math.round(rev * 12)),
      equipmentCost: Math.round(total * 0.55),
      firstInventory: Math.round(total * 0.3),
      licenseCost: Math.round(total * 0.1),
      otherStartup: Math.max(0, total - Math.round(total * 0.95)),
    }
  }

  return { ...form, dailyRevenue: rev, daysPerMonth: form.workDaysPerMonth }
})

const bill = computed(() => calculateProfitBill(effectiveForm.value))

const paybackText = computed(() => {
  if (bill.value.daily.trueProfit <= 0) return '无法回本（真实日盈利为负）'
  if (bill.value.paybackDays == null) return '—'
  if (bill.value.paybackDays <= 30) return `约 ${bill.value.paybackDays} 天`
  return `约 ${bill.value.paybackMonths} 个月（${bill.value.paybackDays} 天）`
})

const unitRevenueHint = computed(() => {
  if (form.unitPrice > 0 && form.unitsPerDay > 0) {
    return `客单价 × 销量 = ${formatMoney(form.unitPrice * form.unitsPerDay)} 元/天（覆盖上方营业额）`
  }
  return ''
})

const sampleProjects = computed(() => projects.slice(0, 8))

function loadProject(p) {
  linkedProject.value = p
  const d = defaultsFromProject(p)
  if (!d) return
  Object.assign(form, {
    dailyRevenue: d.dailyRevenue,
    ingredientsDaily: d.ingredientsDaily,
    packagingDaily: d.packagingDaily,
    transportDaily: d.transportDaily,
    miscDaily: d.miscDaily,
    stallFeeMonthly: d.stallFeeMonthly,
    storageMonthly: d.storageMonthly,
    equipmentCost: d.equipmentCost,
    licenseCost: d.licenseCost,
    firstInventory: d.firstInventory,
    otherStartup: d.otherStartup,
    wasteRate: d.wasteRate,
    staffCount: d.staffCount,
    hoursAtStall: d.hoursAtStall,
    hoursPrepDaily: d.hoursPrepDaily,
    jobHourlyWage: d.jobHourlyWage,
    jobHoursPerDay: d.jobHoursPerDay,
    jobWorkDaysPerMonth: d.jobWorkDaysPerMonth,
    useHoursForLabor: d.useHoursForLabor,
    workDaysPerMonth: d.workDaysPerMonth,
    rainyDaysPerMonth: d.rainyDaysPerMonth,
    monthlyLivingCost: d.monthlyLivingCost,
  })
  simpleStartupTotal.value = d.startupCost || p.cost_min
  mode.value = 'detail'
}

onMounted(() => {
  const id = route.query.project
  if (id) {
    const p = getProjectById(id)
    if (p) loadProject(p)
  }
})
</script>
