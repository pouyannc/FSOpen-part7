import { createSlice } from "@reduxjs/toolkit";

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

export default blogsSlice.reducer;
