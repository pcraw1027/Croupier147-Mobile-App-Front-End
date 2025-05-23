import helpers from "@/components/common/utils/helper";
import constants from "@/config/constants";
import logger from "@/logger.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosRequestConfig } from "axios";
import croupier from "./croupier";

const {
  API: {
    error: { aborted },
  },
  COOKIES,
} = constants;

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(COOKIES.key);
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error fetching token from AsyncStorage:", error);
    return null;
  }
};

const networkError = (errorCode: string): void => {
  if (errorCode === aborted.code) {
    helpers.openNotification({
      message: aborted.message,
      type: "error",
    });
  }
};

const get = async <T>({
  route,
  config,
}: {
  route: string;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  const token = await getToken();
  const headers = { ...(token && { Authorization: `Bearer ${token}` }) };
  const options: AxiosRequestConfig = {
    headers,
    ...config,
  };
  try {
    const response = await croupier.get(route, options);
    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        "An error occurred";
      networkError(errorMessage);
      logger({ error: errorMessage });
      // console.log("got here");
      throw new Error(errorMessage);
    } else if (error.request) {
      // No response received from the server
      networkError("No response received from the server");
      logger({ error: "No response received from the server" });
      throw new Error("No response received from the server");
    } else {
      // Error setting up the request
      networkError(error.message);
      logger({ error: error.message });
      // console.log("got here");
      throw new Error(error.message);
    }
  }
};

const post = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload: X;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response = await croupier.post(route, payload);
    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        "An error occurred";
      networkError(errorMessage);
      logger({ error: errorMessage });
      // console.log("got here");
      throw new Error(errorMessage);
    } else if (error.request) {
      // No response received from the server
      networkError("No response received from the server");
      logger({ error: "No response received from the server" });
      throw new Error("No response received from the server");
    } else {
      // Error setting up the request
      networkError(error.message);
      logger({ error: error.message });
      // console.log("got here");
      throw new Error(error.message);
    }
  }
};

const postFormDataPost = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload: X;
}): Promise<T> => {
  const headers = { "Content-Type": "multipart/form-data" };
  try {
    const response = await croupier.post(route, payload, { headers });
    return response.data as T;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      const errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        "An error occurred";
      networkError(errorMessage);
      logger({ error: errorMessage });
      // console.log("got here");
      throw new Error(errorMessage);
    } else if (error.request) {
      // No response received from the server
      networkError("No response received from the server");
      logger({ error: "No response received from the server" });
      throw new Error("No response received from the server");
    } else {
      // Error setting up the request
      networkError(error.message);
      logger({ error: error.message });
      // console.log("got here");
      throw new Error(error.message);
    }
  }
};

const put = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload?: X;
}): Promise<T> => {
  try {
    const response = await croupier.put(route, payload);
    return response.data as T;
  } catch (error: any) {
    networkError(error?.code);
    logger({ error });
    return error?.response?.data;
  }
};

const postFormDataPut = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload: X;
}): Promise<T> => {
  const headers = { "Content-Type": "multipart/form-data" };
  try {
    const response = await croupier.put(route, payload, { headers });
    return response.data as T;
  } catch (error: any) {
    networkError(error?.code);
    logger({ error });
    return error?.response?.data;
  }
};

const destroy = async <T>({ route }: { route: string }): Promise<T> => {
  try {
    const response = await croupier.delete(route);
    return response.data as T;
  } catch (error: any) {
    networkError(error?.code);
    logger({ error });
    return error?.response?.data;
  }
};

const requests = {
  destroy,
  get,
  networkError,
  post,
  postFormDataPost,
  put,
  postFormDataPut,
};

export default requests;
