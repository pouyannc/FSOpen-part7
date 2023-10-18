import React, { useRef } from 'react'
import Togglable from '../components/Togglable'
import CreatePost from '../components/CreatePost'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 2,
    marginTop: 2
  };

  const createPostRef = useRef();

  return (  
    <div>
      <h2>Blogs</h2>
      <Togglable label="Create new" ref={createPostRef}>
        <CreatePost createPostRef={createPostRef} />
      </Togglable>
      {blogs.map((b) => (
        <Link key={b.id} to={`/blogs/${b.id}`}>
          <div style={blogStyle}>{b.title}</div>
        </Link>
      ))}
    </div>
  )
}

export default Blogs