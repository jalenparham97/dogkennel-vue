<template>
  <div class="profile">
    <div class="sidebar">
      <div class="heading">
        <h1 class="initials">{{ initials() }}</h1>
        <h2 class="name">{{ profile.firstName }} {{ profile.lastName }}</h2>
      </div>
      
      <div class="side-navigation">
        <ul class="sidenav">
          <li class="nav-item">
            <router-link to="/reservation" class="nav-link">Make a Reservation</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link">Edit Profile</a>
          </li>
          <li class="nav-item">
            <router-link to="" class="nav-link" @click="logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="profile-container">
      <div class="profile-info">
        <div class="container">
          <div class="contact-info">
            <h3>Contact Information</h3>
            <p class="phone contact">Phone: {{ profile.phone }}</p>
            <p class="email contact">Email: {{ profile.email }}</p>
            <p class="address contact">Address: {{ profile.address }}</p>
          </div>

          <div class="vet-info">
            <h3>Veterinarian Information</h3>
            <p class="vet clinic">Clinic: {{ profile.clinic }}</p>
            <p class="vet vet-phone">Phone: {{ profile.vetPhone }}</p>
            <p class="vet vet-email">Email: {{ profile.vetEmail }}</p>
            <p class="vet vet-address">Address: {{ profile.vetAddress }}</p>
          </div>
        </div>

        <div class="pet-info">
          <h3>Pet Profile(s)</h3>
          <div v-for="pet in petProfiles" :key="pet.profile_id" class="pet-profile">
            <div class="main-info">
              <p class="pet pet-name">Name: {{ pet.petName }}</p>
              <p class="pet pet-bread">Breed: {{ pet.petBreed }}</p>
              <p class="pet pet-age">Age: {{ pet.petAge }}</p>
            </div>
            <div class="other-info">
              <p class="pet-toggle pet-medicine">Medicine: {{ pet.petMedice }}</p>
              <p class="pet-toggle pet-diet">Diet: {{ pet.petDiet }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="reservations-container">
        <h3>Your Reservations</h3>

        <ul class="reservations"> 
          <li v-for="(reservation, index) in reservations" :key="reservation.id" class="reservation">
            <div class="reservation-info">
              <span>Check In: {{ checkinDate(reservation) }}, {{ reservation.checkin_time }}</span> 
              <span>Check Out: {{ checkoutDate(reservation) }}, {{ reservation.checkout_time }}</span>
              <span>Pets Reserved: <span v-for="pet in reservation.pets_reserved" :key="pet.profile_id">{{ pet.pet_name }}</span></span>
            </div>
            <div class="options-btns">
              <button class="cancel" @click="cancel(reservation.id, index)">Cancel</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
 
export default {
  name: 'profile',
  data() {
    return {
      more: 'More',
      togglePetDiet: false,   
    }
  },
  computed: {
    ...mapGetters('profile', ['profile', 'petProfiles']),
    ...mapGetters('reservation', ['reservations']),
  },
  methods: {
    ...mapActions('profile', ['getProfile']),
    ...mapActions('auth', ['logout']),
    ...mapActions('reservation', ['cancelReservation']),
    checkinDate(reservation) {
      return moment(reservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate(reservation) {
      return moment(reservation.checkout_date).format('MMM Do YYYY')
    },
    initials() {
      const firstInitial = this.profile.firstName.split('')
      const lastInitial = this.profile.lastName.split('')
      return `${firstInitial[0]}${lastInitial[0]}`
    },
    cancel(id, index) {
      this.reservations.splice(index, 1)
      this.cancelReservation(id)
    }
  }
}
</script>

<style lang="scss" scoped>
/* PROFILE SECTION */

.profile {
  display: flex;
  height: 100vh;
}

.profile-container {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
}

.profile-info {
  width: 90%;
  margin: 20px auto 0px auto;
  color: #001B54;
}

.container {
  display: flex;
}

.contact-info, .vet-info, .pet-info {
  width: 35%;
}

.vet-info {
  margin: 0px 5px;
  color: #001B54;
}

.main-info {
  display: flex;
  align-items: center;
}

.pet-profile {
  display: flex;
  flex-direction: column;
  background: #C2B59B;
  padding: 10px;
  color: #001B54;
  border-radius: 3px;
}

.pet-info {
  width: 100%;
}

.pet {
  margin: 0px 10px 0px 0px;
  color: #001B54;
}

.pet-toggle {
  margin: 0px;
}

.more {
  margin: 0px;
  cursor: pointer;
}

.more:hover {
  text-decoration: underline;
}

/* RESERVATION SECTION */

.reservations-container {
  margin: 40px auto 0px auto;
  width: 90%;
}

.reservations {
  list-style: none;
  padding: 0px; 
}

.reservation {
  padding: 10px;
  background: #C2B59B;
  margin-top: 20px;
  border-radius: 3px;
}

.reservation span {
  margin-right: 10px;
  color: #001B54;
}

.options-btns {
  display: flex;
}

.cancel, .edit {
  padding: 10px;
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  border: 0;
  border-radius: 3px;
  outline: none;
}

.cancel {
  background: #db3236;

  &:hover {
    background: #992123;
  }
}

.edit {
  background: #4CB544;

  &:hover {
    background: #337a2e;
  }
}

/* SIDEBAR SECTION */

.sidebar {
  width: 400px;
  background: #E7EAED;
}

.heading {
  border-bottom: 2px solid #001B54;
}

.initials {
  color: #001B54;
  background: #C2B59B;
  padding: 15px;
  border-radius: 50%;
  width: 70px;
  margin: 20px auto;
  text-align: center;
  font-size: 4rem;
}

.name {
  text-align: center;
}

.sidenav {
  list-style: none;
  padding: 0px;
}

.nav-item {
  text-align: center;
  padding: 10px;
  
  &:hover {
    .nav-link {
      color: #fff;
    }
    background: #001B54;
  }
}

.nav-link {
  color: #001B54;
  text-decoration: none;
  font-size: 1.2rem;
}

/* MEDIA QUERY */

@media only screen and (max-width: 993px) {
  .profile {
    flex-direction: column;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    overflow-y: initial;
    width: 100%;
  }

  .contact-info, .vet-info, .pet-info {
    width: 100%;
  }

  .reservation {
    flex-direction: column;
  }

  .reservation-info {
    display: flex;
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}

@media only screen and (max-width: 700px) {
  .container {
    flex-direction: column;
  }
}

</style>
