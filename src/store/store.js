import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/db/firebase.config'
import router from '@/router'
import moment from 'moment'
import uuid from 'uuid'
import db from '@/db/db'
import auth from '@/store/modules/auth'
import profile from '@/store/modules/profile'
import reservation from '@/store/modules/reservation'
import { all } from 'q';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDay: null,
    adminUser: null,
    allReservations: [],
    loading: false,
    selectedProfile: null,
    selectedProfilePets: [],
    selectedProfileReservations: [],
    allUsers: []
  },

  mutations: {
    setCurrentDay: (state, day) => {
      state.currentDay = day
    },
    setAdminUser: (state, adminUser) => {
      state.adminUser = adminUser
    },
    setAllReservations: (state, allReservations) => {
      state.allReservations = allReservations
    },
    setLoading: (state, loading) => {
      state.loading = loading
    },
    setSelectedProfile: (state, selectedProfile) => {
      state.selectedProfile = selectedProfile
    },
    setSelectedProfilePets: (state, selectedProfilePets) => {
      state.selectedProfilePets = selectedProfilePets
    },
    setSelectedProfileReservations: (state, reservations) => {
      state.selectedProfileReservations = reservations
    },
    setAllUsers: (state, users) => {
      state.allUsers = users
    }
  },

  actions: {
    adminLogin({ commit }, admin) {
      firebase.auth().signInWithEmailAndPassword(admin.email, admin.password).then(user => {
        const newAdminUser = {
          user_id: user.user.uid,
          email: user.user.email,
        }
        commit('setAdminUser', newAdminUser)
        router.push('/admin/bfk')
      }).catch(error => {
        console.log(error)
      })
    },
    getAllReservations({ commit }) {
      const reservationsRef = db.collection('reservations').orderBy('checkin_time', 'asc')

      const allReservations = []
      reservationsRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          allReservations.push({
            dates: {
              checkin_date: moment(doc.data().dates.checkin_date).format('MMM Do YYYY'),
              checkout_date: moment(doc.data().dates.checkout_date).format('MMM Do YYYY'),
            },
            checkin_time: doc.data().checkin_time,
            checkout_time: doc.data().checkout_time,
            creator_id: doc.data().creator_id,
            owner: doc.data().owner,
            pets_reserved: doc.data().pets_reserved,
            selected_kennel: doc.data().selected_kennel,
            id: doc.data().id
          })
        })

        commit('setAllReservations', allReservations)
      })
    },
    runReservationSearch({ commit }, query) {
      if (query.option === 'Arrival') {
        const reservationsRef = db.collection('reservations').where('dates.checkin_date', '>=', query.date1).where('dates.checkin_date', '<=', query.date2).orderBy('dates.checkin_date', 'asc')
        commit('setLoading', true)
        const allReservations = []
        reservationsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            allReservations.push({
              dates: {
                checkin_date: moment(doc.data().dates.checkin_date).format('MMM Do YYYY'),
                checkout_date: moment(doc.data().dates.checkout_date).format('MMM Do YYYY'),
              },
              checkin_time: doc.data().checkin_time,
              checkout_time: doc.data().checkout_time,
              creator_id: doc.data().creator_id,
              owner: doc.data().owner,
              pets_reserved: doc.data().pets_reserved,
              selected_kennel: doc.data().selected_kennel,
              id: doc.data().id
            })
          })
          commit('setAllReservations', allReservations)
          commit('setLoading', false)
        })
      } else {
        const reservationsRef = db.collection('reservations').where('dates.checkout_date', '>=', query.date1).where('dates.checkout_date', '<=', query.date2).orderBy('dates.checkout_date', 'asc')
        commit('setLoading', true)
        const allReservations = []
        reservationsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            allReservations.push({
              dates: {
                checkin_date: moment(doc.data().dates.checkin_date).format('MMM Do YYYY'),
                checkout_date: moment(doc.data().dates.checkout_date).format('MMM Do YYYY'),
              },
              checkin_time: doc.data().checkin_time,
              checkout_time: doc.data().checkout_time,
              creator_id: doc.data().creator_id,
              owner: doc.data().owner,
              pets_reserved: doc.data().pets_reserved,
              selected_kennel: doc.data().selected_kennel,
              id: doc.data().id
            })
          })
          commit('setAllReservations', allReservations)
          commit('setLoading', false)
        })
      }
    },
    selectProfile({ dispatch, commit }, id) {
      const profileRef = db.collection('profiles').where('user_id', '==', id)

      profileRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          commit('setSelectedProfile', {...doc.data()})
        })
        dispatch('getPetProfiles', id)
        dispatch('getSelectedProfileReservations', id)
        router.push(`/admin/bfk/profile/${id}`)
      })
    },
    getPetProfiles: ({ commit }, id) => {
      db.collection('pet-profiles').where('user_id', '==', id).get().then(snapShot => {
        const petProfiles = []
        snapShot.docs.forEach(doc => {
          petProfiles.push({...doc.data()})
        })
        commit('setSelectedProfilePets', petProfiles)
      }).catch(err => {
        console.log(err)
      })
    },
    getSelectedProfileReservations: ({ commit }, id) => {
      db.collection('reservations').where('creator_id', '==', id).get().then(snapShot => {
        const reservations = []
        snapShot.docs.forEach(doc => {
          reservations.push({...doc.data()})
        })
        commit('setSelectedProfileReservations', reservations)
      })
    },
    getAllUsers: ({ commit }) => {
      const usersRef = db.collection('profiles')

      const users = []
      usersRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          users.push({...doc.data()})
        })
        commit('setAllUsers', users)
      })
    },
    cancelReservation({ dispatch }, id) {
      db.collection('reservations').where('id', '==', id).get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          doc.ref.delete()
        })
        dispatch('getAllReservations')
      })
    },

    // UPDATE FUNCTIONS
    updateProfile({ commit }, profile) {
      const profileRef = db.collection('profiles').where('user_id', '==', profile.user_id)
      
      profileRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          doc.ref.update({
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
            address: profile.address,
            clinic: profile.clinic,
            vetEmail: profile.vetEmail,
            vetAddress: profile.vetAddress,
            vetPhone: profile.vetPhone,
            vetFax: profile.vetFax  
          })

          const updatedProfile = profile
          commit('setSelectedProfile', updatedProfile)
        })
      })
    },

    // ADD CUSTOMERS
    signUpEmail({ dispatch }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.profile.email, payload.profile.password).then(user => {
        const newUser = {
          user_id: user.user.uid,
          email: user.user.email,
        }
        db.collection('users').doc(newUser.user_id).set(newUser)
        
        delete payload.profile.password
        const newUserProfile = {...payload.profile, user_id: newUser.user_id}
        const petProfile = {...payload.petProfile, user_id: newUser.user_id}
        dispatch('saveProfile', newUserProfile)
        dispatch('addPetProfile', petProfile)
        router.push('/admin/bfk/search')  
      }).catch(error => {
        console.log(error)
      })
    },
    saveProfile: (_, payload) => {
      db.collection('profiles').add({...payload})
    },
    addPetProfile: (_, payload) => {
      db.collection('pet-profiles').add({...payload, profile_id: uuid()})
    },
  },

  getters: {
    currentDay: state => state.currentDay,
    allReservations: state => state.allReservations,
    loading: state => state.loading,
    selectedProfile: state => state.selectedProfile,
    selectedProfilePets: state => state.selectedProfilePets,
    selectedProfileReservations: state => state.selectedProfileReservations,
    allUsers: state => state.allUsers
  },

  modules: {
    auth,
    profile,
    reservation,
  }
})
