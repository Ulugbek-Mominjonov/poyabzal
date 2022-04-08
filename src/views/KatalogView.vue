<template>
  <div class="katalog-section">
    <v-container class="katalog-container">
      <v-row class="katalog-row" align="baseline">
        <!-- katalog link  -->
        <v-col class="katalog-link" cols="2">
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="red">
              <v-list-item @click="changeMenu('barchasi', 0)">
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2"
                    >Barcha bo'limlar
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item
                v-for="(item, i) in category"
                :key="i"
                @click="changeMenu(item.name, item.id)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <!-- katalog content  -->
        <v-col class="katalog-content" cols="10">
          <v-row class="content-row">
            <!-- content path  -->
            <v-col class="content-path" cols="12">
              <p class="content-name">Barcha bo'limlar</p>
              <div class="content-parent-path">
                <span>Bo'limlar ro'yhati</span>
                <v-icon size="18">mdi-chevron-right</v-icon>
              </div>
              <div class="content-current-path">
                <span>{{ pathName }}</span>
                <v-icon size="18" color="red">mdi-chevron-right</v-icon>
              </div>

              <v-select
                v-model="select"
                :items="items3"
                label="Saralash"
                dense
                solo
                background-color="#28235b"
                dark
                height="30"
                class="filter"
                hide-details
                @change="sort"
              ></v-select>
            </v-col>

            <!-- shoes  -->
            <v-col
              class="shoes"
              cols="3"
              v-for="(item, index) in getShoes"
              :key="index"
            >
              <div class="shoes-card">
                <img
                  class="shoes-img"
                  :src="item.images[0]"
                  alt="Mahsulot rasmi yo'q"
                />
                <span class="aksiya" v-if="item.price.onSale">Aksiya</span>
                <p class="my-5 shoes-info">{{ item.name }}</p>
                <div
                  class="d-flex align-center justify-space-between stars-wrapper"
                >
                  <star-rating
                    :rating="item.rating.avarage"
                    :star-style="style"
                    :is-indicator-active="indicator"
                  ></star-rating>

                  <div>
                    <small>{{ item.rating.count }} ta sharx</small>
                    <v-icon color="#28235B" class="icon" size="18"
                      >mdi-android-messages</v-icon
                    >
                  </div>
                </div>
                <div
                  class="d-flex align-center justify-space-between cost-basket"
                >
                  <span :class="{ sale: item.price.onSale }"
                    >{{ item.price.price }} UZS</span
                  >
                  <span class="d-block" v-if="item.price.onSale"
                    >{{ item.price.salePrice }} UZS</span
                  >
                  <v-icon
                    color="#28235B"
                    size="28"
                    class="basket"
                    :class="{ 'basket-dashed': item.id == icon }"
                    @click="addPro(item.id, item.name)"
                    >mdi-basket-outline</v-icon
                  >
                </div>

                <v-btn
                  color="#28235B"
                  outlined
                  height="30"
                  class="order"
                  @click="enterDetail(item.id)"
                  >Buyurtma berish</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" class="ml-auto" v-if="pageCount > 1">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="pageCount"
                circle
                :total-visible="5"
                @input="changePage"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-dialog v-model="iconDialog" hide-overlay persistent  width="300">
        <v-card color="primary" dark class="pt-3">
          <v-card-text>
            {{name}} korzinkaga qo'shildi
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
import store from "@/store";
import { mapState } from "vuex";
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      selectedItem: 0,
      rating: 3.6,
      style: {
        fullStarColor: "#ed8a19",
        emptyStarColor: "#737373",
        starWidth: 15,
        starHeight: 15,
      },
      indicator: false,
      items3: [
        "Narx bo'yicha",
        "Yangilar",
        "Eskilar",
        "Ko'p ko'rilganlar(-)",
        "Ko'p ko'rilganlar(+)",
      ],
      pathName: "Barcha bo'limlar",
      page: 1,
      isNew: 0,
      catId: null,
      select: "jhjgh",
      icon: null,
      iconDialog: false,
      name: ""
    };
  },
  computed: {
    ...mapState("shoes", {
      category: "category",
      productList: "pList",
      categoryId: "catId",
      onSale: "sale",
    }),
    getShoes() {
      if (this.productList) {
        if (this.onSale == 1) {
          return this.productList.results.filter((item) => item.price.onSale);
        }
        return this.productList.results;
      }
      return [];
    },
    pageCount() {
      if (this.productList) {
        return this.productList.numPages;
      }
      return null;
    },
  },
  methods: {
    changeMenu(name, id) {
      console.log(id);
      this.pathName = name;
      let tip = this.$route.params.name;
      let data = {
        productType: tip,
        category: id,
      };
      store.dispatch("shoes/proCat", data);
    },
    enterDetail(id) {
      this.$router.push({
        name: "OrderView",
        params: { id: id },
      });
    },
    changePage(value) {
      let tip = this.$route.params.name;
      let cat = this.selectedItem;
      let page = value;
      console.log(value);
      let data = {
        category: cat,
        productType: tip,
        page: page,
      };
      store.dispatch("shoes/pagination", data);
    },
    sort(value) {
      let order;
      switch (value) {
        case "Narx bo'yicha":
          order = "price";
          break;
        case "Yangilar":
          order = "is_new";
          break;
        case "Eskilar":
          order = "-is_new";
          break;
        case "Ko'p ko'rilganlar(-)":
          order = "views";
          break;
        case "Ko'p ko'rilganlar(+)":
          order = "-views";
          break;
      }
      let tip = this.$route.params.name;
      let cat = this.selectedItem;
      let data = {
        category: cat,
        productType: tip,
        order: order,
      };
      store.dispatch("shoes/proSort", data);
    },
    addPro(id, name) {
      this.name = name
      let data = {
        product: id,
        quantity: 1,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.icon = id;
        this.iconDialog = true;
      });
    },
  },
  mounted() {
    store.dispatch("shoes/getCategory");
    let tip = this.$route.params.name;
    if (tip != "barchasi") {
      store.dispatch("shoes/proTip", tip);
    } else {
      store.dispatch("shoes/productList");
    }
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
.katalog-link {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
}

/* -------------------------------------------------------------------------- */
/*                               katalog content                              */
/* -------------------------------------------------------------------------- */
.content-path {
  display: flex;
  align-items: flex-end;
  position: relative;

  .filter {
    position: absolute;
    top: 15px;
    right: 0;
    width: 150px;
  }
}
.content-name::after {
  display: block;
  content: "";
  width: 10%;
  height: 1.5px;
  background-color: #bdb7b7;
}
.content-name {
  margin: 0;
  margin-right: 30px;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  color: #181818;
}
.content-parent-path {
  margin-right: 30px;
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #a4a4a4;
  }
}
.content-current-path {
  position: relative;
  color: #cc0000;
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
}

/* -------------------------------------------------------------------------- */
/*                                    shoes                                   */
/* -------------------------------------------------------------------------- */
.shoes {
  padding: 6px !important;
}
.shoes-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #28235b;
  border-radius: 10px;
  color: #28235b;
  .aksiya {
    position: absolute;
    top: 10px;
    right: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    padding: 4px 10px;
    color: #000000;
    background: #efd80a;
    border-radius: 5px;
  }
  .shoes-img {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .shoes-cat {
    align-self: flex-start;
    margin: 0;
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 3px 23px;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    background: #28235b;
    border-radius: 5px;
  }
  .shoes-info {
    margin-top: 0;
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
  }
  .stars-wrapper {
    margin-bottom: 10px;
    small {
      font-size: 13px;
      line-height: 17px;
    }
    .icon {
      margin-left: 3px;
    }
  }
  .cost-basket {
    margin-bottom: 10px;
    span {
      font-weight: 400;
      font-size: 15px;
      line-height: 17px;
    }
  }
  .basket {
    cursor: pointer;
  }
  .order {
    align-self: center;
    text-transform: capitalize !important;
    font-size: 13px;
    line-height: 16px;
  }
  .sale {
    text-decoration: line-through;
    color: red;
  }
  .basket-dashed {
    color: red !important;
  }
}
</style>
