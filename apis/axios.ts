import { secureGet } from "@/helper/secureStore";
import Axios from "axios";

const axios = Axios.create();

axios.interceptors.request.use(async (config) => {
  const accessToken = await secureGet("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export default axios;
