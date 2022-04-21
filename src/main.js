import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueI18n from 'vue-i18n';
import YmapPlugin from 'vue-yandex-maps'


Vue.config.productionTip = false;
const settings = {
  apiKey: '8d85d841-2cf9-42c6-93b8-7b58355c8f36',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,  
  version: '2.1'
}
Vue.use(YmapPlugin, settings)
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'uz',
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
