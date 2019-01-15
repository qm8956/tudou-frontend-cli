import Vue from 'vue'
import axios from 'axios'
import OSS from 'ali-oss'
let time = 0
let client = {}
/**
 * 1. 维护时长为12min(后台维护时长为15min)，可根据需求自行修改
 * 2. 路径为'/aliyun/oss/stsPolicy',时间戳为防止缓存使用，可根据需求自行修改
 * 3. 由于全局使用文件上传组件，所以本插件使用并不多，并未进行真正插件扩充，使用时请引入
 */
export default async function () {
  try {
    let newTime = new Date().getTime()
    if (newTime - time < 1000 * 60 * 12) {
      return client
    }
    // 为防止ie对此请求的缓存，特意加了时间戳
    let res = await axios.get('/aliyun/oss/stsPolicy?timestamp=' + new Date().getTime())
    if (res.data.code === 1) {
      time = newTime
    } else {
      Vue.codeError(res)
      return
    }

    let ossData = res.data.data
    client = new OSS({
      accessKeyId: ossData.AccessKeyId,
      accessKeySecret: ossData.AccessKeySecret,
      stsToken: ossData.SecurityToken,
      bucket: 'itudou-cloud-normal',
      region: 'oss-cn-beijing'
    })
    return client
  } catch (error) {
    Vue.catchError(error)
  }
}
