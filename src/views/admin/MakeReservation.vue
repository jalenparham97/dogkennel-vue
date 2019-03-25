<template>
  <div class="make-reservation">
    <div class="nav">
      <div class="nav-items">
        <el-button type="primary" @click="$router.push('/admin/bfk/reservations')">
          Search Reservations
        </el-button>
        <el-button type="primary" @click="$router.push('/admin/bfk/search')">
          Find Customers
        </el-button>  
        <el-button type="primary" @click="$router.push('/admin/bfk/add')">
          Add Customer
        </el-button>
      </div>
    </div>

    <h1 class="title">Make A New Reservation</h1>

    <div class="res-container">
      <div class="reservation">
        <div class="reservation-form">
          <form class="reservation-container">
            <div class="dates">
              <div class="checkin">
                <label for="checkin">Check In</label>
                <el-date-picker
                  @input="checkTime(reservation.checkin_date)"
                  name="checkin"
                  v-model="reservation.checkin_date"
                  type="date"
                  :picker-options="{ format: 'MM-dd-yyyy' }"
                  placeholder="Select drop off date">
                </el-date-picker>
                <div class="checkin-times">
                  <el-select v-model="reservation.checkin_time" clearable placeholder="Choose drop off time">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="checkout">
                <label for="checkout">Check Out</label>
                <el-date-picker
                  @input="checkTime(reservation.checkout_date)"
                  name="checkout"
                  v-model="reservation.checkout_date"
                  type="date"
                  :picker-options="{ format: 'MM-dd-yyyy' }"
                  placeholder="Select pick up date">
                </el-date-picker>
                <div class="checkout-times">
                  <el-select v-model="reservation.checkout_time" clearable placeholder="Choose pick up time">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
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
            <el-button 
              type="primary" 
              @click="check()" 
              v-loading.fullscreen.lock="loading">
                Check Availability
            </el-button>
          </div>
        </div>
      </div>

      <div class="available">
        <div class="available-container">
          <h2 v-if="noReservation">Enter in the reservation information</h2>

          <div class="isAvailable" v-if="!noReservation && isAvailable">
            <h2 class="title-2">The reservation is available!</h2>

            <h4 class="dates">{{ checkinDate }} - {{ checkoutDate }}</h4>

            <div class="total">
              <h4>Dogs: {{ reservation.numOfDogs }}</h4>
              <h4>Kennels: {{ reservation.numOfKennels }}</h4>
              <h4>Total Price: ${{ calculateTotalPrice() }}</h4>
            </div>

            <el-button type="primary" @click="bookReservation">Book Now</el-button>
          </div>

          <div class="isAvailable" v-if="!noReservation && !isAvailable">
            <h2 class="title">Sorry the reservation is unavailable!</h2>
            <h2 class="subtitle">Try picking different dates!</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../../db/db'
import { Notification } from 'element-ui'
import uuid from 'uuid'
import { mapActions, mapGetters } from 'vuex'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export default {
  name: 'MakeReservation',
  data: () => ({
    loading: false,
    noReservation: true,
    reservation: {
      checkin_date: '',
      checkout_date: '',
      checkin_time: '',
      checkout_time: '',
      numOfDogs: 1,
      numOfKennels: 1
    },
    options: [
      {
        value: "11am - 1pm",
        label: "11am - 1pm",
        disabled: false
      },
      {
        value: "4pm - 6pm",
        label: "4pm - 6pm",
        disabled: false
      },
      {
        value: "5pm - 7pm",
        label: "5pm - 7pm",
        disabled: true
      }
    ],
    availableKennels: [],
    availableReservations: []
  }),
  computed: {
    ...mapGetters('reservation', ['isAvailable', 'newUserReservation']),
    checkinDate() {
      return moment(this.reservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate() {
      return moment(this.reservation.checkout_date).format('MMM Do YYYY')
    },
    formIsValid() {
      if (this.reservation.checkin_date === '' || this.reservation.checkout_date === '' || this.reservation.checkin_time === '' || this.reservation.checkout_time === '') {
        return false
      } else {
        return true
      }
    },
    newReservation() {
      const firstName = this.$store.getters.selectedProfile.firstName
      const lastName = this.$store.getters.selectedProfile.lastName

      return {
        checkin_date: moment(this.reservation.checkin_date).valueOf(),
        checkout_date: moment(this.reservation.checkout_date).valueOf(),
        checkin_time: this.reservation.checkin_time,
        checkout_time: this.reservation.checkout_time,
        creator_id: this.$route.params.id,
        res_id: uuid(),
        owner: `${firstName.trim()} ${lastName.trim()}`,
        numOfDogs: this.reservation.numOfDogs,
        numOfKennels: this.reservation.numOfKennels,
      }
    }
  },
  async created() {
    const daysRef = db.collection('days')

    await daysRef.get().then(snapShot => {
      if (!snapShot.empty) {
          snapShot.forEach(doc => {
            doc.ref.update({ currentDay: new Date().getDate() })
            this.$store.commit('setCurrentDay', new Date().getDate())
          })
        }
    }).then(() => {
      this.updateKennelStatus()
    })

    this.$store.dispatch('selectProfile', this.$route.params.id)
  },
  methods: {
    ...mapActions('reservation', ['isAvailableMethod', 'selectedReservation', 'updateKennelStatus', 'noMoreKennels']),
    checkTime(date) {
      const newDate = new Date(date)
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let day = newDate.getDay();
      
      this.options[0].disabled = false
      this.options[1].disabled = false
      this.options[2].disabled = true

      if (weekdays[day] === 'Sunday') {
        this.options[0].disabled = true
        this.options[1].disabled = true
        this.options[2].disabled = false
      }
    },
    isAvailible: (startDate, checkinDate, endDate, checkoutDate) => {
      if (((startDate >= checkinDate && startDate <= checkoutDate) || (endDate >= checkinDate && endDate <= checkoutDate)) || (startDate <= checkinDate && endDate >= checkoutDate)) {
        return false
      } else {
        return true
      }
    },
    calculateTotalPrice() {
      const numOfDogs = this.reservation.numOfDogs
      const startDay = moment(this.newReservation.checkin_date)
      const endDay = moment(this.newReservation.checkout_date)
      let total;
      let range;
      let days

      range = moment.range(startDay, endDay);
      days = range.diff('days')

      if (numOfDogs > 1) {
        total = (days * 17) * numOfDogs
      } else {
        total = (days * 20) * numOfDogs
      }

      return total
    },
    async check() {
      const reservationsRef = db.collection('reservations')
      const kennelsRef = db.collection('kennels').orderBy('id', 'asc').where('status', '==', 'available')
      let reservedKennels;

      if (!this.formIsValid) {
        Notification.error({
          title: 'Error',
          message: 'Please pick dates and time',
          duration: 4000
        })
      } else {
        if (this.reservation.numOfDogs < this.reservation.numOfKennels) {
          Notification.error({
            title: 'Error',
            message: 'The number of kennels you select cannot be more than the number of dogs you reserve',
            duration: 4000
          })
          return
        } else if (this.calculateTotalPrice() < 0) {
          Notification.error({
            title: 'Error',
            message: 'Please take a look at your dates. They may be out of order.',
            duration: 4000
          })
          return
        }
        
        this.loading = true
        this.noReservation = false
        this.isAvailableMethod(true)
        this.noMoreKennels(false)
        await kennelsRef.get().then(snapShot => {
          snapShot.docs.forEach(doc => {
            this.availableKennels.push(doc.data())
          })

          if (this.availableKennels.length < this.reservation.numOfKennels) {
            this.noMoreKennels(true)
            this.loading = false
            return
          }
  
          this.isAvailableMethod(true)
          const restOfArray = this.availableKennels.length - this.reservation.numOfKennels
          this.availableKennels.splice(this.reservation.numOfKennels, restOfArray)
          reservedKennels = this.availableKennels

          const reservation = {...this.newReservation, reservedKennels}
          this.selectedReservation(reservation)

          reservationsRef.get().then(snapShot => {
            if (snapShot.empty) {
              this.isAvailableMethod(true)
              this.selectedReservation(reservation)
              this.loading = false
              return
            }
            const startDate = moment(this.reservation.checkin_date).valueOf()
            const endDate = moment(this.reservation.checkout_date).valueOf()

            snapShot.docs.forEach(doc => {
              this.availableReservations.push(doc.data())
            })
            this.availableReservations.forEach(res => {
              const checkinDate = res.checkin_date
              const checkoutDate = res.checkout_date

              if (!this.isAvailible(startDate, checkinDate, endDate, checkoutDate) && (reservation.reservedKennels[0].kennel_name === res.reservedKennels[0].kennel_name)) {
                this.isAvailableMethod(false)
                this.loading = false
              } else {
                this.loading = false
              }
            })
          })
        })
      }
    },
    async bookReservation() {
      this.$store.dispatch('saveUserReservation', {...this.newUserReservation, totalPrice: this.calculateTotalPrice()})
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    padding: 20px;
    background: #C2B59B;

    & .nav-items {
      display: flex;
      justify-content: space-around;
    }
  }

  .title {
    text-align: center;
  }

  // RESERVATION SECTION 
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

  .available {
    width: 517.156px;
  }

  .available-container {
    border: 1px solid #001B54;
    padding: 20px;
  }

  .isAvailable {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .title-2 {
    margin-bottom: -20px;
  }

  .subtitle {
    text-align: center;
  }
</style>
