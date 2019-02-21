import router from '@/router'
import moment from 'moment'
import db from '@/db/db'

const state = {
  reservations: [],
  kennels: [],
  resError: '',
  isAvailable: true
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
  }
}

const actions = {
  isAvailableMethod({ commit }, isAvailable) {
    commit('setIsAvailable', isAvailable)
  },
  saveReservation: async ({ rootState, commit }, payload) => {
    const kennelsRef = db.collection('kennels').orderBy('id', 'asc').where('status', '==', 'available')

    let reservedKennels;

    const availableKennels = []
    await kennelsRef.get().then(snapShot => {
      snapShot.docs.forEach(doc => {
        availableKennels.push({...doc.data()})
      })

      if (availableKennels.length < payload.numOfKennels) {
        commit('setResError', 'Sorry there are not enough availible kennels. Please choose another date.')
      } else {
        const restOfArray = availableKennels.length - payload.numOfKennels
        availableKennels.splice(payload.numOfKennels, restOfArray)
        reservedKennels = availableKennels
        
        const reservation = {...payload, creator_id: rootState.auth.user.user_id, reservedKennels}
        reservationsRef.add(reservation)
  
        commit('addReservations', reservation)
      }
    })
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
            console.log(kennel)
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
  kennels: state => state.kennels

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};