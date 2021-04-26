import axios from "axios";

// create instance of axios
const instance = axios.create({
  baseURL: "http://localhost:8001",
});

export default {
  getData: (resource) =>
    instance({
      method: "GET",
      url: resource,
    }),
};
