import React from "react";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { exitModalWindow } from "../features/newsSlice";
import Logout from "./Logout";

const Layout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authSlice.token);

  function handleModal() {
    dispatch(exitModalWindow());
  }

  return (
    <div onClick={handleModal} className="mainbody">
      <Header />
      {token ? (
        <Logout />
      ) : (
        <>
          <Link className="logout" to={"/signin"}>
            SignIn
          </Link>
          <Link className="signupbtn" to={"/signup"}>
            SignUp
          </Link>
        </>
      )}
      <main className="main">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
