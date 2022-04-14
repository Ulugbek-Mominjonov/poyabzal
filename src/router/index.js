import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrderView from "../views/OrderView.vue";
import KorzinkaView from "../views/KorzinkaView.vue";
import ProfileView from "../views/ProfileView.vue";
import UserDate from "../views/UserDate.vue";
import UserOrder from "../views/UserOrder.vue";
import OrderDetail from "../views/OrderDetail.vue";
import AboutView from "../views/AboutView.vue";

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
  {
    path: "/orderDetail/:id",
    name: "OrderDetail",
    props: true,
    component: OrderDetail,
  },
  {
    path: "/user",
    name: "ProfileView",
    component: ProfileView,
    children: [
      {
        path: "profile",
        component: UserDate,
      },
      {
        path: "order",
        component: UserOrder,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("access_token")) {
    next("/");
  } else next();
});
export default router;
