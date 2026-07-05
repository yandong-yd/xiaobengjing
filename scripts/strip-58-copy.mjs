import fs from 'fs'

const files = [
  'src/data/fiftyEightProjects.js',
  'src/data/zhaoShangProjects.js',
  'src/data/marketplaceProjects.js',
  'src/data/freelanceProjects.js',
  'src/data/batchCases.js',
  'src/data/categories.js',
  'src/data/zhaoShang58.js',
]

for (const file of files) {
  let t = fs.readFileSync(file, 'utf8')
  t = t.replace(/'58热门'/g, "'热门'")
  t = t.replace(/58同城\/赶集/g, '市面')
  t = t.replace(/58同城/g, '市面')
  t = t.replace(/58培训/g, '职业培训')
  t = t.replace(/58到家/g, '上门服务平台')
  t = t.replace(/58社区/g, '社区')
  t = t.replace(/58「/g, '「')
  t = t.replace(/58\/赶集/g, '二手平台')
  t = t.replace(/58「二手」/g, '「二手平台」')
  t = t.replace(/58少见/g, '线上少见')
  t = t.replace(/58上/g, '线上')
  t = t.replace(/58招商/g, '招商')
  t = t.replace(/对照 58 招商/g, '对照市面招商')
  t = t.replace(/58同城招商加盟/g, '市面招商品类')
  t = t.replace(/（对照 cd\.58\.com\/zhaooshang\.shtml）/g, '')
  t = t.replace(/58同城招商加盟品类树（对照 cd\.58\.com\/zhaooshang\.shtml）/g, '市面招商品类树')
  t = t.replace(/58同城招商加盟品类树（对照 cd\.58\.com\/zhaoshang\.shtml）/g, '市面招商品类树')
  t = t.replace(/export const zhaoShangSource = 'https:\/\/cd\.58\.com\/zhaooshang\.shtml\/'\n\n/g, '')
  t = t.replace(/    url: 'https:\/\/cd\.58\.com\/[^']+',\n/g, '')
  t = t.replace(/\/\*\* 餐饮细类（兼容原 58 品类快捷筛选） \*\//g, '/** 餐饮细类快捷筛选 */')
  t = t.replace(/对照市面常见划分 \+ 58同城招商加盟品类/g, '对照市面常见划分与招商品类')
  t = t.replace(/参考 58同城\/赶集\/社区便民等常见类目补充/g, '参考市面常见类目补充')
  t = t.replace(/（58社区高频）/g, '（社区高频）')
  t = t.replace(/（58到家类）/g, '（上门服务类）')
  t = t.replace(/（58培训热门补漏）/g, '（培训热门补漏）')
  // Remaining "58X" at line starts in descriptions (e.g. 58面食类)
  t = t.replace(/58([\u4e00-\u9fa5])/g, '市面$1')
  fs.writeFileSync(file, t)
  console.log('updated', file)
}
