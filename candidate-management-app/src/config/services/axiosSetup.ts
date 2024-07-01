import axios from "axios";
import store from "../store";
import { actions } from "../actions";
import { notification } from "antd";

const axiosInstance = axios.create();

// Request interceptor (if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(actions.serverLoading());
    return config;
  },
  (error) => {
    store.dispatch(
      actions.serverError({
        status: error.response?.status,
        message:
          error.response?.data?.message || error.message || "An error occurred",
      })
    );
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      store.dispatch(actions.serverSuccess("Success"));
      notification.success({
        message: "Success",
        description: "Success",
        duration: 4,
      });
    }
    return response;
  },
  (error) => {
    const errorResponse = {
      status: error.response?.status,
      message:
        error.response?.data?.error || error.message || "An error occurred",
    };
    store.dispatch(actions.serverError(errorResponse));
    notification.error({
      message: "Error",
      description: errorResponse.message,
      duration: 4,
    });
    return Promise.reject(errorResponse);
  }
);

export default axiosInstance;
