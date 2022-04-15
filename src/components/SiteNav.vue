<template>
  <header>
    <!-- header top  -->
    <v-container>
      <v-row align="center" justify="space-between" class="site-nav-wrapper">
        <v-col cols="4" lg="2" order="first" class="logo-wrapper">
          <router-link to="/" class="link">
            <img src="../assets/logo.png" alt="Bu yerda logo rasmi" />
          </router-link>
        </v-col>
        <v-col
          cols="12"
          sm="10"
          md="7"
          lg="4"
          order="1"
          class="mx-auto search-wrapperr"
        >
          <div class="search-wrapper">
            <input class="search" type="text" v-model="search" />
            <v-icon class="search-icon" @click="searchPro()"
              >mdi-magnify</v-icon
            >
          </div>
        </v-col>
        <v-col
          cols="2"
          order="2"
          class="d-none d-md-block social-media-wrapper"
        >
          <div class="d-flex justify-space-around social-media">
            <router-link to="#" class="link">
              <v-icon color="#28235B">mdi-facebook</v-icon>
            </router-link>
            <router-link to="#" class="link">
              <v-icon color="#28235B">mdi-instagram</v-icon>
            </router-link>
            <router-link to="#" class="link">
              <v-icon color="#28235B">mdi-whatsapp</v-icon>
            </router-link>
          </div>
        </v-col>
        <v-col
          cols="7"
          lg="2"
          order="0"
          order-lg="3"
          class="text-left email-date"
        >
          <p class="text-right">
            <v-icon color="#28235B">mdi-clock</v-icon>
            <span>Пн-Пт, 9:00 до 18:00</span>
          </p>
          <p class="text-right">
            <v-icon color="#28235B">mdi-email</v-icon>
            <span>zakaz@mir-kovrolina.ru</span>
          </p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          lg="2"
          order="4"
          class="registration text-lg-right text-center d-none d-md-block"
        >
          <button class="register-btn" @click="dialog = true" v-if="!isUser">
            <span>Ro'yhatdan o'tish</span>
          </button>
          <v-menu offset-y v-if="isUser">
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    color="#28235b"
                    dark
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                  >
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </template>
                <span>{{ userData.firstName }} {{ userData.lastName }}</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>
                  <router-link :to="item.to" class="link nav-link">
                    <v-icon class="nav-icon">{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <!-- regiter modal  -->
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card class="px-5 form-card">
          <v-card-title class="justify-center"> Kirish </v-card-title>
          <v-card-text>
            <v-container>
              <v-row align="center">
                <v-col cols="12" class="pb-0">
                  <label for="phone" class="d-block">Telefon</label>
                </v-col>
                <v-col cols="11">
                  <input v-imask="mask" @complete="onComplete" id="phone" />
                </v-col>
                <v-col cols="1" class="pl-0">
                  <v-icon size="100" color="#28235B" x-large @click="getSmsCode"
                    >mdi-message-arrow-right</v-icon
                  >
                </v-col>
                <v-col cols="12" class="pb-0" v-if="code">
                  <label for="phone" class="d-block">Sms code</label>
                </v-col>
                <v-col cols="11" v-if="code">
                  <input v-imask="maskTwo" @complete="onCompleteTwo" />
                </v-col>
                <v-col cols="12 text-center" v-if="code">
                  <v-btn color="#28235B" dark @click="getToken">Kirish</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- kabinet  -->
    <v-dialog
      v-model="dialogTwo"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="form-card">
        <v-card-title class="justify-center">
          Shaxsiy kabinet yaratish
        </v-card-title>
        <v-card-text class="pt-4">
          <v-container>
            <v-row align="center">
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="kabinet.name"
                  label="Ismingiz"
                  id="id"
                  placeholder="Ismingizni kiriting..."
                  color="#28235B"
                  dense
                  outlined
                  append-icon="mdi-account-arrow-down"
                ></v-text-field>
                <v-text-field
                  v-model="kabinet.lastName"
                  label="Familiyangiz"
                  id="id"
                  placeholder="Familiyangizni kiriting..."
                  color="#28235B"
                  dense
                  outlined
                  append-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="kabinet.address"
                  label="Yashash manzil"
                  id="id"
                  placeholder="Yashash manzilingizni kiriting..."
                  color="#28235B"
                  dense
                  outlined
                  append-icon="mdi-folder-home"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="kabinet.job"
                  label="Faoliyat joyi"
                  id="id"
                  placeholder="Faoliyat joyingizni kiriting..."
                  color="#28235B"
                  dense
                  outlined
                  append-icon="mdi-home-city"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-file-input
                  v-model="image"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Rasmingizni yuklang"
                  append-icon="mdi-camera"
                  prepend-icon=""
                  show-size
                  label="Rasmingizni yuklang"
                  outlined
                  dense
                ></v-file-input>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-btn color="#28235B" dark @click="getLocation"
                  ><v-icon>mdi-map-marker</v-icon>Geo Joylashuv</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#28235B" dark @click="setKabinet"
            >Kabinet yaratish</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- message dialog  -->
    <v-dialog
      v-model="dialogThree"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-alert type="success">
        {{ message }}
      </v-alert>
    </v-dialog>

    <!-- header botttom  -->
    <v-divider class="mt-5 mb-3"></v-divider>
    <!-- desktop  -->
    <v-container class="d-none d-md-block">
      <v-row align="center">
        <v-col class="header-botoom-col" cols="11">
          <ul class="d-flex px-3 justify-space-between align-center nav_list">
            <li class="nav-link">
              <div
                class="d-flex align-center"
                @click="changeTip('barchasi')"
                :class="{ active: tip == 'barchasi' }"
              >
                <v-icon class="mr-1 cat-icon" centered>mdi-menu</v-icon>
                Barchasi
              </div>
            </li>
            <li class="nav-link">
              <div @click="changeTip('new')" :class="{ active: tip == 'new' }">
                Yangilar
              </div>
            </li>
            <li class="nav-link">
              <div @click="changeTip('men')" :class="{ active: tip == 'men' }">
                Erkaklar
              </div>
            </li>
            <li class="nav-link">
              <div
                @click="changeTip('women')"
                :class="{ active: tip == 'women' }"
              >
                Ayollar
              </div>
            </li>
            <li class="nav-link">
              <div @click="changeTip('kid')" :class="{ active: tip == 'kid' }">
                Bolalar
              </div>
            </li>
            <li class="nav-link">
              <div
                @click="changeTip('sale')"
                :class="{ active: tip == 'sale' }"
              >
                Aksiya
              </div>
            </li>
            <li class="nav-link">
              <router-link class="link d-flex align-center basket" to="/Korzinka">
                <v-icon class="mr-1">mdi-basket</v-icon>
                Korzinka
                <span>{{getBasketCount}}</span>
              </router-link>
            </li>
          </ul>
        </v-col>
        <v-col class="header-botoom-col" cols="1">
          <!-- <v-select :items="languages" v-model="language"></v-select> -->
        </v-col>
      </v-row>
    </v-container>

    <!-- mobile  -->
    <v-container class="d-block d-md-none">
      <v-row align="center">
        <v-col cols="4" class="text-center mobile">
          <button
            class="register-btn d-block"
            @click="dialog = true"
            v-if="!isUser"
          >
            <span>Ro'yhatdan o'tish</span>
          </button>
          <v-menu offset-y v-if="isUser">
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    color="#28235b"
                    dark
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                  >
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </template>
                <span>{{ userData.firstName }} {{ userData.lastName }}</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title>
                  <router-link :to="item.to" class="link nav-link">
                    <v-icon class="nav-icon">{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </router-link>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="8" class="text-center mobile">
          <button class="register-btn d-block" @click.stop="drawer = !drawer">
            <v-icon class="mr-5">mdi-menu</v-icon>
            <span>Menu</span>
          </button>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mt-3"></v-divider>

    <!-- side bar -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      color="black"
      dark
      width="70%"
      class="drawer"
    >
      <div class="close text-right">
        <v-icon @click.stop="drawer = !drawer">mdi-close-thick</v-icon>
      </div>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-3"
        >
          <v-list-item>
            <v-list-item-title>
              <div
                class="d-flex align-center"
                @click="changeTip('barchasi')"
                :class="{ active: tip == 'barchasi' }"
              >
                <v-icon class="mr-1 cat-icon" centered>mdi-menu</v-icon>
                Barchasi
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <div @click="changeTip('new')" :class="{ active: tip == 'new' }">
                Yangilar
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <div @click="changeTip('men')" :class="{ active: tip == 'men' }">
                <v-icon>mdi-human-child</v-icon>
                Erkaklar
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <div
                @click="changeTip('women')"
                :class="{ active: tip == 'women' }"
              >
                Ayollar
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <div @click="changeTip('kid')" :class="{ active: tip == 'kid' }">
                Bolalar
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <div
                @click="changeTip('sale')"
                :class="{ active: tip == 'sale' }"
              >
                Aksiya
              </div>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <router-link class="link d-flex align-center" to="/Korzinka">
                <v-icon class="mr-1">mdi-basket-plus</v-icon>
                Korzinka
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div class="d-flex justify-space-around social-media">
        <router-link to="#" class="link">
          <v-icon>mdi-facebook</v-icon>
        </router-link>
        <router-link to="#" class="link">
          <v-icon>mdi-instagram</v-icon>
        </router-link>
        <router-link to="#" class="link">
          <v-icon>mdi-whatsapp</v-icon>
        </router-link>
      </div>
    </v-navigation-drawer>
  </header>
</template>

<script>
import store from "@/store/index";
import { mapState } from "vuex";
import { IMaskDirective } from "vue-imask";
export default {
  name: "SiteNav",

  data: () => ({
    search: null,
    dialog: false,
    language: "Uz",
    languages: ["Uz", "Eng", "Ru"],
    drawer: false,
    group: null,
    sms: "",
    mask: {
      mask: "+{998}({00}) {000}-{00}-{00}",
      lazy: false,
    },
    maskTwo: {
      mask: "00000",
      lazy: false,
    },
    nomer: null,
    code: false,
    dialogTwo: false,
    kabinet: {
      name: "",
      lastName: "",
      address: "",
      job: "",
      latitude: "",
      longitude: "",
    },
    image: null,
    rules: [
      (v) =>
        !v || v.size < 2000000 || "Rasm hajmi 2MB dan kamroq bo'lishi kerak!",
    ],
    dialogThree: false,
    message: "",
    items: [
      { title: "Profil", to: "/user/profile", icon: "mdi-account" },
      { title: "Korzinka", to: "/Korzinka", icon: "mdi-basket" },
    ],
    tip: null,
  }),
  computed: {
    ...mapState("auth", {
      isHave: "isHave",
    }),
    ...mapState("user", {
      userData: "user",
    }),
    ...mapState("shoes", {
      categoryId: "catId",
      data: "data",
    }),
    ...mapState('korzinka', {
      korzinkaList: "korzinkaList"
    }),
    getBasketCount() {
      if(this.korzinkaList) {
        return this.korzinkaList.length
      }
      return 0
    },
    isUser() {
      if (localStorage.getItem("access_token")) {
        return true;
      }
      return false;
    },
  },
  methods: {
    foo(event) {
      console.log(event);
    },
    onComplete(e) {
      const maskRef = e.detail;
      console.log("complete", maskRef.unmaskedValue);
      this.nomer = maskRef.unmaskedValue;
    },
    onCompleteTwo(e) {
      const maskRef = e.detail;
      console.log("complete", maskRef.unmaskedValue);
      this.sms = maskRef.unmaskedValue;
    },
    getSmsCode() {
      let phone = this.nomer;
      let data = {
        username: phone,
      };
      store.dispatch("auth/getSms", data).then(() => {
        this.code = true;
        this.phone = null;
      });
    },
    getToken() {
      let nomer = this.nomer;
      let smsCode = this.sms;
      let data = {
        username: nomer,
        password: smsCode,
      };
      store.dispatch("auth/login", data).then(() => {
        if (this.isHave) {
          this.dialog = false;
          this.code = false;
          this.dialogTwo = true;
        } else {
          this.dialog = false;
          location.reload();
        }
      });
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          this.kabinet.latitude = position.coords.latitude;
          this.kabinet.longitude = position.coords.longitude;
          console.log(position.coords.altitudeAccuracy);
          this.message = "Joylashuvingiz aniqlandi!";
          this.dialogThree = true;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    setKabinet() {
      let data = new FormData();
      let myData = this.kabinet;
      let image = this.image;
      data.append("first_name", myData.name);
      data.append("last_name", myData.lastName);
      data.append("image", image);
      data.append("latitude", myData.latitude);
      data.append("longitude", myData.longitude);
      data.append("live_address", myData.address);
      data.append("work_address", myData.job);
      console.log(data);
      store.dispatch("auth/setKabinet", data).then(() => {
        this.message = "Ma'lumotlar qabul qilindi. Rahmat";
        this.dialogThree = true;
        this.dialogTwo = false;
        location.reload();
      });
    },
    changeTip(value) {
      let search = this.search;
      localStorage.setItem("tip", value);
      if (value != "barchasi") {
        if (value != "new" && value != "sale") {
          this.data.productType = value;
          if ("isNew" in this.data) {
            delete this.data.isNew;
          }
          if ("onSale" in this.data) {
            delete this.data.onSale;
          }
        } else if (value == "sale") {
          this.data.onSale = true;
          if ("productType" in this.data) {
            delete this.data.productType;
          }
          if ("isNew" in this.data) {
            delete this.data.isNew;
          }
        } else {
          this.data.isNew = 1;
          if ("productType" in this.data) {
            delete this.data.productType;
          }
          if ("onSale" in this.data) {
            delete this.data.onSale;
          }
        }
      } else {
        if ("productType" in this.data) {
          delete this.data.productType;
        }
        if ("isNew" in this.data) {
          delete this.data.isNew;
        }
        if ("onSale" in this.data) {
          delete this.data.onSale;
        }
      }
      if (search) {
        this.data.search = search;
      } else {
        if ("search" in this.data) {
          delete this.data.search;
        }
      }
      if ("page" in this.data) {
        this.data.page = 1;
      }
      store.commit("shoes/SET_DATA", this.data);
      if (this.tip != value || this.$router.currentRoute.path != `/katalog/${value}`) {
        this.tip = value;
        store.dispatch("shoes/filter", this.data).then(() => {
          this.$router.push({ name: "product", params: { name: value } });
        });
      } else {
        store.dispatch("shoes/filter", this.data);
      }
    },
    searchPro() {
      this.changeTip("barchasi");
    },
  },
  directives: {
    imask: IMaskDirective,
  },
  mounted() {
    if (localStorage.getItem("access_token")) {
      store.dispatch("user/UserData");
    }
    this.tip = localStorage.getItem("tip");
  },
};
</script>
<style lang="scss" scoped>
/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */
.container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.search-wrapper {
  display: flex;
  padding: 8px 13px;
  border: 1px solid #a4a4a4;
  border-radius: 4px;

  input {
    flex-grow: 1;
    margin-right: 8px;
    outline: none;
    border-right: 1px solid #28235b;
  }

  .search-icon {
    cursor: pointer;
    font-size: 24px;
  }
}
.email-date {
  p {
    margin: 0 !important;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #181818;
    text-align: left;

    .v-icon {
      font-size: 15px;
      margin-right: 12px;
    }
  }
  p:last-child {
    margin-top: 5px !important;
  }
}
.register-btn {
  position: relative;
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: #181818;
  border: 2px solid #a4a4a4;
  border-radius: 4px;
  transition: all 0.5s;
  span {
    position: relative;
    z-index: 1;
  }
  &::before {
    width: 0%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    // z-index: -1;
    background-color: #cc0000;
    transition: all 0.3s;
  }
  &:hover {
    color: #fff;
    border-color: #cc0000;
  }
  &:hover:before {
    width: 100%;
  }
}
.nav-link {
  font-weight: 500;
  color: #222;
  transition: all 0.3s;
  &:hover {
    color: red;
    .nav-icon {
      color: red;
    }
  }
}
.header-botoom-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.basket {
  position: relative;
  span {
    position: absolute;
    top: 5px;
    left: -12px;
    padding: 2px 4px;
    font-size: 11px;
    line-height: 11px;
    border-radius: 50%;
    background-color: #008DFF;
    color: #fff;
  }
}
/* -------------------------------------------------------------------------- */
/*                                  site nav                                  */
/* -------------------------------------------------------------------------- */

.nav_list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.nav-link {
  cursor: pointer;
  .active {
    color: rgba(255, 0, 0, 0.7) !important;

    .cat-icon {
      color: rgba(255, 0, 0, 0.7);
    }
  }
  .link {
    display: block;
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #181818;

    &::before {
      position: absolute;
      top: 100%;
      width: 100%;
      left: 0;
      content: "";
      opacity: 0;
      background: #a4a4a4;
      transition: height 0.3s, opacity 0.3s, transform 0.3s;
      transform: translateY(-8px);
    }
    &:hover::before {
      height: 2px;
      opacity: 1;
      transform: translateY(0);
    }
  }
}
.form-card {
  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 18px;
    color: rgba(40, 35, 91, 0.5);
  }
  input {
    width: 100%;
    padding: 10px 20px;
    border: 1px solid #28235b;
    border-radius: 5px;
    font-size: 16px;
    color: #28235b;
  }
}
/* -------------------------------------------------------------------------- */
/*                              RESPONSIVE DESING                             */
/* -------------------------------------------------------------------------- */
.mobile .d-block {
  width: 100%;
}
.drawer-link {
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}
.drawer {
  .social-media {
    position: absolute;
    width: 150px;
    bottom: 30px;
  }
}
</style>
