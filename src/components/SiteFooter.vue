<template>
  <footer>
    <v-container>
      <v-row justify="center" justify-sm="start" align="stretch">
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
              <router-link class="link footer-link" to="/about"
                >Kompaniya haqida</router-link
              >
            </li>
            <li class="footer-item">
              <router-link class="link footer-link" to="#">Kontakt</router-link>
            </li>
          </ul>
        </v-col>

        <v-col class="position" cols="7">
          <div style="width: 100%; height: 100%"><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=Uzbekistan,%20Tashkent+(Bordo)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/marine-gps/">shipping gps</a></iframe></div>
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
  background-color: #fff;
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
