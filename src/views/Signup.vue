<template>
  <div class="signup-container">
    <Navbar></Navbar>

    <div class="signup">
      <h1>Sign Up</h1>
      
      <div class="google-signup">
        <button @click="signupWithGoogle">Sign Up with Google <i class="fab fa-google"></i></button>
        <p>Or Sign up with</p>
      </div>

      <form @submit.prevent="onSubmit" class="form">
        <div class="input-group">
          <input v-model="user.email" type="text" class="form-group" placeholder="Email">
        </div>

        <div class="input-group">
          <input v-model="user.password" type="password" class="form-group" placeholder="Password">
        </div>

        <div class="input-group">
          <input v-model="confirmPassword" type="password" class="form-group" placeholder="Confirm Password">
          <small class="confirmPassword">{{ passwordConfirm }}</small>
        </div>

        <button class="submit-btn" type="submit">Submit</button>
      </form>

      <div class="login-account">
        <p>
          Already have an account?
          <router-link to="/login" class="login-link">Login</router-link>
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
  name: 'signup',
  components: {
    Navbar
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      confirmPassword: '',
    }
  },
  computed: {
    passwordConfirm() {
      return this.user.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  },
  methods: {
    ...mapActions('auth', ['signupWithGoogle', 'signUpEmail']),
    onSubmit() {
      if (this.user.email === '' || this.user.password === '' || this.confirmPassword === '') {
        UIkit.notification({
          message: 'Please enter Email and Password!',
          status: 'danger',
          pos: 'top-center',
          timeout: 4000
        });
      } else {
        if (this.confirmPassword === this.user.password) {
          this.signUpEmail(this.user)
          this.$router.push('/')
        } else {
          this.error = 'Passwords do not match.'
        }
      }
    }
  }
}
</script>

<style scoped>
.signup {
  width: 90%;
  margin: 40px auto;
}

/* SIGNUP TITLE */

.signup h1 {
  text-align: center;
  color: #001B54;
}

/* GOOGLE SIGNUP SECTION */

.google-signup {
  max-width: 605px;
  margin: 0 auto;
}

.google-signup button{
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: #db3236;
  cursor: pointer;
  border: none;
  border-radius: 0px;
}

.google-signup p {
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

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.confirmPassword {
  color: #db3236;
  margin-bottom: 10px;
}

/* LOGIN ACCOUNT SECTION */

.login-account p {
  text-align: center;
  color: #001B54;
}

</style>
