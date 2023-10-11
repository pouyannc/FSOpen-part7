import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, changeUsername, login } from "../reducers/userReducer";


const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(({ user }) => user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userInfo));
  };

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            id="username"
            type="text"
            name="username"
            onChange={(e) => {
              dispatch(changeUsername(e.target.value));
            }}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => {
              dispatch(changePassword(e.target.value));
            }}
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default Login;
