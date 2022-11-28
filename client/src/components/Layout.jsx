import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mainbody" >
      <Header />
      
      <main className="main">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
