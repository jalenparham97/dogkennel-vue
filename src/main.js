import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase'
import db from './db/db'
import VCalendar from 'v-calendar'
import { DatePicker, TimePicker, Radio, RadioGroup, RadioButton, Dialog, Option, Button, Input, InputNumber, Autocomplete, } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/element-variables.scss'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'

import { mapActions } from 'vuex';

Vue.config.productionTip = false 

// configure language
locale.use(lang)

// Components
Vue.use(VCalendar)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Autocomplete)


new Vue({
  router,
  store,
  async created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.autoLogIn(user)
        this.getProfile()
        this.getPetProfiles()
        this.getReservations()
      }
    })

    const daysRef = db.collection('days')

    await daysRef.get().then(snapShot => {
      if (!snapShot.empty) {
          snapShot.forEach(doc => {
            doc.ref.update({ currentDay: new Date().getDate() })
            this.$store.commit('setCurrentDay', new Date().getDate())
          })
        } else {
          this.saveCurrentDay()
        }
    }).then(() => {
      const today = new Date().getDate()
      if (today !== this.currentDay) { 
        this.updateKennelStatus()
      }
    })
  },
  computed: {
    currentDay() {
      return this.$store.getters.currentDay
    }
  },
  methods: {
    ...mapActions('auth', ['autoLogIn']),
    ...mapActions('profile', ['getProfile', 'getPetProfiles']),
    ...mapActions('reservation', ['getReservations', 'updateKennelStatus']),

    async saveCurrentDay() {
      const daysRef = db.collection('days')

      await daysRef.add({ currentDay: new Date().getDate() })
      this.$store.commit('setCurrentDay', new Date().getDate())
    }
  },
  render: h => h(App)
}).$mount('#app')
