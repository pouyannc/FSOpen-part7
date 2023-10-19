import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Alert from "./components/Alert";
import { initBlogs } from "./reducers/blogsReducer";
import { loginUser, logout } from "./reducers/userReducer";
import Users from "./views/Users";
import User from "./views/User";
import Blogs from "./views/Blogs";
import { initUserData } from "./reducers/userDataReducer";

const App = () => {
  const notif = useSelector(({ notif }) => notif);
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((a, b) => b.likes - a.likes),
  );
  const user = useSelector(({ user }) => user.user);
  const users = useSelector(({ userData }) => userData);

  const dispatch = useDispatch();

  const match = useMatch("blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUserData());

    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (loggedUser) {
      dispatch(loginUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  return (
    <>
      {notif.show && <Alert text={notif.message} />}

      {!user ? (
        <Login />
      ) : (
        <div>
          <div>
            <Link to="/">blogs </Link>
            <Link to="/users">users </Link>
            {"logged in as "}
            {`${user.username} `}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Routes>
            <Route path="/" element={<Blogs blogs={blogs} />} />
            <Route
              path="/blogs/:id"
              element={<Blog blog={blog} username={user.username} />}
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
