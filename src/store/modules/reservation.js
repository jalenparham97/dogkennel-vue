import router from '@/router'
import db from '@/db/db'

const state = {
  reservations: []
}

const mutations = {
  addReservations: (state, payload) => {
    state.reservations.push(payload)
  },
  reset: state => {
    state.reservations = []
  }
}

const actions = {
  saveReservation: ({ rootState, commit }, payload) => {
    const reservation = {...payload, creator_id: rootState.auth.user.user_id}
    commit('addReservations', reservation)
    router.push(`/profile/${rootState.auth.user.user_id}`)
    db.collection('reservations').add(reservation)
  },
  getReservations: ({ rootState, state, commit }) => {
    db.collection('reservations').where('creator_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        commit('addReservations', doc.data())
      })
    })
  },
  resetState: ({ commit }) => {
    commit('reset')
  },
  cancelReservation: ({ dispatch }, payload) => {
    db.collection('reservations').where('id', '==', payload).onSnapshot(snapShot => {
      snapShot.docs.forEach(doc => {
        doc.ref.delete()
      })
    })
  }
}

const getters = {
  reservations: state => {
    return state.reservations
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};