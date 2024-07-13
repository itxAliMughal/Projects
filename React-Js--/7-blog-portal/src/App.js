import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FrontendLayout from "./pages/layouts/FrontendLayout";
import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from "./utils/constant";
import Main from "./pages/Main";
import PostDetail from "./pages/PostDetail";
import CategoryDetail from "./pages/CategoryDetail";
import SearchDetail from "./pages/SearchDetail";
import Register from "./pages/Register";

import Login from "./pages/Login";
import { AuthServices } from "./utils/authService";
import AdminLayout from "./pages/Admin/Layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminAddCategory from "./pages/Admin/AdminAddCategory";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminAddUser from "./pages/Admin/AdminAddUser";
import AdminPosts from "./pages/Admin/AdminPosts";
import AdminAddPost from "./pages/Admin/AdminAddPost";
import AdminComments from "./pages/Admin/AdminComments";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 0,
      staleTime: 5 * 1000, //cache expiry time
    },
  },
});

function App() {
  const isUserLoggedIn = AuthServices.isUserLoggedIn();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<FrontendLayout />}>
            <Route path={UNAUTHENTICATED_ROUTES.HOME} element={<Main />} />
            <Route
              path={UNAUTHENTICATED_ROUTES.POST_DETAIL}
              element={<PostDetail />}
            />
            <Route
              path={UNAUTHENTICATED_ROUTES.CATEGORY_DETAIL}
              element={<CategoryDetail />}
            />
            <Route
              path={UNAUTHENTICATED_ROUTES.SEARCH_DETAIL}
              element={<SearchDetail />}
            />
            <Route
              path={UNAUTHENTICATED_ROUTES.REGISTER}
              element={<Register />}
            />
            <Route path={UNAUTHENTICATED_ROUTES.LOGIN} element={<Login />} />
          </Route>

          {isUserLoggedIn && (
            <Route element={<AdminLayout />}>
              <Route
                path={AUTHENTICATED_ROUTES.DASHBOARD}
                element={<Dashboard />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.CATEGORIES}
                element={<AdminCategories />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.ADD_CATEGORY}
                element={<AdminAddCategory />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.EDIT_CATEGORY}
                element={<AdminAddCategory />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.USERS}
                element={<AdminUsers />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.ADD_USER}
                element={<AdminAddUser />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.EDIT_USER}
                element={<AdminAddUser />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.POSTS}
                element={<AdminPosts />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.ADD_POST}
                element={<AdminAddPost />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.EDIT_POST}
                element={<AdminAddPost />}
              />
              <Route
                path={AUTHENTICATED_ROUTES.COMMENTS}
                element={<AdminComments />}
              />
            </Route>
          )}

          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
