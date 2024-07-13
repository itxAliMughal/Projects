import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getcategories = () => apiService.get(API_URLS.GET_CATEGORY);

const getCategoriesById = (catId) => {
  return apiService.get(`${API_URLS.GET_CATEGORY}/${catId}`);
};

const deleteCategoriesById = (catId) => {
  return apiService.delete(`${API_URLS.GET_CATEGORY}/${catId}`);
};

const addCategory = (payload) => {
  return apiService.post(API_URLS.GET_CATEGORY, payload);
};

const updateCategoryById = (catId, payload) => {
  return apiService.put(`${API_URLS.GET_CATEGORY}/${catId}`, payload);
};

export const categoryService = {
  getcategories,
  getCategoriesById,
  deleteCategoriesById,
  addCategory,
  updateCategoryById,
};
