import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBlog, removeBlog } from "../reducers/blogsReducer";
import Comments from "./Comments";


const Blog = ({ blog, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const allowRemove = blog.user.username === username;

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    if (confirm(`Delete blog: ${blog.title}?`)) {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>By: {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button type="button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.username}</div>
      <button
        type="button"
        onClick={handleRemove}
        style={{ display: allowRemove ? "" : "none" }}
      >
        remove
      </button>
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
