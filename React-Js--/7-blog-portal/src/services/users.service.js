import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const register = (data) => apiService.post(API_URLS.REGISTER, data);

const login = (data) => apiService.post(API_URLS.LOGIN, data);

const getUsers = () => apiService.get(API_URLS.USERS);

const getUserById = (userId) => apiService.get(`${API_URLS.USERS}/${userId}`);

const deleteUserById = (userId) =>
  apiService.delete(`${API_URLS.USERS}/${userId}`);

const addUserFormData = (data) =>
  apiService.post(API_URLS.REGISTER, data, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });

const updateUserFormData = (userId, data) =>
  apiService.put(API_URLS.EDIT_USER.replace(":userId", userId), data, {
    headers: {
      // "Content-Type": "multipart/formdata",
      "Content-Type": "application/json",
    },
  });

export const UserServices = {
  register,
  login,
  getUsers,
  deleteUserById,
  addUserFormData,
  getUserById,
  updateUserFormData,
};
