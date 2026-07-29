import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'
import { initBaiduAnalytics } from './lib/baiduAnalytics.js'
import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(createPinia()).use(router).mount('#app')

inject()
initBaiduAnalytics()
