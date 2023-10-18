import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notifReducer";
import { useNavigate } from "react-router-dom";

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
    },
    increaseLikes(state, action) {
      const id = action.payload;
      return state.map((blog) => blog.id === id ? {...blog, likes: blog.likes + 1} : blog);
    }
  },
});

export const { setBlogs, append, remove, increaseLikes } = blogsSlice.actions;

export const initBlogs = () => async (dispatch) => {
  const res = await blogService.getAll();
  dispatch(setBlogs(res));
}

export const createNew = (req) => async (dispatch) => {
  const res = await blogService.create(req);

  dispatch(append(res));
  dispatch(notify(`New entry created: ${res.title}`, 4));
}

export const likeBlog = (blog) => async (dispatch) => {
  const req = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
  };
  await blogService.update(req, blog.id);
  dispatch(increaseLikes(blog.id));
}

export const removeBlog = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch(remove(id));
}

export default blogsSlice.reducer;
