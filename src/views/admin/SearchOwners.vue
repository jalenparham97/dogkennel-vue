<template>
  <div class="search">
    <div class="nav">
      <div class="search-input">
        <el-input
          placeholder="Search Owners"
          prefix-icon="el-icon-search"
          clearable
          v-model="query">
        </el-input>

        <el-button type="primary" @click="$router.push('/admin/bfk/reservations')">
          Search Reservations
        </el-button>
        <el-button type="primary" @click="$router.push('/admin/bfk/add')">
          Add Customer
        </el-button>  
        <el-button type="primary" @click="$router.push('/admin/bfk/reservation')">
          Make Reservation
        </el-button>
      </div>
    </div>

    <div class="owners">
      <div class="owner" v-for="owner in allOwners" :key="owner.user_id">
        <div>
         <h4 class="header">Name</h4>
         <p class="data">{{ owner.firstName }} {{ owner.lastName }}</p>
       </div>
       <div>
         <h4 class="header">Email</h4>
         <p class="data">{{ owner.email }}</p>
       </div>
       <div>
         <h4 class="header">Phone</h4>
         <p class="data">{{ owner.phone }}</p>
       </div>
       <div>
         <h4 class="header">Address</h4>
         <p class="data">{{ owner.address }}</p>
       </div>
       <div class="actions">
         <el-button class="select" @click="selectProfile(owner.user_id)">Select</el-button>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchOwners',
  data: () => ({
    query: ''
  }),
  created() {
    this.$store.dispatch('getAllUsers')
  },
  computed: {
    owners() {
      return this.$store.getters.allUsers
    },
    allOwners() {
      return this.owners.filter(owner => {
        return owner.firstName.toLowerCase().match(this.query.toLowerCase())
      })
    }
  },
  methods: { 
    selectProfile(id) {
      this.$store.dispatch('selectProfile', id)
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  padding: 20px;
  background: #C2B59B;
}

.search-input {
  display: flex;
}

.el-input {
  margin-right: 10px;
  width: 90%;
  font-size: 1rem;
}

.owners {
  padding: 40px;
}

.owner {
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

button.select:hover {
  background: #001B54;
  color: #fff;
  border: 1px solid #001B54;
}
</style>
