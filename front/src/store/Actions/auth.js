import * as ActionTypes from "./ActionTypes";

export const authSuccess = (token, userId, firstname, expDate) => {
  return {
    type: ActionTypes.LOGIN,
    token: token,
    userId: userId,
    firstname: firstname,
    error: null,
    expDate: expDate
  };
};

export const login = (token, userId, firstname, expirationDate) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("firstname", firstname);
  const expDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  localStorage.setItem("expDate", expDate);
  return dispatch => {
    dispatch(authSuccess(token, userId, firstname, expirationDate));
  };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("firstname");
    localStorage.removeItem("expDate");
    return {
      type: ActionTypes.LOGOUT
    };
};
