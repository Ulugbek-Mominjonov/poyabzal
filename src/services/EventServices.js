import axios from "axios";
// import LocalStorageService from "./services/storage/localstorageservice";
import applyCaseMiddleware from "axios-case-converter";
import router from "@/router/index";
import store from "@/store/index";

const instance = applyCaseMiddleware(
  axios.create({
    baseURL: "http://89.223.122.69:8004",
  })
);

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("/api/auth/token/refresh/")
    ) {
      store.commit("auth/clear_data");
      router.push("/");
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      return instance
        .post("/api/auth/token/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access);
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");
            return instance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default {
  putKabinet(data) {
    return instance.put("/api/auth/profile/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getUserData() {
    return instance.get("/api/auth/profile/");
  },
  getCat() {
    return instance.get("/api/shop/category/");
  },
  getDetail(id) {
    return instance.get(`/api/shop/product/${id}/`);
  },
  addProduct(data) {
    return instance.post("/api/users/basket/", data)
  },
  getKorzinkaList() {
    return instance.get("/api/users/basket/")
  },
  deletePro(id) {
    return instance.delete(`/api/users/basket/${id}/`)
  },
  setComment(data) {
    return instance.post("/api/shop/comment/", data)
  },
  getOrderList() {
    return instance.get("/api/users/order/")
  },
  putUserData(data) {
    return instance.put("/api/auth/profile/", data)
  },
  orderCreate(data) {
    return instance.post("/api/users/order/", data)
  },
  getOrderDetail(id) {
    return instance.get(`/api/users/order/${id}/`)
  },
  getPopularPro() {
    return instance.get("/api/shop/product/", {
      params: {
        ordering: "views"
      }
    })
  },

  getFilter(data) {
    return instance.get("/api/shop/product/",{
      params: data
    })
  }

};
