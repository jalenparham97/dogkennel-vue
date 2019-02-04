<template>
  <div class="services">
    <div class="services-heading">
      <div class="cog"><i class="fas fa-cog cog-icon"></i></div>
      <h2>Our Services</h2>
    </div>

    <div class="services-container">
      <div class="services-cards">
          <div class="uk-card uk-card-body uk-card-hover">
            <h3 class="card-title">Day Care</h3>
            <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dignissimos aliquid unde, aut accusamus cum.</p>
          </div>
          <div class="uk-card uk-card-body uk-card-hover">
            <h3 class="card-title">Dog Boarding</h3>
            <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque fuga molestias pariatur ducimus commodi harum.</p>
          </div>
          <div class="uk-card uk-card-body uk-card-hover">
            <h3 class="card-title">Grooming</h3>
            <p class="card-body">Lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus totam incidunt, impedit eius sit consequuntur?</p>
          </div>
          </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'

export default {
  name: 'services',
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
  .services-heading {
    margin-top: 40px;

    & h2 {
      text-align: center;
      font-weight: 200;
      color: #001B54;
    }
  }

  .cog {
    margin: auto auto -30px auto;
    padding: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #001B54;
    display: flex;
    align-items: center;

    & .cog-icon {
      margin: 0 auto;
      font-size: 2.5rem;
      color: #fff;
    }
  }

  .services-container {
    width: 90%;
    margin: auto auto 70px auto;
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

  @media only screen and (max-width: 800px) {
    .services-cards {
      flex-direction: column;


      & .uk-card {
        margin: 0 auto;
      }
    }
  }

  @media only screen and (max-width: 400px) {
    .uk-card {
      width: 100%;
    }
  }
</style>

