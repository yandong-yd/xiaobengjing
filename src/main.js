import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'
import { initBaiduAnalytics } from './lib/baiduAnalytics.js'
import { MAINTENANCE_MODE } from './lib/maintenance.js'
import App from './App.vue'
import router from './router'
import './style.css'

if (MAINTENANCE_MODE) {
  document.title = '小本经 · 暂停访问'
  document.getElementById('app').innerHTML = `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:2rem;background:#f6f8fa;color:#1f2328;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif;
      text-align:center;
    ">
      <div style="max-width:28rem">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 0.75rem">网站暂停访问</h1>
        <p style="margin:0;color:#656d76;line-height:1.6;font-size:0.95rem">
          小本经正在维护迁移中，暂时无法访问。<br />恢复后会重新开放，请稍后再来。
        </p>
      </div>
    </div>
  `
} else {
  createApp(App).use(createPinia()).use(router).mount('#app')
  inject()
  initBaiduAnalytics()
}
