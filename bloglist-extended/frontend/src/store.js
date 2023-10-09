import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "./reducers/notifReducer";
import blogsReducer from "./reducers/blogsReducer";

const store = configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogsReducer
  },
});

export default store;
