<template>
<div class="reservation-container">
  <Navbar></Navbar>

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

      <div class="pet-profiles">
        <h3>Select your pets you want to board</h3>

        <div class="pets">
          <div v-for="pet in petProfiles" :key="pet.profile_id" class="pet-card">
            <div class="card-header">
              <h3 class="pet-name">{{ pet.petName }}</h3>
              <span><button @click="addPetProfile(pet)" class="add-btn">Add</button></span>
            </div>
          </div>
        </div>
      </div>

      <div class="kennel-select-btn">
        <button @click="dialogVisible = true">Select kennel</button>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="400px">
      <ul class="uk-list">
        <h2>Available Runs</h2>
        <li v-for="kennel in kennels" :key="kennel.id" class="kennel">
          <span>{{ kennel.kennel_name }}</span> <button @click="selectRun(kennel.kennel_name)">Select</button>
        </li>
      </ul>

      <span slot="footer" class="dialog-footer">
        <span class="select-run" v-if="reservation.selectedRun !== ''">Selected Run: {{ reservation.selectedRun }}</span>
        <div class="dialog-action-btns">
          <button class="cancel-btn" @click="cancelDialog">Cancel</button>
          <button class="confirm-btn" @click="dialogVisible = false">Confirm</button>
        </div>
      </span>
    </el-dialog>

    <div class="preview-reserve">
      <button class="show-preview" @click="togglePreview">Preview Reservation</button>

      <div class="preview" v-if="showPreview">
        <h3>Preview of reservation</h3>
        <p class="checkin">Check In Date: {{ checkinDate }}, {{ reservation.checkin_time }}</p>
        <p class="checkout">Check Out Date: {{ checkoutDate }}, {{ reservation.checkout_time }}</p>
        <p>Selected Kennel: {{ reservation.selectedRun }}</p>
        <div class="profiles" v-if="petsAdded">
          <h3>Profiles Added:</h3>
          <div class="pet-info" v-for="(pet, index) in reservation.pets_reserved" :key="pet.profile_id">
            <h3 class="profile">{{ pet.pet_name }}</h3>
            <button class="delete-btn" @click="deleteProfile(index)">delete</button>
          </div>
        </div>
      </div>

      <button @click="bookReservation" class="reserve-btn">Make Reservation</button>
    </div>
  </div>
</div>
</template>

<script>
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
        pets_reserved: [],
        selectedRun: ''
      },
      showPreview: false,
      dialogVisible: false
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
    ...mapActions('reservation', ['saveReservation', 'getKennels', 'checkReservationsDate']),
    bookReservation() {
      if (this.formIsValid) {
        this.saveReservation({ 
          dates: {
            checkin_date: moment(this.reservation.checkin_date).valueOf(),
            checkout_date: moment(this.reservation.checkout_date).valueOf(),
          },
          checkin_time: this.reservation.checkin_time,
          checkout_time: this.reservation.checkout_time,  
          pets_reserved: this.reservation.pets_reserved,
          selected_kennel: this.reservation.selectedRun,
          owner: `${this.profile.firstName} ${this.profile.lastName}`,
          id: uuid()
        })
      } else {
        console.log('Error')
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
/* RESERVATION SECTION */

.reservation {
  width: 90%;
  margin: 0 auto;
}

.reservation-form {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom: 70px;
  align-items: center;
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pet {
  margin: 0px;
}

.pet-card {
  width: 300px;
  background: #C2B59B;
  color: #001B54;
  padding: 5px;
  border-radius: 3px;
}

.pet-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto auto 10px auto;
  width: 300px;
  padding: 5px;
  border-radius: 3px;
  background: #C2B59B;
}

.pet-name {
  margin-bottom: 0px;
}

.profile {
  color: #001B54;
  margin-bottom: 0px;
}

.kennel-select-btn button {
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #001B54;
}

.add-btn, .delete-btn {
  padding: 10px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #001B54;
}

.show-preview {
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #001B54;
  margin: 0px auto 40px auto;
  width: 40%;
}

.reserve-btn {
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  background: #001B54;
  margin: 40px auto;
  width: 40%;
}

.preview-reserve {
  display: flex;
  flex-direction: column;
}

.preview {
  text-align: center;
}

.confirm-btn, .cancel-btn {
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
}

.confirm-btn {
  background: #001B54;
}

.cancel-btn {
  background: #db3236;
  margin-bottom: 10px;
  margin-top: 10px;
}

.select-run {
  font-size: 1.2rem;
}

.kennel {
  display: flex;
  justify-content: space-between;
}

.kennel span {
  font-size: 1.2rem;
}

.kennel button {
  padding: 5px 20px;
  border-radius: 3px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
  background: #001B54;
}

.uk-list h2 {
  text-align: center;
}

.dialog-action-btns {
  display: flex;
  flex-direction: column;
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
