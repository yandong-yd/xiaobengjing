/** 百度统计（仅生产环境加载，SPA 路由切换需手动上报） */
const HM_ID = import.meta.env.VITE_BAIDU_HM_ID || 'd742c9d19ada9f61cc4d6d18b94154e0'

let loaded = false

export function initBaiduAnalytics() {
  if (!import.meta.env.PROD || loaded || !HM_ID) return
  loaded = true

  window._hmt = window._hmt || []
  const script = document.createElement('script')
  script.async = true
  script.src = `https://hm.baidu.com/hm.js?${HM_ID}`
  document.head.appendChild(script)
}

export function trackBaiduPageview(path) {
  if (!import.meta.env.PROD || !HM_ID) return
  window._hmt = window._hmt || []
  window._hmt.push(['_trackPageview', path])
}
