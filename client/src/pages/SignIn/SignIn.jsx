import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import styles from "./Signin.module.css";

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
    <div className={styles.mainSignin}>
      <div className={styles.signinBox}>
        <div className={styles.errorSignin}>{error}</div>
        <div className={styles.loginTxt}>Login</div>
        <div className={styles.login}>
          <input
            className={styles.signintext}
            type="text"
            placeholder="Введите имя"
            value={login}
            onChange={handleLogin}
          />
        </div>
        <div>
          <input
            className={styles.signintext}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className={styles.loginBtn}>
          <button onClick={handleSubmit} disabled={signIn}>
            Войти
          </button>
        </div>
        <div>
          <a href="http://localhost:3000/signup">SignIn</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
