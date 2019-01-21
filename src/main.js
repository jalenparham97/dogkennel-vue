import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'

import { mapActions } from 'vuex';

Vue.config.productionTip = false 

new Vue({
  router,
  store,
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.autoLogIn(user)
        this.getProfile()
      }
    })
  },
  methods: {
    ...mapActions('auth', ['autoLogIn']),
    ...mapActions('profile', ['getProfile'])
  },
  render: h => h(App)
}).$mount('#app')
