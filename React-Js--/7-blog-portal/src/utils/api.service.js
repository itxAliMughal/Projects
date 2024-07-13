//Design Pattern
// Singleton
// single instance will go around in our app

import { create } from "apisauce";

const apiSauceInstance = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const globalHeaders = {
  headers: {
    // "Content-Type": "multipart/formdata",
    "Content-Type": "application/json",
  },
};

const get = (url, params = {}) => apiSauceInstance.get(url, params);

const post = (url, data = {}, paramHeader = globalHeaders) =>
  apiSauceInstance.post(url, data, paramHeader);

const put = (url, data = {}, paramHeader = globalHeaders) =>
  apiSauceInstance.put(url, data, paramHeader);

const patch = (url, data = {}) =>
  apiSauceInstance.patch(url, data, globalHeaders);

const deleteRequest = (url, params = {}) =>
  apiSauceInstance.delete(url, params);

export const apiService = {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
