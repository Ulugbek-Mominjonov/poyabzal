<template>
  <v-container class="order-container">
    <div class="order-wrapper">
      <h2 class="text-center mb-8 shoes-name">{{ getDetail.name }}</h2>
      <v-row align="center" justify="center">
        <v-col cols="2" sm="1">
          <v-item-group v-model="onboarding" class="shrink" mandatory>
            <v-item
              v-for="(item, index) in getDetail.images"
              :key="index"
              v-slot="{ toggle }"
            >
              <div>
                <div @click="toggle" class="mb-5">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    :src="item"
                    alt="Mahsulot rasmi yo'q"
                  ></v-img>
                </div>
              </div>
            </v-item>
          </v-item-group>
        </v-col>
        <v-col cols="10" sm="5">
          <v-window v-model="onboarding" class="elevation-1" vertical>
            <v-window-item
              v-for="(item, index) in getDetail.images"
              :key="index"
            >
              <v-img
                :src="item"
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="300"
                max-width="100%"
                alt="Mahsulot rasmi yo'q"
              ></v-img>
            </v-window-item>
          </v-window>
        </v-col>
        <v-col cols="12" sm="5" class="ml-auto shoes-info">
          <div
            class="d-flex align-center justify-space-between mb-7 stars-wrapper"
          >
            <star-rating
              :rating="getAvarage"
              :star-style="style"
              :is-indicator-active="false"
            ></star-rating>

            <div>
              <small>{{ getCount }} ta sharx</small>
              <v-icon color="#28235B" class="icon" size="20"
                >mdi-android-messages</v-icon
              >
            </div>
          </div>
          <p class="d-flex justify-space-between">
            <small>1 dona</small>
            <small class="cost" :class="{ sale: getOnsale }"
              >UZS {{ getDetail.price.price }}</small
            >
            <small class="cost" v-if="getOnsale">
              UZS {{ getDetail.price.salePrice }}</small
            >
          </p>
          <p class="d-flex justify-space-between">
            <small>{{ getDetail.quantityInPacket }} dona</small
            ><small class="quantity">1 pachka</small>
          </p>
          <p
            class="d-flex justify-space-between"
            v-if="!getOnsale"
          >
            <small>1 pachka</small
            ><small class="total">UZS {{ getDetail.price.totalPrice }}</small>
          </p>
          <p class="d-flex justify-space-between" v-if="getOnsale">
            <small>1 pachka</small
            ><small class="total"
              >UZS {{ getDetail.price.totalSalePrice }}</small
            >
          </p>
          <v-text-field
            name="soni"
            label="Necha pachka"
            placeholder="Necha pachka"
            outlined
            dense
            class="mt-8 count"
            v-model="count"
          ></v-text-field>

          <v-btn color="#28235B" dark small @click="addPro(getDetail.id, getDetail.name)">Korzinkaga saqlash</v-btn>
          <v-btn color="success" class="ml-5" dark small @click="setOrder(getDetail.id)">Buyurtma berish</v-btn>
        </v-col>
        <v-col cols="12">
          {{ getDetail.description }}
        </v-col>

        <!-- comments  -->
        <v-col cols="12" lg="8" class="comments mb-6">
          <h3 class="mb-5 comment-name">Mahsulot uchun izohlar</h3>
          <div
            class="mb-9 users-comment"
            v-for="(item, index) in getDetail.comments"
            :key="index"
          >
            <h4 class="user-name">
              <v-icon>mdi-account</v-icon> 
              {{ item.fullName }}
              </h4>
            <div class="d-flex star-wrap">
              <star-rating
                :rating="item.rating"
                :star-style="style"
                :is-indicator-active="false"
              ></star-rating>
              <span class="comment-date">{{
                format_date(item.createdAt)
              }}</span>
            </div>
            <p class="comment-text">
              {{ item.comment }}
            </p>
          </div>
          <v-divider></v-divider>
          <v-btn
            class="mt-4"
            color="primary"
            text
            @click="addComment(getDetail.name)"
            >Izoh qoldirish</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="600px"
      transition="dialog-transition"
    >
      <v-card class="py-10 px-6">
        <v-card-title class="comment-title">
         {{ dialogMessage }}
        </v-card-title>
        <v-card-text>
          <p class="star">
            <span>Mening bahom</span>
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              hover
              size="18"
            ></v-rating>
          </p>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="fullName"
              :rules="nameRules"
              :counter="4"
              dense
              label="Ismingiz"
              required
              class="mb-5"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="comments"
              :rules="commentRules"
              :counter="3"
              dense
              label="Izoh qoldiring"
              required
              class="mb-6"
              outlined
            ></v-text-field>
            <v-divider></v-divider>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 mt-6"
              @click="validate"
            >
              Izoh qoldirish
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="iconDialog" hide-overlay persistent width="300">
        <v-card color="primary" dark class="pt-3">
          <v-card-text>
            {{ name }} korzinkaga qo'shildi
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
import store from "@/store";
import { mapState } from "vuex";
import moment from "moment";
import EventServices from '@/services/EventServices';
export default {
  name: "OrderView",
  components: {
    StarRating,
  },
  data() {
    return {
      style: {
        fullStarColor: "#ed8a19",
        emptyStarColor: "#737373",
        starWidth: 18,
        starHeight: 18,
      },
      length: 3,
      onboarding: 0,
      dialog: false,
      dialogMessage: "",
      rating: 5,
      fullName: "",
      comments: "",
      valid: true,
      nameRules: [
        (v) => !!v || "Iltimos Ismingizni kirting",
        (v) =>
          v.length >= 4 || "Ism va familiya 4 ta harfdan uzun bolidhi kerak",
      ],
      commentRules: [
        (v) => !!v || "Iltimos biroz comment yozing",
        (v) => v.length >= 3 || "Izoh kamida 3 so'z bo'lishi kerak",
      ],
      name: "",
      count: 1,
      iconDialog: false
    };
  },
  computed: {
    ...mapState("shoes", {
      productDetail: "productDetail",
    }),
    getDetail() {
      if (this.productDetail) {
        return this.productDetail;
      }
      return null;
    },
    getAvarage() {
      if(this.productDetail && this.productDetail.rating) {
        return this.productDetail.rating.avarage
      }
      return 0
    },
    getCount() {
      if(this.productDetail && this.productDetail.rating) {
        return this.productDetail.rating.count
      }
      return 0
    },
    getOnsale() {
      if(this.productDetail && this.productDetail.price) {
        return this.productDetail.price.onSale
      }
      return false
    },

  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM.DD.YYYY hh:mm");
      }
    },
    addComment(name) {
      this.dialogMessage = name;
      this.dialog = true;
    },
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        let product = this.$route.params.id;
        let fullName = this.fullName
        let rating = this.rating
        let comment = this.comments
        let data = {
          product,
          fullName,
          rating,
          comment
        }
        EventServices.setComment(data)
          .then(() => {
            this.dialog = false
            store.dispatch("shoes/proDetail", product);
          })
      }
    },
    addPro(id, name) {
      this.name = name;
      let count = this.count
      let data = {
        product: id,
        quantity: count,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.iconDialog = true;
      });
    },
    setOrder(id) {
      let count = this.count
      let data = {
        product: id,
        quantity: count,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.$router.push("/Korzinka");
      });
    },
  },
  mounted() {
    let id = this.$route.params.id;
    store.dispatch("shoes/proDetail", id)
      .then(() => {
        if(this.$route.query.comment) {
          this.addComment(this.$route.query.comment)
        }
      })
  },
  watch: {
    iconDialog(val) {
      if (!val) return;

      setTimeout(() => (this.iconDialog = false), 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-wrapper {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  color: #28235b;
  font-weight: 400;
}
.shoes-name {
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
}
.stars-wrapper {
  small {
    font-size: 15px;
  }
  .icon {
    margin-left: 15px;
  }
}
.shoes-info {
  p {
    width: 80%;
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 23px;
  }
  .count {
    width: 80%;
  }
}
.sale {
  text-decoration: line-through;
  color: red;
}
.comments {
  margin-top: 50px;
  padding: 40px;
  background-color: #fff;
  .user-name {
    font-size: 18px;
    line-height: 22px;
    font-weight: 500;
    color: #858997;
    margin-bottom: 12px;
  }
  .star-wrap {
    width: 60%;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .comment-date {
    font-size: 14px;
    line-height: 15px;
    color: #c2c6d1;
  }
  .comment-text {
    font-size: 16px;
    line-height: 20px;
    color: #000;
  }
}
/* -------------------------------------------------------------------------- */
/*                                  comments                                  */
/* -------------------------------------------------------------------------- */
.comment-title {
  font-size: 24px !important;
  line-height: 30px;
  color: #000;
  justify-content: center;
}
.star {
  span {
    font-size: 14px;
    color: #212529;
  }
}
</style>
