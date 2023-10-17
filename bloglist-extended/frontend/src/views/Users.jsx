import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUserData } from "../reducers/userDataReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const userData = useSelector(({ userData }) => userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserData());
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table style={{ borderSpacing: 4 }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td> 
          </tr>
        ))}
        </tbody>
        
      </table>
      
    </div>
  )
};

export default Users;