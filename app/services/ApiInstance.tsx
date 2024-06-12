import axios from "axios";

export const instance = axios.create({
  baseURL: "/",
  withCredentials: true,
});
export const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response.data.body;
  },
  function (error) {
    return Promise.reject(error);
  }
);
