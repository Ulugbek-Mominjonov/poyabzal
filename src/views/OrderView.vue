<template>
  <v-container class="order-container">
    <div class="order-wrapper">
      <h2 class="text-center mb-8 shoes-name">{{ getDetail.name }}</h2>
      <v-row align="center">
        <v-col cols="1">
          <v-item-group v-model="onboarding" class="shrink" mandatory>
            <v-item v-for="(item, index) in getDetail.images" :key="index" v-slot="{ toggle }">
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
        <v-col cols="5">
          <v-window v-model="onboarding" class="elevation-1" vertical>
            <v-window-item v-for="(item, index) in getDetail.images" :key="index">
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
        <v-col cols="5" class="ml-auto shoes-info">
          <div
            class="d-flex align-center justify-space-between mb-7 stars-wrapper"
          >
            <star-rating
              :rating="getDetail.rating.avarage"
              :star-style="style"
              :is-indicator-active="false"
            ></star-rating>

            <div>
              <small>{{getDetail.rating.count}} ta sharx</small>
              <v-icon color="#28235B" class="icon" size="20"
                >mdi-android-messages</v-icon
              >
            </div>
          </div>
          <p class="d-flex justify-space-between">
            <small>1 dona</small>
            <small class="cost" :class="{ sale: getDetail.price.onSale }"
              >UZS {{ getDetail.price.price }}</small
            >
            <small class="cost" v-if="getDetail.price.onSale">
              UZS {{ getDetail.price.salePrice }}</small
            >
          </p>
          <p class="d-flex justify-space-between">
            <small>{{ getDetail.quantityInPacket }} dona</small
            ><small class="quantity">1 pachka</small>
          </p>
          <p class="d-flex justify-space-between" v-if="!getDetail.price.onSale">
            <small>1 pachka</small
            ><small class="total">UZS {{ getDetail.price.totalPrice }}</small>
          </p>
          <p class="d-flex justify-space-between" v-if="getDetail.price.onSale">
            <small>1 pachka</small
            ><small class="total">UZS {{ getDetail.price.totalSalePrice }}</small>
          </p>
          <v-text-field
            name="soni"
            label="Necha pachka"
            placeholder="Necha pachka"
            outlined
            dense
            class="mt-8 count"
          ></v-text-field>

          <v-btn color="#28235B" dark small>Korzinkaga saqlash</v-btn>
        </v-col>
        <v-col cols="12">
          {{ getDetail.description }}
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
import store from '@/store';
import { mapState } from 'vuex'
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
    };
  },
  computed: {
    ...mapState('shoes', {
      productDetail: "productDetail"
    }),
    getDetail() {
      if(this.productDetail){
        return this.productDetail
      }
      return null
    }
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
  },
  mounted() {
    let id = this.$route.params.id
    store.dispatch("shoes/proDetail", id)
  }
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
</style>
