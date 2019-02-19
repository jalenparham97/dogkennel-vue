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
            <el-button type="primary">Check Availability</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MakeReservation',
  data: () => ({
    reservation: {
      checkin_date: '',
      checkout_date: '',
      checkin_time: '',
      checkout_time: '',
      numOfDogs: 1,
      numOfKennels: 1
    },
  })
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
</style>
