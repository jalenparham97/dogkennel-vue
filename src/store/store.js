import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import profile from '@/store/modules/profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    profile
  }
})
