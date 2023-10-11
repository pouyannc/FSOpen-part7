import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notifReducer";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((b) => b.id !== action.payload);
    }
  },
});

export const { setBlogs, append, remove } = blogsSlice.actions;

export const createNew = (req) => async (dispatch) => {
  const res = await blogService.create(req);

  dispatch(append(res));
  dispatch(notify(`New entry created: ${res.title}`, 4));
}

export default blogsSlice.reducer;
