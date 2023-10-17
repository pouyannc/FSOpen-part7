import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const User = () => {
  const { id }= useParams();
  const users = useSelector(({ userData }) => userData);

  const user = users.find((u) => u.id === id);

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blogs added</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User