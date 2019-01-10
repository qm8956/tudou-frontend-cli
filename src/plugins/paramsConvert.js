import Qs from 'qs'

let paramsConvert = {}
paramsConvert.install = function (Vue, options) {
  // 讲object参数转化为formData格式，虽然用qs简化许多，但是由于使用频繁，所以将其扩充为插件，方便调用
  Vue.paramsConvert = Vue.prototype.$paramsConvert = function (obj) {
    return Qs.stringify(obj)
  }
}
export default paramsConvert
