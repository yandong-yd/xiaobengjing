<template>
  <footer class="bg-[#0d1117] text-[#8b949e] py-8 mt-10 border-t border-[#21262d]">
    <div class="app-container">
      <div class="flex flex-col md:flex-row justify-between items-start gap-6 text-xs md:text-sm">
        <div>
          <div class="flex items-center gap-2 text-white font-semibold mb-1.5">
            <AppLogo size="sm" />
            <span>小本经</span>
          </div>
          <p class="max-w-xs text-[#8b949e] leading-relaxed">从小本到老板 · 摆摊手册 · 算得清的小本创业宝典</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
          <div class="space-y-1.5">
            <p class="text-[#c9d1d9] font-medium text-xs uppercase tracking-wide">浏览</p>
            <router-link to="/projects" class="block hover:text-white transition-colors">项目库</router-link>
            <router-link to="/part-time" class="block hover:text-white transition-colors">兼职副业</router-link>
            <router-link to="/remote" class="block hover:text-white transition-colors">居家办公</router-link>
            <router-link to="/cases" class="block hover:text-white transition-colors">成功案例</router-link>
          </div>
          <div class="space-y-1.5">
            <p class="text-[#c9d1d9] font-medium text-xs uppercase tracking-wide">工具</p>
            <router-link to="/ai" class="block hover:text-white transition-colors">投资顾问</router-link>
            <router-link to="/calculator" class="block hover:text-white transition-colors">利润计算器</router-link>
            <router-link to="/guide" class="block hover:text-white transition-colors">新手指南</router-link>
            <router-link to="/franchise" class="block hover:text-white transition-colors">加盟避坑</router-link>
          </div>
          <div class="space-y-1.5">
            <p class="text-[#c9d1d9] font-medium text-xs uppercase tracking-wide">社区</p>
            <router-link to="/insights" class="block hover:text-white transition-colors">创业心得</router-link>
            <router-link to="/challenges" class="block hover:text-white transition-colors">创业难题</router-link>
            <router-link to="/stories" class="block hover:text-white transition-colors">故事</router-link>
          </div>
        </div>
      </div>
      <div class="border-t border-[#21262d] mt-6 pt-4 text-xs text-center text-[#8b949e] space-y-1.5">
        <p>© 2026 小本经 · 摆摊手册</p>
        <p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >蜀ICP备2026042981号-1</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import AppLogo from './AppLogo.vue'
</script>
