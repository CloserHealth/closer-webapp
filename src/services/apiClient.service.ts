import { AnyAction, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import { useSelector } from "react-redux";

let apiBaseUrl: string | undefined = "";


const env: string = process.env.NODE_ENV;

switch (env) {
  case "local":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    break;

  case "development":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    break;
  case "production":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    break;
  default:
    apiBaseUrl = "";
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

let store: EnhancedStore<
  {
    auth: any;
  },
  AnyAction,
  [
    ThunkMiddleware<
      {
        auth: any;
      },
      AnyAction,
      undefined
    >
  ]
>;

export const injectStore = (
  _store: EnhancedStore<
    {
      auth: any;
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          auth: any;
        },
        AnyAction,
        undefined
      >
    ]
  >
) => {
  store = _store;
};


// Interceptor to attach auth key to request headers
apiClient.interceptors.request.use(
    (config: any) => {
      const state = store.getState();
      const userToken = state.auth.token;
      console.log("token", userToken);
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default apiClient;