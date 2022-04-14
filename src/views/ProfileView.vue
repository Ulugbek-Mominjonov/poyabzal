<template>
  <div class="mb-15 profile">
    <v-container class="user-container">
      <h2 class="mb-9 user-heading">Profile</h2>
      <v-row class="user-row">
        <v-col cols="12" md="4" class="user-link">
          <h4>
            Assalomu alaykum <span>{{ userDate.firstName }}</span>
          </h4>
          <v-list>
            <v-list-item-group v-model="model" mandatory color="indigo">
              <v-list-item v-for="(item, i) in items" :key="i" class="user-item" :to="item.to">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="logout" @click="logout">Chiqish</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon color="red">mdi-logout</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="8" class="px-9 py-9 ">
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
// import EventServices from '@/services/EventServices';
export default {
  data() {
    return {
      items: [
        {
          text: "Shaxsiy ma'lumotlar",
          icon: "mdi-account",
          to: "/user/profile"
        },
        {
          text: "Buyurtmalar tarixi",
          icon: "mdi-basket-check",
          to: "/user/order"
        },
      ],
      model: ""
    };
  },
  computed: {
    ...mapState("user", {
      userDate: "user",
    }),
  },
  methods: {
    logout() {
      store.commit("auth/clear_data")
      location.reload()
    }
  },
  mounted() {
    localStorage.removeItem("tip")
  }
};
</script>

<style lang="scss" scoped>
// .user-heading {
//   font-size: 18px;
//   line-height: 25px;
//   color: #008dff;
//   margin-bottom: 60px;
// }
.user-row {
  background-color: #fff;
  h4 {
    font-size: 22px;
    line-height: 25px;
    color: #008dff;
    margin-bottom: 50px;
    span {
      color: red;
      font-size: 24px;
    }

    .user-item:last-child {
      font-weight: 500;
      color: red;
      margin-bottom: 20px;
    }
  }
  .user-link{
    padding: 30px;
    font-weight: 500;
    .logout {
      color: red;
    }
  }
}
</style>
