import React, { useState } from 'react';

const Blog = ({
  blog, increaseLikes, removeBlog, allowRemove,
}) => {
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleInfo = () => {
    setView(!view);
  };

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
      <div className="blog" style={blogStyle}>
        <div>
          {blog.title} <button type="button" onClick={toggleInfo}>{view ? 'close' : 'view'}</button>
        </div>
        <div>By {blog.author}</div>
        <div className="moreInfo" style={{ display: view ? '' : 'none' }}>
          <a href={blog.url}>{blog.url}</a>
          <div>
            Likes: {likes} <button type="button" onClick={handleLike}>like</button>
          </div>
          <button type="button" onClick={handleRemove} style={{ display: allowRemove ? '' : 'none' }}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
