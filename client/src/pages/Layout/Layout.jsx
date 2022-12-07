import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { exitModalWindow } from "../../features/commentsSlice";
import Logout from "../../components/Logout/Logout";
import styles from "./Layout.module.css";


const Layout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authSlice.token);

  function handleModal() {
    dispatch(exitModalWindow());
  }

  
  return (
    <div onClick={handleModal} className={styles.mainBody}>
      <Header />
      {token ? (
        <Logout />
      ) : (
        <>
          <a className={styles.logout} href="http://localhost:3000/signin">
            SignIn
          </a>
          <a className={styles.signUpBtn} href="http://localhost:3000/signup">
          SignUp
          </a>
        </>
      )}
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
