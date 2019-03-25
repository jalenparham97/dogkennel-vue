<template>
  <div class="general-info">
    <form class="form">
        <div class="profile-form">
          <h2>Owner Profile</h2>

          <label for="firstName">First Name</label>
          <el-input v-model="profile.firstName" type="text" class="form-group" placeholder="First Name" name="firstName"></el-input>

          <label for="lastName">Last Name</label>
          <el-input v-model="profile.lastName" type="text" class="form-group" placeholder="Last Name" name="lastName"></el-input>

          <label for="phone">Phone Number</label>
          <el-input v-model="profile.phone" type="text" class="form-group" placeholder="Phone Number" name="phone"></el-input>

          <label for="email">Email Address</label>
          <el-input v-model="profile.email" type="text" class="form-group" placeholder="Email Address" name="email"></el-input>

          <label for="address">Home Address</label>
          <el-input v-model="profile.address" type="text" class="form-group" placeholder="Home Address" name="address"></el-input>
        </div>

        <div class="profile-form">
          <h2>Veterinarian Info</h2>

          <label for="clinic">Clinic Name</label>
          <el-input v-model="profile.clinic" type="text" class="form-group" placeholder="Clinic Name" name="clinic"></el-input>

          <label for="vetPhone">Phone Number</label>
          <el-input v-model="profile.vetPhone" type="text" class="form-group" placeholder="Phone Number" name="vetPhone"></el-input>

          <label for="vetAddress">Address</label>
          <el-input v-model="profile.vetAddress" type="text" class="form-group" placeholder="Address" name="vetAddress"></el-input>

          <label for="vetEmail">Email Address</label>
          <el-input v-model="profile.vetEmail" type="email" class="form-group" placeholder="Email Address" name="vetEmail"></el-input>

          <label for="vetFax">Fax Number</label>
          <el-input v-model="profile.vetFax" type="text" class="form-group" placeholder="Fax Number" name="vetFax"></el-input>
        </div>

        <div class="profile-form">
          <h2>Pet Profile</h2>

          <label for="petName">Name</label>
          <el-input v-model="petProfile.petName" type="text" class="form-group" placeholder="Name" name="petName"></el-input>

          <label for="petAge">Age</label>
          <el-input v-model="petProfile.petAge" type="text" class="form-group" placeholder="Age" name="petAge"></el-input>

          <div class="pet-breed">
            <label for="petBreed">Breed</label>
            <el-autocomplete
              class="inline-input"
              v-model="petProfile.petBreed"
              :fetch-suggestions="querySearch"
              placeholder="Pet Breed"
            ></el-autocomplete>
          </div>

          <label for="tempermant">Tempermant</label>
          <el-input v-model="petProfile.petTempermant" type="text" class="form-group" placeholder="Please describe your dogs tempermant e.g. (Personality)" name="tempermant"></el-input>

          <label for="specialtyNeeds">Specialty Needs</label>
          <el-input v-model="petProfile.petSpecialtyNeeds" type="text" class="form-group" placeholder="Please describe your pets specialty needs e.g. (If your dog is blind, deaf, diabetic etc.)" name="specialtyNeeds"></el-input>

          <label for="petMedicine">Medicine</label>
          <el-input v-model="petProfile.petMedice" type="text" class="form-group" placeholder="Medicine" name="petMedicine"></el-input>

          <label for="petDiet">Dietary Restrictions</label>
          <el-input v-model="petProfile.petDiet" type="text" class="form-group" placeholder="Dietary Restrictions" name="petDiet"></el-input>
        </div>

        <el-button class="submit-btn" @click.prevent="onSubmit" type="primary">Save</el-button>
      </form>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
import UIkit from 'uikit'
import axios from 'axios'
import uuid from 'uuid'
import { Notification } from 'element-ui';

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
      },
      petProfile: {
        petName: '',
        petAge: '',
        petBreed: '',
        petTempermant: '',
        petSpecialtyNeeds: '',
        petMedice: '',
        petDiet: '',
        profile_id: uuid()
      },
      error: '',
      breeds: []
    }
  },
  created() {
    this.profile.email = this.user.email
    this.loadDogBreeds()
  },
  computed: {
    ...mapGetters('auth', ['user']),
    formIsValid() {
      if (this.profile.firstName === '' || this.profile.lastName === '' || this.profile.phone === '' || this.profile.email === '' || this.profile.address === '' || this.profile.clinic === '' || this.profile.vetPhone === '' || this.profile.vetEmail === '' || this.profile.vetAddress === '' || this.profile.vetFax === '' || this.profile.petName === '' || this.profile.petAge === '' || this.profile.petBreed === '' || this.profile.petMedice === '' || this.profile.petDiet === '') {
        return false
      } else {
        return true
      }
    },
    filteredBreeds() {
      return this.breeds.filter(breed => {
        return breed.name.match(this.profile.petBreed.toUpperCase())
      })
    }
  },
  methods: {
    ...mapActions('profile', ['saveProfile', 'addPetProfile']),
    onSubmit() {
      if (!this.formIsValid) {
        Notification.error({
          title: 'Error',
          message: 'Do not leave any fields empty!',
          duration: 4000
        });
      } else {
        this.saveProfile(this.profile)
        this.addPetProfile(this.petProfile)
      }
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
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 10px;
  color: #001B54;
}

.pet-breed {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  background: #001B54;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
