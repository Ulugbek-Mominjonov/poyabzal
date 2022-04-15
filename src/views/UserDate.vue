<template>
  <div>
    <h4 class="heading">Shaxsiy ma'lumotlar</h4>
    <span class="font-bold">rasm</span>
    <div class="img mb-9">
      <img :src="userDate.image" alt="User img" v-if="userDate.image" />
      <v-icon v-else class="user-icon" size="200">mdi-account-box</v-icon>
      <div class="d-flex flex-column">
        <input
          ref="file"
          type="file"
          @change="uploadImage"
          hidden
        />
        <v-btn class="user-btn" color="primary" @click="selectFile()"
          >Rasm Qo'shish</v-btn
        >
        <div class="mt-5"></div>
        <v-btn color="warning" @click="deleteImage">Rasmni O'chirish</v-btn>
      </div>
    </div>

    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Ism"
          outlined
          v-model="userDate.firstName"
          append-icon="mdi-account"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Yashash manzil"
          outlined
          v-model="userDate.liveAddress"
          append-icon="mdi-home"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Familiya"
          outlined
          v-model="userDate.lastName"
          append-icon="mdi-account-outline"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Ish joy manzili"
          outlined
          v-model="userDate.workAddress"
          append-icon="mdi-city"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Telefon nomer"
          outlined
          v-model="userDate.username"
          readonly
          append-icon="mdi-phone"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="success" class="py-6" @click="saveChanges"
      >O'zgarishlarni saqlash</v-btn
    >

    <v-dialog v-model="iconDialog" hide-overlay persistent width="300">
        <v-card color="primary" dark class="pt-3">
          <v-card-text>
            {{message}}
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      images: "",
      message: "",
      iconDialog: false
    }
  },
  computed: {
    ...mapState("user", {
      userDate: "user",
    }),
  },
  methods: {
    selectFile() {
      let fileInputElement = this.$refs.file;
      fileInputElement.click();
    },
    uploadImage(event) {
      const image = event.target.files[0];
      this.images = image
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        this.userDate.image = event.target.result;
      };
      console.log(this.userDate.image);
    },
    deleteImage() {
      this.userDate.image = ""
      this.images = ""
    },
    saveChanges() {
      let data = new FormData();
      let myData = this.userDate;
      console.log(this.userDate);
      let image = this.images;
      console.log(image);
      data.append("first_name", myData.firstName);
      data.append("last_name", myData.lastName);
      data.append("image", image);
      data.append("live_address", myData.liveAddress);
      data.append("work_address", myData.workAddress);
      console.log(data);
      store.dispatch("user/updateDate", data).then(() => {
        this.message = "Ma'lumotlar o'zgartirildi. Rahmat";
        this.iconDialog = true
      });
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
.heading {
  font-size: 26px;
  margin-bottom: 20px;
}
.font-bold {
  font-weight: bold;
}
.img {
  display: flex;
  width: 45%;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  img {
    width: 220px;
    height: 220px;
    object-fit: cover;
    object-position: center;
  }
}
@media screen and (max-width: 1920px) {
  .img {
  width: 60%;
}
}
@media screen and (max-width: 800px) {
  .img {
  width: 80%;
}
}
@media screen and (max-width: 650px) {
  .img {
  width: 100%;
}
}
@media screen and (max-width: 510px) {
  .img {
  width: 100%;
  display: flex;
  flex-direction: column;
  img, .user-icon {
    margin-bottom: 25px;
  }
}
}
</style>
