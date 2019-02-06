import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import profile from '@/store/modules/profile'
import reservation from '@/store/modules/reservation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDay: null
  },

  mutations: {
    setCurrentDay: (state, day) => {
      state.currentDay = day
    }
  },

  getters: {
    currentDay: state => state.currentDay
  },

  modules: {
    auth,
    profile,
    reservation,
  }
})
