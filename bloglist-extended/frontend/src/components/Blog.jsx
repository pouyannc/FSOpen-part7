import React, { useState } from "react";

const Blog = ({ blog, increaseLikes, removeBlog, username }) => {
  const [likes, setLikes] = useState(blog.likes);

  const allowRemove = blog.user.username === username;

  const handleLike = () => {
    const req = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
      user: blog.user.id,
    };
    increaseLikes(req, blog.id);
    setLikes(likes + 1);
  };

  const handleRemove = () => {
    if (confirm(`Delete blog: ${blog.title}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>By: {blog.author}</h3>
      <div>{blog.url}</div>
      <div>
        {likes} likes
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
