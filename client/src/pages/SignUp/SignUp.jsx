import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/authSlice";
import styles from "./Signup.module.css";
import { useEffect } from "react";

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

useEffect(()=> {})


  return (
    <div className={styles.mainSignin}>
      <div className={styles.signinBox}>
        <div className={styles.errorSignin}>{error}</div>
        <div className={styles.loginTxt}>SignUp</div>
        <div className={styles.login}>
          <input
            className={styles.signintext}
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className={styles.login}>
          <input
            className={styles.signintext}
            type="text"
            placeholder="Придумайте логин"
            value={login}
            onChange={handleLogin}
          />
        </div>
        <div>
          <input
            className={styles.signintext}
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className={styles.loginBtn}>
          <button
            to={error ? null : "/signin"}
            className={styles.loginBtn}
            onClick={handleSubmit}
            disabled={signUp}
          >
            Зарегистрироваться
          </button>
        </div>
        <div>
          <a href="http://localhost:3000/signin">SignIn</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
