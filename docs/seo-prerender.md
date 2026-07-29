# SEO 预渲染说明

## 为什么「查看源代码」以前都一样？

本站是 Vue SPA：浏览器里 JS 会改 `document.title` / meta，但服务器直接返回的始终是同一份 `index.html`。  
搜索引擎与「查看网页源代码」读的是这份静态 HTML，所以会感觉 TDK 没生效。

## 现在怎么做？

`npm run build` 结束后自动跑 `scripts/prerender-html.mjs`：

1. 读取 `dist/index.html` 作为模板  
2. 按路由调用与线上一致的 `resolveRouteSeo`  
3. 写入 `dist/<path>/index.html`（例如 `dist/project/1/index.html`）

Nginx 已有：

```nginx
try_files $uri $uri/ /index.html;
```

访问 `/project/1` 时会命中目录下的预渲染 HTML，`<title>` / description / keywords 各页不同。

## 校验

```bash
npm run build
# 对比
grep -o '<title>[^<]*' dist/index.html
grep -o '<title>[^<]*' dist/calculator/index.html
grep -o '<title>[^<]*' dist/project/1/index.html
```

线上也可用「查看源代码」分别打开首页、计算器、某个项目详情对比。
