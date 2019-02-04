import router from '@/router'
import db from '@/db/db'

const state = {
  profile: null,
  petProfiles: []
}

const mutations = {
  setProfile: (state, payload) => {
    state.profile = payload
  },
  setPetProfiles: (state, payload) => {
    state.petProfiles.push(payload)
  },
  resetProfile: state => {
    state.profile = null
  }, 
  resetPetProfiles: state => {
    state.petProfiles = []
  }
}

const actions = {
  saveProfile: ({ rootState, commit }, payload) => {
    db.collection('profiles').add({...payload, user_id: rootState.auth.user.user_id})
    router.push('/reservation')
    commit('setProfile', payload)
  },
  getProfile: ({ rootState, commit }) => {
    db.collection('profiles').where('user_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        commit('setProfile', doc.data())
      })
    }).catch(err => {
      console.log(err)
    })
  },
  addPetProfile: ({ rootState, commit }, payload) => {
    db.collection('pet-profiles').add({...payload, user_id: rootState.auth.user.user_id})
    commit('setPetProfiles', {...payload, user_id: rootState.auth.user.user_id, toggle: false})
  },
  getPetProfiles: ({ rootState, commit }) => {
    db.collection('pet-profiles').where('user_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        commit('setPetProfiles', {...doc.data(), toggle: false})
      })
    }).catch(err => {
      console.log(err)
    })
  },
  updateProfile: ({ rootState, commit }, payload) => {
    db.collection('profils').where('user_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        console.log(doc.data())
      })
      // commit('setProfile', payload)
      // router.push(`/profile/${rootState.auth.user.user_id}`)
    }).catch(err => console.log(err))
  },
  resetState: ({ state, commit }) => {
    commit('resetProfile')
    commit('resetPetProfiles')
    console.log(state.petProfiles, state.profile)
  }
}

const getters = {
  profile: state => {
    return state.profile
  },
  petProfiles: state => {
    return state.petProfiles
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};