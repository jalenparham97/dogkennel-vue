<template>
  <div class="signup">
    <h1>Sign Up</h1>

    <form @submit.prevent="onSubmit" class="form">
      <div class="google-signup">
        <button @click="signupWithGoogle">Sign Up with Google <i class="fab fa-google"></i></button>
        <p>Or Sign up with</p>
      </div>

      <div v-if="error" class="uk-alert-danger" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ error }}</p>
      </div>

      <input v-model="user.email" type="text" class="form-group" placeholder="Email">
      <input v-model="user.password" type="password" class="form-group" placeholder="Password">
      <input v-model="confirmPassword" type="password" class="form-group" placeholder="Confirm Password">
      <button class="submit-btn" type="submit">Submit</button>
    </form>

    <div class="login-account">
      <p>
        Already have an account?
        <router-link to="/login" class="login-link">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'signup',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    ...mapActions('auth', ['signupWithGoogle', 'signUpEmail']),
    onSubmit() {
      if (this.user.email === '' || this.user.password === '' || this.confirmPassword === '') {
        this.error = 'Please enter Email and Password.'
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
}

.submit-btn {
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background: #001B54;
  cursor: pointer;
  margin-bottom: 10px;
}

/* LOGIN ACCOUNT SECTION */

.login-account p {
  text-align: center;
  color: #001B54;
}

</style>
