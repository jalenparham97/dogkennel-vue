<template>
  <div class="container-profile">
    <Navbar></Navbar>

    <div class="profile">
      <div class="sidebar">
        <div class="heading">
          <h1 class="initials">{{ initials() }}</h1>
          <h2 class="name">{{ userProfile.firstName }} {{ userProfile.lastName }}</h2>
        </div>
        
        <div class="side-navigation">
          <ul class="sidenav">
            <li class="nav-item">
              <router-link to="/reservation" class="nav-link">Make a Reservation</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="editProfileDialog = true">Edit Profile</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="profile-container">
        <div class="profile-info">
          <div class="container">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p class="phone contact">Phone: {{ userProfile.phone }}</p>
              <p class="email contact">Email: {{ userProfile.email }}</p>
              <p class="address contact">Address: {{ userProfile.address }}</p>
            </div>

            <div class="vet-info">
              <h3>Veterinarian Information</h3>
              <p class="vet clinic">Clinic: {{ userProfile.clinic }}</p>
              <p class="vet vet-phone">Phone: {{ userProfile.vetPhone }}</p>
              <p class="vet vet-email">Email: {{ userProfile.vetEmail }}</p>
              <p class="vet vet-address">Address: {{ userProfile.vetAddress }}</p>
            </div>
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
          <h3>Your Reservations</h3>

          <ul class="reservations"> 
            <li v-for="reservation in reservations" :key="reservation.res_id" class="reservation">
              <div class="reservation-info">
                <span>Check In: {{ checkinDate(reservation) }}, {{ reservation.checkin_time }}</span> 
                <span>Check Out: {{ checkoutDate(reservation) }}, {{ reservation.checkout_time }}</span>
                <span>Pets Reserved: {{ reservation.numOfDogs }}</span>
              </div>
              <span>Total Price: ${{ reservation.totalPrice }}</span>
              <div class="options-btns">
                <button class="cancel" @click="cancel(reservation)">Cancel</button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- EDIT PROFILE DIALOG -->
      <el-dialog
        :visible.sync="editProfileDialog"
        width="90%">
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
          <el-button @click="editProfileDialog = false">Cancel</el-button>
          <el-button type="primary" @click="updateProfile">Save</el-button>
        </span>
      </el-dialog>

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
          <el-button @click="cancelAddPet">Cancel</el-button>
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
import Navbar from '../components/Navbar'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import axios from 'axios'
 
export default {
  name: 'profile',
  components: {
    Navbar
  },
  data() {
    return {
      editProfileDialog: false,
      addPetDialog: false,
      editPetDialog: false,  
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
      breeds: [],
    }
  },
  created() {
    this.loadDogBreeds()
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('profile', ['profile', 'petProfiles']),
    ...mapGetters('reservation', ['reservations']),
    userProfile() {
      this.updatedProfile = this.profile
      return this.updatedProfile
    },
  },
  methods: {
    ...mapActions('profile', ['getProfile', 'updateUserProfile', 'addPetProfile', 'updatePetProfile', 'getPetProfiles', 'resetState']),
    ...mapActions('auth', ['logout']),
    ...mapActions('reservation', ['cancelReservation', 'updateCancelledKennels', 'resetResState']),
    checkinDate(reservation) {
      return moment(reservation.checkin_date).format('MMM Do YYYY')
    },
    checkoutDate(reservation) {
      return moment(reservation.checkout_date).format('MMM Do YYYY')
    },
    initials() {
      const firstInitial = this.userProfile.firstName.split('')
      const lastInitial = this.userProfile.lastName.split('')
      return `${firstInitial[0]}${lastInitial[0]}`
    },
    cancel(res) {
      this.cancelReservation(res)
      this.updateCancelledKennels(res)
    },
    updateProfile() {
      this.updateUserProfile(this.updatedProfile)
      this.editProfileDialog = false
    },
    editPetProfile() {
      this.updatePetProfile(this.updatedPetProfile)
      console.log(this.updatedPetProfile)
      this.editPetDialog = false
    },
    addPet() {
      this.addPetProfile(this.newPetProfile)
      console.log(this.newPetProfile)
      this.addPetDialog = false
    },
    openEditPet(petProfile) {
      this.editPetDialog = true
      this.updatedPetProfile = petProfile
    },
    openAddPet() {
      this.newPetProfile.petName = ''
      this.newPetProfile.petAge = ''
      this.newPetProfile.petBreed = ''
      this.newPetProfile.tempermant = ''
      this.newPetProfile.specialtyNeeds = ''
      this.newPetProfile.petMedice = ''
      this.newPetProfile.petDiet = ''
      this.addPetDialog = true
    },
    cancelAddPet() {
      this.getPetProfiles()
      this.addPetDialog = false
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
  justify-content: space-between;
  background: #C2B59B;
  padding: 10px;
  color: #001B54;
  border-radius: 3px;
  margin-bottom: 20px;
}

.pet-profile-title {
  display: flex;
  margin-bottom: 20px;

  & button {
    margin-left: 10px;
  }
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

.el-input  {
  margin-bottom: 10px;
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

@media only screen and (max-width: 500px) {
  .pet-profile {
    flex-direction: column;
  }
}

</style>
