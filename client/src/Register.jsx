import React from "react";
import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    tel: "",
    introduce: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // 检测密码和确认密码是否一致
    if (event.target[2].value !== event.target[3].value) {
      window.alert("密码和确认密码不匹配！");
      return;
    }

    console.log(formData);

    //匹配api
    fetch("http://127.0.0.1:5000/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userName === formData.userName) {
          setMessage("注册成功");
        } else {
          setMessage("注册失败");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("注册失败");
      });
  };

  return (
    <div className="wrapper">
      <span className="icon-close">
        <ion-icon name="close"></ion-icon>
      </span>
      <div className="form-box register">
        <h2>注 册</h2>
        <form onSubmit={handleSubmit}>
          <InputBox
            title={"昵称"}
            inputType={"text"}
            iconName={"person"}
            name={"userName"}
            setFormData={setFormData}
          />
          <InputBox
            title={"邮箱"}
            inputType={"email"}
            iconName={"mail"}
            name={"email"}
            setFormData={setFormData}
          />
          <InputBox
            title={"密码"}
            inputType={"password"}
            iconName={"lock-closed"}
            name={"password"}
            setFormData={setFormData}
          />
          <InputBox
            title={"确认密码"}
            inputType={"password"}
            iconName={"lock-closed-outline"}
            name={"confirmPassword"}
            setFormData={setFormData}
          />
          <InputBox
            title={"手机号"}
            inputType={"tel"}
            iconName={"call"}
            name={"tel"}
            setFormData={setFormData}
          />
          <InputBox
            title={"用户签名"}
            inputType={"text"}
            iconName={"chatbox-ellipses"}
            name={"introduce"}
            setFormData={setFormData}
          />
          <button type="submit" className="login-btn">
            注册
          </button>
          <div className="login-register">
            <p>
              已经拥有账号？
              <Link to={"/"}>登录</Link>
            </p>
          </div>
        </form>
        {message && <h1>{message}</h1>}
      </div>
    </div>
  );
};

export default Register;
