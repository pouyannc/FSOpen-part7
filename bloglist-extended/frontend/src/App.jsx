import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import CreatePost from "./components/CreatePost";
import Alert from "./components/Alert";
import Togglable from "./components/Togglable";
import { notify } from "./reducers/notifReducer";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const notif = useSelector(({ notif }) => notif);

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const createPostRef = useRef();

  const dispatch = useDispatch();

  const login = async (req) => {
    try {
      const loginRes = await loginService(req);
      blogService.setToken(loginRes.token);
      setUser(loginRes);
      window.localStorage.setItem("loggedUser", JSON.stringify(loginRes));
    } catch (error) {
      dispatch(notify("wrong username or password", 4));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createNew = async (req) => {
    createPostRef.current.toggleVisibility();
    const res = await blogService.create(req);

    setBlogs(blogs.concat(res));
    dispatch(notify(`New entry created: ${res.title}`, 4));
  };

  const increaseLikes = async (req, blogId) => {
    const resBlog = await blogService.update(req, blogId);
    return resBlog;
  };

  const removeBlog = async (id) => {
    await blogService.remove(id);
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(updatedBlogs);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      const sortedByLikes = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedByLikes);
    };

    fetchBlogs();

    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  return (
    <>
      {notif.show && <Alert text={notif.message} />}

      {!user ? (
        <Login login={login} />
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
            <CreatePost createNew={createNew} />
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
