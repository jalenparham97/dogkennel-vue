import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import profile from '@/store/modules/profile'
import reservation from '@/store/modules/reservation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    reservation
  }
})
