import axios from 'axios'

/* eslint-disable no-undef */
let setUser = (user) => {
  localStorage.userinfo = JSON.stringify(Object.assign(user, { expires: new Date().getTime() }))
}

const state = {
  user: null,
  token: null,
  isLogin: false
}

const mutations = {
  setUser (state, user) {
    state.user = user.user
    state.token = user.token
    axios.defaults.headers.common['Authorization'] = `QM ${user.token}`
    // axios.defaults.headers.common['Authorization'] = '123132'  // 测试token失效使用
    state.isLogin = true
    // 用户信息当天有效
    setUser(user)
  },
  loginOut (state) {
    state.user = null
    state.token = null
    state.isLogin = false
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('userinfo')
  },
  modifyUser (state, newUser) {
    state.user.userDetails.profilePicture = newUser.profilePicture
    state.user.userDetails.phone = newUser.phone
    state.user.userDetails.nickName = newUser.nickName
    state.user.userDetails.email = newUser.email
    setUser(newUser)
  },
  upUserType (state, type) {
    state.user.user.userType = type.userType
  },
  upMemberStatus (state, type) {
    state.user.memberStatus = type
  },
  upPaymentStatus (state, type) {
    state.user.paymentStatus = type
  }
}

const actions = {
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  loginOut ({ commit }) {
    commit('loginOut')
  },
  upUserType ({ commit }, type) {
    commit('upUserType', type)
  },
  upMemberStatus ({ commit }, type) {
    commit('upMemberStatus', type)
  },
  upPaymentStatus ({ commit }, type) {
    commit('upPaymentStatus', type)
  }
}

export default {
  state,
  mutations,
  actions
}
