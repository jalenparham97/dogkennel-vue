<template>
  <div class="home">
    <Navbar></Navbar>

    <header class="hero">
      <div class="logo-img">
        <img src="../assets/logo.png" alt="">
      </div>

      <div class="action-btns">
        <el-button type="primary" @click="$router.push('/reservation')">Check Availability</el-button>
        <el-button type="primary" @click="$router.push('/services')">Learn More</el-button>
      </div>
    </header>

    <main>
      <section class="intro">
        <div class="title-container">
          <h1 class="title">Your Pet Deserves Perfect Care While Having Fun</h1>
          <h3 class="subtitle">From doggie daycare to overnight boarding and grooming services</h3>

          <ul class="work-list">
            <h4>What we have for dogs</h4>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Trained staff with over 15 years of experience</span></li>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Clean, well-ventilated indoor / outdoor runs</span></li>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Heated and air-conditioned inside</span></li>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Secure military prototype fencing</span></li>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Special bath price and free nail trim upon request for boarding customers only</span></li>
            <li class="work-item"><i class="fas fa-paw paw-icon"></i> <span class="work-item-description">Secure, grassy, large, turnout area is an additional option per owner's request</span></li>
          </ul>
        </div>

        <div class="intro-pic">
          <img src="../assets/twin-dogs.jpg" alt="">
        </div>
      </section>

      <section class="services">
        <section class="services-container">
          <h1>Services</h1>

          <div class="services-cards">
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Day Care</h3>
              <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Dog Boarding</h3>
              <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="uk-card uk-card-default uk-card-body uk-card-hover">
              <h3 class="card-title">Grooming</h3>
              <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </section>
      </section>

      <section class="why">
        <h1>Why Choose Beekel Farms Kennel</h1>

        <div class="why-container">
          <div class="why-1">
            <div class="why-1-container">
              <div class="support">
                <h2>Great Support</h2>
                <p>Our facility design and procedures focus on safety, health, and cleanliness.</p>
              </div>
              <div class="team">
                <h2>Professional Team</h2>
                <p>Dogs supervised by our trained team: one team member per 10 – 15 dogs.</p>
              </div>
            </div>
          </div>
          <div class="why-pic">
            <img src="../assets/dog.png" alt="">
          </div>
          <div class="why-2">
            <div class="why-2-container">
              <div class="pricing">
                <h2>Affordable Pricing</h2>
                <p>We offer prices that won't break the bank.</p>
              </div>
              <div class="quality-service">
                <h2>Quality Services</h2>
                <p>We offer daycare, overnight boarding, grooming services at one location.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default {
  name: 'home',
  components: {
    Footer,
    Navbar
  }
}
</script>

<style lang="scss" scoped>
/* HEADER SECTION */

.hero {
  background-image: linear-gradient(0deg, rgba(0, 0, 0, .25), rgba(0, 0, 0, .25)), url("../assets/dogs.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 95vh;
  width: 100%;
  margin-bottom: 80px;
  
}

.logo-img {
  max-width: 500px;
  margin: 0px auto;
  padding-top: 20px;
}

.logo-img img {
  width: 100%;
}

.action-btns {
  display: flex;
  justify-content: center;
  margin-top: 60px;

  & button {
    font-size: 1.2rem;
  }
}

/* INTRO SECTION */

.intro {
  width: 90%;
  margin: 0px auto 100px auto;
  display: flex;
  justify-content: space-between;
}

.title-container {
  max-width: 500px; 
}

.title, .subtitle {
  color: #001B54;
  /* text-align: center; */
}

.subtitle {
  margin-top: -5px;
}

.intro-pic {
  max-width: 550px;
  height: 600px;
}

.intro-pic img {
  width: 100%;
  height: 100%;
}

.work-list {
  list-style: none;
  padding: 0px;
}

.work-list h4 {
  font-size: 1.5rem;
  color: #001B54;
}

.work-item {
  display: flex;   
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.work-item span {
  margin-left: 20px;  
  color: #000;
}

.paw-icon {
  color: #001B54;
}

/* SERVICES SECTION */

.services {
  padding: 5px 20px 50px 20px;  
  background: #F3F3F3;
}

.services-container {
  width: 95%;
  margin: 70px auto;
}

.services-container h1 {
  text-align: center;
  color: #001B54;
  margin-bottom: 50px;
}

.services-cards {
  display: flex;
  justify-content: space-between; 
}

.uk-card {
  color: #001B54;
  width: 370px;
}

.card-title {
  color: #C2B59B;
  text-align: center;
  font-size: 2rem;
}

.card-body {
  font-size: 1.2rem;
}

.why {
  margin: 70px auto;
  width: 90%;
}

.why h1 {
  text-align: center;
  color: #001B54;
}

.why-container {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}

.why-pic {
  max-width: 950px;
}

.why-pic img {
  width: 100%;
  margin: 0 auto;
}

.why-1-container, .why-2-container {
  margin: 70px auto;
}

.why-1-container h2, .why-2-container h2 {
  font-size: 2rem;
}

.why-1-container p, .why-2-container p {
  font-size: 1.2rem;
  color: #000;
}

@media only screen and (max-width: 993px) {
    /* INTRO SECTION */

  .intro {
    flex-direction: column;
    margin: 0 auto;
  }

  .title-container, .intro-pic {
    margin: 0 auto;
  }

  .title-container {
    text-align: center;
  }

  .work-item {
    flex-direction: column;
  }

  .paw-icon {
    margin-bottom: 10px;
  }

  .intro-pic {
    height: 400px;
    margin-top: 20px;
  }

  /* SERVICES SECTION */

  .services {
    margin-top: 100px;
  }

  .services-cards {
    flex-direction: column;
  }

  .uk-card {
    margin: 0px auto 40px auto;
    width: 100%;
  }

  /* WHY SECTION */

  .why {
    text-align: center;
  }

  .why-container {
    flex-direction: column;
  }

  .why-pic {
    display: none;
  }

  .support, .pricing {
    margin-bottom: 40px;
  }

  .pricing {
    margin-top: -80px;
  }
}
</style>

