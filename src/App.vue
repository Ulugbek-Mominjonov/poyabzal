<template>
  <v-app>
    <site-nav />

    <v-main class="site-main">
      <router-view />
    </v-main>

    <site-footer />
  </v-app>
</template>

<script>
import SiteNav from "@/components/SiteNav.vue";
import SiteFooter from '@/components/SiteFooter.vue';
export default {
  name: "App",
  components: {
    SiteNav,
    SiteFooter
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: url("./fonts/roboto-v29-latin-regular.woff2") format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./fonts/roboto-v29-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-500 - latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  src: url("./fonts/roboto-v29-latin-500.woff2") format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./fonts/roboto-v29-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700 - latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: url("./fonts/roboto-v29-latin-700.woff2") format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./fonts/roboto-v29-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-900 - latin */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 900;
  src: url("./fonts/roboto-v29-latin-900.woff2") format("woff2"),
    /* Chrome 26+, Opera 23+, Firefox 39+ */
      url("./fonts/roboto-v29-latin-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* -------------------------------------------------------------------------- */
/*                                GENERAL STYLE                               */
/* -------------------------------------------------------------------------- */
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", "Arial", sans-serif;
}
.link {
  text-decoration: none;
}
.list-unstyle {
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
img {
  display: block;
  // width: 100%;
}
.link {
  display: block;
}

.content-path {
  .v-input__slot {
    min-height: auto;
  }
}
.site-main {
  background-color: rgb(244,247,253);
}
</style>
