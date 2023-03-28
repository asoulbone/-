import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handleClick }) => {
  return (
    <header>
      <h2 className="logo">Hi</h2>
      <nav className="navigation">
        <Link to={"/"}>Home</Link>
        <Link to={"manage"}>用户管理</Link>
        <Link to={"face-edit"}>人脸编辑</Link>
        <Link to={"decoration"}>照片修饰</Link>
        <Link to={"post"}>发布</Link>
        <Link to={"images"}>发布</Link>
        <Link to={"about"}>关于</Link>
        <Link to={"/"}>
          <button className="btnLogin-popup" onClick={handleClick}>
            登 录
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
