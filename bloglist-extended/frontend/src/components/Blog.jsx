import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogsReducer";
import { useNavigate } from "react-router-dom";

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
      navigate('/');
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>By: {blog.author}</h3>
      <div>{blog.url}</div>
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
    </div>
  );
};

export default Blog;
