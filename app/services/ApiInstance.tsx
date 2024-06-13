import axios from "axios";

axios.interceptors.response.use(
    (response) => {
        const body = response.data.body;
        console.log(body)
        return body
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const instance = axios.create({
  baseURL: "/",
  withCredentials: true,
});
export const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

