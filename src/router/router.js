import ReMain from '@/components/ReMain.vue'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import('@/components/server/Login.vue')
}

export const registRouter = {
  path: '/regist',
  name: 'regist',
  meta: {
    title: '注册'
  },
  component: () => import('@/components/server/Registe.vue')
}

export const locking = {
  path: '/locking',
  name: 'locking',
  meta: {
    title: '锁屏'
  },
  component: () => import('@/components/main/LockingPage.vue')
}

export const otherRouter = {
  path: '/',
  name: 'home',
  redirect: '/login',
  component: ReMain,
  children: [
    { path: 'home', title: '首页', name: 'home_index', component: () => import('@/components/home/Home.vue') },
  ]
}

export const appRouter = [
  {
    path: '/list',
    icon: 'icon-list',
    name: 'list',
    title: '查询列表',
    component: ReMain,
    children: [
      {
        path: 'index',
        name: 'search-list',
        title: '查询列表',
        component: () => import('@/components/temp/SearchList.vue')
      }
    ]
  }
]

export const routers = [
  otherRouter,
  locking,
  loginRouter,
  registRouter,
  ...appRouter,
]
