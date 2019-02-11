<template>
  <div class="login-container">
    <div class="login">
      <h1>Admin Login</h1>

      <form @submit.prevent="adminLogin" class="form">
        <input v-model="user.email" type="text" class="form-group" placeholder="Email">
        <input v-model="user.password" type="password" class="form-group" placeholder="Password">
        <button class="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UIkit from 'uikit';

export default {
  name: 'AdminLogin',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    adminLogin() {
      if (this.user.email === '' || this.user.password === '') {
        UIkit.notification({
          message: 'Email and password required',
          status: 'danger',
          pos: 'top-center',
          timeout: 4000
        });
      } else { 
        this.$store.dispatch('adminLogin', this.user)
      }
    }
  }  
}
</script>

<style scoped>
.login {
  width: 90%;
  margin: 40px auto;
}

/* ADMIN LOGIN TITLE */

.login h1 {
  text-align: center;
  color: #001B54;
}

/* ADMIN LOGIN FORM */

.form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  padding: 10px;
  font-size: 1.2rem;
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #001B54;
  color: #001B54;
}

.submit-btn {
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: #001B54;
  cursor: pointer;
  margin-bottom: 10px;
}

/* SIGNUP ACCOUNT SECTION */

.signup-account p {
  text-align: center;
  color: #001B54;
}

</style>

