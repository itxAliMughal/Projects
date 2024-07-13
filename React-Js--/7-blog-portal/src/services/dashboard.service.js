import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getDashboardAnalytic = () => apiService.get(API_URLS.DASHBOARD_ANALYTIC);

export const DashboardService = {
  getDashboardAnalytic,
};
