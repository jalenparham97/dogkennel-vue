<template>
  <div class="reservation-search">
    <nav class="nav">
      <div class="navbar">
        <div class="search-items">
          <div class="dates">
            <div class="checkin">
              <el-date-picker
                v-model="date1"
                type="date"
                placeholder="Date 1">
              </el-date-picker>
            </div>
            <div class="checkout">
              <el-date-picker
                v-model="date2"
                type="date"
                placeholder="Date 2">
              </el-date-picker>
            </div>
          </div>

          <div class="options">
            <el-radio-group v-model="option">
              <el-radio-button label="Arrival"></el-radio-button>
              <el-radio-button label="Departure"></el-radio-button>
            </el-radio-group>
          </div>

          <div class="search-btn">
            <el-button type="primary" :loading="loading" @click="runSearch">Run Search</el-button>
          </div>
        </div>

        <div class="nav-buttons">  
          <el-button type="primary" @click="$router.push('/admin/bfk/search')">
            Find Customers
          </el-button>  
          <el-button type="primary" @click="$router.push('/admin/bfk/search')">
            Make Reservation
          </el-button>
          <el-button type="primary" @click="$router.push('/admin/bfk/add')">
            Add Customer
          </el-button>
        </div>
      </div>
    </nav>

   <div class="reservations">
     <div class="reservation" v-for="res in allReservations" :key="res.id">
       <div>
         <h4 class="header">Owner</h4>
         <p class="data">{{ res.owner }}</p>
       </div>
       <div>
         <h4 class="header">Pets</h4>
         <p class="data">{{ res.numOfDogs }}</p>
       </div>
       <div>
         <h4 class="header">Arrival Date</h4>
         <p class="data">{{ formattedDate(res.checkin_date) }}</p>
       </div>
       <div>
         <h4 class="header">Time</h4>
         <p class="data">{{ res.checkin_time }}</p>
       </div>
       <div>
         <h4 class="header">Departure Date</h4>
         <p class="data">{{ formattedDate(res.checkout_date) }}</p>
       </div>
       <div>
         <h4 class="header">Time</h4>
         <p class="data">{{ res.checkout_time }}</p>
       </div>
       <div>
         <h4 class="header">Kennels</h4>
         <p class="data">{{ res.numOfKennels }}</p>
       </div>
       <div class="actions">
         <el-button class="cancel" @click="cancelReservation(res.id)">Cancel</el-button>
         <el-button class="select" @click="selectProfile(res.creator_id)">Select</el-button>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ReservationSearch',
  data: () => ({
    date1: '',
    date2: '',
    option: {
      arriva: '',
      departure: ''
    }
  }),
  created() {
    this.$store.dispatch('getAllReservations')
  },
  computed: {
    allReservations() {
      return this.$store.getters.allReservations
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    runSearch() {
      const query = {
        date1: moment(this.date1).valueOf(), 
        date2: moment(this.date2).valueOf(),
        option: this.option
      }
  
      this.$store.dispatch('runReservationSearch', query)
    },
    selectProfile(id) {
      this.$store.dispatch('selectProfile', id)
      router.push(`/admin/bfk/profile/${id}`)
    },
    cancelReservation(id) {
      this.$store.dispatch('cancelReservation', id)
    },
    formattedDate(date) {
      return moment(date).format('MMM Do YYYY')
    }
  }
}
</script>

<style scoped>
  .nav {
    padding: 20px;
    background: #C2B59B;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
  }

  .search-items {
    display: flex;
  }

  .dates {
    display: flex;
  }

  .checkin, .checkout {
    margin-right: 10px;
  }

  div.el-date-editor {
    width: 150px;
  }

  .options {
    margin-left: 20px;
  }

  div.el-select {
    width: 150px; 
  }

  .arrival, .departure {
    margin-right: 10px;
  }

  .search-btn button {
    margin-left: 20px;
  }

  .owners:hover {
    background: #001B54; 
    color: #fff;
  }

  .reservations {
    padding: 40px;
  }

  .reservation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #001B54;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .header {
    margin-bottom: 0px;
  }

  .data {
    margin: 0px;
  }

  button.cancel {
    color: #fff;
    background: #db3236;
    border: none;
  }

  button.select:hover {
    background: #001B54;
    color: #fff;
    border: 1px solid #001B54;
  }
</style>
