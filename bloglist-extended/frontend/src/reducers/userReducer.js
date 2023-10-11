import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { notify } from "./notifReducer";

const initialState = {
  username: '',
  password: '',
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    loginUser(state, action) {
      return {
        username: '',
        password: '',
        user: action.payload,
      }
    },
    logout() {
      return initialState;
    },
  }
})

export const { changeUsername, changePassword, loginUser, logout } = userSlice.actions;

export const login = (req) => async (dispatch) => {
  try {
    const loginRes = await loginService(req);
    blogService.setToken(loginRes.token);
    dispatch(loginUser(loginRes));
    window.localStorage.setItem("loggedUser", JSON.stringify(loginRes));
  } catch (error) {
    dispatch(notify("wrong username or password", 4));
  }
};

export default userSlice.reducer;