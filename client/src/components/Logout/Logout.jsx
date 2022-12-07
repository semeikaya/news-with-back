import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";
import styles from './Logout.module.css'

const Logout = () => {
  const dispatch = useDispatch();

  function logout() {
    dispatch(logOut());
  }

  return (
    <div onClick={logout} className={styles.logout}>
      Logout
    </div>
  );
};

export default Logout;
