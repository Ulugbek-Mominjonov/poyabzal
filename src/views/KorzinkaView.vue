<template>
  <v-container class="mb-10">
    <v-row class="korzinka-row" justify-md="space-between" justify="center">
      <v-col cols="12" class="mt-3 mb-6 korzinka-title"> Korzinka </v-col>
      <v-col cols="12" sm="11" md="8" order-md="1" order="2">
        <v-row
          v-for="(item, index) in getList"
          :key="index"
          class="pro-row pr-5"
        >
          <v-col cols="4" sm="2" class="pro-img">
            <img :src="item.productDetail.images[0]" alt="Mahsulot rasmi" @click="changeRouter(item.productDetail.id)"/>
          </v-col>
          <v-col
            cols="8"
            md="10"
            class="d-flex align-center justify-space-between pro-info"
          >
            <h3 class="pro-name" @click="changeRouter(item.productDetail.id)">{{ item.productDetail.name }}</h3>
            <div class="d-flex align-stretch btn-group">
              <v-btn
                color="#28235B"
                small
                dark
                class="input-btn"
                @click="lessPro(item.productDetail.id, item.id, index)"
              >
                <v-icon dense>mdi-minus</v-icon>
              </v-btn>
              <input
                type="number"
                class="pro-input"
                v-model="item.quantity"
                @input="counter(item.productDetail.id, index)"
              />
              <v-btn
                color="#28235B"
                small
                dark
                @click="addPro(item.productDetail.id, index)"
                class="input-btn"
              >
                <v-icon dense>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="cost-range">
              <p class="cost" v-if="item.productDetail.price.onSale">
                UZS {{ item.productDetail.price.totalSalePrice }}
              </p>
              <p class="cost my-0" v-else>
                UZS {{ item.productDetail.price.totalPrice }}
              </p>
              <v-btn
                class="px-0"
                color="warning"
                small
                text
                @click="deletePro(item.id)"
                ><v-icon dense>mdi-delete</v-icon> o'chirish</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10" order-md="2" order="1" sm="6" md="4" class="mb-sm-7">
        <div class="content-wrapper">
          <p class="korzinka-count">
            Savatdagi Mahsulotlar soni: <br /><span>{{ getList.length }}</span>
          </p>
          <p class="all-summ">Jami miqdori:</p>
          <p class="summ">{{ getSumm }}</p>
          <v-divider></v-divider>
          <v-btn
            v-if="getList && getList.length > 0"
            class="order-btn py-6"
            color="success"
            @click="orderCreate"
            >Buyurtma berish</v-btn
          >
        </div>
      </v-col>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card class="py-8 px-8">
          <v-card-text>
            <v-text-field
              label="Address"
              v-model="userDate.liveAddress"
              class="pt-5"
              prepend-icon="mdi-city"
            ></v-text-field>
            <v-textarea
              label="Izoh qoldiring"
              rows="1"
              v-model="comment"
              prepend-icon="mdi-comment"
            ></v-textarea>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <div class="d-flex flex-column flex-md-row justify-center justify-md-space-between align-center">
              <v-btn color="warning" text @click="dialog = false"
                >Bekor qilish</v-btn
              >
              <v-btn
                color="success"
                class="d-block d-md-inline-block"
                text
                @click="orderSuccess"
                >Buyurtma berish</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import EventService from "@/services/EventServices.js";
export default {
  data() {
    return {
      count: 16,
      dialog: false,
      comment: "",
    };
  },
  computed: {
    ...mapState("korzinka", {
      korzinkaList: "korzinkaList",
    }),
    ...mapState("user", {
      userDate: "user",
    }),
    getList() {
      if (this.korzinkaList) {
        return this.korzinkaList;
      }
      return null;
    },
    getSumm() {
      if (this.korzinkaList) {
        let summ = 0;
        this.korzinkaList.forEach((element) => {
          let oneSumm = 0;
          if (element.productDetail.price.onSale) {
            oneSumm =
              element.productDetail.price.totalSalePrice * element.quantity;
          } else {
            oneSumm = element.productDetail.price.totalPrice * element.quantity;
          }
          summ += oneSumm;
        });
        return summ;
      }
      return 0;
    },
  },
  methods: {
    counter(id, index) {
      let count = parseInt(this.korzinkaList[index].quantity);
      let data = {
        product: id,
        quantity: count,
      };
      EventService.addProduct(data);
    },
    addPro(id, index) {
      this.korzinkaList[index].quantity = parseInt(this.korzinkaList[index].quantity) + 1;
      let count = this.korzinkaList[index].quantity;
      let data = {
        product: id,
        quantity: count,
      };
      EventService.addProduct(data);
    },
    lessPro(id, listId, index) {
      this.korzinkaList[index].quantity -= 1;
      let count = this.korzinkaList[index].quantity;
      if (count == 0) {
        console.log(count);
        EventService.deletePro(listId).then(() => {
          store.dispatch("korzinka/korzinkaList");
        });
      } else {
        let data = {
          product: id,
          quantity: count,
        };
        EventService.addProduct(data);
      }
    },
    deletePro(id) {
      EventService.deletePro(id).then(() => {
        store.dispatch("korzinka/korzinkaList");
      });
    },
    orderCreate() {
      this.dialog = true;
    },
    orderSuccess() {
      let latitude = this.userDate.latitude;
      let longitude = this.userDate.longitude;
      let address = this.userDate.liveAddress;
      let comment = this.comment;
      let data = {
        latitude,
        longitude,
        address,
        comment,
      };
      EventService.orderCreate(data).then(() => {
        store.dispatch("korzinka/korzinkaList");
        this.dialog = false;
      });
    },
    changeRouter(id) {
      this.$router.push({
        name: "OrderView",
        params: { id: id },
      });
    }
  },
  mounted() {
    localStorage.removeItem("tip");
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("korzinka/korzinkaList").then(() => {
      setTimeout(() => {
        next();
      }, 1000);
    });
  },
};
</script>

<style lang="scss" scoped>
.korzinka-title {
  font-weight: 500;
  font-size: 28px;
  line-height: 28px;
  color: #28235b;
}
.pro-row {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: #fff;
}
.pro-row:not(:last-child) {
  margin-bottom: 30px;
}
.pro-img {
  cursor: pointer;
  img {
    width: 100%;
    max-height: 130px;
    object-fit: cover;
  }
}
.pro-name {
  width: 35%;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    color: red;
  }
}
.pro-input {
  width: 80px;
  border-top: 1px solid #28235b;
  border-bottom: 1px solid #28235b;
  border-radius: 0px;
  text-align: center;
}
.content-wrapper {
  padding: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  text-align: center;
  color: #28235b;
  background-color: #fff;
}
.korzinka-count {
  color: #28235b;
  font-size: 16px;
  line-height: 20px;
  span {
    display: block;
    margin-top: 10px;
    font-size: 20px;
    line-height: 20px;
  }
}
.summ {
  font-size: 24px;
  line-height: 26px;
}
.order-btn {
  margin-top: 20px;
}

@media screen and (max-width: 732px) {
  .pro-info {
    flex-wrap: wrap;

    .pro-name {
      width: 100%;
    }
  }
}

@media screen and (max-width: 444px) {
  .pro-info {
    .pro-input {
      width: 50px;
    }
    .input-btn {
      padding-left: 2px !important;
      padding-right: 2px !important;
    }
  }
}
@media screen and (max-width: 410px) {
  .pro-info {
    margin-left: auto;
    align-items: center;
    .pro-input {
      width: 50px;
    }
    .btn-group {
      margin-top: 10px;
    }
    .cost-range {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
