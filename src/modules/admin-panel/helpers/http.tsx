import axios from "axios";
import * as promise from "promise";

let axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function(config) {
    let authToken = localStorage.getItem("auth-token");

    let accessToken = authToken;
    if (accessToken) {
      if (config.method !== "OPTIONS") {
        config.headers.authorization = accessToken;
      }
    }
    return config;
  },
  function(error) {
    return promise.reject(error);
  }
);

export default axiosInstance;
