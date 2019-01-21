<template>
  <div class="profile">
    <h1>{{ profile.firstName }} {{ profile.lastName }}</h1>

    <div class="profile-info">
      <div class="contact-info">
        <h3>Contact Information</h3>
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

      <div class="pet-info">
        <h3>Pet Profile(s)</h3>
        <div class="pet-profile">
          <div class="main-info">
            <p class="pet pet-name">Name: {{ profile.petName }}</p>
            <p class="pet pet-bread">Breed: {{ profile.petBreed }}</p>
            <p class="pet pet-age">Age: {{ profile.petAge }}</p>
          </div>
          <div v-if="togglePetDiet" class="other-info">
            <p class="pet-toggle pet-medicine">Medicine: {{ profile.petMedice }}</p>
            <p class="pet-toggle pet-diet">Diet: {{ profile.petDiet }}</p>
          </div>
          <p @click="toggleDiet" class="more">{{ more }}</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
 
export default {
  name: 'profile',
  data() {
    return {
      more: 'More',
      togglePetDiet: false
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {
    ...mapActions('profile', ['getProfile']),
    toggleDiet() {
      !this.togglePetDiet ? this.more = 'Less' : this.more = 'More'
      this.togglePetDiet = !this.togglePetDiet
    }
  }
}
</script>

<style lang="scss" scoped>
/* PROFILE SECTION */

.profile {
  width: 90%;
  margin: 40px auto;
}

.profile-info {
  display: flex;
  color: #001B54;
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
  background: #C2B59B;
  padding: 10px;
  color: #001B54;
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

/* MEDIA QUERY */

@media only screen and (max-width: 993px) {
  .profile-info {
    flex-direction: column;
  }

  .contact-info, .vet-info, .pet-info {
    width: 100%;
  }
}

</style>
