<template>
  <div class="container-profile">
    <div class="profile">
     
      <div class="profile-container">
        <div class="profile-info">
          <div class="container">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p class="name contact">Name: {{ profile.firstName }} {{ profile.lastName }}</p>
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

            <div class="edit-profile">
              <el-button class="edit-btn" @click="dialogVisible = true">Edit</el-button>
            </div>
          </div>

          <div class="edit-dialog">
            <el-dialog
              :visible.sync="dialogVisible"
              width="70%">
              <form>

                <div class="user-info">

                  <h3 class="user-information">User Information</h3>

                  <el-input 
                    placeholder="First Name" 
                    v-model="updatedProfile.firstName">
                  </el-input>
                  <el-input 
                    placeholder="Last Name" 
                    v-model="updatedProfile.lastName">
                  </el-input>
                  <el-input 
                    placeholder="Phone" 
                    v-model="updatedProfile.phone">
                  </el-input>
                  <el-input 
                    placeholder="Email" 
                    v-model="updatedProfile.email">
                  </el-input>
                  <el-input 
                    placeholder="Address" 
                    v-model="updatedProfile.address">
                  </el-input>

                  <h3 class="vet-information">Vet Information</h3>

                  <el-input 
                    placeholder="Clinic Name" 
                    v-model="updatedProfile.clinic">
                  </el-input>
                   <el-input 
                    placeholder="Clinic Phone" 
                    v-model="updatedProfile.vetPhone">
                  </el-input>
                  <el-input 
                    placeholder="Clinic Address" 
                    v-model="updatedProfile.vetAddress">
                  </el-input>
                  <el-input 
                    placeholder="Clinic Email" 
                    v-model="updatedProfile.vetEmail">
                  </el-input>
                  <el-input 
                    placeholder="Clinic Fax" 
                    v-model="updatedProfile.vetFax">
                  </el-input>
                </div>

              </form>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="updateProfile">Save</el-button>
              </span>
            </el-dialog>
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
          <h3>Reservations</h3>

          <ul class="reservations"> 
            <li v-for="(reservation) in reservations" :key="reservation.id" class="reservation">
              <div class="reservation-info">
                <span>Check In: {{ checkinDate(reservation) }}, {{ reservation.checkin_time }}</span> 
                <span>Check Out: {{ checkoutDate(reservation) }}, {{ reservation.checkout_time }}</span>
                <span>Pets Reserved: <span v-for="pet in reservation.pets_reserved" :key="pet.profile_id">{{ pet.pet_name }}</span></span>
              </div>
              <div class="options-btns">
                <button class="cancel" @click="cancel(reservation.id)">Cancel</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SelectedProfile',
  data: () => ({
    edit: false,
    dialogVisible: false,
    updatedProfile: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      clinic: '',
      vetEmail: '',
      vetAddress: '',
      vetPhone: '',
      vetFax: ''  
    }
  }),
  created() {
    this.$store.dispatch('selectProfile', this.$route.params.id)
  },
  computed: {
    profile() {
      this.updatedProfile = this.$store.getters.selectedProfile
      return this.updatedProfile
    },
    petProfiles() {
      return this.$store.getters.selectedProfilePets
    },
    reservations() {
      return this.$store.getters.selectedProfileReservations
    }
  },
  methods: {
    checkinDate(reservation) {
      return moment(reservation.dates.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate(reservation) {
      return moment(reservation.dates.checkout_date).format('MMM Do YYYY')
    },
    updateProfile() {
      this.$store.dispatch('updateProfile', this.profile)
      console.log(this.profile)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
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

// Reservation Section
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

.edit-btn {
  background: #4CB544;
  color: #fff;

  &:hover {
    background: #337a2e;
    color: #fff;
  }
}

.el-input  {
  margin-bottom: 10px;
}
</style>
