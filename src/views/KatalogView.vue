<template>
  <div class="katalog-section">
    <v-container class="katalog-container">
      <v-row class="katalog-row" align="baseline">
        <!-- katalog link  -->
        <v-col class="katalog-link" cols="2">
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="red">
              <v-list-item @click="changeMenu('Barcha bolimlar')">
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
                v-for="(item, i) in items"
                :key="i"
                @click="changeMenu(item.text)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
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
            </v-col>

            <!-- shoes  -->
            <v-col
              class="shoes"
              cols="3"
              v-for="(item, index) in shoes"
              :key="index"
            >
              <div class="shoes-card">
                <img
                  class="shoes-img"
                  src="../assets/shoes2.png"
                  alt="shoes img"
                />
                <h3 class="shoes-cat">{{ item.category }}</h3>
                <p class="shoes-info">{{ item.info }}</p>
                <div
                  class="d-flex align-center justify-space-between stars-wrapper"
                >
                  <star-rating
                    :rating="rating"
                    :star-style="style"
                    :is-indicator-active="indicator"
                  ></star-rating>

                  <div>
                    <small>5 ta sharx</small>
                    <v-icon color="#28235B" class="icon" size="18"
                      >mdi-android-messages</v-icon
                    >
                  </div>
                </div>
                <div
                  class="d-flex align-center justify-space-between cost-basket"
                >
                  <span>{{ item.cost }}</span>
                  <v-icon color="#28235B" size="28" class="basket"
                    >mdi-basket-outline</v-icon
                  >
                </div>

                <v-btn color="#28235B" outlined height="30" class="order" @click="enterDetail"
                  >Buyurtma berish</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" class="ml-auto">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="100"
                circle
                :total-visible="5"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StarRating from "vue-dynamic-star-rating";
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
      items: [
        { text: "Ofis uchun", icon: "mdi-chevron-right" },
        { text: "Uy uchun", icon: "mdi-chevron-right" },
        { text: "O'quv uchun", icon: "mdi-chevron-right" },
        { text: "Mehmonhona uchun", icon: "mdi-chevron-right" },
      ],
      pathName: "Barcha bo'limlar",
      shoes: [
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
        {
          img: "../assets/shoes2.png",
          category: "Krasovka",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat risus at tortor proin. Ut sollicitudin ut.",
          star: 3,
          cost: "UZS 250 000",
        },
      ],
      page: 1
    };
  },
  methods: {
    changeMenu(value) {
      this.pathName = value;
    },
    enterDetail() {
      this.$router.push('/shoes')
    }
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
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #28235b;
  border-radius: 10px;
  color: #28235b;
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
}
</style>
