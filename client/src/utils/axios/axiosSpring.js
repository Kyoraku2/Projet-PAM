import axios from 'axios';
import {getCookie} from "../functions";
import {COOKIE_USER_KEY} from "../consts";

// To contact the Spring API
const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

// Apply the token to every request
instance.interceptors.request.use(
  (config) => {
    const authFromCookies = getCookie(COOKIE_USER_KEY);

    // uri
    if(authFromCookies?.accessToken !== undefined) {
      config.headers['Authorization'] = 'Bearer ' + authFromCookies.accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;

// TODO : disconnect on mobile