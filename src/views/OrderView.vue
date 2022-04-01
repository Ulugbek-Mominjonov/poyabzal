<template>
  <v-container class="order-container">
    <div class="order-wrapper">
      <h2 class="text-center mb-8 shoes-name">{{ data.name }}</h2>
      <v-row align="center">
        <v-col cols="1">
          <v-item-group v-model="onboarding" class="shrink" mandatory>
            <v-item v-for="n in length" :key="n" v-slot="{ toggle }">
              <div>
                <div @click="toggle" class="mb-5">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="150"
                    max-width="250"
                    src="https://picsum.photos/id/11/500/300"
                  ></v-img>
                </div>
              </div>
            </v-item>
          </v-item-group>
        </v-col>
        <v-col cols="5">
          <v-window v-model="onboarding" class="elevation-1" vertical>
            <v-window-item v-for="n in length" :key="n">
              <img
                lazy-src="https://picsum.photos/id/11/10/6"
                src="https://picsum.photos/id/11/500/300"
              />
            </v-window-item>
          </v-window>
        </v-col>
        <v-col cols="5" class="ml-auto shoes-info">
          <div
            class="d-flex align-center justify-space-between mb-7 stars-wrapper"
          >
            <star-rating
              :rating="data.rating.avarage"
              :star-style="style"
              :is-indicator-active="false"
            ></star-rating>

            <div>
              <small>5 ta sharx</small>
              <v-icon color="#28235B" class="icon" size="20"
                >mdi-android-messages</v-icon
              >
            </div>
          </div>
          <p class="d-flex justify-space-between">
            <small>1 dona</small>
            <small class="cost" :class="{ sale: data.price.onSale }"
              >UZS {{ data.price.price }}</small
            >
            <small class="cost" v-if="data.price.onSale">
              UZS {{ data.price.salePrice }}</small
            >
          </p>
          <p class="d-flex justify-space-between">
            <small>{{ data.quantityInPacket }} dona</small
            ><small class="quantity">1 pachka</small>
          </p>
          <p class="d-flex justify-space-between" v-if="!data.price.onSale">
            <small>1 pachka</small
            ><small class="total">UZS {{ data.price.totalPrice }}</small>
          </p>
          <p class="d-flex justify-space-between" v-if="data.price.onSale">
            <small>1 pachka</small
            ><small class="total">UZS {{ data.price.totalSalePrice }}</small>
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
          {{ data.description }}
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
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
      data: {
        name: "Shim",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate unde qui reiciendis debitis repellendus laboriosam rem itaque inventore, dicta eveniet! Odit illo, magnam molestias aliquid nihil nisi quas mollitia qui id minus impedit sit! Voluptates saepe, aspernatur at recusandae mollitia asperiores laudantium quaerat accusantium odio dolorum beatae veniam, illo quae dicta voluptatum temporibus consectetur architecto ab! Amet perspiciatis quo temporibus repudiandae totam veritatis provident expedita soluta deleniti beatae. Nemo, dolore. Placeat, ea? Itaque error dolorem sequi aspernatur id laboriosam laborum corporis quidem, excepturi consequatur recusandae non ipsa veritatis similique, laudantium et, temporibus eveniet quaerat minima nisi consectetur hic atque numquam.",
        image: [],
        price: {
          onSale: true,
          price: 80000.0,
          salePrice: 79000.0,
          totalPrice: 800000.0,
          totalSalePrice: 790000.0,
        },
        id: 1,
        productType: "men",
        quantityInPacket: 10,
        views: 0,
        isNew: true,
        rating: {
          count: 8,
          avarage: 2.6,
        },
      },
      length: 3,
      onboarding: 0,
    };
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
