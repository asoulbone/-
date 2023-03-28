import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = ({handleClcik}) => {
  return (
    <div className="App">
      <Navbar handleClcik={handleClcik}/>
      <Outlet />
    </div>
  );
};

export default Layout;
