<template>
  <div class="add-container">
    <div class="nav">
      <div class="nav-items">
        <el-button type="primary" @click="$router.push('/admin/bfk/reservations')">
          Search Reservations
        </el-button>
        <el-button type="primary" @click="$router.push('/admin/bfk/search')">
          Find Customers
        </el-button>  
        <el-button type="primary" @click="$router.push('/admin/bfk/reservation')">
          Make Reservation
        </el-button>
      </div>
    </div>

    <div class="add-customer">
      <h1>Create A New Customer</h1>

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

          <label for="petMedicine">Medicine</label>
          <el-input v-model="petProfile.petMedice" type="text" class="form-group" placeholder="Medicine" name="petMedicine"></el-input>

          <label for="petDiet">Dietary Restrictions</label>
          <el-input v-model="petProfile.petDiet" type="text" class="form-group" placeholder="Dietary Restrictions" name="petDiet"></el-input>
        </div>

        <el-button class="submit-btn" @click.prevent="addCustomer" type="primary">Create Customer</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import uuid from 'uuid'
import axios from 'axios'
import { Notification } from 'element-ui';

export default {
  name: 'AddCustomer',
  data: () => ({
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
      petMedice: '',
      petDiet: '',
      profile_id: uuid()
    },
    error: '',
    breeds: [],
  }),
  mounted() {
    this.loadDogBreeds();
  },
  computed: {
    formIsValid() {
      if (this.profile.firstName === '' || this.profile.lastName === '' || this.profile.phone === '' || this.profile.email === '' || this.profile.address === '' || this.profile.clinic === '' || this.profile.vetPhone === '' || this.profile.vetEmail === '' || this.profile.vetAddress === '' || this.profile.vetFax === '' || this.profile.petName === '' || this.profile.petAge === '' || this.profile.petBreed === '' || this.profile.petMedice === '' || this.profile.petDiet === '') {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    addCustomer() {
      if (!this.formIsValid) { 
        Notification.error({
          title: 'Error',
          message: 'Do not leave any fields empty!',
          duration: 4000
        });
      } else {
        const newUser = {
          profile: {...this.profile, password: 'bfk123'},
          petProfile: {...this.petProfile}
        }
        this.$store.dispatch('signUpEmail', newUser)
      }
    },
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
      const breeds = this.breeds;
      const results = queryString ? breeds.filter(this.createFilter(queryString)) : breeds;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (breed) => {
        return (breed.value.toUpperCase().indexOf(queryString.toUpperCase()) === 0);
      };
    },
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    padding: 20px;
    background: #C2B59B;

    & .nav-items {
      display: flex;
      justify-content: space-between;
      padding: 0px 40px;
    }
  }

  .add-customer {
    width: 90%;
    margin: 0 auto;

    h1 {
      text-align: center;
      margin-top: 40px;
    }
  }

  .profile-form {
    margin-top: 40px;
  }

  .submit-btn {
    margin: 20px auto;
    display: flex;
    justify-content: center;
  }

  .pet-breed {
    display: flex;
    flex-direction: column;
  }

</style>
