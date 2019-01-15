import router from '../router'
import { Message } from 'element-ui'

let errorPage = {}

errorPage.install = function (Vue, options) {
  // 接受错误的error
  Vue.catchError = Vue.prototype.$catchError = function (error, ...funcs) {
    if (!error.response) {
      Message({
        // duration: 0,
        showClose: true,
        message: `错误信息：${error}`,
        type: 'error'
      })
      return
    }
    // debugger
    if (error.response.status === 401) {
      // 跳首页，打开登录
      router.push({ name: 'login' })
      Vue.openLogin()
    } else {
      router.push({ path: `/${error.response.status}` })
    }
    funcs.forEach(func => func())
  }
  // 返回正确接收返回非1的错误码
  Vue.codeError = Vue.prototype.$codeError = function (res, ...funcs) {
    // 返回状态为200，但返回code不是1
    if (res.data.code === 0) {
      Message({
        // duration: 0,
        showClose: true,
        message: `错误信息：${res.data.data}`,
        type: 'error'
      })
    } else {
      Message({
        // duration: 0,
        showClose: true,
        message: `错误信息：${res.data.data[0].errorMsg}`,
        type: 'error'
      })
    }
    funcs.forEach(func => func())
  }
}
export default errorPage
