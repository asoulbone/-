import React from "react";
import "./loginBox.css";
import InputBox from "./InputBox";
import { Link } from "react-router-dom";

const LoginBox = () => {
  return (
    <div className="wrapper">
      <span className="icon-close">
        <ion-icon name="close"></ion-icon>
      </span>

      <div className="form-box login">
        <h2>登 录</h2>
        <form action="#">
          <InputBox title={"邮箱"} inputType={"email"} iconName={"mail"} />
          <InputBox
            title={"密码"}
            inputType={"password"}
            iconName={"lock-closed"}
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
      </div>
    </div>
  );
};

export default LoginBox;
