<template>
<div class="reservation-container">
  <Navbar></Navbar>

  <h1 class="book-title">Book A Reservation Today</h1>

  <div class="res-container">
    <div class="reservation">
      <div class="reservation-form">
        <form class="reservation-container">
          <div class="dates">
            <div class="checkin">
              <label for="checkin">Check In</label>
              <el-date-picker
                name="checkin"
                v-model="reservation.checkin_date"
                type="date"
                :picker-options="{ format: 'MM-dd-yyyy' }"
                placeholder="Select drop off date">
              </el-date-picker>
              <div class="checkin-times">
                <el-radio-group v-model="reservation.checkin_time" size="small">
                  <el-radio-button label="11am - 1pm"></el-radio-button>
                  <el-radio-button label="4pm - 6pm"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="checkout">
              <label for="checkout">Check Out</label>
              <el-date-picker
                name="checkout"
                v-model="reservation.checkout_date"
                type="date"
                :picker-options="{ format: 'MM-dd-yyyy' }"
                placeholder="Select pick up date">
              </el-date-picker>
              <div class="checkout-times">
                <el-radio-group v-model="reservation.checkout_time" size="small">
                  <el-radio-button label="11am - 1pm"></el-radio-button>
                  <el-radio-button label="4pm - 6pm"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
        </form>

        <div class="dropdowns">
          <div class="dog-numbers">
            <p>Number of Dogs</p>

            <el-input-number v-model="reservation.numOfDogs" controls-position="right" :min="1" :max="10"></el-input-number>
          </div>

          <div class="kennel-numbers">
            <p>Number of Kennels</p>

            <el-input-number v-model="reservation.numOfKennels" controls-position="right" :min="1" :max="10"></el-input-number>
          </div>
        </div>

        <div class="check-btn">
          <el-button type="primary" @click="checkAvailability(reservation)">Check Availability</el-button>
        </div>
      </div>
    </div>

    <div class="reservation-information">
      <h2>Reservation Information</h2>

      <div class="single">
        <h4>Single Dog / Single Kennel</h4>
        <p>Dogs: $20 per dog per day</p>
      </div>

      <div class="Multiple">
        <h4>Multiple Dogs / Multiple Kennels</h4>
        <p>Dogs: $17 per dog per day</p>
      </div>

      <p class="rules">If you have multiple dogs you can put them into one Kennel for a discounted rate.  There is a restriction to how you can bundle your dogs into kennels.  It depends on the size of your dogs.</p>

      <p class="sizes">3 small dogs  =  1 Kennel</p>
      <p class="sizes">2 small dogs  =  1 Kennel</p>
      <p class="sizes">2 medium dogs  =  1 Kennel</p>
      <p class="sizes">1 Large Dog / 1 Small – Medium Dog = 1 Kennel</p>
    </div>
  </div>
</div>
</template>

<script>
import db from '../db/db'
import Navbar from '../components/Navbar'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import uuid from 'uuid'
import UIkit from 'uikit';

export default {
  name: 'reservation',
  components: {
    Navbar
  },
  data() {
    return {
      reservation: {
        checkin_date: '',
        checkout_date: '',
        checkin_time: '',
        checkout_time: '',
        numOfDogs: 1,
        numOfKennels: 2
      },
      isAvailable: null,
      notAvailable: null,
      showAvailability: false
    }
  },
  async created() {
    await this.getKennels()
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('profile', ['petProfiles', 'profile']),
    ...mapGetters('reservation', ['kennels']),
    checkinDate() {
      return moment(this.reservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate() {
      return moment(this.reservation.checkout_date).format('MMM Do YYYY')
    },
    formIsValid() {
      if (this.reservation.checkin_date === '' || this.reservation.checkout_date === '' || this.reservation.pets_reserved === [] || this.reservation.checkin_time === '' || this.reservation.checkout_time === '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions('reservation', ['saveReservation', 'getKennels', 'checkReservationsDate', 'isAvailableMethod']),
    bookReservation() {
      console.log(this.reservation.numOfDogs, this.reservation.numOfKennels)
      // if (this.formIsValid) {
        this.saveReservation({ 
          checkin_date: moment(this.reservation.checkin_date).valueOf(),
          checkout_date: moment(this.reservation.checkout_date).valueOf(),
          checkin_time: this.reservation.checkin_time,
          checkout_time: this.reservation.checkout_time,  
          numOfDogs: this.reservation.numOfDogs,
          numOfKennels: this.reservation.numOfKennels,
          owner: `${this.profile.firstName} ${this.profile.lastName}`,
          res_id: uuid()
        })
      // }
    },
    addPetProfile(pet) {
      this.reservation.pets_reserved.push({ pet_name: pet.petName, profile_id: pet.profile_id })
      UIkit.notification({
        message: 'Profile Added!',
        status: 'success',
        pos: 'top-center',
        timeout: 4000
      });
    },
    togglePreview() {
      this.showPreview = !this.showPreview
    },
    selectRun(kennelName) {
      this.reservation.selectedRun = kennelName
    },
    cancelDialog() {
      this.reservation.selectedRun = '',
      this.dialogVisible = false
    },
    deleteProfile(index) {
      this.reservation.pets_reserved.splice(index, 1)
    },
    petsAdded() {
      this.reservation.pets_reserved !== [] ? true : false 
    },
    isAvailible: (startDate, checkinDate, endDate, checkoutDate) => {
      if (((startDate >= checkinDate && startDate <= checkoutDate) || (endDate >= checkinDate && endDate <= checkoutDate))) {
        return false
      } else {
        return true
      }
    },
    async checkAvailability(res) {
      this.isAvailableMethod(true)
      this.showAvailability = true
      const reservationsRef = db.collection('reservations')
      const kennelsRef = db.collection('kennels').orderBy('id', 'asc').where('status', '==', 'available')
      let reservedKennels;

      const availableKennels = []
      await kennelsRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          availableKennels.push({...doc.data()})
        })

        if (availableKennels.length < res.numOfKennels) {
          commit('setResError', 'Sorry there are not enough availible kennels. Please choose another date.')
        } else {
          const restOfArray = availableKennels.length - res.numOfKennels
          availableKennels.splice(res.numOfKennels, restOfArray)
          reservedKennels = availableKennels
          
          const reservation = {...res, creator_id: this.user.user_id, reservedKennels}
          
          reservationsRef.get().then(snapShot => {
            snapShot.docs.forEach(doc => {
              const startDate = moment(reservation.checkin_date).valueOf()
              const endDate = moment(reservation.checkout_date).valueOf()
              const resKennels = reservation.reservedKennels
              const checkinDate = doc.data().checkin_date
              const checkoutDate = doc.data().checkout_date
              const docReskennels = doc.data().reservedKennels

              docReskennels.forEach(kennel => {
                resKennels.forEach(resKennel => {
                  if ((kennel.kennel_name === resKennel.kennel_name) && !this.isAvailible(startDate, checkinDate, endDate, checkoutDate)) {
                    return this.isAvailableMethod(false)   
                  }
                })
              })
            })
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* RESERVATION SECTION */

.book-title {
  text-align: center;
}

.res-container {
  display: flex;
  justify-content: space-around;
  margin: 40px auto auto auto;
}

.reservation-information {
  width: 500px;
}

.reservation {
  width: 500px;
}

.reservation-form {
  display: flex;
  justify-content: space-around;
  margin-bottom: 70px;
  align-items: center;
  flex-direction: column;
}

.dropdowns {
  display: flex;
  width: 460px;
  margin-top: 40px;
}

.dog-numbers {
  margin-right: 50px;
}

.check-btn {
  width: 460px;

  & button {
    font-size: 1.2rem;
    margin-top: 60px
  }
}

.dates {
  display: flex;
}

.checkout, .checkin {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.morning {
  margin: 0px;
}

.checkin-times, .checkout-times {
  margin-top: 10px;
}

@media only screen and (max-width: 1000px) {
  .reservation-form {
    flex-direction: column;
  }

  .dates {
    margin-bottom: 40px;
  }

  .pet-profiles {
    margin-bottom: 40px;
  }

  .pet-card {
    width: 100%;
  }
}

@media only screen and (max-width: 500px) {
  .dates {
    flex-direction: column;
  }

  .checkin {
    margin: auto auto 10px auto;
  }

  div.el-date-editor {
    width: 330px;
    margin: 0 auto;
  }

  .pet-profiles {
    margin-bottom: 40px;
    width: 90%;
  }

  .reserve-btn, .show-preview, .kennel-select-btn {
    width: 90%;
  }

  .pet-info {
    width: 87%;
  }

  .kennel-select-btn button {
    width: 100%;
  }
}
</style>
