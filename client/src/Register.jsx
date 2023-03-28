import React from "react";
import { Link } from "react-router-dom";
import InputBox from "./InputBox";

const Register = () => {
  return (
    <div className="wrapper">
      <span className="icon-close">
        <ion-icon name="close"></ion-icon>
      </span>
      <div className="form-box register">
        <h2>注 册</h2>
        <form action="#">
          <InputBox title={"昵称"} inputType={"text"} iconName={"person"} />
          <InputBox title={"邮箱"} inputType={"email"} iconName={"mail"} />
          <InputBox
            title={"密码"}
            inputType={"password"}
            iconName={"lock-closed"}
          />
          <button type="submit" className="login-btn">
            注册
          </button>
          <div className="login-register">
            <p>
              已经拥有账号？
              <Link to={"/"}>
                登录
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
