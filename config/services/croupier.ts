import helpers from "@/components/common/utils/helper";
import constants from "@/config/constants";
import logger from "@/logger.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const {
  API: { baseURL, error: err, timeout },
  COOKIES,
} = constants;

const croupier = axios.create({
  baseURL,
  timeout,
});

croupier.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(COOKIES.key).then((item) =>
      item ? JSON.parse(item) : null
    );
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    logger({ error });
    return Promise.reject(error);
  }
);

croupier.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.status === 401 &&
      (error?.response?.data?.message?.toLowerCase() ===
        err?.expiredToken?.toLowerCase() ||
        error?.response?.data?.message?.toLowerCase() ===
          "access denied. no token provided.")
    ) {
      await AsyncStorage.removeItem(COOKIES.key);
      // Navigate to login screen
      helpers.openNotification({
        message: "Authentication Error",
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default croupier;
