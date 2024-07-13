import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getPosts = () => {
  return apiService.get(API_URLS.GET_POST);
};

const getPostById = (postId) => {
  return apiService.get(`${API_URLS.GET_POST}/${postId}`);
};

const deletePostById = (postId) => {
  return apiService.delete(`${API_URLS.GET_POST}/${postId}`);
};

const addPost = (data) => {
  return apiService.post(API_URLS.GET_POST, data);
};

const updatePostById = (postId, data) => {
  return apiService.put(`${API_URLS.GET_POST}/${postId}`, data);
};

export const postService = {
  getPosts,
  getPostById,
  deletePostById,
  addPost,
  updatePostById,
};
