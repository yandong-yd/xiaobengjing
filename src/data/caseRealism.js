/** 案例中的真实低谷与口语细节 */

export const caseRealism = {
  1: {
    tough_period: '前两周每天100出头，差点放弃；换点位第三周才稳。',
    key_phrase: '「加蛋加肠吗？30秒好。」工业园工人认脸后会固定来。',
  },
  2: {
    tough_period: '第一周下雨只卖了120；后来只做周五六，反而更轻松。',
    key_phrase: '「干净烧烤，您看着烤。」业主群这句比发传单管用。',
  },
  3: {
    tough_period: '11月收入掉一半，12月改卖热饮才留住老客。',
    key_phrase: '「妈妈手作，半糖少冰第一次？」家长群口碑传播。',
  },
  8: {
    tough_period: '夏天以外的月份几乎不出摊，按季节算全年账。',
    key_phrase: '「纯肉不是淀粉的，您闻闻。」直播时互动拉人气。',
  },
  15: { tough_period: '前1个月只有老邻居来，代存快递第三周才起量。', key_phrase: '「数据线、雨衣都有，急用拿去。」' },
  16: { tough_period: '第一周日入不到100，换到后门第三周才稳。', key_phrase: '「多放折耳根吗？贵州味。」' },
  19: { tough_period: '4月刚出摊没人，5月才进入状态。', key_phrase: '「料碟是招牌，串随便选。」' },
  24: { tough_period: '前两次市集只卖3件，第三次换款式才开单。', key_phrase: '「可以定制名字，做一个要两小时。」' },
  32: { tough_period: '花不新鲜那天只卖200，后来只进当日花。', key_phrase: '「现串的，您闻闻香不香。」' },
  37: { tough_period: '第一次市集紧张不敢开口，作品摆好自然有人来。', key_phrase: '「定制手链，扫码看款式。」' },
}

export function enrichCase(caseItem) {
  const r = caseRealism[caseItem.id]
  if (!r) return caseItem
  return { ...caseItem, ...r }
}
