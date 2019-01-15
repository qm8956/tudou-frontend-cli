// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { appRouter } from './router/router'
import store from './store'
// 引入bootstrap4样式源码
import './bootstrap-scss/bootstrap.scss'
// 引入自己扩展的scss全局样式库
import './element-variables.scss'
// 引入element
import ElementUI from 'element-ui'
// 由于element自带验证器局限性大，不能满足一些特殊情况，单独引入验证模块
import VeeValidate from 'vee-validate'
// 自定义验证器
import './validate.js'
// 常用工具插件
import Utils from './plugins/Utils'
// 处理请求参数得插件
import paramsConvert from './plugins/paramsConvert'
// 图片点击预览插件
import './plugins/imgViewer'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 错误处理
import errorPage from './plugins/errorPage'

// 自己制作的字体图标库
require('./fonts/style.css')

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VeeValidate)
Vue.use(Utils)
Vue.use(paramsConvert)
// 图片懒加载的默认图片像素要小，图片大小越小越好
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/img-load-fail.png',
  loading: 'static/mohutupian.png',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
Vue.use(errorPage)

// 返回顶部
Vue.component('back-top', (resolve) => { require(['./components/common/BackTop'], resolve) })
// 城市级联
Vue.component('city-cascader', (resolve) => { require(['./components/common/CtiyCascader'], resolve) })
// 文件上传
Vue.component('file-upload', (resolve) => { require(['./components/common/FileUpload'], resolve) })
// 功能未开通提示
Vue.component('promp', (resolve) => { require(['./components/common/Promp'], resolve) })
// 富文本编辑器(由于文件太大，暂时没有引入)
// Vue.component('text-edit', (resolve) => { require(['./components/common/TextEdit'], resolve) })
// 时间轴组件
Vue.component('timeline-item', (resolve) => { require(['./components/common/TimeLineItem'], resolve) })
Vue.component('time-line', (resolve) => { require(['./components/common/TimeLine'], resolve) })

/* eslint-disable no-undef */
router.beforeEach(function (to, from, next) {
  const nextRoute = []
  // 跳转至上述页面
  if (!store.state.user.user) {
    let user = localStorage.userinfo ? JSON.parse(localStorage.userinfo) : null
    // 未登录
    if (!user || new Date().getTime() - user.expires > 24 * 60 * 60 * 1000) {
      if (nextRoute.indexOf(to.name) >= 0) { // 需要用户，增跳转登录也
        next({
          replace: true,
          name: 'home'
        })
        return
      }
    } else {
      store.dispatch('setUser', user)
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
  },
  created () {
    let tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }

})
