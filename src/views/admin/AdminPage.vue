<template>
  <div class="admin">
    <h1 class="heading">Beekel Farms Kennel Admin Page</h1>

    <div class="options-btns">
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
</template>

<script>
export default {
  name: 'AdminPage'
}
</script>

<style scoped>
  .heading {
    text-align: center;
    margin-top: 40px;
    color: #001B54;
  }

  .options-btns {
    display: flex;
    justify-content: center;
    margin-top: 70px;
  }

  .options-btns button {
    margin: 0px 40px;
    font-size: 1.2rem;
  }
</style>
