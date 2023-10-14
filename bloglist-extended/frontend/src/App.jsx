import React, { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import Alert from "./components/Alert";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, remove } from "./reducers/blogsReducer";
import { loginUser, logout } from "./reducers/userReducer";

const App = () => {
  const notif = useSelector(({ notif }) => notif);
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({user}) => user.user);

  const createPostRef = useRef();

  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(logout());
  };

  const increaseLikes = async (req, blogId) => {
    const resBlog = await blogService.update(req, blogId);
    return resBlog;
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    dispatch(remove(id));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      const sortedByLikes = allBlogs.sort((a, b) => b.likes - a.likes);
      dispatch(setBlogs(sortedByLikes));
    };

    fetchBlogs();

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
            {"logged in as "}
            {`${user.username} `}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Togglable label="Create new" ref={createPostRef}>
            <CreatePost createPostRef={createPostRef} />
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              increaseLikes={increaseLikes}
              removeBlog={removeBlog}
              allowRemove={user.username === b.user.username}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
