import router from '@/router'
import db from '@/db/db'

const state = {
  profile: null
}

const mutations = {
  setProfile: (state, payload) => {
    state.profile = payload
  }
}

const actions = {
  saveProfile: ({ rootState, commit }, payload) => {
    db.collection('profiles').add({...payload, user_id: rootState.auth.user.user_id})
    router.push('/reservation')
    console.log({...payload, user_id: rootState.auth.user.user_id})
  }
}

const getters = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};