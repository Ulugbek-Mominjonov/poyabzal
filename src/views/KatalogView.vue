<template>
  <div class="katalog-section">
    <v-container class="katalog-container">
      <v-row class="katalog-row" align="baseline">
        <!-- katalog link  -->
        <v-col class="katalog-link" cols="12" sm="3" md="2">
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
        <v-col class="katalog-content" cols="12" sm="9" md="10">
          <v-row class="content-row" justify="center">
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
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-show="getShoes && getShoes.length > 0"
              v-for="(item, index) in getShoes"
              :key="index"
              align-self="stretch"
            >
              <div class="shoes-card">
                <img
                  class="mb-3 shoes-img"
                  :src="item.images[0]"
                  alt="Mahsulot rasmi yo'q"
                  @click="redirectDetail(item.id)"
                />
                <span class="aksiya" v-if="item.price.onSale">Aksiya</span>
                <p
                  class="my-5 mt-auto shoes-info"
                  @click="redirectDetail(item.id)"
                >
                  {{ item.name }}
                </p>
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
                  @click="enterDetail(item.id, item.id)"
                  >Buyurtma berish</v-btn
                >
              </div>
            </v-col>

            <v-col class="shoes mt-7" cols="8" sm="6" lg="3" v-if="getShoes.length == 0">
              <div class="smile-card">
                <img class="mb-3 smile-img" src="../assets/smile.webp" />
              </div>
            </v-col>

            <v-col class="shoes mt-7" cols="8" v-if="!getShoes">
              <v-alert type="info"> Ma'lumotlar yuklanmoqda </v-alert>
            </v-col>

            <v-col cols="12" class="ml-auto" v-if="pageCount > 1">
              <v-pagination
                v-model="data.page"
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
      name: "",
    };
  },
  computed: {
    ...mapState("shoes", {
      category: "category",
      productList: "pList",
      categoryId: "catId",
      onSale: "sale",
      data: "data",
    }),
    getShoes() {
      if (this.productList && this.productList.results) {
        return this.productList.results;
      }
      return null;
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
      this.pathName = name;
      if (id != 0) {
        this.data.category = id;
      } else {
        if ("category" in this.data) {
          delete this.data.category;
        }
      }
      if ("page" in this.data) {
        this.data.page = 1;
      }
      store.commit("shoes/SET_DATA", this.data);
      store.dispatch("shoes/filter", this.data);
    },
    enterDetail(id, name) {
      this.name = name;
      let data = {
        product: id,
        quantity: 1,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.icon = id;
        this.$router.push("/Korzinka");
        store.commit("shoes/SET_TIP", null);
        localStorage.removeItem("tip");
      });
    },
    changePage(value) {
      this.data.page = value;
      store.commit("shoes/SET_DATA", this.data);
      store.dispatch("shoes/filter", this.data);
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
      this.data.ordering = order;
      store.commit("shoes/SET_DATA", this.data);
      store.dispatch("shoes/filter", this.data);
    },
    addPro(id, name) {
      this.name = name;
      let data = {
        product: id,
        quantity: 1,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.icon = id;
        this.iconDialog = true;
        setTimeout(() => {
          store.dispatch("korzinka/korzinkaList");
        }, 1300);
      });
    },
    redirectDetail(id) {
      this.$router.push({
        name: "OrderView",
        params: { id: id },
      });
    },
  },
  mounted() {
    store.dispatch("shoes/getCategory");
    let value = this.$route.params.name;
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
    if ("page" in this.data) {
      this.data.page = 1;
    }
    store.commit("shoes/SET_DATA", this.data);
    store.dispatch("shoes/filter", this.data);
  },
  watch: {
    iconDialog(val) {
      if (!val) return;

      setTimeout(() => (this.iconDialog = false), 1000);
    },
  },
  beforeDestroy() {
    localStorage.removeItem("tip");
  },
};
</script>

<style lang="scss" scoped>
.katalog-link {
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  background-color: #fff;
}

/* -------------------------------------------------------------------------- */
/*                               katalog content                              */
/* -------------------------------------------------------------------------- */
.content-row {
  margin-bottom: 50px;
}
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
  height: 100%;
  padding: 10px;
  border: 1px solid #28235b;
  border-radius: 10px;
  color: #28235b;
  background-color: #fff;
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
    max-height: 300px;
    object-fit: cover;
    cursor: pointer;
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
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    cursor: pointer;
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
      font-weight: 500;
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
.smile-card {
    background-color: transparent;
  }
  .smile-img {
    width: 100%;
    display: block;
    object-fit: contain;
  }
  .smile-info {
    font-size: 22px;
  }
@media screen and (max-width: 816px) {
  .content-path {
    margin-bottom: 40px;

    .filter {
      position: absolute;
      top: 55px;
      right: 10px;
      width: 150px;
    }
    .content-name {
      font-size: 18px;
      margin-right: 10px;
    }
    .content-parent-path {
      margin-right: 5px;
    }
  }
}
@media screen and (max-width: 386px) {
  .content-path {
    margin-bottom: 40px;

    .content-name {
      font-size: 15px;
      margin-right: 10px;
    }
  }
}
</style>
