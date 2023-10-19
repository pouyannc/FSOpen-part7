import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../reducers/blogsReducer';

const Comments = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postComment(newComment, blog.id));
    setNewComment('');
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments