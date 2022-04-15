<template>
  <v-container class="detail-container">
    <v-row class="mt-9 detail-row" justify="space-between">
      <v-col cols="12">
        <h4>Zakaz #{{ this.$route.params.id }} tavsilotlari</h4>
      </v-col>
      <v-col cols="12" md="6" lg="5" class="detail-info mb-9 mb-md-0">
        <p class="d-flex justify-space-between w-100">
          <span>Status</span>
          <span class="status">{{ orderDetail.status }}</span>
        </p>
        <p class="d-flex justify-space-between w-100">
          <span>Buyurtma vaqti</span>
          <span>{{ format_date(orderDetail.createdAt) }}</span>
        </p>
        <p class="d-flex justify-space-between w-100">
          <span>Address</span>
          <span>{{ orderDetail.address }}</span>
        </p>
      </v-col>

      <v-col cols="12" md="6" lg="5" class="detail-info">
        <p class="d-flex justify-space-between w-100">
          <span>Buyurtma</span>
          <span>{{ orderDetail.totalPrice }} summ</span>
        </p>
        <p class="d-flex justify-space-between w-100">
          <span>Yetkazib berish</span>
          <span>0 summ</span>
        </p>
        <p class="d-flex justify-space-between w-100">
          <span>Jami</span>
          <span>{{ orderDetail.totalPrice }} summ</span>
        </p>
        <p class="d-flex justify-space-between w-100">
          <span>To'landi</span>
          <span>0 summ </span>
        </p>
        <v-divider></v-divider>

        <p class="d-flex justify-space-between w-100 mt-5 qoldiq">
          <span>Qolgan to'lov</span>
          <span>{{ orderDetail.totalPrice }} summ</span>
        </p>
      </v-col>
    </v-row>
    <v-row class="mb-9 detail-row" justify="center">
      <v-col cols="12" class="mt-15">
        <h4>Mahsulotlar</h4>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="10"
        lg="9"
        v-for="item in orderDetail.products"
        :key="item.id"
        class="product d-flex flex-column flex-md-row align-md-center justify-center"
      >
        <img :src="item.images[0]" alt="mahsulot rasmi" class="mx-auto mb-6 mb-md-0 ml-md-0 mr-md-10" />
        <div class="name-cost text-center text-md-left">
          <p>{{ item.name }}</p>
          <p :class="{ 'text-decoration-line-through': item.price.onSale }">
            {{ item.price.totalPrice }} summ
          </p>
          <p v-if="item.price.onSale">{{ item.price.totalSalePrice }} summ</p>
        </div>

        <div class="ml-md-auto d-flex flex-column detail-btn">
          <v-btn
            color="#008DFF"
            dark
            class="mb-6 order-btn"
            @click="enterDetail(item.id)"
            >Bir pacha sotib olish</v-btn
          >
          <v-btn
            color="#008DFF"
            dark
            class="mb-6 order-btn"
            @click="addPro(item.id, item.name)"
            >Korzinkaga qo'shish</v-btn
          >
          <v-btn color="#FE7300" dark class="order-btn" @click="addCommit(item.id, item.name)">Izoh yozish</v-btn>
        </div>
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
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import moment from "moment";
// // import EventServices from '@/services/EventServices';
export default {
  data() {
    return {
      iconDialog: false,
      name: "",
    };
  },
  computed: {
    ...mapState("user", {
      orderDetail: "detail",
    }),
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM.DD.YYYY hh:mm");
      }
    },
    enterDetail(id) {
      let data = {
        product: id,
        quantity: 1,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.$router.push("/Korzinka");
      });
    },
    addPro(id, name) {
      this.name = name;
      let data = {
        product: id,
        quantity: 1,
      };
      store.dispatch("korzinka/addKorzinka", data).then(() => {
        this.iconDialog = true;
      });
    },
    addCommit(id, name) {
      this.$router.push({
        name: "OrderView",
        params: {id: id},
        query: {comment: name}
      })
    }
  },
  watch: {
    iconDialog(val) { 
      if (!val) return;

      setTimeout(() => (this.iconDialog = false), 1000);
    },
  },
  mounted() {
    store.dispatch("user/orderDetail", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.detail-row {
  padding: 40px;
  background-color: #fff;
  border-radius: 20px;

  h4 {
    font-size: 26px;
    font-weight: 600;
  }
}
.detail-info {
  padding: 30px;
  box-shadow: 0px 10px 21px rgb(209 213 223 / 50%);
  background-color: #fff;
  border-radius: 10px;
  color: #212529;
  p {
    font-size: 16px;
    font-weight: 500;
    align-items: center;

    .status {
      padding: 4px 8px;
      background-color: green;
      border-radius: 5px;
      color: #fff;
    }
  }

  p:not(:last-child) {
    margin-bottom: 15px;
  }
  p.qoldiq {
    font-size: 20px;
  }
}
.product {
  padding: 30px;
  box-shadow: 0px 10px 21px rgb(209 213 223 / 50%);
  background-color: #fff;
  border-radius: 10px;
  color: #212529;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
  img {
    width: 150px;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
  .name-cost {
    font-size: 20px;
    font-weight: 700;
  }
  .order-btn {
    text-transform: inherit;
  }
}

@media screen and (max-width: 450px) {
  .detail-row{
    padding: 10px;
    h4 {
      font-size: 24px;
    }

    p.qoldiq {
      font-size: 18px;
    }
  }
}
@media screen and (max-width: 370px) {
  .detail-row{
    h4 {
      font-size: 22px;
    }
    p {
      font-size: 15px;
    }    
  }
  .detail-info {
    padding: 15px;
  }
}
</style>
