import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrderView from "../views/OrderView.vue";
import KorzinkaView from "../views/KorzinkaView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/katalog/:name",
    name: "product",
    props: true,
    component: () => import("../views/KatalogView.vue"),
  },
  {
    path: "/shoes/:id",
    name: "OrderView",
    props: true,
    component: OrderView,
  },
  {
    path: "/Korzinka",
    name: "KorzinkaView",
    props: true,
    component: KorzinkaView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("access_token")){
    next({ name: "home" });
  }
  else next()
});
export default router;
