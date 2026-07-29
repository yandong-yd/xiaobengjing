# 封面与内容自更新指南

## 问题

旧逻辑用「品类图池 + 模糊标签」抽图，容易出现封面与项目不符（例如烧烤被标成饮品图）。

## 现行方案

```
covers.overrides.js     ← 人工精选（最高优先）
covers.map.json         ← 全量显式映射（npm run covers:map 生成）
coverRegistry.js        ← 品类/名称/高置信标签 → 图池规则
public/images/covers/   ← 本地 JPG（可同步到腾讯云 COS）
```

运行时解析顺序：`item.cover` → overrides → `covers.map.json` → 规则推断（仅开发环境 warn）。

## 日常命令

| 命令 | 作用 |
|------|------|
| `npm run covers:map` | 按规则重写全量封面映射 |
| `npm run audit:covers` | 缺映射/缺文件则失败 |
| `npm run audit:content` | 描述/标签/成本等体检 |
| `npm run covers:suggest -- --id 1` | Unsplash/Pexels 搜候选图 |
| `npm run download:covers` | 从 Unsplash 拉默认图池 |

`npm run verify` 已包含封面与内容审计。

## 给某个项目换更贴切的封面

1. 把图片放到 `public/images/covers/`，例如 `food-jianbing.jpg`
2. 在 `src/data/covers.overrides.js` 增加：
   ```js
   1: localCoverPath('food-jianbing'),
   ```
3. 运行 `npm run covers:map && npm run audit:covers`
4. 构建部署

或直接在项目数据上写：

```js
{
  id: 1,
  name: '煎饼果子摊',
  cover: '/images/covers/food-jianbing.jpg',
  cover_alt: '煎饼果子摊出摊场景',
  cover_source: 'local',
}
```

## 腾讯云 COS（可选）

1. 创建存储桶，开启静态网站/CDN，目录保持 `/images/covers/`
2. 上传 `public/images/covers/*`
3. `.env` 设置：
   ```env
   VITE_COVER_CDN=https://cdn.xiaobenjing.com
   ```
4. 重新 `npm run build` 部署

未配置 CDN 时，继续走本站 `/images/covers/`。

## 候选图辅助（可选）

```bash
# .env 配置 UNSPLASH_ACCESS_KEY 或 PEXELS_API_KEY
npm run covers:suggest -- --type project --id 3
npm run covers:suggest -- --type project --limit 20
```

结果在 `tmp/cover-suggestions/`。人工挑选后下载到本地图库，再写入 overrides。

## 内容自我更新与优化

完整运营手册见 [`docs/content-ops.md`](content-ops.md)。

快捷路径：改 [`src/data/content.overrides.js`](../src/data/content.overrides.js) 的 `priority` / `updated_at` / `status` → `npm run content:health` → `verify` → 部署。

## 目录约定

```
public/images/covers/
  food-0.jpg …          # 默认图池
  food-jianbing.jpg     # 项目专属（推荐命名：品类-slug）
```
