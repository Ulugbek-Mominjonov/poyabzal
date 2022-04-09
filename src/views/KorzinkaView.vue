<template>
  <v-container class="mb-10">
    <v-row class="korzinka-row" justify="space-between">
      <v-col cols="12" class="mt-3 mb-6 korzinka-title"> Korzinka </v-col>
      <v-col cols="8">
        <v-row
          v-for="(item, index) in getList"
          :key="index"
          class="pro-row pr-5"
        >
          <v-col cols="2" class="pro-img">
            <img :src="item.productDetail.images[0]" alt="Mahsulot rasmi" />
          </v-col>
          <v-col
            cols="10"
            class="d-flex align-center justify-space-between pro-info"
          >
            <h3 class="pro-name">{{ item.productDetail.name }}</h3>
            <div class="d-flex align-stretch btn-group">
              <v-btn
                color="#28235B"
                small
                dark
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
      <v-col cols="3">
        <div class="content-wrapper">
          <p class="korzinka-count">
            Savatdagi Mahsulotlar soni: <br /><span>{{ getList.length }}</span>
          </p>
          <p class="all-summ">Jami miqdori:</p>
          <p class="summ">{{ getSumm }}</p>
          <v-divider></v-divider>
          <v-btn v-if="getList == []" class="order-btn" color="success" small>Buyurtma</v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Korkinkadan Mahsulot o'chirilsinmi
        </v-card-title>
      </v-card>
    </v-dialog>
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
    };
  },
  computed: {
    ...mapState("korzinka", {
      korzinkaList: "korzinkaList",
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
      this.korzinkaList[index].quantity += 1;
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
  },
  mounted() {
    store.dispatch("korzinka/korzinkaList");
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
  img {
    width: 100%;
    max-height: 130px;
    object-fit: cover;
  }
}
.pro-name {
  width: 35%;
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
</style>
