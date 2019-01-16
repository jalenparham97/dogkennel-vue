<template>
  <div id="app">
    <section class="nav-container">
      <div v-if="!isLoggedIn" class="reservation-sign-up">
        <h3>
          <router-link class="auth-btn" to="/signup">Sign Up</router-link> or <router-link class="auth-btn" to="/login">Login</router-link> to make a reservation!
        </h3>
      </div>
      <nav class="nav">
        <div class="navbar">
          <div class="navbar-brand">
            <h3>Beekel Farms Kennel</h3>
          </div>
          <ul class="navbar-nav">
            <li class="nav-item link"><router-link class="nav-link" to="/">Home</router-link></li>
            <li class="nav-item link"><router-link class="nav-link" to="/about">About Us</router-link></li>
            <li class="nav-item link"><router-link class="nav-link" to="/services">Services</router-link></li>
            <li class="nav-item link"><router-link to="/reservation" class="nav-link">Reservation</router-link></li>
            <li v-for="item in menu" :key="item.name" class="nav-item link"><router-link :to="item.to" class="nav-link">{{ item.name }}</router-link></li>
            <li @click="onLogout" v-if="isLoggedIn" class="nav-item link"><router-link class="nav-link" to="/login">Logout</router-link></li>
            <li class="nav-item menu"><a class="menu-btn" href="#sidebar" uk-toggle><i class="fas fa-bars"></i></a></li>
          </ul>
        </div>

        <div id="sidebar" uk-offcanvas>
          <div class="uk-offcanvas-bar sidebar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>

            <div class="navbar-brand">
              <h3>Beekel Farms Kennel</h3>
            </div>

            <ul class="side-nav">
              <li class="side-nav-item"><router-link to="/" class="side-nav-link">Home</router-link></li>
              <li class="side-nav-item"><router-link to="/about" class="side-nav-link">About Us</router-link></li>
              <li class="side-nav-item"><router-link to="/services" class="side-nav-link">Services</router-link></li>
              <li class="side-nav-item"><router-link to="/reservation" class="side-nav-link">Reservation</router-link></li>
              <li v-for="item in menu" :key="item.name"  class="side-nav-item"><router-link :to="item.to" class="side-nav-link">{{ item.name }}</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </section>

    <router-view/>

    <footer>
      <div class="footer-container">
        <div class="general-info">
          <div class="contact-info">
            <h2>Contact Information</h2>
    
            <div class="address">
              <p><i class="fas fa-map-marker-alt map-icon"></i> <a class="address-link" href="https://www.google.com/maps/dir/42.2548317,-83.4222783/beekel+farm+kennel/@42.1652932,-84.3743634,11z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x883cee0088b3b533:0x9d182903b4f7b9b1!2m2!1d-84.1217527!2d41.8753564" target="_blank">2890 Whig Hwy, Adrian, MI 49221</a></p>
            </div>
            <div class="phone">
              <p><i class="fas fa-phone phone-icon"></i> <span>517-263-0308</span></p>
            </div>
          </div>

          <div class="hours">
            <h2>Hours of Business</h2>
    
            <div class="hours-container">
              <p>Monday - Saturday : 11:00 am - 1:00 pm, 4:00 pm - 6:00 pm</p>
              <p>Sundays and Holidays : 5:00 pm - 7:00 pm</p>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Want More Info</h2>

          <form action="" class="form">
            <input type="text" placeholder="Name" name="name" id="name">
            <input type="email" placeholder="Email" name="email" id="email">
            <textarea name="message" id="message" cols="30" rows="3" placeholder="Message..."></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['user']),
    isLoggedIn() {
      return this.user !== null && this.user !== undefined
    },
    menu() {
      let menuItems = [
        { to: '/signup', name: 'Sign Up' },
        { to: '/login', name: 'Login' },
      ]
      if (this.isLoggedIn) {
        menuItems = [
          { to: '/profile', name: 'Profile' },
        ]
      }
      return menuItems
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    onLogout() {
      this.logout()
      if (!this.isLoggedIn) {
        this.$router.push('/login')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
// RESERVATION HEADER SECTION

.reservation-sign-up {
  background: #C2B59B;
  height: 100%;
  padding: 8px;
}

.reservation-sign-up h3 {
  margin: 0 auto;
  text-align: center;
  color: #001B54;
}

.reservation-sign-up h3 .auth-btn {
  color: #fff;
}

/* NAVBAR */

.nav {
  padding: 10px;
  background: #001B54;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
}

.navbar-brand h3{
  color: #fff;
  margin: 0 auto;
}

.navbar-nav {
  list-style: none;
  display: flex;
  align-items: center;
}

.nav-item {
  margin-left: 10px;
  color: #fff;
}

.nav-link {
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: none;
  color: #fff;
}

.menu {
  display: none;
}

.menu-btn {
  font-size: 2rem;
  cursor: pointer; 
  color: #fff;
}

.menu-btn:hover {
  color: #fff;
}

.uk-offcanvas-bar {
  background: #001B54 !important;
  width: 350px !important;
}

.side-nav {
  list-style: none;
  padding: 0px;
}

.side-nav-item {
  margin-bottom: 20px;
}

.side-nav-link {
  font-size: 1.2rem;
  color: #fff;
}

.side-nav-link:hover {
  text-decoration: none;
}

/* FOOTER SECTION */

footer {
  background: #001B54;
  padding: 50px 0px 70px 0px;
}

.footer-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.contact-info h2, .hours h2 {
  color: #fff;
}

.address .address-link, .phone span {
  color: #fff;
  margin-left: 10px;
}

.map-icon, .phone-icon {
  color: #C2B59B;
}

.hours-container p {
  color: #fff;
}

.contact-form {
  width: 500px;
}

.contact-form h2 {
  color: #fff;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form input {
  padding: 10px;
  font-size: 1.2rem;
  color: #001B54;
  margin-bottom: 15px;
  border: none;
}

.form textarea {
  padding: 8px;
  font-size: 1.2rem;
  color: #001B54;
  margin-bottom: 15px;
  border: none;
}

.form button {
  padding: 10px;
  font-size: 1.2rem;
  color: #001B54;
  background: #C2B59B;
  border: none;
  cursor: pointer;
}

@media only screen and (max-width: 993px) {
  /* NAVBAR */

  .link {
    display: none;
  }

  .menu {
    display: block;
  }

  /* FOOTER SECTION */

  .footer-container {
    flex-direction: column;
  }

  .general-info {
    margin-bottom: 0 auto ;
    text-align: center;
  }

  .contact-form {
    margin: 40px auto 0px auto;
    width: 100%;
  }

  .form {
    margin: 0 auto;
  }
}
</style>


