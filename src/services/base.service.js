import axios from "axios";
import { getAccessToken, logout } from "../store/AccessTokenStore";

export const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: "https://gigboardapi.onrender.com", "http://localhost:3000"
 


 });  if (useAccessToken) {
    http.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response.status === 401) {
        if (getAccessToken()) {
          logout();
        }
      }

      return Promise.reject(error.response.data);
    }
  );
  return http;
};
