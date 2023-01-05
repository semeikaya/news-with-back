import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exitModalWindow } from "../../features/commentsSlice";
import styles from "./Layout.module.css";
import Search from "../../components/Search/Search";

const Layout = () => {
  const dispatch = useDispatch();

  function handleModal() {
    dispatch(exitModalWindow());
  }

  return (
    <div onClick={handleModal} className={styles.mainBody}>
      <Search />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
