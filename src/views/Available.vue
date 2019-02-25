<template>
  <div class="available">
    <div class="availability">
      <div class="available-container" v-if="!isAvailable && !noMoreKennels">
        <h2 class="title">Sorry your reservation is unavailable!</h2>
        <h2 class="subtitle">Try picking different dates!</h2>

        <el-button type="primary" @click="$router.push('/reservation')">Check Availability</el-button>
      </div>

      <div class="available-container" v-else-if="isAvailable && !noMoreKennels">
        <h2 class="title-2">Your reservation is available!</h2>

        <h4 class="dates">{{ checkinDate }} - {{ checkoutDate }}</h4>

        <div class="total">
          <h4>Dogs: {{ newUserReservation.numOfDogs }}</h4>
          <h4>Kennels: {{ newUserReservation.numOfKennels }}</h4>
          <h4>Total Price: ${{ calculateTotalPrice() }}</h4>
        </div>

        <el-button type="primary" @click="bookReservation">Book Now</el-button>
      </div>

      <div class="available-container" v-else>
        <h2 class="title">Sorry there are no more available kennels</h2>
        <h2 class="subtitle">Please try again at a later date!</h2>

        <el-button type="primary" @click="$router.push(`/profile/${newUserReservation.creator_id}`)">Continue</el-button>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export default {
  name: 'Available',
  computed: {
    ...mapGetters('reservation', ['isAvailable', 'newUserReservation', 'noMoreKennels']),
    checkinDate() {
      return moment(this.newUserReservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate() {
      return moment(this.newUserReservation.checkout_date).format('MMM Do YYYY')
    },
  },
  methods: {
    ...mapActions('reservation', ['saveReservation']),
    async bookReservation() {
      await this.saveReservation({...this.newUserReservation, totalPrice: this.calculateTotalPrice()})
    },
    calculateTotalPrice() {
      const numOfDogs = this.newUserReservation.numOfDogs
      const startDay = moment(this.newUserReservation.checkin_date)
      const endDay = moment(this.newUserReservation.checkout_date)
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
    }
  }
}
</script>

<style scoped>
  .available-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    margin: 80px auto 20px auto;
    padding: 40px;
    border: 1px solid #001B54;
  }

  h2 {
    text-align: center;
  }

  .subtitle {
    margin: 0px;
  }

  .dates {
    text-align: center;
    margin: 0px;
  }

  .total {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .total h4 {
    margin: 0px 0px 0px 10px;
  }

  button {
    width: 250px;
    margin: 20px auto;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
  }

  .reservation-information {
    text-align: center; 
    width: 400px;
    margin: 0 auto;
  }

  .rules {
    padding: 10px;
  }
</style>
