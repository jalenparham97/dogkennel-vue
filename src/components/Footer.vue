<template>
  <footer>
    <div class="footer-container">
      <div class="general-info">
        <div class="contact-info">
          <h2>Contact Information</h2>

          <div class="address">
            <p>
              <i class="fas fa-map-marker-alt map-icon"></i>
              <a
                class="address-link"
                href="https://www.google.com/maps/dir/42.2548317,-83.4222783/beekel+farm+kennel/@42.1652932,-84.3743634,11z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x883cee0088b3b533:0x9d182903b4f7b9b1!2m2!1d-84.1217527!2d41.8753564"
                target="_blank"
              >2890 Whig Hwy, Adrian, MI 49221</a>
            </p>
          </div>
          <div class="phone">
            <p>
              <i class="fas fa-phone phone-icon"></i>
              <span>517-263-0308</span>
            </p>
          </div>
        </div>

        <div class="hours">
          <h2>Hours of Business</h2>

          <div class="hours-container">
            <p>Monday - Saturday : 11:00 am - 1:00 pm, 4:00 pm - 6:00 pm</p>
            <p>Sundays and Holidays : 5:00 pm - 7:00 pm</p>
            <p>The only holidays are: Memorial Day & Labor Day</p>
            <p>Special Holiday hours: Christmas Eve and New Years Eve we are open 11am-1pm ONLY</p>
            <p>We are closed Thanksgiving Day, Christmas Day and New Years Day</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <h2>Want More Info</h2>

        <form action class="form">
          <input type="text" placeholder="Name" name="name" id="name">
          <input type="email" placeholder="Email" name="email" id="email">
          <textarea name="message" id="message" cols="30" rows="3" placeholder="Message..."></textarea>
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/* FOOTER SECTION */

footer {
  background: #001b54;
  padding: 50px 0px 70px 0px;
}

.footer-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.contact-info h2,
.hours h2 {
  color: #fff;
}

.address .address-link,
.phone span {
  color: #fff;
  margin-left: 10px;
}

.map-icon,
.phone-icon {
  color: #c2b59b;
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
  color: #001b54;
  margin-bottom: 15px;
  border: none;
}

.form textarea {
  padding: 8px;
  font-size: 1.2rem;
  color: #001b54;
  margin-bottom: 15px;
  border: none;
}

.form button {
  padding: 10px;
  font-size: 1.2rem;
  color: #001b54;
  background: #c2b59b;
  border: none;
  cursor: pointer;
}

/* MEDIA QUERY SECTION */

@media only screen and (max-width: 993px) {
  /* FOOTER SECTION */

  .footer-container {
    flex-direction: column;
  }

  .general-info {
    margin-bottom: 0 auto;
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
