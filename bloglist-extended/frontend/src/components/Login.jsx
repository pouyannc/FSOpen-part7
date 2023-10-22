import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, changeUsername, login } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

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

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            onChange={(e) => {
              dispatch(changeUsername(e.target.value));
            }}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            onChange={(e) => {
              dispatch(changePassword(e.target.value));
            }}
          />
          <Button id="login-btn" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
