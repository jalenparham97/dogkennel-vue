<template>
  <div class="general-info">
    <form @submit.prevent="onSubmit" class="form">
      <div class="profile-form">
        <h2>Profile Info</h2>

        <label for="firstName">First Name</label>
        <input v-model="profile.firstName" type="text" class="form-group" placeholder="First Name" name="firstName">

        <label for="lastName">Last Name</label>
        <input v-model="profile.lastName" type="text" class="form-group" placeholder="Last Name" name="lastName">

        <label for="phone">Phone Number</label>
        <input v-model="profile.phone" type="text" class="form-group" placeholder="Phone Number" name="phone">

        <label for="email">Email Address</label>
        <input v-model="profile.email" type="text" class="form-group" placeholder="Email Address" name="email">

        <label for="address">Home Address</label>
        <input v-model="profile.address" type="text" class="form-group" placeholder="Home Address" name="address">
      </div>

      <div class="profile-form">
        <h2>Veterinarian Info</h2>

        <label for="clinic">Clinic Name</label>
        <input v-model="profile.clinic" type="text" class="form-group" placeholder="Clinic Name" name="clinic">

        <label for="vetPhone">Phone Number</label>
        <input v-model="profile.vetPhone" type="text" class="form-group" placeholder="Phone Number" name="vetPhone">

        <label for="vetAddress">Adress</label>
        <input v-model="profile.vetAddress" type="text" class="form-group" placeholder="Address" name="vetAddress">

        <label for="vetEmail">Email Adress</label>
        <input v-model="profile.vetEmail" type="text" class="form-group" placeholder="Email Address" name="vetEmail">

        <label for="vetFax">Fax Number</label>
        <input v-model="profile.vetFax" type="text" class="form-group" placeholder="Fax Number" name="vetFax">
      </div>

      <div class="profile-form">
        <h2>Pet Info</h2>

        <label for="petName">Name</label>
        <input v-model="profile.petName" type="text" class="form-group" placeholder="Name" name="petName">

        <label for="petAge">Age</label>
        <input v-model="profile.petAge" type="text" class="form-group" placeholder="Age" name="petAge">

        <div class="breed-group">
          <label for="petBreed">Breed</label>
          <input @click="getDogBreeds" v-model="profile.petBreed" type="text" class="form-group" placeholder="Breed" name="petBreed">
          <div class="breed-dropdown" uk-dropdown="mode: click">
            <ul class="breeds">
              <li @click="selectBreed(breed.name)" v-for="breed in filteredBreeds" :key="breed.id" class="breed"><span>{{ breed.name }}</span></li>
            </ul>
          </div>
        </div>

        <label for="petMedicine">Medicine</label>
        <input v-model="profile.petMedice" type="text" class="form-group" placeholder="Medicine" name="petMedicine">

        <label for="petDiet">Dietary Restrictions</label>
        <input v-model="profile.petDiet" type="text" class="form-group" placeholder="Dietary Restrictions" name="petDiet">
      </div>

      <button class="submit-btn" type="submit">Save & Make a Reservation</button>
    </form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UIkit from 'uikit'
import axios from 'axios'

export default {
  name: 'profileform',
  data() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        clinic: '',
        vetPhone: '',
        vetAddress: '',
        vetEmail: '',
        vetFax: '',
        petName: '',
        petAge: '',
        petBreed: '',
        petMedice: '',
        petDiet: ''
      },
      error: '',
      breeds: [],
    }
  },
  computed: {
    formIsValid() {
      if (this.profile.firstName === '' || this.profile.lastName === '' || this.profile.phone === '' || this.profile.email === '' || this.profile.address === '' || this.profile.clinic === '' || this.profile.vetPhone === '' || this.profile.vetEmail === '' || this.profile.vetAddress === '' || this.profile.vetFax === '' || this.profile.petName === '' || this.profile.petAge === '' || this.profile.petBreed === '' || this.profile.petMedice === '' || this.profile.petDiet === '') {
        return false
      } else {
        return true
      }
    },
    filteredBreeds() {
      return this.breeds.filter(breed => {
        return breed.name.match(this.profile.petBreed)
      })
    }
  },
  methods: {
    ...mapActions('profile', ['saveProfile']),
    onSubmit() {
      if (!this.formIsValid) {
        UIkit.notification({
          message: 'Do not leave any fields empty!',
          status: 'danger',
          pos: 'top-center',
          timeout: 4000
        }); 
      } else {
        this.saveProfile(this.profile)
      }
    },
    getDogBreeds() {
      axios({
        method:'get',
        url:'https://api.TheDogAPI.com/v1/breeds',
        headers: {'x-api-key': '147fd97a-419d-4fe0-90be-ee6c0b83cbe6'}
      }).then(response => {
        const breeds = []
        response.data.forEach(breed => {
          breeds.push({ id: breed.id, name: breed.name })
        })
        this.breeds = breeds
      }).catch(err => {
        console.log(err)
      })
    },
    selectBreed(breed) {
      this.profile.petBreed = breed
    }
  }
}
</script>

<style scoped>
.general-info {
  margin: 50px auto;
  width: 90%;
}

/* FORM */

.form {
  display: flex;
  flex-direction: column;
  max-width: 550px;
  margin: 0 auto;
}

.profile-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.profile-form h2 {
  text-align: center;
  color: #001B54;
}

.profile-form label {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #001B54;
}

.submit-btn, .form-group {
  padding: 10px;
  font-size: 1.2rem;
  outline: none;
}

.form-group {
  margin-bottom: 10px;
  border: 1px solid #001B54;
  color: #001B54;
}

.breed-group {
  display: flex;
  flex-direction: column;
}

.breed-dropdown {
  max-width: 300px;
  height: 150px;
  overflow-y: scroll;
  padding: 0px;
}

.breeds {
  list-style: none;
  width: 100%;
  padding: 0px;
}

.breed {
  color: #001B54;
  cursor: pointer;
}

.breed:hover {
  background: #efefef;
}

.breed span {
  margin-left: 10px;
}

.submit-btn {
  background: #001B54;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
