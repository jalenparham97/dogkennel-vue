<template>
  <div class="container-profile">
    <div class="profile">
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
          <el-button type="primary" @click="$router.push('/admin/bfk/search')">
            Make Reservation
          </el-button>
        </div>
      </div>

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

          <!-- EDIT PROFILE DIALOG -->
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
            <span class="title-profile">Pet Profile(s)</span>
            <el-button type="primary" class="add-pet-btn" @click="openAddPet">Add Pet</el-button>
            <div v-for="pet in petProfiles" :key="pet.profile_id" class="pet-profile">
              <div class="pet-info-container">
                <div class="main-info">
                  <p class="pet pet-name">Name: {{ pet.petName }}</p>
                  <p class="pet pet-bread">Breed: {{ pet.petBreed }}</p>
                  <p class="pet pet-age">Age: {{ pet.petAge }}</p>
                </div>
                <div class="other-info">
                  <p class="pet-medicine">Tempermant: {{ pet.tempermant }}</p>
                  <p class="pet-medicine">Specialty Needs: {{ pet.specialtyNeeds }}</p>
                  <p class="pet-medicine">Medicine: {{ pet.petMedice }}</p>
                  <p class="pet-diet">Diet: {{ pet.petDiet }}</p>
                </div>
              </div>

              <div class="edit-pet-btn">
                <el-button @click="openEditPet(pet)">Edit</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="reservations-container" v-if="reservations.length">
          <h3>Reservations</h3>

          <ul class="reservations"> 
            <li v-for="(reservation) in reservations" :key="reservation.res_id" class="reservation">
              <div class="reservation-info">
                <span>Check In: {{ checkinDate(reservation) }}, {{ reservation.checkin_time }}</span> 
                <span>Check Out: {{ checkoutDate(reservation) }}, {{ reservation.checkout_time }}</span>
                <span>Pets Reserved: {{ reservation.numOfDogs }}</span>
              </div>
              <div class="options-btns">
                <button class="cancel" @click="cancel(reservation)">Cancel</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- ADD PET DIALOG -->
      <el-dialog
        :visible.sync="addPetDialog"
        width="90%">

    
        <div>
          <h2>New Pet</h2>

          <label for="petName">Name</label>
          <el-input v-model="newPetProfile.petName" type="text" class="form-group" placeholder="Name" name="petName"></el-input>

          <label for="petAge">Age</label>
          <el-input v-model="newPetProfile.petAge" type="text" class="form-group" placeholder="Age" name="petAge"></el-input>

          <div class="pet-breed">
            <label for="petBreed">Breed</label>
            <el-autocomplete
              class="inline-input"
              v-model="newPetProfile.petBreed"
              :fetch-suggestions="querySearch"
              placeholder="Pet Breed"
            ></el-autocomplete>
          </div>

          <label for="tempermant">Tempermant</label>
          <el-input v-model="newPetProfile.tempermant" type="text" class="form-group" placeholder="Please describe your dogs tempermant e.g. (Personality)" name="tempermant"></el-input>

          <label for="specialtyNeeds">Specialty Needs</label>
          <el-input v-model="newPetProfile.specialtyNeeds" type="text" class="form-group" placeholder="Specialty needs e.g. (If your dog is blind, deaf, diabetic etc.)" name="specialtyNeeds"></el-input>

          <label for="petMedicine">Medicine</label>
          <el-input v-model="newPetProfile.petMedice" type="text" class="form-group" placeholder="Medicine" name="petMedicine"></el-input>

          <label for="petDiet">Dietary Restrictions</label>
          <el-input v-model="newPetProfile.petDiet" type="text" class="form-group" placeholder="Dietary Restrictions" name="petDiet"></el-input>
        </div>  
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="addPetDialog = false">Cancel</el-button>
          <el-button type="primary" @click="addPet">Add</el-button>
        </span>
      </el-dialog>

     <!-- EDIT PET PROFILE DIALOG -->
      <el-dialog
        :visible.sync="editPetDialog"
        width="90%">
        
        <div class="edit-pet">
          <h2>Edit Pet</h2>

          <label for="petName">Name</label>
          <el-input v-model="updatedPetProfile.petName" type="text" class="form-group" placeholder="Name" name="petName"></el-input>

          <label for="petAge">Age</label>
          <el-input v-model="updatedPetProfile.petAge" type="text" class="form-group" placeholder="Age" name="petAge"></el-input>

          <div class="pet-breed">
            <label for="petBreed">Breed</label>
            <el-autocomplete
              class="inline-input"
              v-model="updatedPetProfile.petBreed"
              :fetch-suggestions="querySearch"
              placeholder="Pet Breed"
            ></el-autocomplete>
          </div>

          <label for="tempermant">Tempermant</label>
          <el-input v-model="updatedPetProfile.tempermant" type="text" class="form-group" placeholder="Please describe your dogs tempermant e.g. (Personality)" name="tempermant"></el-input>

          <label for="specialtyNeeds">Specialty Needs</label>
          <el-input v-model="updatedPetProfile.specialtyNeeds" type="text" class="form-group" placeholder="Specialty needs e.g. (If your dog is blind, deaf, diabetic etc.)" name="specialtyNeeds"></el-input>

          <label for="petMedicine">Medicine</label>
          <el-input v-model="updatedPetProfile.petMedice" type="text" class="form-group" placeholder="Medicine" name="petMedicine"></el-input>

          <label for="petDiet">Dietary Restrictions</label>
          <el-input v-model="updatedPetProfile.petDiet" type="text" class="form-group" placeholder="Dietary Restrictions" name="petDiet"></el-input>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editPetDialog = false">Cancel</el-button>
          <el-button type="primary" @click="editPetProfile">Save</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'SelectedProfile',
  data: () => ({
    edit: false,
    editPetDialog: false,
    dialogVisible: false,
    addPetDialog: false,
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
    },
    updatedPetProfile: {},
    newPetProfile: {
      petName: '',
      petAge: '',
      petBreed: '',
      tempermant: '',
      specialtyNeeds: '',
      petMedice: 'N/A',
      petDiet: 'N/A'
    },
    breeds: []
  }),
  created() {
    this.$store.dispatch('selectProfile', this.$route.params.id)
    this.loadDogBreeds()
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
    ...mapActions('reservation', ['updateCancelledKennels']),
    ...mapActions('profile', ['updatePetProfile']),
    checkinDate(reservation) {
      return moment(reservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate(reservation) {
      return moment(reservation.checkout_date).format('MMM Do YYYY')
    },
    addPet() {
      this.$store.dispatch('addPetProfile', this.newPetProfile)
      this.addPetDialog = false
    },
    updateProfile() {
      this.$store.dispatch('updateProfile', this.profile)
      this.dialogVisible = false
    },
    openEditPet(petProfile) {
      this.editPetDialog = true
      this.updatedPetProfile = petProfile
    },
    editPetProfile() {
      this.updatePetProfile(this.updatedPetProfile)
      this.editPetDialog = false
    },
    openAddPet() {
      this.newPetProfile.petName = ''
      this.newPetProfile.petAge = ''
      this.newPetProfile.petBreed = ''
      this.newPetProfile.petMedice = ''
      this.newPetProfile.petDiet = ''
      this.addPetDialog = true
    },
    cancel(res) {
      this.$store.dispatch('cancelReservation', res)
      this.updateCancelledKennels(res)
    },
    // Loading Dog Breeds
    async loadDogBreeds() {
      const response = await axios({
        method:'get',
        url:'https://api.TheDogAPI.com/v1/breeds',
        headers: {'x-api-key': '147fd97a-419d-4fe0-90be-ee6c0b83cbe6'}
      })

      const breeds = []
      response.data.forEach(breed => {
        breeds.push({ 'value': `${breed.name.toUpperCase()}`, 'id': `${breed.id}` })
      })
      this.breeds = breeds 
    },
    querySearch(queryString, cb) {
      const breeds = this.breeds
      const results = queryString ? breeds.filter(this.createFilter(queryString)) : breeds;
      cb(results)
    },
    createFilter(queryString) {
      return (breed) => {
        return (breed.value.toUpperCase().indexOf(queryString.toUpperCase()) === 0);
      }
    },
  }
}
</script>

<style scoped lang="scss">
// NAVIGATION
.nav {
  padding: 20px;
  background: #C2B59B;

  & .nav-items {
    display: flex;
    justify-content: space-between;
    padding: 0px 40px;
  }
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
  justify-content: space-between;
  background: #C2B59B;
  padding: 10px;
  color: #001B54;
  border-radius: 3px;
  margin-bottom: 20px;
}

.pet-info {
  width: 100%;

  & span {
    font-size: 1.5rem;
    margin-right: 10px;
  }

  & .add-pet-btn {
    margin-bottom: 20px;
  }
}

.pet {
  margin: 0px 10px 0px 0px;
  color: #001B54;
}

.pet-breed {
  display: flex;
  flex-direction: column;
}

.pet-diet, .pet-medicine {
  margin: 0px;
}

.edit-pet-btn {

  & button {
    background: #4CB544;
    color: #fff;
    border: 1px solid #4CB544;

    &:hover {
      background: #4f8f4a;
      border: 1px solid #4f8f4a;
    }
  }
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
  border: 1px solid #4CB544;

  &:hover {
    background: #4f8f4a;
    border: 1px solid #4f8f4a;
    color: #fff;
  }
}

.el-input  {
  margin-bottom: 10px;
}
</style>
