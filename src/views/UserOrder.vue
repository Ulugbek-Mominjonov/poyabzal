<template>
  <div>
    <h4 class="mb-10">Buyurtmalr tarixi</h4>
    <div class="order-table">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left text-subtitle-1 heading">№</th>
            <th class="text-left text-subtitle-1 heading">
              Zakaz qilingan sana
            </th>
            <th class="text-left text-subtitle-1 heading">Umumiy summa</th>
            <th class="text-left text-subtitle-1 heading">Holati</th>
            <th class="text-left text-subtitle-1 heading">Tavsilotlar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderList" :key="item.id">
            <td class="text-left text-subtitle-2">{{ item.id }}</td>
            <td class="text-left text-subtitle-2">
              {{ format_date(item.createdAt) }}
            </td>
            <td class="text-left text-subtitle-2">{{ item.totalPrice }}</td>
            <td class="text-left text-subtitle-2">{{ item.status }}</td>
            <td class="text-left text-subtitle-2">
              <v-btn
                color="#28235B"
                class="text-lowerCase"
                dark
                small
                @click="orderDetail(item.id)"
                >Tavsilotlar</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import moment from "moment";
// import EventServices from '@/services/EventServices';
export default {
  computed: {
    ...mapState("user", {
      orderList: "list",
    }),
  },
  mounted() {
    store.dispatch("user/orderList");
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("MM.DD.YYYY hh:mm");
      }
    },
    orderDetail(id) {
      this.$router.push({
        name: "OrderDetail",
        params: {id: id}
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.heading {
  font-weight: 600;
}
.order-table {
  box-shadow: 0px 10px 30px rgb(209 213 223 / 50%);
}
</style>
