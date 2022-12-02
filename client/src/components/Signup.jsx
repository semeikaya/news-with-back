import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signUp = useSelector((state) => state.authSlice.signUp);
  const error = useSelector((state) => state.authSlice.error);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLogin(e) {
    setLogin(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    dispatch(createUser({ name, login, password }));
  }

  return (
    <div className="main-signin">
      <div className="signin-box">
        <div className="error-signin">{error}</div>
        <div className="login-txt">SignUp</div>
        <div className="login">
          <input
            className="signintext"
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="login">
          <input
            className="signintext"
            type="text"
            placeholder="Придумайте логин"
            value={login}
            onChange={handleLogin}
          />
        </div>
        <div>
          <input
            className="signintext"
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="login-btn">
          <button onClick={handleSubmit} disabled={signUp}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
