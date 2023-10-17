import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";


const userData = createSlice({
  name: 'userData',
  initialState: [],
  reducers: {
    setUserData(state, action) {
      return action.payload;
    }
  }
});

export const { setUserData } = userData.actions;

export const initUserData = () => async (dispatch) => {
  const res = await userService.getAll();
  dispatch(setUserData(res));
}

export default userData.reducer;
