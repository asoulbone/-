import React from "react";
import "./loginBox.css";
import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginBox = () => {
  // 读取本地的登录记录
  const isLogin = localStorage.getItem("isLogin") === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        // 登录成功后将登录状态保存到本地存储
        localStorage.setItem("isLogin", "true");
        // 存储用户id到本地让用户管理加载信息
        localStorage.setItem("userId", res.data);
        navigate("/manage");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  const handleLogout=()=>{
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userId");
    window.location.reload();
  }

  return (
    <div className="wrapper">
      <span className="icon-close">
        <ion-icon name="close"></ion-icon>
      </span>
      {isLogin ? (
        <div>
          <h1>您已登录</h1>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      ) : (
        <div className="form-box login">
          <h2>登 录</h2>
          <form onSubmit={handleLogin}>
            <InputBox
              title={"邮箱"}
              inputType={"email"}
              iconName={"mail"}
              name={"email"}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              title={"密码"}
              inputType={"password"}
              name={"password"}
              iconName={"lock-closed"}
              setPassword={setPassword}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <div className="remember-forgot">
              <label htmlFor="check">
                <input type="checkbox" id="check" />
                记住我
              </label>
              <a href="#">忘记密码</a>
            </div>
            <button type="submit" className="login-btn">
              登录
            </button>
            <div className="login-register">
              <p>
                没有账号？
                <Link to={"register"}>注册</Link>
              </p>
            </div>
          </form>
          {message && <div className="error-message">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default LoginBox;
