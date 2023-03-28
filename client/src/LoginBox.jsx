import React from "react";

const LoginBox = () => {
  return (
    <>
      <div className="wrapper">
        <div className="form-box login">
          <h2>登 录</h2>
          <form action="#">
            <div className="input-box">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" required />
              <label htmlFor="email">邮箱</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required />
              <label htmlFor="password">密码</label>
            </div>
            <div className="remember-forgot">
              <label htmlFor="check">
                <input type="checkbox" id="check" />
                记住我
                <a href="#">忘记密码</a>
              </label>
            </div>
            <button type="submit" className="login-btn">登录</button>
            <div className="login-register">
                <p>没有账号？<a href="#" className="register-link">注册</a></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginBox;
