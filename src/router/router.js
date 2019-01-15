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
      },
    ]
  },
//   {
//     path: '/person',
//     icon: 'icon-person', // 图标
//     name: 'person',
//     title: '个人设置',
//     component: ReMain,
//     children: [
//       {
//         path: 'personinfo',
//         title: '个人资料设置',
//         name: 'person-info',
//         icon: 'icon-person-info',
//         component: () => import('@/components/person/PersonInfo.vue')
//       },
//       {
//         path: 'changeps',
//         title: '修改密码',
//         icon: 'icon-chang-ps',
//         name: 'change-ps',
//         component: () => import('@/components/person/ChangPs.vue')
//       },
//     ]
//   },
//   {
//     path: '/edit',
//     icon: 'icon-edit',
//     name: 'edit',
//     title: '文档编辑',
//     component: ReMain,
//     children: [
//       {
//         path: 'text-edit',
//         icon: 'icon-text-edit',
//         name: 'text-edit',
//         title: '富文本编辑器',
//         component: () => import('@/components/textedit/TArticle.vue')
//       },
//       {
//         path: 'markdown-edit',
//         icon: 'icon-markdown',
//         name: 'markdown-edit',
//         title: 'Markdown编辑器',
//         component: () => import('@/components/textedit/MArticle.vue')
//       },
//     ]
//   },
//   {
//     path: '/list',
//     icon: 'icon-list',
//     name: 'list',
//     title: '查询列表',
//     component: ReMain,
//     children: [
//       {
//         path: 'index',
//         name: 'search-list',
//         title: '查询列表',
//         component: () => import('@/components/feature/SearchList.vue')
//       },
//     ]
//   },
//   {
//     path: '/form',
//     icon: 'icon-form',
//     name: 'form',
//     title: '表单模板',
//     component: ReMain,
//     children: [
//       {
//         path: 'index',
//         name: 'template-form',
//         title: '表单模板',
//         component: () => import('@/components/feature/TemplateForm.vue')
//       },
//     ]
//   },
//   {
//     path: '/interesting',
//     icon: 'icon-solid-like',
//     name: 'interesting',
//     title: '有趣的收集',
//     component: ReMain,
//     children: [
//       {
//         path: 'clock',
//         icon: 'icon-time',
//         name: 'clock-show',
//         title: '表盘展示',
//         component: (resolve) => require(['@/components/interesting/ClockShow'], resolve),
//       },
//     ]
//   },
//   {
//     path: '/map',
//     icon: 'el-icon-location',
//     name: 'map',
//     title: 'openlayers',
//     component: ReMain,
//     children: [
//       {
//         path: 'olmap',
//         icon: 'icon-mark',
//         name: 'olmap',
//         title: 'openlayers测试',
//         component: (resolve) => require(['@/components/ol/OlMap'], resolve),
//       },
//       {
//         path: 'olbdmap',
//         icon: 'icon-mark',
//         name: 'olbdmap',
//         title: 'ol百度地图',
//         component: (resolve) => require(['@/components/ol/OlBaiduMap'], resolve),
//       },
//       {
//         path: 'drawbd',
//         icon: 'icon-mark',
//         name: 'oldraw',
//         title: '绘制几何图形',
//         component: (resolve) => require(['@/components/ol/OlDrawBd'], resolve),
//       },
//       {
//         path: 'measurement',
//         icon: 'icon-mark',
//         name: 'measurement',
//         title: '地图测量',
//         component: (resolve) => require(['@/components/ol/OlMeasurement'], resolve),
//       },
//       {
//         path: 'Arcgis',
//         icon: 'icon-mark',
//         name: 'olarcgis',
//         title: 'Arcgis',
//         component: (resolve) => require(['@/components/ol/OlArcgis'], resolve),
//       },
//       {
//         path: '3D',
//         icon: 'icon-mark',
//         name: 'ol3d',
//         title: '3D地图',
//         component: (resolve) => require(['@/components/ol/Ol3d'], resolve),
//       }
//     ]
//   },
//   {
//     path: '/3dmap',
//     icon: 'el-icon-location',
//     name: 'cesiummap',
//     title: '3D操作 ',
//     component: ReMain,
//     children: [
//       {
//         path: 'ArcGIS3D',
//         icon: 'icon-mark',
//         name: 'arcgis3d',
//         title: '搜索切换',
//         component: (resolve) => require(['@/components/ol/Arcgis3d'], resolve),
//       },
//       {
//         path: 'searchdraw',
//         icon: 'icon-mark',
//         name: 'searchdraw',
//         title: '绘制打点',
//         component: (resolve) => require(['@/components/ol/SearchDraw'], resolve),
//       },
//       {
//         path: 'arcjs',
//         icon: 'icon-mark',
//         name: 'arcjs',
//         title: '统计查询',
//         component: (resolve) => require(['@/components/ol/ArcJs2d'], resolve),
//       }
//     ]
//   },
//   {
//     path: '/sandbox',
//     icon: 'icon-line-data', // 图标
//     name: 'sandbox',
//     title: '沙箱环境',
//     component: ReMain,
//     children: [
//       {
//         path: 'ptyhonbox',
//         title: 'Python命令行',
//         name: 'ptyhonbox',
//         icon: 'icon-person-info',
//         component: () => import('@/components/sandbox/PythonBox.vue')
//       },
//     ]
//   },
]

export const routers = [
  otherRouter,
  locking,
  loginRouter,
  registRouter,
  ...appRouter,
]
