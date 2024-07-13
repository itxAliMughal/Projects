export const TOKEN_NAME = "TOKEN";
export const USER_NAME = "USER_NAME";

const saveToken = (token) => {
  if (!token) {
    return null;
  }

  localStorage.setItem(TOKEN_NAME, token);
};

const saveUserName = (username) => {
  if (!username) {
    return null;
  }

  localStorage.setItem(USER_NAME, username);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};

const isUserLoggedIn = () => {
  const token = localStorage.getItem(TOKEN_NAME);

  if (!token) {
    return false;
  }
  return true;
};

export const AuthServices = {
  saveToken,
  removeToken,
  saveUserName,
  isUserLoggedIn,
};
