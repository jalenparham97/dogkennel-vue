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
    commit('setProfile', payload)
    console.log({...payload, user_id: rootState.auth.user.user_id})
  },
  getProfile: ({ rootState, commit }) => {
    db.collection('profiles').where('user_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        commit('setProfile', doc.data())
      })
    })
  }
}

const getters = {
  profile: (state) => {
    return state.profile
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};