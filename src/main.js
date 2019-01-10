// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入bootstrap scss源码文件
import './bootstrap-scss/bootstrap.scss'
// 引入自己扩展的scss全局样式库
import './element-variables.scss'
// 全局引入element-ui组件库，因为本项目使用的是element作为基础组件库全局使用
import ElementUI from 'element-ui'
// 由于element自带验证器局限性大，不能满足一些特殊情况，单独引入验证模块
import VeeValidate from 'vee-validate'
// 引入自定义扩充验证器
import './validate.js'
// 参数转换插件，为了方便扩充，所以单独出来
import paramsConvert from './plugins/paramsConvert'
// 常用工具插件
import Utils from './plugins/Utils'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VeeValidate)
Vue.use(paramsConvert)
Vue.use(Utils)
// 图片懒加载的默认图片像素要小，图片大小越小越好
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'static/img-load-fail.png',
  loading: 'static/mohutupian.png',
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})

// 导航守卫，可以做一下刷新后的处理
router.beforeEach(function (to, from, next) {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
