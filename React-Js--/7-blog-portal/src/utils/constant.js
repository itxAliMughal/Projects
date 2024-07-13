export const UNAUTHENTICATED_ROUTES = {
  HOME: "/",
  POST_DETAIL: "/post/:postId",
  CATEGORY_DETAIL: "/category/:catId",
  SEARCH_DETAIL: "/search/:query",
  REGISTER: "/register",
  LOGIN: "/login",
};

export const AUTHENTICATED_ROUTES = {
  DASHBOARD: "/admin/dashboard",
  CATEGORIES: "/admin/categories",
  ADD_CATEGORY: "/admin/categories/add",
  EDIT_CATEGORY: "/admin/categories/edit/:categoryId",
  USERS: "/admin/users",
  ADD_USER: "/admin/users/add",
  EDIT_USER: "/admin/users/edit/:userId",
  POSTS: "/admin/posts",
  ADD_POST: "/admin/posts/add",
  EDIT_POST: "/admin/posts/edit/:postId",
  COMMENTS: "/admin/comments",
};

export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const PASSWORD_REGEX_MESSAGE =
  "Password should be contains at least one alphabet and contains at least one digit and is at least 8 characters long and should have special character.";
