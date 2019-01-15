import Vue from 'vue'
import axios from 'axios'

const postGen = async function (self, type) {
  let params = Object.assign({}, {
    offset: (self.pageIndex - 1) * self.pageSize,
    limit: self.pageSize
  }, self.params, self.condition)
  self.loading = true
  await axios.post(self.url, self.formData ? Vue.paramsConvert(params) : params).then(res => {
    if (res.data.code === 1) {
      // 满足两种数据结构，由于分页查询问题
      // 1. 返回数据不包含总条数count，第二层data为数据数组
      // 2. 返回数据包含总条数count，第二层data为对象，里面包含count，和data两个属性，count为总条数，data为数据数组
      let data = []
      if (res.data.data instanceof Array) {
        data = res.data.data || []
      } else {
        data = res.data.data.data || []
        self.count = res.data.data.count
        self.totalPage = Math.ceil(self.count / self.pageSize)
      }

      if (type === 'ADD') {
        self.rows.push(...data)
      } else {
        self.rows = data
      }

      if (data.length < self.pageSize) {
        self.hasMore = false
      } else {
        self.hasMore = true
      }
    } else {
      Vue.codeError(res)
    }
  }).catch(error => {
    Vue.catchError(error)
  }).finally(() => {
    self.loading = false
  })
}

export default class PagedList {
  constructor (url, pageSize = 20, params = {}, { formData = true } = {}) {
    this.url = url
    this.pageSize = pageSize
    this.params = params
    this.formData = formData

    this.loading = false
    // 当前页
    this.pageIndex = 1
    // 符合条件的数据总数
    this.count = 0
    // 符合条件的数据总页数
    this.totalPage = 0
    // 加载过来的数据
    this.rows = []
    // 是否还有更多数据
    this.hasMore = true
    // 条件
    this.condition = {}
  }
  /**
   * @param {*} condition 需要额外传入的条件
   */
  search (condition = {}) {
    this.pageIndex = 1
    this.condition = condition
    return postGen(this)
  }
  /**
   * 加载更多，新查询的数据会添加到原有的数组中而不是替代
   */
  addLoad () {
    this.pageIndex += 1
    return postGen(this, 'ADD')
  }

  // 加载下一页或指定页码
  pageLoad (pageNo) {
    this.pageIndex = pageNo || this.pageIndex + 1
    return postGen(this)
  }
  // 刷新，删除修改等操作后需要刷新数据,不用传递任何参数
  refresh () {
    return postGen(this)
  }

  // 取消查询
}
