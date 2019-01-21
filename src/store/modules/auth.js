import firebase from '@/db/firebase.config'
import router from '@/router'
import db from '@/db/db'

const state = {
  user: null
}

const mutations = {
  setUser(state, payload) {
    state.user = payload 
  },
}

const actions = {
  signUpEmail({ commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
      const newUser = {
        user_id: user.user.uid,
        email: user.user.email,
      }
      db.collection('users').doc(newUser.user_id).set(newUser)
      commit('setUser', newUser)
      router.push(`/new/profile/${state.user.user_id}`)
    }).catch(error => {
      console.log(error)
    })
  },

  loginWithEmail({ commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
      console.log(user)
      const setUser = {
        user_id: user.user.uid,
        email: user.user.email,
      }
      commit('setUser', setUser)
      router.push(`/new/profile/${state.user.user_id}`) 
    }).catch(error => {
      console.log(error)
    })
  },

  signupWithGoogle({ commit }) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      const newUser = {
        user_id: user.user.uid,
        email: user.user.email,
      }
      db.collection('users').doc(newUser.user_id).set(newUser)
      commit('setUser', newUser)
      if (user.additionalUserInfo.isNewUser) {
        router.push(`/new/profile/${state.user.user_id}`)
      } else {
        router.push(`/profile/${state.user.user_id}`)
      }
      console.log(user)
    }).catch(error => {
      console.log(error)
    })
  },

  loginWithGoogle({ state, commit }) {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      const setUser = {
        user_id: user.user.uid,
        email: user.user.email,
      }
      commit('setUser', setUser)
      if (user.additionalUserInfo.isNewUser) {
        router.push(`/new/profile/${state.user.user_id}`)
      } else {
        router.push(`/profile/${state.user.user_id}`)
      }
      console.log(user)
    }).catch(error => {
      console.log(error)
    })
  },

  autoLogIn: ({ commit }, payload) => {
    const user = {
      user_id: payload.uid,
      email: payload.email,
    }
    commit('setUser', user)
  },

  logout({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null) 
  }
}

const getters = {
  user(state) {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};