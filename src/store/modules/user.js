import axios from 'axios'
let setUser = (state, user) => {
  state.user = user
  localStorage.userinfo = JSON.stringify(Object.assign(user, { expires: new Date().getTime() })) // eslint-disable-line
}

const state = {
  user: null,
  token: null,
  isLogin: false
}

const mutations = {
  login (state, user) {
    console.log('登录的一些操作')
    // 针对jwt验证使用
    axios.defaults.headers.common['Authorization'] = user.token
    state.isLogin = true
    setUser(state, user)
  },
  loginOut (state) {
    console.log('登出的一些操作')
    state.isLogin = false
    localStorage.removeItem('userinfo') // eslint-disable-line
  },
  modifyUser (state, userInfo) {
    console.log('修改用户操作')
    setUser(state, userInfo)
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
