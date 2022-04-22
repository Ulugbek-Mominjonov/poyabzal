<template>
  <div>
    <home-hero />
    <v-container class="popular-furniture">
      <v-row class="popular-furniture-row">
        <v-col cols="12">
          <section-title content="Mashhur Oyoq kiyimlar" />
        </v-col>
        <v-col
          class="furniture"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="item in getPopularPro"
          :key="item.id"
        >
          <div class="link furniture-link">
            <img
              class="furniture-img"
              :src="item.images[0]"
              alt="Mahsulot rasmi"
            />
            <div class="furniture-info">
              <v-icon class="liked" @click="heart">mdi-heart</v-icon>
              <h3 class="furniture-cat">
                <span>{{ item.name }}</span>
                <small
                  :class="{ 'text-decoration-line-through': item.price.onSale }"
                  >{{ item.price.price }} UZS</small
                >
                <small v-if="item.price.onSale"
                  >{{ item.price.salePrice }} UZS</small
                >
              </h3>

              <router-link
                @click.native="openDialog"
                :to="{ name: 'OrderView', params: { id: item.id } }"
                class="link furniture-btn"
                >Batafsil
                <v-icon color="#fff" size="18">mdi-chevron-right</v-icon>
              </router-link>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Our services  -->
    <v-container class="our-services">
      <v-row class="our-services-row">
        <v-col cols="12" class="our-services-col">
          <section-title content="Bizning xizmatlar" />
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="service"
          v-for="(item, index) in services"
          :key="index"
        >
          <div class="service-wrapper" @click="isclick = index">
            <img
              src="../assets/shoes1.png"
              alt="img"
              class="service-img"
              :class="{ 'service-img-click': isclick == index }"
            />
            <h4 class="services-name">{{ item }}</h4>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- work with our  -->
    <v-container class="our-services">
      <v-row class="our-services-row">
        <v-col cols="12" class="our-services-col">
          <section-title content="Biz bilan ishlash oson" />
        </v-col>
        <v-col cols="12" class="our-services-col">
          <h3 class="text-center heading">Biz bilan qanday ishlanadi?</h3>
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/user.png"
              alt="User image"
            />
          </div>
          <h5 class="using-name text-center">Ro’yhatdan o’ting</h5>
          <p class="using-desc">
            Web saytdan telefon nomer orqali ro'yxatdan o'tiladi.
          </p>
        </v-col>

        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/profile.png"
              alt="profile image"
            />
          </div>
          <h5 class="using-name text-center">Shaxsiy kabinet ochiladi</h5>
          <p class="using-desc">
            Xavfsizlik kodi kiritiladi va kerakli malumotlar to'ldiriladi va
            shaxsiy kabinet ochiladi.
          </p>
        </v-col>

        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/basket.png"
              alt="User image"
            />
          </div>
          <h5 class="using-name text-center">Mahsulot tanlanadi</h5>
          <p class="using-desc">
            Web sayt orqali buyurtma qilinadi kerakli maxsulotlar tanlanib soni
            kiritilib savatchaga yuklanadi.
          </p>
        </v-col>

        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/check.png"
              alt="User image"
            />
          </div>
          <h5 class="using-name text-center">Buyurtma beriladi</h5>
          <p class="using-desc">
            Tanlangan savatchadagi barcha maxsulotlar buyurtma berish uchun
            "Buyurtma berish" tugmasi bosiladi.
          </p>
        </v-col>

        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/call.png"
              alt="User image"
            />
          </div>
          <h5 class="using-name text-center">Maxsus hodim bog’lanadi</h5>
          <p class="using-desc">
            Maxsus xodim siz bilan bog'lanib boshqa kerakli malumotlarni beradi.
          </p>
        </v-col>

        <v-col cols="6" sm="4" md="3" lg="2">
          <div class="using-icon-wrapper">
            <img
              class="using-icon mx-auto"
              src="../assets/pay.png"
              alt="User image"
            />
          </div>
          <h5 class="using-name text-center">To’lov amalga oshiriladi</h5>
          <p class="using-desc">
            To'lovni Click, Payme, Pul o'tkazmasi yoki Naqt pul orqali
            to'lashingiz mumkin.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- friends  -->
    <v-container class="our-friends mb-15">
      <v-row class="friends-row">
        <v-col cols="12">
          <section-title content="Bizning hamkorlar" />
        </v-col>
        <v-col class="friend" cols="12">
          <v-sheet class="mx-auto" elevation="8" max-width="auto">
            <v-slide-group
              v-model="model"
              class="pa-4"
              active-class="success"
              show-arrows
            >
              <v-slide-item class="mx-1" v-for="n in 15" :key="n">
                <img class="slider-img" src="../assets/slack.png" alt="img" />
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <!-- leave a request -->
    <v-container class="request mb-15">
      <v-row class="request-roc">
        <v-col class="request-col" cols="12">
          <h4 class="request-heading">So'rov qoldiring</h4>
          <p class="request-info">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit,
            enim?
          </p>
        </v-col>
        <v-col class="request-field" cols="12" sm="10" md="9" lg="8">
          <v-row class="request-field_row" align="center" justify="center">
            <v-col cols="12" sm="6" class="input">
              <v-text-field
                label="Ism va Familiya"
                outlined
                dense
                dark
                color="red"
                v-model="name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="input">
              <v-text-field
                label="Telefon nomer"
                outlined
                dense
                dark
                color="red"
                v-model="phone"
                v-mask="'998(##)###-##-##'"
                placeholder="998(##)###-##-##"
                masked="false"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="input">
              <v-textarea
                outlined
                name="input-7-4"
                label="Savolingiz bormi?"
                rows="3"
                dark
                color="red"
                v-model="question"
              ></v-textarea>
            </v-col>
            <v-col cols="9" sm="6">
              <v-btn color="red" dark width="100%" @click="SendRequest"
                >Jo'natish</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <img class="sale-img" src="../assets/sale.png" alt="sale img" />
      <v-dialog
        v-model="dialogTwo"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title class="lighten-2 success mb-5">
            So'rovingiz qabul qilindi!
            <v-spacer></v-spacer>
            <v-icon>mdi-beaker-check-outline</v-icon></v-card-title
          ><v-card-text> Siz bilan tez orada bog'lanamiz </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogTwo = false">
              Tushunarli
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <v-container class="faq mb-8">
      <v-row class="faq-row" justify="center">
        <v-col class="faq-title" cols="12">
          <section-title
            class="text-center"
            content="Ko'p so'raladigan savollar"
          />
        </v-col>
        <v-col class="faq-question" cols="8">
          <v-expansion-panels v-if="posts">
            <v-expansion-panel v-for="(item, i) in posts" :key="i" class="mb-3">
              <v-expansion-panel-header>
                {{ item.question }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ item.answer }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-alert type="info" v-else>
            Hali hech qanday savollar yo'q!!!
          </v-alert>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      scrollabl
      max-width="500px"
      :overlay="false"
      transition="dialog-transition"
    >
      <v-alert dense border="left" type="warning">
        Iltimos oldin ro'yhatdan o'ting!!!
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import HomeHero from "@/components/HomeHero.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import EventServices from "@/services/EventServices";
import axios from "axios";
import { mask } from "vue-the-mask";
export default {
  components: {
    HomeHero,
    SectionTitle,
  },
  data() {
    return {
      isclick: -1,
      services: [
        "O'rnatib beramiz",
        "Yetkazib beramiz",
        "Xizmat nomi",
        "Xizmat nomi",
      ],
      model: null,
      dialogTwo: null,
      name: "",
      phone: "",
      question: "",
      popularPro: null,
      dialog: false,
      posts: null,
    };
  },
  computed: {
    getPopularPro() {
      if (this.popularPro && this.popularPro.results) {
        return this.popularPro.results.slice(0, 8);
      }
      return [];
    },
  },
  methods: {
    heart(ev) {
      console.log(ev);
    },
    SendRequest() {
      let name = this.name;
      let phone_number = this.phone;
      let message = this.question;
      let data = {
        name,
        phone_number,
        message,
      };
      axios
        .post("http://89.223.122.69:8004/api/posts/question/", data)
        .then(() => {
          this.dialogTwo = true;
        });
    },
    openDialog() {
      console.log(1);
      if (!localStorage.getItem("access_token")) {
        this.dialog = true;
      }
    },
  },
  directives: { mask },
  mounted() {
    EventServices.getPopularPro().then((res) => {
      this.popularPro = res.data;
    });
    localStorage.removeItem("tip");
    axios.get("http://89.223.122.69:8004/api/posts/faq/").then((res) => {
      this.posts = res.data;
    });
  },
};
</script>
<style lang="scss" scoped>
/* -------------------------------------------------------------------------- */
/*                              POPULAR FURNITURE                             */
/* -------------------------------------------------------------------------- */
.container {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.popular-furniture {
  margin-bottom: 100px;
}
.furniture-link {
  position: relative;
  display: block;
  height: 100%;

  .furniture-img {
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }

  .furniture-info {
    // display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: linear-gradient(
      0deg,
      rgba(24, 24, 24, 0.75),
      rgba(24, 24, 24, 0.75)
    );
    transition: all 0.5s;
    opacity: 0;

    .liked {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
    }
    .furniture-cat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin: 0;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      color: #ffffff;
    }
    .furniture-btn {
      display: flex;
      align-items: center;
      position: absolute;
      margin: 0;
      padding: 2px 10px;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      color: rgb(190, 170, 170);
      border: 1px solid #fff;
      border-radius: 5px;
      font-weight: 400;
      font-size: 13.5px;
      line-height: 11px;
      color: #ffffff;
    }
  }

  &:hover {
    .furniture-info {
      opacity: 1;
    }
  }
}
.furniture-img,
.service-img {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

/* -------------------------------------------------------------------------- */
/*                                OUR SERVICES                                */
/* -------------------------------------------------------------------------- */
.our-services {
  margin-bottom: 100px;
}
.service-wrapper {
  position: relative;
  cursor: pointer;

  .service-img {
    transition: all 0.3s;
  }
  .service-img-click {
    // transform: scale(1.2);
    // z-index: 3;
  }
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      0deg,
      rgba(24, 24, 24, 0.75),
      rgba(24, 24, 24, 0.75)
    );
    opacity: 1;
    z-index: 2;
    transition: opacity 0.3s;
  }

  .services-name {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover {
    &::before,
    .services-name {
      opacity: 0;
    }
  }
}

.slider-img {
  width: 250px;
  height: auto;
  object-fit: contain;
}

/* -------------------------------------------------------------------------- */
/*                              working with our                              */
/* -------------------------------------------------------------------------- */
.heading {
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 26px;
}
.using-icon-wrapper {
  width: 100%;
  height: 88px;
  margin-bottom: 24px;
  text-align: center;
  img {
    object-fit: contain;
  }
}
.using-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  margin-bottom: 22px;
}
.using-desc {
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  color: #000000;
  text-align: center;
}
/* -------------------------------------------------------------------------- */
/*                                   request                                  */
/* -------------------------------------------------------------------------- */
.request {
  position: relative;
  padding: 30px !important;
  background: #181818;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;

  &-heading {
    margin: 0;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
  }
  &-info {
    margin: 0;
    width: 30%;
  }
  .input {
    position: relative;
    z-index: 2;
  }
  .sale-img {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}

@media screen and (max-width: 1200px) {
  .request {
    &-heading {
      position: relative;
      z-index: 2;
    }
    &-info {
      position: relative;
      margin: 0;
      width: 50%;
      z-index: 2;
    }
  }
}

@media screen and (max-width: 850px) {
  .request {
    &-info {
      position: relative;
      width: 80%;
    }
    .sale-img {
      width: 70%;
    }
  }
}

@media screen and (max-width: 700px) {
  .request {
    .sale-img {
      top: 30%;
      width: 80%;
    }
  }
}
@media screen and (max-width: 450px) {
  .request {
    &-heading {
      font-size: 32px;
    }
    &-info {
      font-size: 16px;
      width: 100%;
    }
    .sale-img {
      width: 95%;
    }
  }
}
</style>
