import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const searchPost = (data) => apiService.post(API_URLS.SEARCH_POST, data);

export const SearchService = {
  searchPost,
};
