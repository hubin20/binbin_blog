import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/front/home.vue'),
    children: [
      {
        path:'/home/article',
        name: 'article',
        component:() => import('@/views/front/article.vue')
      },
      {
        path:'/home/wallmessage',
        name: 'wallmessage',
        component:() => import('@/views/front/WallMessage.vue')
      },
      {
        path:'/home/photo',
        name: 'photo',
        component:() => import('@/views/front/photo.vue')
      },
      {
        path:'/home/video',
        name: 'video',
        component:() => import('@/views/front/video.vue')
      },
      {
        path:'/home/detail',
        name: 'detail',
        component:() => import('@/views/front/detail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/main/analysis/article-analysis',
        name: 'analysis',
        component: () => import('@/views/main/analysis/article-analysis.vue')
      },
      {
        path: '/main/user/user-info',
        name: 'userinfo',
        component: () => import('@/views/main/user/user-info.vue')
      },
      {
        path: '/main/user/user-avatar',
        name: 'useravatar',
        component: () => import('@/views/main/user/user-avatar.vue')
      },
      {
        path: '/main/user/user-resetpwd',
        name: 'userresetpwd',
        component: () => import('@/views/main/user/user-resetpwd.vue')
      },
      {
        path: '/main/article/category',
        name: 'category',
        component: () => import('@/views/main/article/category.vue')
      },
      {
        path: '/main/article/list',
        name: 'list',
        component: () => import('@/views/main/article/list.vue')
      },
      {
        path: '/main/article/publish',
        name: 'publish',
        component: () => import('@/views/main/article/publish.vue')
      },
      {
        path: '/main/article/update',
        name: 'update',
        component: () => import('@/views/main/article/update.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path === '/home') {
    return '/home/article'
  }
  var reg=/^\/home/
  if (to.path !== '/login' && !reg.test(to.path)) {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
