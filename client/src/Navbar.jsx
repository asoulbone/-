import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <header>
      <h2 className="logo">Hi</h2>
      <nav className="navigation">
        <a href="#">Home</a>
        <a href="#">用户管理</a>
        <a href="#">人脸编辑</a>
        <a href="#">照片修饰</a>
        <a href="#">发布</a>
        <a href="#">参观</a>
        <a href="#">关于</a>
        <button className="btnLogin-popup">登 录</button>
      </nav>
    </header>
  );
};

export default Navbar;
