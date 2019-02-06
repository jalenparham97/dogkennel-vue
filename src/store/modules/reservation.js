import router from '@/router'
import db from '@/db/db'

const state = {
  reservations: [],
  kennels: [],
}

const mutations = {
  addReservations: (state, payload) => {
    state.reservations.push(payload)
  },
  setReservations: (state, reservaions) => {
    state.reservations = reservaions
  },
  reset: state => {
    state.reservations = []
  },
  setKennels: (state, kennels) => {
    state.kennels = kennels
  }
}

const actions = {
  saveReservation: ({ rootState, commit }, payload) => {
    console.log(payload)
    const reservation = {...payload, creator_id: rootState.auth.user.user_id}
    commit('addReservations', reservation)
    router.push(`/profile/${rootState.auth.user.user_id}`)
    db.collection('reservations').add(reservation)
  },
  getReservations: ({ rootState, commit }) => {
    db.collection('reservations').where('creator_id', '==', rootState.auth.user.user_id).get().then(snapShot => {
      const reservations = []
      snapShot.docs.forEach(doc => {
        reservations.push({...doc.data()})
      })
      commit('setReservations', reservations)
    })
  },
  resetState: ({ commit }) => {
    commit('reset')
  },
  cancelReservation: ({ dispatch }, payload) => {
    db.collection('reservations').where('id', '==', payload).get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        doc.ref.delete()
      })
      dispatch('getReservations')
    })
  },
  async getKennels({ commit }) {
    const kennelsRef = db.collection('kennels').where('status', '==', 'available').orderBy('id', 'asc')
    const snapShot = await kennelsRef.get()

    const kennels = []
    snapShot.docs.forEach(doc => {
      kennels.push({...doc.data()})
    })

    commit('setKennels', kennels)
  },

  async checkReservationsDate() {
    const now = new Date().getDate()
    const reservationsRef = db.collection('reservations')
    const kennelsRef = db.collection('kennels')

    const reservations = await reservationsRef.get()
    const kennels = await kennelsRef.get()

    reservations.docs.forEach(doc => {
      const res = doc.data()
      const resDate = new Date(res.checkin_date).getDate()

      if (resDate <= now) {
        kennels.docs.forEach(doc => {
          if (res.selected_kennel === doc.data().kennel_name) {
            doc.ref.update({ status: 'unavailable' })
          } 
        }) 
      }
    })
  }
}

const getters = {
  reservations: state =>  state.reservations,
  kennels: state => state.kennels

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};