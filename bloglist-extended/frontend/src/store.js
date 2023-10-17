import { configureStore } from "@reduxjs/toolkit";
import notifReducer from "./reducers/notifReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import userDataReducer from "./reducers/userDataReducer";

const store = configureStore({
  reducer: {
    notif: notifReducer,
    blogs: blogsReducer,
    user: userReducer,
    userData: userDataReducer,
  },
});

export default store;
