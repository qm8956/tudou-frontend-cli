import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    height: 500,
    isHome: true
  },
  mutations: {
    resize (state, height) {
      state.height = height
    },
    setIsHome (state, yn) {
      state.isHome = yn
    }
  },
  actions: {
    increment (context, height) {
      context.commit('resize', height)
    },
    setIsHome (context, yn) {
      context.commit('setIsHome', yn)
    }
  },
  modules: {
    app,
    user
  }
})
