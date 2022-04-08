<template>
  <v-container>
    <v-row class="korzinka-row">
      <v-col cols="12" class="mt-3 mb-6 korzinka-title"> Korzinka </v-col>
      <v-col cols="9">
        <v-row v-for="(item, index) in getList" :key="index" class="pro-row">
          <v-col cols="2" class="pro-img">
            <img :src="item.productDetail.images[0]" alt="Mahsulot rasmi" />
          </v-col>
          <v-col cols="10" class="d-flex align-center justify-space-between pro-info">
            <h3 class="pro-name">{{ item.productDetail.name }}</h3>
            <div class="d-flex align-stretch btn-group">
              <v-btn color="#28235B" small dark>
                <v-icon dense>mdi-minus</v-icon>
              </v-btn>
              <input type="number" 
              class="pro-input"
              v-model="count" readonly />
              <v-btn color="#28235B" small dark>
                <v-icon dense>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="cost-range">
              <p class="cost"></p>
              <v-btn color="warning" small outlined
                ><v-icon dense>mdi-delete</v-icon> o'chirish</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 16
    }
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
  border-top: 1px solid #28235B;
  border-bottom: 1px solid #28235B;
  border-radius: 0px;
  text-align: center;
}
</style>
