<template>
  <div class="about">
    <div class="about-container">
      <div class="mission">
        <h1>- Our Mission -</h1>
        <p>To provide your pet a home away from home.</p>
      </div>

      <div class="about-description">
        <h2>About</h2>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ipsum, temporibus perferendis libero, exercitationem qui minima atque necessitatibus corporis ut veniam reprehenderit animi eligendi quisquam rem earum! Praesentium laudantium pariatur cupiditate a eius itaque perspiciatis illum assumenda distinctio accusantium, nam recusandae fugiat quasi, fugit dignissimos, fuga dicta asperiores consectetur blanditiis.</p>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolorum totam nulla molestias amet soluta consectetur et odit provident expedita. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum tempore dolores! Esse dignissimos odit molestiae, amet unde incidunt numquam!</p>
      </div>

      <div class="leadership">
        <h2>Leadership</h2>

        <div class="leaders">
          <div class="leader">
            <div class="avatar">
              <img class="uk-border-circle" src="../assets/placeholder_male.jpg">
              <span>Someones Name</span>
              <span>CO-FOUNDER & CEO</span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eaque aut excepturi magni dolorem fuga commodi beatae labore. Cumque, quisquam!</p>
          </div>

          <div class="leader">
            <div class="avatar">
              <img class="uk-border-circle" src="../assets/person-female.jpg">
              <span>Someones Name</span>
              <span>CO-FOUNDER & CFO</span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eaque aut excepturi magni dolorem fuga commodi beatae labore. Cumque, quisquam!</p>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'

export default {
  name: 'about',
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
  .about {
    background: #F5F7FA;
    height: 100%;
  }

  .about-container {
    width: 80%;
    background: #fff;
    height: 100%;
    margin: 0 auto;
  }

  .mission {
    text-align: center;
    padding-top: 40px;

    & h1 {
      font-weight: 200;
      color: #001B54;
    }

    & p {
      color: #001B54;
    }
  }

  .about-description {
    h2 {
      text-align: center;
      color: #001B54;
      font-weight: 200;
    }

    p {
      color: #001B54;
      width: 75%;
      margin: 0px auto 20px auto;
    }
  } 

  .leadership {
    margin-top: 60px;

    h2 {
      text-align: center;
      font-weight: 200;
      color: #001B54;
    }

    .leaders {
      display: flex;
      justify-content: space-around;
      margin-bottom: 70px;

      & .leader {

        & p {
          width: 80%;
          margin: 0 auto;
          color: #001B54;
        }


        & .avatar {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;

          & img {
            margin: 0 auto;
            width: 100px;
            height: 100px;
          }

          & span {
            text-align: center;
            color: #001B54;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 700px) {
    .leaders {
      flex-direction: column;

      & .leader {
        margin-bottom: 20px;
      }
    }
  }


  @media only screen and (max-width: 500px) {
    .about-container {
      width: 90%;
    }

    .about-description {
      p {
        width: 90%;
      }
    }
  }
</style>

