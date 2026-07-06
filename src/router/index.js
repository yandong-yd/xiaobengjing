import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo } from '../lib/seo.js'
import { trackBaiduPageview } from '../lib/baiduAnalytics.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoryBrowseView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/project/:id',
    name: 'project-detail',
    component: () => import('../views/ProjectDetailView.vue'),
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('../views/CasesView.vue'),
  },
  {
    path: '/case/:id',
    name: 'case-detail',
    component: () => import('../views/CaseDetailView.vue'),
  },
  {
    path: '/ai',
    name: 'ai',
    component: () => import('../views/AiView.vue'),
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('../views/GuideView.vue'),
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('../views/CalculatorView.vue'),
  },
  {
    path: '/part-time',
    name: 'part-time',
    component: () => import('../views/ModeProjectsView.vue'),
    meta: { workMode: 'parttime' },
  },
  {
    path: '/remote',
    name: 'remote',
    component: () => import('../views/ModeProjectsView.vue'),
    meta: { workMode: 'remote' },
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: () => import('../views/ChallengesView.vue'),
  },
  {
    path: '/insights',
    name: 'insights',
    component: () => import('../views/InsightsView.vue'),
  },
  {
    path: '/stories',
    name: 'stories',
    component: () => import('../views/StoriesView.vue'),
  },
  {
    path: '/franchise',
    name: 'franchise',
    component: () => import('../views/FranchiseView.vue'),
  },
  {
    path: '/franchise/:id',
    name: 'franchise-detail',
    component: () => import('../views/FranchiseDetailView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  applyRouteSeo(to)
  trackBaiduPageview(to.fullPath)
})

export default router
