<template>
  <div class="login-container">
    <Navbar></Navbar>

    <div class="login">
      <h1>Login</h1>

      <div class="google-login">
        <button @click="loginWithGoogle">Login with Google <i class="fab fa-google"></i></button>
        <p>Or Login with</p>
      </div>

      <form @submit.prevent="onSubmit" class="form">
        <input v-model="user.email" type="text" class="form-group" placeholder="Email">
        <input v-model="user.password" type="password" class="form-group" placeholder="Password">
        <button class="submit-btn" type="submit">Submit</button>
      </form>

      <div class="signup-account">
        <p>
          Don't have an account?
          <router-link to="/signup" class="signup-link">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapActions, mapGetters } from 'vuex'
import UIkit from 'uikit';

export default {
  name: 'login',
  components: {
    Navbar
  },
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
    ...mapActions('auth', ['loginWithGoogle', 'loginWithEmail']),
    onSubmit() {
      if (this.user.email === '' || this.user.password === '') {
        UIkit.notification({
          message: 'Please enter email and password',
          status: 'danger',
          pos: 'top-center',
          timeout: 4000
        });
      } else {
        this.loginWithEmail(this.user)
        this.$router.push('/')
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

/* SIGNUP TITLE */

.login h1 {
  text-align: center;
  color: #001B54;
}

/* GOOGLE LOGIN SECTION */

.google-login {
  max-width: 605px;
  margin: 0 auto;
}

.google-login button{
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: #db3236;
  cursor: pointer;
  border: none;
  border-radius: 0px;
}

.google-login p {
  text-align: center;
}

/* SIGNUP FORM */

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

