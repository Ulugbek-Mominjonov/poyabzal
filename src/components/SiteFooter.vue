<template>
  <footer>
    <v-container>
      <v-row justify="center" justify-sm="start">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="2"
          class="text-center text-sm-left footer-menu"
        >
          <h4 class="footer-title">Menyu</h4>
          <ul class="list-unstyle footer-list">
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Katalog</router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Xizmatlar</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Galereya</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Aksiya</router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Kompaniya haqida</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Kontakt</router-link>
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="2"
          class="text-center text-sm-left footer-news"
        >
          <h4 class="footer-title">Yangiliklar</h4>
          <ul class="list-unstyle footer-list">
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Blog</router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Yangiliklar
              </router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Aksiya va sotuvlar</router-link
              >
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="text-center text-sm-left footer-product"
        >
          <h4 class="footer-title">Ishlab chiqaruvchi</h4>
          <ul class="list-unstyle footer-list">
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Kompaniya haqida</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Sertifikatlar
              </router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Ishlab chiqaruvchilar</router-link
              >
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="2"
          class="text-center text-sm-left footer-faq"
        >
          <h4 class="footer-title">Faq va xizmatlar</h4>
          <ul class="list-unstyle footer-list">
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Eng ko'p beriladigan savollar</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#">To'lov </router-link>
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#"
                >Yetkazib berish</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Kafolat</router-link>
            </li>
          </ul>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="text-center text-sm-left connect"
        >
          <h4 class="footer-title">Bog'lanish</h4>
          <ul class="list-unstyle footer-list">
            <li class="footer-item">
              <p>+998 91 656 71 99</p>
            </li>
            <li class="footer-item">
              <p>ulugbeknabijonovich@gmail.com</p>
            </li>
            <li class="footer-item">Fergana Bagdad</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
footer {
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #f7f7f7;
}
.footer-list {
  flex-direction: column;
  padding: 0 !important;
  align-items: flex-start;
}
.footer-title {
  position: relative;
  margin-top: 0;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #181818;
}
.footer-title::after {
  position: absolute;
  top: 120%;
  left: 0;
  content: "";
  width: 10%;
  height: 2px;
  background-color: #cc0000;
}
.footer-link {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #181818;
  transition: color 0.2s;

  &:hover {
    color: #cc0000;
  }
}
.footer-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
