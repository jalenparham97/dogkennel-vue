<template>
  <div class="admin">
    <h1 class="heading">Beekel Farms Kennel Admin Page</h1>

    <div class="options-btns">
      <button class="res-search" @click="$router.push('/admin/bfk/reservations')">
        Search Reservations
      </button>
      <button class="customer-search" @click="$router.push('/admin/bfk/search')">
        Find Customers
      </button>
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
    cursor: pointer;
    padding: 10px 20px;
    background: #001B54;
    color: #fff;
    font-size: 1.2rem;
    border-radius: 5px;
    outline: none;
  }
</style>
