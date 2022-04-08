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
  getProductList() {
    return instance.get("/api/shop/product/");
  },
  getProByFilter(value) {
    if (value == "new") {
      return instance.get("/api/shop/product/", {
        params: {
          isNew: 1,
          page: 1,
        },
      });
    } else if (value == "sale") {
      return instance.get("/api/shop/product/", {
        params: {
          onSale: true,
          page: 1,
        },
      });
    }
    return instance.get("/api/shop/product/", {
      params: {
        productType: value,
        page: 1,
      },
    });
  },
  getProCat(value) {
    if (value.productType == "barchasi") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            page: 1,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          category: value.category,
          page: 1,
        },
      });
    } else if (value.productType == "sale") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            onSale: true,
            page: 1,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          onSale: true,
          category: value.category,
          page: 1,
        },
      });
    } else if (value.category == 0) {
      return instance.get("/api/shop/product/", {
        params: {
          productType: value.productType,
          page: 1,
        },
      });
    } else {
      return instance.get("/api/shop/product/", {
        params: {
          productType: value.productType,
          category: value.category,
          page: 1,
        },
      });
    }
  },
  getPagination(value) {
    if (value.productType == "new") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            isNew: 1,
            page: value.page,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          isNew: 1,
          category: value.category,
          page: value.page,
        },
      });
    } else if (value.productType == "barchasi") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            page: value.page,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          category: value.category,
          page: value.page,
        },
      });
    } else if (value.productType == "sale") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            onSale: true,
            page: value.page,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          onSale: true,
          category: value.category,
          page: value.page,
        },
      });
    } else if (value.category == 0) {
      return instance.get("/api/shop/product/", {
        params: {
          productType: value.productType,
          page: value.page,
        },
      });
    }
    return instance.get("/api/shop/product/", {
      params: {
        productType: value.productType,
        category: value.category,
        page: value.page,
      },
    });
  },
  getDetail(id) {
    return instance.get(`/api/shop/product/${id}/`);
  },
  setSort(value) {
    if (value.productType == "new") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            isNew: 1,
            ordering: value.order,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          isNew: 1,
          category: value.category,
          ordering: value.order,
        },
      });
    } else if (value.productType == "barchasi") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            ordering: value.order,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          category: value.category,
          ordering: value.order,
        },
      });
    } else if (value.productType == "sale") {
      if (value.category == 0) {
        return instance.get("/api/shop/product/", {
          params: {
            onSale: true,
            ordering: value.order,
          },
        });
      }
      return instance.get("/api/shop/product/", {
        params: {
          onSale: true,
          category: value.category,
          ordering: value.order,
        },
      });
    } else if (value.category == 0) {
      return instance.get("/api/shop/product/", {
        params: {
          productType: value.productType,
          ordering: value.order,
        },
      });
    }
    return instance.get("/api/shop/product/", {
      params: {
        productType: value.productType,
        category: value.category,
        ordering: value.order,
      },
    });
  },
  addProduct(data) {
    return instance.post("/api/users/basket/", data)
  },
  getKorzinkaList() {
    return instance.get("/api/users/basket/")
  }
};
