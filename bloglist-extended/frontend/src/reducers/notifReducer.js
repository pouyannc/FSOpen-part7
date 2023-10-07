import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  message: "",
};

const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    setNotif(state, action) {
      return {
        show: true,
        message: action.payload,
      };
    },
    removeNotif() {
      return initialState;
    },
  },
});

export const { setNotif, removeNotif } = notifSlice.actions;

export const notify = (message, time) => (dispatch) => {
  dispatch(setNotif(message));
  setTimeout(() => {
    dispatch(removeNotif());
  }, time * 1000);
};

export default notifSlice.reducer;
