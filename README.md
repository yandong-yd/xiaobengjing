# 小本经 · 摆摊手册

小本创业宝典 — **从小本到老板**。输入预算，AI 帮你生成赚钱方案。

## 功能

- **首页** — 大搜索框、推荐项目、成功案例、热门标签
- **项目库** — 按预算/类型/难度筛选
- **项目详情** — 成本结构、收入模型、操作流程、风险提示、AI 建议
- **案例库** — 真实创业故事
- **AI 创业生成器** — 核心差异化功能

## 技术栈

- Vue 3 + Vite
- TailwindCSS 4
- Vue Router + Pinia
- Supabase（可选，默认使用内置 mock 数据）
- OpenAI API（可选，未配置时使用演示模式）

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 环境变量

复制 `.env.example` 为 `.env` 并填写：

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

未配置时网站使用内置 mock 数据和 AI 演示模式，可正常浏览和体验。

## Supabase 初始化

在 Supabase SQL Editor 中执行 `supabase/schema.sql`。

## 部署

```bash
npm run build
```

可部署到 Vercel、Netlify 等静态托管平台，或腾讯云 Nginx（见 `deploy/`）。

封面：[`docs/covers.md`](docs/covers.md) · 案例/项目库持续优化：[`docs/content-ops.md`](docs/content-ops.md)

```bash
npm run content:health  # 推荐位 / 过期 / 低分清单
npm run covers:map      # 生成全量封面映射
npm run audit:covers    # 封面体检
npm run audit:content   # 内容体检
npm run covers:suggest -- --id 1   # 候选图（需 API Key）
```

## 页面路由

| 路径 | 页面 |
|------|------|
| `/` | 首页 |
| `/projects` | 项目列表 |
| `/project/:id` | 项目详情 |
| `/cases` | 案例库 |
| `/case/:id` | 案例详情 |
| `/ai` | AI 创业生成器 |
