import router from '@/router'
import moment from 'moment'
import db from '@/db/db'
import { stat } from 'fs';

const state = {
  reservations: [],
  kennels: [],
  resError: '',
  isAvailable: true,
  selectedReservation: null,
  noMoreKennels: false
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
  },
  setResError: (state, error) => {
    state.resError = error
  },
  setIsAvailable: (state, isAvailable) => {
    state.isAvailable = isAvailable
  },
  setSelectedReservation: (state, reservation) => {
    state.selectedReservation = reservation
  },
  setNoMoreKennels: (state, boolean) => {
    state.noMoreKennels = boolean
  }
}

const actions = {
  isAvailableMethod({ commit }, isAvailable) {
    commit('setIsAvailable', isAvailable)
  },
  noMoreKennels({ commit }, boolean) {
    commit('setNoMoreKennels', boolean)
  },
  selectedReservation({ commit }, reservation) {
    commit('setSelectedReservation', reservation)
  },
  saveReservation: async ({ commit }, reservation) => {
    const reservationsRef = db.collection('reservations')
    await reservationsRef.add(reservation)
    commit('addReservations', reservation)
    router.push(`/profile/${reservation.creator_id}`)
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
  cancelReservation: ({ dispatch }, id) => {
    db.collection('reservations').where('res_id', '==', id).get().then(snapShot => {
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

  async updateKennelStatus() {
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
          res.reservedKennels.forEach(kennel => {
            if (kennel.kennel_name === doc.data().kennel_name) {
              doc.ref.update({ status: 'unavailable' })
            }
          })
        }) 
      }
    })
  }
}

const getters = {
  reservations: state =>  state.reservations,
  kennels: state => state.kennels,
  isAvailable: state => state.isAvailable,
  newUserReservation: state => state.selectedReservation,
  noMoreKennels: state => state.noMoreKennels
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};