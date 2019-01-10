export const loginRouter = {
  path: '/login',
  name: 'login',
  title: '登录',
  component: () => import('@/components/server/Login')
}

export const registerRouter = {
  path: '/register',
  name: 'register',
  title: '注册',
  component: () => import('@/components/server/Register')
}

export const prompRouter = {
  path: '/promp',
  name: 'promp',
  title: '未开通提示',
  component: () => import('@/components/common/Promp')
}

export const errorRouter = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/components/error-page/ErrorPage')
}

// 页头顶部导航(便于书写)
export const headerRouter = [
  {
    path: '/home',
    name: 'first-content',
    title: '首页',
    icon: 'static/logo_index.png',
    component: () => import('@/components/home-page/FirstContent')
  }, 
  {
    path: '/outside-one',
    name: 'outside-one',
    title: '标题一',
    component: () => import('@/components/temp/OutsideOne')
  },
  {
    path: '/outside-two',
    name: 'outside-two',
    title: '标题二',
    component: () => import('@/components/temp/OutsideTwo')
  },
  {
    path: '/inner',
    name: 'inner',
    title: '两层标题',
    component: () => import('@/App'),
    children: [
      {
        path: 'inner-one',
        name: 'inner-one',
        title: '内部标题一',
        component: () => import('@/components/temp/InnerOne')
      },
      {
        path: 'inner-two',
        name: 'inner-two',
        title: '内部标题二',
        component: () => import('@/components/temp/InnerTwo')
      }
    ]
  }
]


export const routers = [
  {
    path: '/',
    name: 'home',
    title: '应用',
    component: () => import('@/components/home-page/HomePage'),
    children: [
      ...headerRouter,
      loginRouter,
      registerRouter,
      prompRouter,
      errorRouter
    ]
  }
]
