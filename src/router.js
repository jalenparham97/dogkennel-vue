import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import ProfileForm from './views/ProfileForm.vue'
import DogProfile from './views/DogProfile.vue'
import Reservation from './views/Reservation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/new/profile/:id',
      name: 'profileform',
      component: ProfileForm
    },
    {
      path: '/new/pet/profile',
      name: 'dogprofile',
      component: DogProfile
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: Reservation
    }
  ]
})
