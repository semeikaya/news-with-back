import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSelector((state) => state.authSlice.signIn);
  const error = useSelector((state) => state.authSlice.error);

  function handleLogin(e) {
    setLogin(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit() {
    dispatch(loginUser({ login, password }));
  }

  return (
    <div className="main-signin">
      <div className="signin-box">
        <div className="error-signin">{error}</div>
        <div className="login-txt">Login</div>
        <div className="login">
          <input
            className="signintext"
            type="text"
            placeholder="Введите имя"
            value={login}
            onChange={handleLogin}
          />
        </div>
        <div>
          <input
            className="signintext"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="login-btn">
          <button onClick={handleSubmit} disabled={signIn}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
