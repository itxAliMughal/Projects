import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const storeComment = (data = {}) => {
  apiService.post(API_URLS.STORE_COMMENT, data);
  console.log(data);
};

const getAllComments = () => apiService.get(API_URLS.GET_COMMENTS);

const approveComment = (commentId) =>
  apiService.get(`${API_URLS.GET_COMMENTS}/approve/${commentId}`);

const unapproveComment = (commentId) =>
  apiService.get(`${API_URLS.GET_COMMENTS}/unapprove/${commentId}`);

const deleteComment = (commentId) =>
  apiService.delete(`${API_URLS.GET_COMMENTS}/${commentId}`);

export const commentService = {
  storeComment,
  getAllComments,
  approveComment,
  unapproveComment,
  deleteComment,
};
