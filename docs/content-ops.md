# 案例与项目库：持续更新与优化

内容目前以仓库内 `src/data/*.js` 为准（构建进静态站）。持续优化靠 **运营加权表 + 体检脚本 + 固定节奏**，不必先上 CMS。

## 闭环（每周）

```
百度统计 / 收藏反馈
        ↓
npm run content:health   ← 看推荐位、过期、低分
        ↓
改 content.overrides.js 或正文分片
        ↓
npm run covers:map && npm run verify
        ↓
构建部署（腾讯云站点）
```

| 节奏 | 做什么 |
|------|--------|
| **每周** | `content:health`；调 5～10 条 `priority` / `updated_at`；换 3 张不对的封面 |
| **每两周** | 新增或重写 2～3 个案例（story + process + profit_model） |
| **每月** | 归档过时项目 `status: 'archived'`；对齐热门品类与 `hotTags` |
| **每季** | 按百度热门落地页，重写 Top 20 项目详情（成本/风险/流程） |

## 改哪里（由轻到重）

### 1. 只改推荐位 / 上下架（最快）

编辑 [`src/data/content.overrides.js`](../src/data/content.overrides.js)：

```js
export const projectContentOverrides = {
  1: { priority: 90, updated_at: '2026-07-20' },
  99: { status: 'archived' }, // 下架，库与首页不再展示
}

export const caseContentOverrides = {
  1: { priority: 95, updated_at: '2026-07-22' },
}
```

- `priority`：越大越靠前（首页 + 项目库/案例库「推荐」排序）
- `updated_at`：ISO 日期；复审后刷新，避免健康报告一直 stale
- `status`：`published` | `draft` | `archived`

### 2. 改正文（质量）

| 类型 | 文件 |
|------|------|
| 基础项目 | `src/data/mock.js`（`baseProjects`） |
| 扩展项目 | `extraProjects.js` / `batchProjects.js` / … |
| 案例 | `mock.js`（`baseCases`）、`extraCases.js`、`batchCases.js` |

项目至少：`name` `category` `description` `tags` `cost_min` `cost_max`  
案例至少：`title` `city` `story` `process` `monthly_profit` `tags`

### 3. 封面

见 [`docs/covers.md`](covers.md)。专项：`covers.overrides.js` → `npm run covers:map`。

## 命令

| 命令 | 作用 |
|------|------|
| `npm run content:health` | 推荐位预览、stale 清单、低分候选 |
| `npm run audit:content` | 缺字段则失败；stale 为 warning |
| `npm run audit:covers` | 封面映射/文件 |
| `npm run verify` | typecheck + test + 双审计 + build |

## 站内如何体现「优化」

- **首页**：`sortPublished()` → priority → 最近更新
- **项目库**：默认排序 = 推荐（同上）；`archived` 不展示
- **案例库**：同上

运营调 `content.overrides.js` 后重新部署，列表顺序立刻变化。

## 用数据决定改谁（L3）

当前收藏在浏览器本地、百度统计在站外，建议人工对照：

1. 百度统计 → 热门页面路径 `/projects/:id`、`/cases/:id`
2. 高打开、低停留 → 优先重写描述/封面  
3. 高收藏、低转化（进计算器少）→ 补成本表与风险  
4. 长期无流量 → `archived` 或降 `priority`

以后若接服务端统计，可把 PV/收藏写入加权脚本，自动生成 overrides 草稿。

## 新增一条内容的检查清单

- [ ] 正文字段齐全  
- [ ] 封面：overrides 或数据里写 `cover`  
- [ ] `npm run covers:map`  
- [ ] 在 `content.overrides.js` 给初始 `priority` + 今天的 `updated_at`  
- [ ] `npm run content:health` 确认进推荐预览（如需要）  
- [ ] `npm run verify` → 部署  
